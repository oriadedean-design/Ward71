import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

// Content exported by the policy team as XML (content/policies, content/petitions).
// Files are used exactly as exported. XML comments hold developer notes and
// project attribution; only the attribution is ever shown.

export type XmlNode =
  | { text: string }
  | { tag: string; attrs: Record<string, string>; children: XmlNode[] };

export type XmlElement = Extract<XmlNode, { tag: string }>;

export const CONTENT_DIR = path.join(process.cwd(), 'content');

const parser = new XMLParser({
  preserveOrder: true, // keeps <strong> and <link> in place inside sentences
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: false,
  parseTagValue: false,
  parseAttributeValue: false,
});

type RawNode = Record<string, unknown>;

function toNodes(raw: RawNode[]): XmlNode[] {
  return raw.flatMap((entry): XmlNode[] => {
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

export interface Attribution {
  credits: Array<{ label: string; lines: string[] }>; // short blocks: "PROJECT LEADERSHIP" → "Lorna Antwi", …
  notes: Array<{ label: string; text: string }>; // prose blocks: "LEADERSHIP:" → paragraph
}

/**
 * The "PROJECT ATTRIBUTION" comment at the top of an export: blocks separated
 * by blank lines, each starting with an upper-case label. Labels ending in a
 * colon introduce prose; the others introduce names.
 */
function parseAttribution(xml: string): Attribution | null {
  const comment = [...xml.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]).find((c) => c.includes('PROJECT ATTRIBUTION'));
  if (!comment) return null;

  const blocks = comment
    .split(/\n\s*\n/)
    .map((b) => b.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length > 0 && lines[0] !== 'PROJECT ATTRIBUTION');

  const credits: Attribution['credits'] = [];
  const notes: Attribution['notes'] = [];
  for (const lines of blocks) {
    const [first, ...rest] = lines;
    const isLabel = first === first.toUpperCase() && /[A-Z]/.test(first);
    if (isLabel && first.endsWith(':')) notes.push({ label: first.slice(0, -1), text: rest.join(' ') });
    else if (isLabel) credits.push({ label: first, lines: rest });
    else if (notes.length) notes[notes.length - 1].text += `\n\n${lines.join(' ')}`; // a further paragraph
  }
  return { credits, notes };
}

export interface XmlExport {
  root: XmlElement;
  attribution: Attribution | null;
}

/** Reads content/<folder>/<name>.xml. */
export function readXmlExport(folder: string, name: string): XmlExport | null {
  try {
    const xml = fs.readFileSync(path.join(CONTENT_DIR, folder, `${name}.xml`), 'utf8');
    const root = toNodes(parser.parse(xml) as RawNode[]).find((n): n is XmlElement => 'tag' in n);
    return root ? { root, attribution: parseAttribution(xml) } : null;
  } catch (error) {
    console.error(`Could not read content/${folder}/${name}.xml:`, error);
    return null;
  }
}

export function listXmlExports(folder: string): string[] {
  try {
    return fs
      .readdirSync(path.join(CONTENT_DIR, folder))
      .filter((f) => f.endsWith('.xml'))
      .map((f) => f.replace(/\.xml$/, ''))
      .sort();
  } catch {
    return [];
  }
}

export const isElement = (n: XmlNode): n is XmlElement => 'tag' in n;

export const childElements = (n: XmlElement, tag?: string) =>
  n.children.filter(isElement).filter((c) => !tag || c.tag === tag);

export const firstChild = (n: XmlElement, tag: string) => childElements(n, tag)[0];

/** All text inside a node, with whitespace collapsed. */
export function textOf(n: XmlNode | undefined): string {
  if (!n) return '';
  if (!isElement(n)) return n.text.replace(/\s+/g, ' ');
  return n.children.map(textOf).join('').replace(/\s+/g, ' ').trim();
}
