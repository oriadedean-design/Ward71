import { createHmac } from 'node:crypto';
import { createClient } from 'next-sanity';
import { childElements, firstChild, readXmlExport, textOf, type XmlElement } from './xmlContent';

// The TTC Finch West petition (content/petitions/ttc-finch-west.xml), shown at
// /TTCpetition. Signatures are stored in Sanity as private Inbox documents
// (see lib/inbox.ts); the public only ever sees the count.

export const PETITION_FILE = 'ttc-finch-west';
export const PETITION_PATH = '/TTCpetition';

// Signing closes at the end of Monday, October 26 (Election Day), Toronto time
// (EDT, UTC-4); Lorna hands the petition in once signing closes.
export const PETITION_CLOSES_AT = new Date('2026-10-26T23:59:59-04:00');
export const isPetitionClosed = (now = new Date()) => now > PETITION_CLOSES_AT;

export const SIGNATURE_TYPE = 'petitionSignature';
export const REMOVED_STATUS = 'Removed';

export function getPetition() {
  const file = readXmlExport('petitions', PETITION_FILE);
  if (!file) return null;
  const { root, attribution } = file;
  return {
    root,
    attribution,
    id: root.attrs.id,
    title: textOf(firstChild(root, 'title')),
    subtitle: textOf(firstChild(root, 'subtitle')),
    // The petition statement itself ("We, the undersigned…").
    statement: textOf(firstChild(sectionById(root, 'petition') ?? root, 'paragraph')),
  };
}

export function sectionById(root: XmlElement, id: string) {
  return childElements(root, 'section').find((s) => s.attrs.id === id);
}

/** The signature form's fields and consent boxes, as the export defines them. */
export function getFormSpec(root: XmlElement) {
  const form = firstChild(sectionById(root, 'support') ?? root, 'signatureForm');
  if (!form) return null;
  return {
    fields: childElements(form, 'field').map((f) => ({
      name: f.attrs.name,
      label: f.attrs.label,
      type: f.attrs.type,
      required: f.attrs.required === 'true',
    })),
    consents: childElements(firstChild(form, 'consents') ?? form, 'checkbox').map((c) => ({
      name: c.attrs.name,
      label: c.attrs.label,
    })),
    note: textOf(firstChild(form, 'paragraph')),
    submitLabel: textOf(firstChild(form, 'submitButton')) || 'Sign the Petition',
  };
}

// Server-only client for counting and checking signatures. Inbox documents are
// invisible to the public API, so this needs a token.
const signatureClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

/**
 * Signatures counted so far. Pages use a copy at most 30 seconds old (the
 * counter then keeps itself current in the browser); the API asks for the
 * live number.
 */
export async function countSignatures(petitionId: string, { live = false } = {}): Promise<number> {
  try {
    return await signatureClient.fetch<number>(
      `count(*[_type == $type && petitionId == $petitionId && status != $removed])`,
      { type: SIGNATURE_TYPE, petitionId, removed: REMOVED_STATUS },
      live ? { cache: 'no-store' } : { next: { revalidate: 30 } }
    );
  } catch (error) {
    console.error('Petition count failed:', error);
    return 0;
  }
}

/** Signatures from one network, for rate limits and duplicate checks. */
export async function signaturesFromNetwork(petitionId: string, networkHash: string) {
  return signatureClient.fetch<Array<{ nameKey: string; signedAt: string }>>(
    `*[_type == $type && petitionId == $petitionId && networkHash == $networkHash]{ nameKey, signedAt }`,
    { type: SIGNATURE_TYPE, petitionId, networkHash },
    { cache: 'no-store' }
  );
}

/**
 * A one-way fingerprint of the signer's network address. The address itself
 * is never stored; the fingerprint only lets editors spot mass signing from
 * one connection and lets the site rate-limit it.
 */
export function networkHash(ip: string): string {
  const key = process.env.PETITION_HASH_SECRET || process.env.SANITY_API_WRITE_TOKEN || 'petition';
  return createHmac('sha256', key).update(ip).digest('hex').slice(0, 32);
}

/** Lower-case, accent- and space-insensitive form of a name, for duplicates. */
export const nameKey = (name: string) =>
  name.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, ' ').trim();
