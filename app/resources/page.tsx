import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'How to Vote in Ward 7 Humber River-Black Creek, 2026',
  description:
    'Advance voting in Ward 7 runs October 6 to 11, 2026, and Election Day is Monday, October 26. Find Ward 7 advance polling locations, your Election Day polling place, what ID to bring, and how to register.',
  alternates: { canonical: 'https://lornaantwi.ca/resources' },
  openGraph: {
    title: 'How to Vote in Ward 7 Humber River-Black Creek, 2026 | Lorna Antwi for Toronto City Council',
    description:
      'Advance voting October 6 to 11, Election Day October 26, 2026. Ward 7 advance polling locations, Election Day polling places, ID and registration.',
    url: 'https://lornaantwi.ca/resources',
  },
};

const ELECTIONS_URL = 'https://www.toronto.ca/city-government/elections/';

const ADVANCE_LOCATIONS = [
  { name: 'Domenico DiLuca Community Rec Centre', address: '25 Stanley Road' },
  { name: 'Driftwood Community Recreation Centre', address: '4401 Jane Street' },
];

// Plain-text answers for the FAQPage JSON-LD. Keep in sync with the
// visible voting section below.
const votingFaqs = [
  {
    question: 'When can I vote in Ward 7?',
    answer:
      'Advance voting runs Tuesday, October 6 to Sunday, October 11, 2026, from 10 a.m. to 7 p.m. Election Day is Monday, October 26, 2026, from 10 a.m. to 8 p.m.',
  },
  {
    question: 'Where can I vote early in Ward 7?',
    answer:
      'Any Ward 7 voter can vote at either ward-wide advance voting location: Domenico DiLuca Community Rec Centre, 25 Stanley Road, or Driftwood Community Recreation Centre, 4401 Jane Street.',
  },
  {
    question: 'Where do I vote on Election Day?',
    answer:
      'Election Day polling places are assigned by address and vary across Ward 7. Find your assigned voting place using MyVote at toronto.ca/elections, or check the voter information card mailed to you by the City of Toronto.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'Bring identification that shows your name and your Toronto address. The full list of accepted ID is at toronto.ca/elections.',
  },
  {
    question: 'Am I registered to vote?',
    answer:
      'Check or update your registration using MyVote at toronto.ca/elections. You can also register in person at the polls if you bring qualifying ID.',
  },
];

const otherFaqs = [
  {
    question: 'Am I in Ward 7 (Humber River-Black Creek)?',
    answer:
      "Ward 7 covers the Humber River-Black Creek area of Toronto. The postal areas (FSAs) M3L, M3M, M3N, M9L, M9M and M9N fall largely within the ward and are a useful general guide, but ward boundaries do not follow postal codes exactly. Confirm your ward by entering your address in the City's ward lookup at toronto.ca/elections — the official lookup is the definitive source.",
  },
  {
    question: 'How can I get involved beyond voting?',
    answer:
      'There are many ways to help. You can volunteer with the campaign, make a contribution, or explore other ways to support. Visit the Volunteer, Donate, and How to Help pages on this site to get started.',
  },
];

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
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
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
              Everything you need to vote in the 2026 Toronto municipal election in Humber
              River-Black Creek (Ward 7): how to register, where to vote, key dates, and what to
              bring.
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
        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
            <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-4">
              When can I vote in Ward 7?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-brand-slate mb-1">Advance Voting</p>
                <p className="text-brand-slate/70 font-medium">Tue, Oct 6 – Sun, Oct 11, 2026</p>
                <p className="text-sm text-brand-slate/55 mt-1">10 a.m. – 7 p.m.</p>
              </div>
              <div>
                <p className="font-bold text-brand-slate mb-1">Election Day</p>
                <p className="text-brand-slate/70 font-medium">Mon, October 26, 2026</p>
                <p className="text-sm text-brand-slate/55 mt-1">10 a.m. – 8 p.m.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
            <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-2">
              Where can I vote early in Ward 7?
            </h2>
            <p className="text-brand-slate/70 text-sm leading-relaxed mb-4">
              Any Ward 7 voter can use either ward-wide advance voting location, October 6 to 11,
              10 a.m. to 7 p.m.
            </p>
            <ul className="flex flex-col gap-3">
              {ADVANCE_LOCATIONS.map((loc) => (
                <li key={loc.name} className="rounded-xl bg-brand-cream px-4 py-3">
                  <p className="font-bold text-brand-slate leading-snug">{loc.name}</p>
                  <p className="text-sm text-brand-slate/65">{loc.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
            <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-2">
              Where do I vote on Election Day?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              Election Day polling places are assigned by address and vary across Ward 7. Find your
              assigned voting place using MyVote at{' '}
              <a
                href={ELECTIONS_URL}
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              , or check the voter information card mailed to you by the City of Toronto.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
            <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-2">
              What do I need to bring?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              Bring identification that shows your name and your Toronto address. See the full list
              of accepted ID at{' '}
              <a
                href={ELECTIONS_URL}
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              .
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-2xl border border-brand-slate/10 p-6">
            <h2 className="font-fraunces font-bold text-xl md:text-2xl text-brand-slate mb-2">
              Am I registered to vote?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              Check or update your registration using MyVote at{' '}
              <a
                href={ELECTIONS_URL}
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              . You can also register in person at the polls if you bring qualifying ID.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl border-2 border-brand-mustard bg-brand-mustard/10 p-6">
            <p className="text-brand-slate leading-relaxed font-medium">
              Lorna Antwi is running for Toronto City Council in Ward 7, Humber River-Black Creek.
              Whether you vote early or on October 26, you&apos;ll find her name on the ballot for
              City Councillor.{' '}
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
              Am I in Ward 7 (Humber River-Black Creek)?
            </h3>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              Ward 7 covers the Humber River-Black Creek area of Toronto. The postal areas (FSAs){' '}
              <strong className="text-brand-slate">M3L, M3M, M3N, M9L, M9M and M9N</strong> fall
              largely within the ward and are a useful general guide, but ward boundaries do not
              follow postal codes exactly. Confirm your ward by entering your address in the City&apos;s
              ward lookup at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              .
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-xl font-fraunces font-bold mb-2 text-brand-red">
              How can I get involved beyond voting?
            </h3>
            <p className="text-brand-slate/80 leading-relaxed font-medium mb-4">
              There are many ways to help build this campaign:
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
