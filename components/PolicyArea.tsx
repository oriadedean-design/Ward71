import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { OpenPolicyFromHash } from '@/components/OpenPolicyFromHash';
import {
  childElements,
  firstChild,
  isElement,
  textOf,
  type PolicyElement,
  type PolicyNode,
} from '@/lib/policies';

// Renders one policy export (content/policies/*.xml), following the notes in
// the export: the introduction is always visible; each policy is a closed
// disclosure that can be linked to by its id; stakeholders and the proposed
// action show as soon as a policy opens; outcomes, sources and tools are
// collapsed until clicked. Native <details> gives keyboard, touch and
// screen-reader support with no JavaScript.

const LINK_CLASS = 'text-accent underline underline-offset-2 hover:opacity-80';

// Headings for sections that don't carry their own label attribute.
const SECTION_HEADINGS: Record<string, string> = {
  stakeholders: 'Stakeholders',
  outcomes: 'Outcomes',
  proposedAction: 'Proposed Action',
  ward7Actions: 'Ward 7 Action',
  participation: 'Community Participation',
  thoughtExperiment: 'Thought Experiment',
};

// Elements that are shown elsewhere (the title and themes) or are data only.
const SKIPPED = new Set(['policy_type', 'title', 'intersections']);

// Shared chevron that turns when its <details> opens.
function Chevron({ className = '' }: { className?: string }) {
  return (
    <ChevronDown
      size={20}
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform group-open:rotate-180 ${className}`}
    />
  );
}

const SUMMARY_RESET = 'list-none [&::-webkit-details-marker]:hidden cursor-pointer';

/** Sentence-level content: text, bold and links. */
function Inline({ nodes }: { nodes: PolicyNode[] }) {
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
 * Tool entries start with an action word ("USE", "EXPAND", "MODIFY"). It's
 * shown as a small label in front of the rest of the line.
 */
function ToolParagraph({ node }: { node: PolicyElement }) {
  const [first, ...rest] = node.children;
  const match = first && !isElement(first) ? first.text.match(/^\s*([A-Z]{3,})\s+([\s\S]*)$/) : null;
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

/** Paragraphs and bullet lists, in the order they appear. */
function Blocks({ node, tools = false }: { node: PolicyElement; tools?: boolean }) {
  return (
    <div className="space-y-3 text-ink/80 leading-relaxed">
      {childElements(node).map((child, i) => {
        if (child.tag === 'heading') return null; // shown by the parent
        if (child.tag === 'paragraph') {
          return tools ? <ToolParagraph key={i} node={child} /> : <p key={i}><Inline nodes={child.children} /></p>;
        }
        if (child.tag === 'list' || child.tag === 'items') {
          return (
            <ul key={i} className="list-disc pl-6 space-y-1.5 marker:text-accent">
              {childElements(child, 'item').map((item, j) => (
                <li key={j}><Inline nodes={item.children} /></li>
              ))}
            </ul>
          );
        }
        return <Blocks key={i} node={child} />;
      })}
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h4 className="font-jakarta text-xs font-bold uppercase tracking-widest text-ink/60 mb-3">{children}</h4>;
}

/** Outcome categories: bold bullets that open to show their items. */
function Outcomes({ node }: { node: PolicyElement }) {
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

/** Sources and Tools: a bordered disclosure, closed by default. */
function Disclosure({ node }: { node: PolicyElement }) {
  const tools = node.tag === 'tools';
  return (
    <details className="group rounded-xl border border-ink/10 bg-canvas/60">
      <summary className={`${SUMMARY_RESET} flex items-center justify-between gap-4 min-h-[48px] px-4 py-3 font-bold text-ink hover:bg-ink/5 rounded-xl`}>
        <span>{node.attrs.label}</span>
        <Chevron className="text-ink/50" />
      </summary>
      <div className="px-4 pb-4 pt-1 text-[15px]">
        <Blocks node={node} tools={tools} />
      </div>
    </details>
  );
}

function PolicySection({ node }: { node: PolicyElement }) {
  if (SKIPPED.has(node.tag)) return null;
  if (node.attrs.interaction === 'disclosure') return <Disclosure node={node} />;

  const heading = node.attrs.label ?? SECTION_HEADINGS[node.tag] ?? node.tag;
  return (
    <section>
      <SectionHeading>{heading}</SectionHeading>
      {node.tag === 'outcomes' ? <Outcomes node={node} /> : <Blocks node={node} />}
    </section>
  );
}

function Policy({ node }: { node: PolicyElement }) {
  const themes = childElements(firstChild(node, 'intersections') ?? node, 'theme').map(textOf);
  return (
    <details id={node.attrs.id} className="group/policy scroll-mt-40 bg-surface rounded-2xl border border-ink/10 shadow-sm open:shadow-md transition-shadow">
      <summary className={`${SUMMARY_RESET} flex items-center justify-between gap-4 px-5 md:px-7 py-5 rounded-2xl hover:bg-ink/[0.03]`}>
        <h3 className="text-xl md:text-2xl font-fraunces font-bold text-ink leading-snug">{textOf(firstChild(node, 'title'))}</h3>
        <ChevronDown
          size={24}
          aria-hidden="true"
          className="flex-shrink-0 text-accent transition-transform group-open/policy:rotate-180"
        />
      </summary>
      <div className="px-5 md:px-7 pb-7 pt-5 border-t border-ink/10 space-y-7">
        {themes.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Related themes">
            {themes.map((theme) => (
              <li key={theme} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-ink/15 text-ink/70">
                {theme}
              </li>
            ))}
          </ul>
        )}
        {childElements(node).map((child, i) => (
          <PolicySection key={i} node={child} />
        ))}
      </div>
    </details>
  );
}

export function PolicyArea({ area, heading }: { area: PolicyElement; heading: string }) {
  const intro = firstChild(area, 'introduction');
  const commitment = intro && firstChild(intro, 'commitment');
  const policies = childElements(area, 'policy');

  return (
    <div lang={area.attrs.lang}>
      <OpenPolicyFromHash ids={policies.map((p) => p.attrs.id).filter(Boolean)} />

      <FadeIn className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Policy</p>
        <h2 className="text-3xl md:text-5xl font-fraunces font-bold text-ink">{heading}</h2>
      </FadeIn>

      {intro && (
        <FadeIn className="max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-fraunces font-bold text-ink mb-5">
            {textOf(firstChild(intro, 'heading'))}
          </h3>
          <ul className="space-y-4 mb-8">
            {childElements(intro, 'point').map((point, i) => (
              <li key={i} className="flex gap-3 text-ink/80 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span><Inline nodes={point.children} /></span>
              </li>
            ))}
          </ul>
          {commitment && (
            <div className="rounded-2xl border-l-4 border-brand-mustard bg-surface shadow-sm px-6 py-5">
              <h3 className="text-xl font-fraunces font-bold text-ink mb-2">{textOf(firstChild(commitment, 'heading'))}</h3>
              <Blocks node={commitment} />
            </div>
          )}
        </FadeIn>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {policies.map((policy) => (
          <Policy key={policy.attrs.id} node={policy} />
        ))}
      </div>
    </div>
  );
}
