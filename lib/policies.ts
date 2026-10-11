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
