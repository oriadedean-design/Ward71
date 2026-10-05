import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'How to Vote in Ward 7 Humber River-Black Creek, 2026',
  description:
    'Advance voting in Ward 7 runs October 6 to 11, 2026, and Election Day is Monday, October 26. Find Ward 7 advance polling locations, your Election Day polling place, what ID to bring, and how to register.',
  alternates: { canonical: 'https://www.lornaantwi.com/resources' },
  openGraph: {
    title: 'How to Vote in Ward 7 Humber River-Black Creek, 2026 | Lorna Antwi for Toronto City Council',
    description:
      'Advance voting October 6 to 11, Election Day October 26, 2026. Ward 7 advance polling locations, Election Day polling places, ID and registration.',
    url: 'https://www.lornaantwi.com/resources',
  },
};

const ELECTIONS_URL = 'https://www.toronto.ca/city-government/elections/';

const ADVANCE_LOCATIONS = [
  { name: 'Domenico DiLuca Community Rec Centre', address: '25 Stanley Road' },
  { name: 'Driftwood Community Recreation Centre', address: '4401 Jane Street' },
];

// Single source for both the visible voting section and the FAQPage JSON-LD.
// Each answer's first paragraph must fully answer the question on its own.
// "toronto.ca/elections" is linked automatically when rendered.
type Faq = { question: string; paragraphs: string[]; showLocations?: boolean };

const votingFaqs: Faq[] = [
  {
    question: 'How do I vote in the 2026 Toronto municipal election?',
    paragraphs: [
      "Make sure you're on the voters list, find out where to go, bring ID with your name and Toronto address, and vote during advance voting (October 6 to 11) or on Election Day, Monday, October 26, 2026.",
      "That's honestly all there is to it. If this is your first time voting in Toronto, or your first time voting since becoming a citizen, you belong there as much as anyone, and the election workers will walk you through it.",
    ],
  },
  {
    question: 'When is advance voting?',
    paragraphs: [
      'Advance voting in Ward 7 runs Tuesday, October 6 to Sunday, October 11, 2026.',
      "That's six days, including a full weekend. If Election Day is a work day for you, or you'd just like it done, this is your chance.",
    ],
  },
  {
    question: 'What are the voting hours?',
    paragraphs: [
      'Advance voting is open 10 a.m. to 7 p.m. each day from October 6 to 11. On Election Day, Monday, October 26, polls are open 10 a.m. to 8 p.m.',
      'The City sets these hours. If anything changes, toronto.ca/elections will have it first.',
    ],
  },
  {
    question: 'Where are the advance voting locations in Ward 7?',
    paragraphs: [
      'Ward 7 has two advance voting locations, and any Ward 7 voter can use either one:',
      "Go to whichever is easier for you to get to. You don't need an appointment.",
    ],
    showLocations: true,
  },
  {
    question: 'Where do I vote on Election Day?',
    paragraphs: [
      "On Election Day you vote at the polling place assigned to your address, which may not be one of the advance voting locations. It's printed on the voter information card the City mailed you, and you can also look it up on MyVote at toronto.ca/elections.",
      "It's worth checking the night before. It might not be where you voted last time.",
    ],
  },
  {
    question: 'What do I need to bring?',
    paragraphs: [
      'Bring ID that shows your name and your Toronto address.',
      "Lots of documents count, not just a driver's licence. Check the City's full list at toronto.ca/elections before you head out so you're not turned around at the door.",
    ],
  },
  {
    question: 'Am I registered to vote?',
    paragraphs: [
      'You can check in a couple of minutes on MyVote at toronto.ca/elections, and update your details there if anything has changed.',
      "If you're not on the list, you can still register in person when you vote, as long as you bring qualifying ID. If you've moved recently, check anyway, because your old address could send you to the wrong place.",
    ],
  },
];

