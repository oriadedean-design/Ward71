import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Voter Resources for Ward 7',
  description:
    'Everything you need to vote in the 2026 Toronto municipal election in Humber River-Black Creek (Ward 7): how to register, where to vote, key dates, and what to bring.',
  alternates: { canonical: 'https://lornaantwi.ca/resources' },
  openGraph: {
    title: 'Voter Resources for Ward 7 | Lorna Antwi for Toronto City Council',
    description:
      'How to register, where to vote, key dates, and what to bring for the 2026 Toronto municipal election in Humber River-Black Creek (Ward 7).',
    url: 'https://lornaantwi.ca/resources',
  },
};

const faqs = [
  {
    question: 'Am I in Ward 7 (Humber River-Black Creek)?',
    answer:
      "Ward 7 covers the Humber River-Black Creek area of Toronto. The postal areas (FSAs) M3L, M3M, M3N, M9L, M9M and M9N fall largely within the ward and are a useful general guide, but ward boundaries do not follow postal codes exactly. Confirm your ward by entering your address in the City's ward lookup at toronto.ca/elections — the official lookup is the definitive source.",
  },
  {
    question: 'How do I register to vote?',
    answer:
      'To vote in a Toronto municipal election you must be a Canadian citizen, at least 18 years old, a resident of Toronto (or a non-resident who owns or rents property in the city), and not otherwise prohibited from voting. Use MyVote at toronto.ca/elections to check whether you are on the voters list and to add or update your information.',
  },
  {
    question: 'When can I vote?',
    answer:
      'Advance voting runs Tuesday, October 6 to Sunday, October 11, 2026, from 10:00 a.m. to 7:00 p.m. Election day is Monday, October 26, 2026, from 10:00 a.m. to 8:00 p.m. These dates are set by the City of Toronto; always confirm the current schedule at toronto.ca/elections before you make plans to vote.',
  },
  {
    question: 'Where do I vote?',
    answer:
      'Each voter is assigned a polling location based on their registered address. Find your assigned location using MyVote at toronto.ca/elections, or check the voter information card that the City mails to registered voters before the election.',
  },
  {
    question: 'What do I need to bring?',
    answer:
      'You need to show identification that includes your name and your Toronto address. The City of Toronto publishes a list of accepted documents — review the accepted ID list at toronto.ca/elections before you go so you bring something that qualifies.',
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
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <section className="bg-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">
              Voter Resources for Ward 7
            </h1>
            <p className="text-lg md:text-xl text-brand-slate/80 leading-relaxed font-medium">
              Everything you need to vote in the 2026 Toronto municipal election in Humber
              River-Black Creek (Ward 7): how to register, where to vote, key dates, and what to
              bring.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-10">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              Am I in Ward 7 (Humber River-Black Creek)?
            </h2>
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
              </a>{' '}
              — the official lookup is the definitive source.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              How do I register to vote?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              To vote in a Toronto municipal election you must be a Canadian citizen, at least 18
              years old, a resident of Toronto (or a non-resident who owns or rents property in the
              city), and not otherwise prohibited from voting. Use{' '}
              <strong className="text-brand-slate">MyVote</strong> at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>{' '}
              to check whether you are on the voters list and to add or update your information.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              When can I vote?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium mb-4">
              These dates are set by the City of Toronto. Always confirm the current schedule at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>{' '}
              before you make plans to vote.
            </p>
            <div className="bg-white rounded-2xl border border-brand-slate/10 p-6 grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-brand-slate mb-1">Advance Voting</h3>
                <p className="text-brand-slate/70 font-medium">Tuesday, October 6 – Sunday, October 11, 2026</p>
                <p className="text-sm text-brand-slate/60 mt-1">10:00 a.m. – 7:00 p.m.</p>
              </div>
              <div>
                <h3 className="font-bold text-brand-slate mb-1">Election Day</h3>
                <p className="text-brand-slate/70 font-medium">Monday, October 26, 2026</p>
                <p className="text-sm text-brand-slate/60 mt-1">10:00 a.m. – 8:00 p.m.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              Where do I vote?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              Each voter is assigned a polling location based on their registered address. Find your
              assigned location using <strong className="text-brand-slate">MyVote</strong> at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>
              , or check the voter information card that the City mails to registered voters before
              the election.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              What do I need to bring?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium">
              You need to show identification that includes your name and your Toronto address. The
              City of Toronto publishes a list of accepted documents — review the accepted ID list at{' '}
              <a
                href="https://www.toronto.ca/city-government/elections/"
                className="text-brand-red underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                toronto.ca/elections
              </a>{' '}
              before you go so you bring something that qualifies.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-3 text-brand-red">
              How can I get involved beyond voting?
            </h2>
            <p className="text-brand-slate/80 leading-relaxed font-medium mb-4">
              There are many ways to help build this campaign:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/volunteer"
                className="bg-brand-red text-white px-6 py-3 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="bg-brand-mustard text-brand-slate px-6 py-3 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Donate
              </Link>
              <Link
                href="/how-to-help"
                className="border-2 border-brand-slate text-brand-slate px-6 py-3 rounded-full font-bold text-center hover:bg-brand-slate hover:text-white transition-colors"
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
