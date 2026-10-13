import {
  childElements,
  firstChild,
  isElement,
  listXmlExports,
  readXmlExport,
  textOf,
  type XmlElement,
  type XmlNode,
} from './xmlContent';

// Policy plans live in content/policies as XML, exactly as the policy team
// exports them: one file per plan, shown at /platform/<file name>. A plan is
// either an area with several <policy> sections (housing.xml) or a single
// policy at the top level (finch-west-transit.xml).

export type PolicyNode = XmlNode;
export type PolicyElement = XmlElement;
export { childElements, firstChild, isElement, textOf };

const FOLDER = 'policies';

export const getPolicyExport = (name: string) => readXmlExport(FOLDER, name);

/** Reads a policy export (e.g. "housing") and returns its root element. */
export const getPolicyArea = (name: string) => getPolicyExport(name)?.root ?? null;

/** True when the whole file is one policy rather than a set of them. */
export const isSinglePolicy = (area: XmlElement) =>
  childElements(area, 'policy').length === 0 && !!firstChild(area, 'title');

export interface PolicyAreaSummary {
  slug: string; // file name, and the page address: /platform/<slug>
  heading: string; // e.g. "Housing"
  description: string; // Lorna's commitment, in full (llms.txt)
  searchDescription: string; // short version for Google results and link previews
  title?: string; // single-policy plans: the policy's own title
  policies: Array<{ id: string; title: string }>;
}

/** Every policy export, for page routes, links, the sitemap and llms.txt. */
export function listPolicyAreas(): PolicyAreaSummary[] {
  return listXmlExports(FOLDER).flatMap((slug) => {
    const area = getPolicyArea(slug);
    return area ? [summarize(slug, area)] : [];
  });
}

function summarize(slug: string, area: PolicyElement): PolicyAreaSummary {
  if (isSinglePolicy(area)) return summarizeSingle(slug, area);
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

function summarizeSingle(slug: string, area: PolicyElement): PolicyAreaSummary {
  const heading = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const title = textOf(firstChild(area, 'title'));
  const description = textOf(firstChild(firstChild(area, 'proposedAction') ?? area, 'paragraph')) || title;
  return {
    slug,
    heading,
    title,
    description,
    searchDescription: shorten(`${title}: Lorna Antwi's plan for Ward 7 Humber River-Black Creek. ${description}`),
    policies: [],
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
  return titles.length ? text : shorten(fallback);
}

const shorten = (text: string) => (text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`);
