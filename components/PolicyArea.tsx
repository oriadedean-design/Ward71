import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { OpenPolicyFromHash } from '@/components/OpenPolicyFromHash';
import { Blocks, Credits, Disclosure, Inline, Outcomes, SectionHeading, SUMMARY_RESET } from '@/components/xml/XmlRich';
import { childElements, firstChild, isSinglePolicy, textOf, type PolicyAreaSummary, type PolicyElement } from '@/lib/policies';
import type { Attribution } from '@/lib/xmlContent';

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
  evidence: 'Sources, Evidence & Case Studies',
  trustDisclosure: 'Transparency Note',
};

// Elements that are shown elsewhere (the title and themes) or are data only.
const SKIPPED = new Set(['policy_type', 'title', 'intersections']);

// Shown as closed disclosures even when the export doesn't mark them so.
const ALWAYS_DISCLOSED = new Set(['trustDisclosure']);

function PolicySection({ node, slots }: { node: PolicyElement; slots: Slots }) {
  if (SKIPPED.has(node.tag)) return null;
  const heading = node.attrs.label ?? SECTION_HEADINGS[node.tag] ?? node.tag;

  if (node.attrs.interaction === 'disclosure' || ALWAYS_DISCLOSED.has(node.tag)) {
    return (
      <Disclosure label={heading}>
        <Blocks node={node} tools={node.tag === 'tools'} />
      </Disclosure>
    );
  }
  if (node.tag === 'commitment') return <Commitment node={node} />;
  if (node.tag === 'whatYouCanDo') {
    return (
      <section className="rounded-2xl bg-surface border-2 border-brand-mustard shadow-sm px-6 py-6 space-y-4">
        <SectionHeading>What You Can Do</SectionHeading>
        <Blocks node={node} />
        {slots.whatYouCanDo}
      </section>
    );
  }

  return (
    <section>
      <SectionHeading>{heading}</SectionHeading>
      {node.tag === 'outcomes' ? <Outcomes node={node} /> : <Blocks node={node} />}
    </section>
  );
}

function Commitment({ node }: { node: PolicyElement }) {
  return (
    <div className="rounded-2xl border-l-4 border-brand-mustard bg-surface shadow-sm px-6 py-5">
      <h3 className="text-xl font-fraunces font-bold text-ink mb-2">{textOf(firstChild(node, 'heading'))}</h3>
      <Blocks node={node} />
    </div>
  );
}

function Themes({ node }: { node: PolicyElement }) {
  const themes = childElements(firstChild(node, 'intersections') ?? node, 'theme').map(textOf);
  if (themes.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Related themes">
      {themes.map((theme) => (
        <li key={theme} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-ink/15 text-ink/70">
          {theme}
        </li>
      ))}
    </ul>
  );
}

interface Slots {
  /** Shown under the page heading (e.g. a petition widget). */
  afterHeading?: ReactNode;
  /** Shown inside the plan's "What You Can Do" section. */
  whatYouCanDo?: ReactNode;
}

function Policy({ node }: { node: PolicyElement }) {
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
        <Themes node={node} />
        {childElements(node).map((child, i) => (
          <PolicySection key={i} node={child} slots={{}} />
        ))}
      </div>
    </details>
  );
}

export function PolicyArea({
  area,
  summary,
  heading,
  attribution,
  slots = {},
}: {
  area: PolicyElement;
  summary: PolicyAreaSummary;
  heading: string;
  attribution: Attribution | null;
  slots?: Slots;
}) {
  const intro = firstChild(area, 'introduction');
  const commitment = intro && firstChild(intro, 'commitment');
  const policies = childElements(area, 'policy');
  const single = isSinglePolicy(area);

  return (
    <div lang={area.attrs.lang}>
      <OpenPolicyFromHash ids={policies.map((p) => p.attrs.id).filter(Boolean)} />

      <div className="text-center mb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60 mb-3">
          <Link href="/platform" className="hover:text-accent underline-offset-2 hover:underline">Lorna&apos;s Platform</Link>
          <span aria-hidden="true" className="mx-2">›</span>
          <span aria-current="page">{summary.heading}</span>
        </nav>
        <h1 className="text-4xl md:text-6xl font-fraunces font-bold text-ink max-w-4xl mx-auto">{heading}</h1>
        <p className="mt-3 text-ink/70 font-medium">
          By Lorna Antwi, candidate for Toronto City Council, Ward 7 Humber River-Black Creek
        </p>
      </div>

      {slots.afterHeading && <div className="max-w-3xl mx-auto mb-10">{slots.afterHeading}</div>}

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
          {commitment && <Commitment node={commitment} />}
        </FadeIn>
      )}

      {single ? (
        // The whole file is one policy: show it open, as the page itself.
        <div className="max-w-3xl mx-auto space-y-8">
          <Themes node={area} />
          {childElements(area).map((child, i) => (
            <PolicySection key={i} node={child} slots={slots} />
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {policies.map((policy) => (
            <Policy key={policy.attrs.id} node={policy} />
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-10">
        <Credits attribution={attribution} />
      </div>
    </div>
  );
}
