import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

// Policy exports live in content/policies as XML, exactly as the policy team
// exports them (one file per policy area, e.g. housing.xml). The XML comment
// at the top of each export holds developer notes and is never shown.

export type PolicyNode =
  | { text: string }
  | { tag: string; attrs: Record<string, string>; children: PolicyNode[] };

export type PolicyElement = Extract<PolicyNode, { tag: string }>;

const POLICY_DIR = path.join(process.cwd(), 'content', 'policies');

const parser = new XMLParser({
  preserveOrder: true, // keeps <strong> and <link> in place inside sentences
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: false,
  parseTagValue: false,
  parseAttributeValue: false,
});

type RawNode = Record<string, unknown>;

function toNodes(raw: RawNode[]): PolicyNode[] {
  return raw.flatMap((entry): PolicyNode[] => {
    const tag = Object.keys(entry).find((k) => k !== ':@');
    if (!tag || tag === '?xml') return [];
    if (tag === '#text') return [{ text: String(entry[tag]) }];
    return [
      {
        tag,
        attrs: (entry[':@'] as Record<string, string>) ?? {},
        children: toNodes((entry[tag] as RawNode[]) ?? []),
      },
    ];
  });
}

/** Reads a policy export (e.g. "housing") and returns its root element. */
export function getPolicyArea(name: string): PolicyElement | null {
  try {
    const xml = fs.readFileSync(path.join(POLICY_DIR, `${name}.xml`), 'utf8');
    const root = toNodes(parser.parse(xml) as RawNode[]).find((n): n is PolicyElement => 'tag' in n);
    return root ?? null;
  } catch (error) {
    console.error(`Could not read policy export "${name}":`, error);
    return null;
  }
}

export const isElement = (n: PolicyNode): n is PolicyElement => 'tag' in n;

export const childElements = (n: PolicyElement, tag?: string) =>
  n.children.filter(isElement).filter((c) => !tag || c.tag === tag);

export const firstChild = (n: PolicyElement, tag: string) => childElements(n, tag)[0];

/** All text inside a node, with whitespace collapsed. */
export function textOf(n: PolicyNode | undefined): string {
  if (!n) return '';
  if (!isElement(n)) return n.text.replace(/\s+/g, ' ');
  return n.children.map(textOf).join('').replace(/\s+/g, ' ').trim();
}

export interface PolicyAreaSummary {
  slug: string; // file name, and the page address: /platform/<slug>
  heading: string; // e.g. "Housing"
  description: string; // Lorna's commitment, in full (llms.txt)
  searchDescription: string; // short version for Google results and link previews
  policies: Array<{ id: string; title: string }>;
}

/** Every policy export, for page routes, links, the sitemap and llms.txt. */
export function listPolicyAreas(): PolicyAreaSummary[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(POLICY_DIR).filter((f) => f.endsWith('.xml')).sort();
  } catch {
    return [];
  }
  return files.flatMap((file) => {
    const slug = file.replace(/\.xml$/, '');
    const area = getPolicyArea(slug);
    return area ? [summarize(slug, area)] : [];
  });
}

function summarize(slug: string, area: PolicyElement): PolicyAreaSummary {
  const policies = childElements(area, 'policy');
  // The area's name comes from its policies' type ("Housing"), else the file name.
  const heading =
    textOf(firstChild(policies[0] ?? area, 'policy_type')) ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const intro = firstChild(area, 'introduction');
  const commitment = intro && firstChild(intro, 'commitment');
  const description = textOf(commitment && firstChild(commitment, 'paragraph')) || textOf(intro);
  const titles = policies.map((p) => textOf(firstChild(p, 'title')));
  return {
    slug,
    heading,
    description,
    searchDescription: searchDescription(heading, titles, description),
    policies: policies.map((p) => ({ id: p.attrs.id, title: textOf(firstChild(p, 'title')) })),
  };
}

/**
 * Which platform card an area belongs to: the first card whose title contains
 * the area's name (the "Housing" export goes with "Affordable Housing and
 * Tenant Protections").
 */
export function matchCardToArea(cardTitle: string, areas: PolicyAreaSummary[]) {
  const title = cardTitle.toLowerCase();
  return areas.find((a) => title.includes(a.heading.toLowerCase()));
}

/** Card title → link to its full plan, for PlatformGrid. */
export function platformCardLinks(cardTitles: string[]) {
  const areas = listPolicyAreas();
  const links: Record<string, { href: string; label: string }> = {};
  for (const title of cardTitles) {
    const area = matchCardToArea(title, areas);
    if (area) links[title] = { href: `/platform/${area.slug}`, label: `Read the full ${area.heading.toLowerCase()} plan →` };
  }
  return links;
}

// Search engines show about 160 characters. Name as many policies as fit.
function searchDescription(heading: string, titles: string[], fallback: string) {
  const lead = `Lorna Antwi's ${heading.toLowerCase()} plan for Ward 7 Humber River-Black Creek`;
  let text = `${lead}.`;
  for (let i = 0; i < titles.length; i++) {
    const next = `${lead}: ${titles.slice(0, i + 1).join('; ')}${i + 1 < titles.length ? ' and more' : ''}.`;
    if (next.length > 160) break;
    text = next;
  }
  if (titles.length) return text;
  return fallback.length <= 160 ? fallback : `${fallback.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}
