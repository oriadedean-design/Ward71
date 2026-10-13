import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { childElements, isElement, textOf, type Attribution, type XmlElement, type XmlNode } from '@/lib/xmlContent';

// Building blocks for rendering policy-team XML (plans and petitions). Native
// <details> gives keyboard, touch and screen-reader support with no JavaScript.

const LINK_CLASS = 'text-accent underline underline-offset-2 hover:opacity-80';

export const SUMMARY_RESET = 'list-none [&::-webkit-details-marker]:hidden cursor-pointer';

/** Chevron that turns when the nearest `group` <details> opens. */
export function Chevron({ className = '' }: { className?: string }) {
  return (
    <ChevronDown
      size={20}
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform group-open:rotate-180 ${className}`}
    />
  );
}

/** Sentence-level content: text, bold and links. */
export function Inline({ nodes }: { nodes: XmlNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (!isElement(n)) return <span key={i}>{n.text.replace(/\s+/g, ' ')}</span>;
        if (n.tag === 'strong') return <strong key={i} className="font-bold text-ink"><Inline nodes={n.children} /></strong>;
        if (n.tag === 'link') {
          return (
            <a key={i} href={n.attrs.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              <Inline nodes={n.children} />
            </a>
          );
        }
        return <Inline key={i} nodes={n.children} />;
      })}
    </>
  );
}

/**
 * Tool entries start with an action word ("USE", "EXPAND", "SUPPORT WITH -").
 * It's shown as a small label in front of the rest of the line.
 */
function ToolParagraph({ node }: { node: XmlElement }) {
  const [first, ...rest] = node.children;
  const match = first && !isElement(first) ? first.text.match(/^\s*([A-Z]{3,}(?: [A-Z]{2,})*)\s*-?\s+([\s\S]*)$/) : null;
  if (!match) return <p><Inline nodes={node.children} /></p>;
  return (
    <p>
      <span className="inline-block mr-2 px-1.5 py-0.5 rounded bg-ink/10 text-ink text-[11px] font-bold tracking-wide align-[2px]">
        {match[1]}
      </span>
      <Inline nodes={[{ text: match[2] }, ...rest]} />
    </p>
  );
}

/** A list item: plain text, or a bold lead-in followed by text. */
function ItemContent({ item }: { item: XmlElement }) {
  const lead = childElements(item, 'lead')[0];
  if (!lead) return <Inline nodes={item.children} />;
  return (
    <>
      <strong className="font-bold text-ink"><Inline nodes={lead.children} /></strong>{' '}
      <Inline nodes={childElements(item, 'text').flatMap((t) => t.children)} />
    </>
  );
}

function List({ items, numbered = false }: { items: XmlElement[]; numbered?: boolean }) {
  const Tag = numbered ? 'ol' : 'ul';
  return (
    <Tag className={`${numbered ? 'list-decimal marker:font-bold' : 'list-disc'} pl-6 space-y-2 marker:text-accent`}>
      {items.map((item, j) => (
        <li key={j} className="pl-1"><ItemContent item={item} /></li>
      ))}
    </Tag>
  );
}

function Table({ node }: { node: XmlElement }) {
  const header = childElements(childElements(node, 'header')[0] ?? node, 'cell');
  const rows = childElements(node, 'row');
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full min-w-[420px] text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-ink/15 text-left">
            {header.map((cell, i) => (
              <th key={i} scope="col" className="py-2 pr-4 font-bold text-ink">{textOf(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink/10">
              {childElements(row, 'cell').map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="py-2 pr-4 font-semibold text-ink text-left">{textOf(cell)}</th>
                ) : (
                  <td key={j} className="py-2 pr-4 text-ink/80">{textOf(cell)}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Paragraphs, lists, groups and tables, in the order they appear. */
export function Blocks({ node, tools = false, skip = [] }: { node: XmlElement; tools?: boolean; skip?: string[] }) {
  const children = childElements(node).filter((c) => !skip.includes(c.tag));
  const out: ReactNode[] = [];
  let run: XmlElement[] = []; // consecutive loose <item>s become one list
  const flush = () => {
    if (run.length) out.push(<List key={`l${out.length}`} items={run} />);
    run = [];
  };

  children.forEach((child, i) => {
    if (child.tag === 'item') return void run.push(child);
    flush();
    switch (child.tag) {
      case 'heading':
      case 'title':
        return; // shown by the parent
      case 'paragraph':
        // "Close" is a leftover button label in some exports, not content.
        if (textOf(child) === 'Close') return;
        return void out.push(tools ? <ToolParagraph key={i} node={child} /> : <p key={i}><Inline nodes={child.children} /></p>);
      case 'emphasis':
        return void out.push(
          <p key={i} className="border-l-4 border-accent pl-4 py-1 font-semibold text-ink"><Inline nodes={child.children} /></p>
        );
      case 'sourceNote':
        return void out.push(<p key={i} className="text-sm text-ink/70"><Inline nodes={child.children} /></p>);
      case 'list':
      case 'items':
        return void out.push(<List key={i} items={childElements(child, 'item')} numbered={child.attrs.kind === 'numbered'} />);
      case 'table':
        return void out.push(<Table key={i} node={child} />);
      case 'group':
      case 'section':
        return void out.push(
          <div key={i} className="space-y-3">
            {(child.attrs.title || childElements(child, 'heading')[0]) && (
              <h5 className="font-fraunces font-bold text-lg text-ink pt-2">
                {child.attrs.title ?? textOf(childElements(child, 'heading')[0])}
              </h5>
            )}
            <Blocks node={child} tools={tools} />
          </div>
        );
      default:
        return void out.push(<Blocks key={i} node={child} tools={tools} />);
    }
  });
  flush();

  return <div className="space-y-3 text-ink/80 leading-relaxed">{out}</div>;
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h4 className="font-jakarta text-xs font-bold uppercase tracking-widest text-ink/60 mb-3">{children}</h4>;
}

/** Outcome categories: bold bullets that open to show their items. */
export function Outcomes({ node }: { node: XmlElement }) {
  return (
    <ul className="space-y-2">
      {childElements(node, 'category').map((category, i) => (
        <li key={i}>
          <details className="group">
            <summary className={`${SUMMARY_RESET} flex items-center gap-3 min-h-[44px] rounded-lg -mx-2 px-2 hover:bg-ink/5 font-bold text-ink`}>
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="flex-1">{category.attrs.name}</span>
              <Chevron className="text-ink/50" />
            </summary>
            <div className="pl-7 pb-2 pt-1">
              {childElements(category, 'items').map((items, j) => (
                <ul key={j} className="list-[circle] pl-5 space-y-1.5 text-ink/80 marker:text-ink/50">
                  {childElements(items, 'item').map((item, k) => (
                    <li key={k}><Inline nodes={item.children} /></li>
                  ))}
                </ul>
              ))}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** A bordered disclosure, closed by default (sources, evidence, tools). */
export function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-ink/10 bg-canvas/60">
      <summary className={`${SUMMARY_RESET} flex items-center justify-between gap-4 min-h-[48px] px-4 py-3 font-bold text-ink hover:bg-ink/5 rounded-xl`}>
        <span>{label}</span>
        <Chevron className="text-ink/50" />
      </summary>
      <div className="px-4 pb-4 pt-1 text-[15px]">{children}</div>
    </details>
  );
}

/** Project credits from the export's attribution comment. */
export function Credits({ attribution }: { attribution: Attribution | null }) {
  if (!attribution?.credits.length) return null;
  return (
    <div className="rounded-xl border border-ink/10 px-5 py-4 text-sm text-ink/75 space-y-3">
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
        {attribution.credits.map((c) => (
          <div key={c.label}>
            <dt className="text-[11px] font-bold uppercase tracking-widest text-ink/60">{c.label}</dt>
            <dd className="mt-1">
              <span className="font-semibold text-ink">{c.lines[0]}</span>
              {c.lines.length > 1 && <span className="block">{c.lines.slice(1).join(' ')}</span>}
            </dd>
          </div>
        ))}
      </dl>
      {attribution.notes.length > 0 && (
        <details className="group">
          <summary className={`${SUMMARY_RESET} inline-flex items-center gap-1 min-h-[44px] font-semibold text-ink hover:text-accent`}>
            About this project <Chevron className="w-4 h-4" />
          </summary>
          <div className="space-y-3 pt-1">
            {attribution.notes.map((n) => (
              <div key={n.label}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-ink/60">{n.label.toLowerCase().replace(/(^|[\s&])\w/g, (m) => m.toUpperCase())}</p>
                {n.text.split('\n\n').map((para, i) => (
                  <p key={i} className="mt-1">{para}</p>
                ))}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
