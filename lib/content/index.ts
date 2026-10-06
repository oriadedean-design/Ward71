import { sanityFetch } from '@/sanity/live';
import { PAGE_DEFAULTS, type PageId, type SanityImage } from './defaults';

export type { PageId, SanityImage };

// Shown if the candidate photo is ever removed from Site Settings, so visitors
// never see an empty box or editor instructions.
export const FALLBACK_CANDIDATE_PHOTO =
  'https://cdn.sanity.io/images/kfgyh53r/production/3279f5a4bbd66e1b50076368d2372c9980c7b90d-3696x5371.jpg';

/**
 * Overlays Sanity content on the defaults. Empty strings, missing fields and
 * empty lists fall back to the default, so the site never renders blank.
 */
export function mergeContent<T>(defaults: T, override: unknown): T {
  if (override === null || override === undefined) return defaults;

  if (Array.isArray(defaults)) {
    return (Array.isArray(override) && override.length > 0 ? override : defaults) as T;
  }

  if (typeof defaults === 'string') {
    return (typeof override === 'string' && override.trim() !== '' ? override : defaults) as T;
  }

  if (typeof defaults === 'boolean') {
    return (typeof override === 'boolean' ? override : defaults) as T;
  }

  if (defaults !== null && typeof defaults === 'object') {
    if (typeof override !== 'object' || Array.isArray(override)) return defaults;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      out[key] = mergeContent((defaults as Record<string, unknown>)[key], (override as Record<string, unknown>)[key]);
    }
    return out as T;
  }

  // Default is null (e.g. an optional image): take whatever Sanity has.
  return override as T;
}

async function fetchDoc<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  try {
    const { data } = await sanityFetch({ query, params });
    return (data as T) ?? null;
  } catch (error) {
    console.error('Sanity fetch failed, using default content:', error);
    return null;
  }
}

// Before the content seed ran, photos lived on the older, unnamed Site Settings
// documents. Used only as a fallback until the singleton has them.
const LEGACY_SETTINGS_QUERY = `*[_type == "siteSettings" && _id != "siteSettings"] | order(_updatedAt desc)[0]{ candidatePhoto, galleryImages }`;

export async function getPageContent<K extends PageId>(id: K): Promise<(typeof PAGE_DEFAULTS)[K]> {
  const doc = await fetchDoc<Record<string, unknown>>(`*[_id == $id][0]`, { id });
  return mergeContent(PAGE_DEFAULTS[id], doc);
}

export async function getSiteSettings() {
  const settings = await getPageContent('siteSettings');
  if (!settings.candidatePhoto?.asset) {
    const legacy = await fetchDoc<{ candidatePhoto?: SanityImage }>(LEGACY_SETTINGS_QUERY);
    if (legacy?.candidatePhoto) return { ...settings, candidatePhoto: legacy.candidatePhoto };
  }
  return settings;
}

export async function getCommunityContent() {
  const content = await getPageContent('communityPage');
  if (content.gallery.length === 0) {
    const legacy = await fetchDoc<{ galleryImages?: SanityImage[] }>(LEGACY_SETTINGS_QUERY);
    if (legacy?.galleryImages?.length) return { ...content, gallery: legacy.galleryImages };
  }
  return content;
}

/** Splits a multi-paragraph field on blank lines. */
export function paragraphs(text: string | undefined | null): string[] {
  return (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
