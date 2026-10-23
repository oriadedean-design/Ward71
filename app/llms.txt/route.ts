import { listPolicyAreas } from '@/lib/policies';

// A plain-text guide to the site for AI assistants (llmstxt.org).

const BASE = 'https://www.lornaantwi.com';

export const dynamic = 'force-static';

export function GET() {
  const plans = listPolicyAreas()
    .map((a) =>
      [
        `- [${a.title ?? `${a.heading} plan`}](${BASE}/platform/${a.slug}): ${a.description}`,
        ...a.policies.map((p) => `  - [${p.title}](${BASE}/platform/${a.slug}#${p.id})`),
      ].join('\n')
    )
    .join('\n');

  const body = `# Lorna Antwi for Toronto City Council, Ward 7

> Lorna Antwi is a candidate for Toronto City Council in Ward 7, Humber River-Black Creek, in the 2026 Toronto municipal election (Election Day: Monday, October 26, 2026). This is her official campaign website.

## Platform

- [Petition: Restore Safe, Accessible Local Transit Along Finch West Before Winter](${BASE}/TTCpetition): a community petition to the TTC Board, organized by Lorna Antwi, asking for the 36 Finch West local bus service (or equivalent) to be restored alongside Line 6. Signing closes October 26, 2026, and the petition then goes to the TTC.
- [Lorna's Platform for Ward 7](${BASE}/platform): all of Lorna's priorities for City Hall, in brief.
${plans}

## About the candidate and the ward

- [About Lorna](${BASE}/about): her background and why she is running.
- [Our Ward](${BASE}/our-ward): Ward 7 Humber River-Black Creek neighbourhoods and how to tell which ward you live in.

## Voting and getting involved

- [How to vote in Ward 7](${BASE}/resources): voting dates, locations, ID and registration.
- [How to help](${BASE}/how-to-help): donating, volunteering and how campaign contributions work.
- [Volunteer](${BASE}/volunteer)
- [Donate](${BASE}/donate)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