const otherFaqs: Faq[] = [
  {
    question: 'Am I in Ward 7 (Humber River-Black Creek)?',
    paragraphs: [
      "If you live in Humber River-Black Creek, between Steeles and the 401 and between the Humber River and Keele, you're in Ward 7. The City's ward lookup at toronto.ca/elections will confirm it for your exact address.",
      "Postal codes starting with M3L, M3M, M3N, M9L, M9M and M9N are mostly in the ward, but boundaries don't follow postal codes exactly, so near the edges it's worth the minute to check.",
    ],
  },
  {
    question: 'How can I get involved beyond voting?',
    paragraphs: [
      "You can volunteer, chip in a contribution, or just tell your neighbours about the campaign. All of it helps, and none of it requires experience.",
    ],
  },
];

function faqText(f: Faq): string {
  const [first, ...rest] = f.paragraphs;
  const locations = f.showLocations
    ? [ADVANCE_LOCATIONS.map((l) => `${l.name}, ${l.address}`).join('; ') + '.']
    : [];
  return [first, ...locations, ...rest].join(' ');
}

const ELECTIONS_LINK_TEXT = 'toronto.ca/elections';

function Linkified({ text }: { text: string }) {
  const parts = text.split(ELECTIONS_LINK_TEXT);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <a
              href={ELECTIONS_URL}
              className="text-brand-red underline underline-offset-2 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ELECTIONS_LINK_TEXT}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [...votingFaqs, ...otherFaqs].map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: faqText(f) },
            })),
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">
              How to Vote in Ward 7
            </h1>
            <p className="text-lg md:text-xl text-brand-slate/80 leading-relaxed font-medium">
              Dates, locations, ID and registration for the 2026 Toronto municipal election in
              Humber River-Black Creek (Ward 7), in plain language. For anything official, the City
              of Toronto has the final word.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Action cards ── */}
      <section className="px-6 py-10 max-w-2xl mx-auto flex flex-col gap-5">

        {/* Card 1: Registration deadline */}
        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/45 mb-3">
                Voter Registration
              </p>
              {/* DATE PLACEHOLDER — confirm exact 2026 deadline from the City of Toronto */}
              <p className="text-3xl md:text-4xl font-fraunces font-bold text-brand-slate leading-tight">
                Deadline TBC
              </p>
              <p className="text-xs text-brand-slate/45 mt-1">
                City of Toronto · Elections Ontario
                {' '}
                <span className="bg-brand-mustard/20 text-brand-mustard font-semibold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide ml-1">
                  Confirm at toronto.ca/elections
                </span>
              </p>
            </div>
            <div className="border-t border-brand-slate/8 px-6 py-5">
              <p className="font-bold text-brand-slate text-sm mb-1">Can I still register on voting day?</p>
              <p className="text-brand-slate/70 text-sm leading-relaxed">
                Yes. In Ontario municipal elections you can register to vote in-person at your
                polling station on election day and during advance voting. Bring qualifying ID that
                shows your name and your Toronto address.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Card 2: Find your polling station */}
        <FadeIn delay={0.07}>
          <a
            href="https://www.toronto.ca/city-government/elections/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-white rounded-2xl border border-brand-slate/10 shadow-sm px-6 py-5 min-h-[72px] hover:border-brand-slate/30 hover:shadow-md transition-all"
            aria-label="Find your polling station on MyVote toronto.ca (opens in new tab)"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-fraunces font-bold text-lg text-brand-slate leading-snug">
                Find Your Polling Station
              </span>
              <span className="text-xs text-brand-slate/45">MyVote · toronto.ca/elections</span>
            </div>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="flex-shrink-0 text-brand-slate/40 group-hover:text-brand-slate/70 group-hover:translate-x-0.5 transition-all"
            />
          </a>
        </FadeIn>

        {/* Card 3: Check your voter registration — primary action, mustard border */}
        <FadeIn delay={0.14}>
          <a
            href="https://www.toronto.ca/city-government/elections/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-white rounded-2xl border-2 border-brand-mustard shadow-sm px-6 py-5 min-h-[72px] hover:shadow-md transition-shadow"
            aria-label="Check your voter registration on MyVote toronto.ca (opens in new tab)"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-fraunces font-bold text-lg text-brand-slate leading-snug">
                Check Your Voter Registration
              </span>
              <span className="text-xs text-brand-slate/45">MyVote · toronto.ca/elections</span>
            </div>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="flex-shrink-0 text-brand-mustard group-hover:translate-x-0.5 transition-transform"
            />
          </a>
        </FadeIn>

        {/* Disclaimer */}
        <FadeIn delay={0.2}>
          <p className="text-xs text-brand-slate/50 leading-relaxed px-1">
            Official information from the City of Toronto. Election Day voting places are assigned
            by address. For the most current details, visit{' '}
            <a
              href="https://www.toronto.ca/city-government/elections/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-red transition-colors"
            >
              toronto.ca/elections
            </a>
            .
          </p>
        </FadeIn>
      </section>

      {/* ── Voting information ── */}
      <section className="px-6 pb-10 max-w-2xl mx-auto flex flex-col gap-5" aria-label="Ward 7 voting information">
        {votingFaqs.map((f) => {
          const [first, ...rest] = f.paragraphs;
          return (
            <FadeIn key={f.question}>
              <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
                <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-2">
                  {f.question}
                </h2>
                <p className="text-brand-slate/80 leading-relaxed font-medium">
                  <Linkified text={first} />
                </p>
                {f.showLocations && (
                  <ul className="flex flex-col gap-3 mt-4">
                    {ADVANCE_LOCATIONS.map((loc) => (
                      <li key={loc.name} className="rounded-xl bg-brand-cream px-4 py-3">
                        <p className="font-bold text-brand-slate leading-snug">{loc.name}</p>
                        <p className="text-sm text-brand-slate/65">{loc.address}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {rest.map((para) => (
                  <p key={para} className="text-brand-slate/70 text-sm leading-relaxed mt-3">
                    <Linkified text={para} />
                  </p>
                ))}
              </div>
            </FadeIn>
          );
        })}

        <FadeIn>
          <div className="rounded-2xl border-2 border-brand-mustard bg-brand-mustard/10 p-6">
            <p className="text-brand-slate leading-relaxed font-medium">
              Lorna Antwi is running for Toronto City Council in Ward 7, Humber River-Black Creek,
              so whether you vote early or on October 26, her name will be on your ballot for City
              Councillor. She&apos;s spent years helping neighbours get through complicated systems,
              and she&apos;d like voting to be one thing that feels simple.{' '}
              <Link href="/about" className="font-bold text-brand-red underline underline-offset-2 hover:opacity-80">
                Learn more about Lorna
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Helpful Q&A ── */}
      <section className="py-4 px-6 pb-14 max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-8 text-brand-slate">
            More Questions
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-8">
          <FadeIn>
            <h3 className="text-xl font-fraunces font-bold mb-2 text-brand-red">
              {otherFaqs[0].question}
            </h3>
            {otherFaqs[0].paragraphs.map((para, i) => (
              <p key={para} className={`text-brand-slate/80 leading-relaxed font-medium ${i > 0 ? 'mt-3' : ''}`}>
                <Linkified text={para} />
              </p>
            ))}
          </FadeIn>

          <FadeIn>
            <h3 className="text-xl font-fraunces font-bold mb-2 text-brand-red">
              {otherFaqs[1].question}
            </h3>
            <p className="text-brand-slate/80 leading-relaxed font-medium mb-4">
              {otherFaqs[1].paragraphs[0]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/volunteer"
                className="flex items-center justify-center min-h-[48px] bg-brand-red text-white px-6 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="flex items-center justify-center min-h-[48px] bg-brand-mustard text-brand-slate px-6 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Donate
              </Link>
              <Link
                href="/how-to-help"
                className="flex items-center justify-center min-h-[48px] border-2 border-brand-slate text-brand-slate px-6 rounded-full font-bold text-center hover:bg-brand-slate hover:text-white transition-colors"
              >
                How to Help
              </Link>
            </div>
          </FadeIn>

          <FadeIn>
            <p className="text-sm text-brand-slate/60 leading-relaxed border-t border-brand-slate/10 pt-8">
              For official election information, always refer to the City of Toronto Elections office
              at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="underline underline-offset-2 hover:text-brand-red"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              . This page is provided by the Lorna Antwi campaign as a convenience and is not an
              official election resource.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
