import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { Linkified } from '@/components/Linkified';
import { getPageContent, paragraphs } from '@/lib/content';

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

type Content = Awaited<ReturnType<typeof getPageContent<'resourcesPage'>>>;

// Plain-text version of each answer for the FAQPage JSON-LD, matching what the
// page shows (including the advance locations where they're listed).
function faqText(answer: string, locations?: Content['advanceLocations']): string {
  const [first, ...rest] = paragraphs(answer);
  const locationText = locations
    ? [locations.map((l) => `${l.name}, ${l.address}`).join('; ') + '.']
    : [];
  return [first, ...locationText, ...rest].filter(Boolean).join(' ');
}

export default async function ResourcesPage() {
  const c = await getPageContent('resourcesPage');
  const questions = c.votingQuestions.filter((q) => q?.question && q?.answer);
  const faqs = [
    ...questions.map((q) => ({
      question: q.question,
      text: faqText(q.answer, q.showAdvanceLocations ? c.advanceLocations : undefined),
    })),
    { question: c.moreQuestions.wardQuestion, text: faqText(c.moreQuestions.wardAnswer) },
    { question: c.moreQuestions.involvedQuestion, text: faqText(c.moreQuestions.involvedAnswer) },
  ];

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
              acceptedAnswer: { '@type': 'Answer', text: f.text },
            })),
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-canvas py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-ink">
              {c.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed font-medium">
              {c.hero.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Action cards ── */}
      <section className="px-6 py-10 max-w-2xl mx-auto flex flex-col gap-5">

        {/* Card 1: Registration deadline */}
        <FadeIn>
          <div className="bg-surface rounded-2xl border border-ink/10 shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink/45 mb-3">
                {c.registrationCard.label}
              </p>
              <p className="text-3xl md:text-4xl font-fraunces font-bold text-ink leading-tight">
                {c.registrationCard.deadline}
              </p>
              <p className="text-xs text-ink/45 mt-1">
                {c.registrationCard.source}
                {' '}
                <span className="bg-brand-mustard/20 text-brand-mustard font-semibold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide ml-1">
                  {c.registrationCard.badge}
                </span>
              </p>
            </div>
            <div className="border-t border-ink/8 px-6 py-5">
              <p className="font-bold text-ink text-sm mb-1">{c.registrationCard.question}</p>
              <p className="text-ink/70 text-sm leading-relaxed">
                {c.registrationCard.answer}
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
            className="group flex items-center justify-between gap-4 bg-surface rounded-2xl border border-ink/10 shadow-sm px-6 py-5 min-h-[72px] hover:border-ink/30 hover:shadow-md transition-all"
            aria-label="Find your polling station on MyVote toronto.ca (opens in new tab)"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-fraunces font-bold text-lg text-ink leading-snug">
                {c.actionCards.pollingStationLabel}
              </span>
              <span className="text-xs text-ink/45">MyVote · toronto.ca/elections</span>
            </div>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="flex-shrink-0 text-ink/40 group-hover:text-ink/70 group-hover:translate-x-0.5 transition-all"
            />
          </a>
        </FadeIn>

        {/* Card 3: Check your voter registration — primary action, mustard border */}
        <FadeIn delay={0.14}>
          <a
            href="https://www.toronto.ca/city-government/elections/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-surface rounded-2xl border-2 border-brand-mustard shadow-sm px-6 py-5 min-h-[72px] hover:shadow-md transition-shadow"
            aria-label="Check your voter registration on MyVote toronto.ca (opens in new tab)"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-fraunces font-bold text-lg text-ink leading-snug">
                {c.actionCards.registrationLabel}
              </span>
              <span className="text-xs text-ink/45">MyVote · toronto.ca/elections</span>
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
          <p className="text-xs text-ink/50 leading-relaxed px-1">
            <Linkified
              text={c.actionCards.disclaimer}
              linkClassName="underline underline-offset-2 hover:text-accent transition-colors"
            />
          </p>
        </FadeIn>
      </section>

      {/* ── Voting information ── */}
      <section className="px-6 pb-10 max-w-2xl mx-auto flex flex-col gap-5" aria-label="Ward 7 voting information">
        {questions.map((f) => {
          const [first, ...rest] = paragraphs(f.answer);
          return (
            <FadeIn key={f.question}>
              <div className="bg-surface rounded-2xl border border-ink/10 p-6">
                <h2 className="font-fraunces font-bold text-xl md:text-2xl text-ink mb-2">
                  {f.question}
                </h2>
                <p className="text-ink/80 leading-relaxed font-medium">
                  <Linkified text={first ?? ''} />
                </p>
                {f.showAdvanceLocations && (
                  <ul className="flex flex-col gap-3 mt-4">
                    {c.advanceLocations.map((loc) => (
                      <li key={loc.name} className="rounded-xl bg-canvas px-4 py-3">
                        <p className="font-bold text-ink leading-snug">{loc.name}</p>
                        <p className="text-sm text-ink/65">{loc.address}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {rest.map((para) => (
                  <p key={para} className="text-ink/70 text-sm leading-relaxed mt-3">
                    <Linkified text={para} />
                  </p>
                ))}
              </div>
            </FadeIn>
          );
        })}

        <FadeIn>
          <div className="rounded-2xl border-2 border-brand-mustard bg-brand-mustard/10 p-6">
            <p className="text-ink leading-relaxed font-medium">
              {c.candidateNote.body}{' '}
              <Link href="/about" className="font-bold text-accent underline underline-offset-2 hover:opacity-80">
                {c.candidateNote.linkText}
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Helpful Q&A ── */}
      <section className="py-4 px-6 pb-14 max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-8 text-ink">
            {c.moreQuestions.heading}
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-8">
          <FadeIn>
            <h3 className="text-xl font-fraunces font-bold mb-2 text-accent">
              {c.moreQuestions.wardQuestion}
            </h3>
            {paragraphs(c.moreQuestions.wardAnswer).map((para, i) => (
              <p key={para} className={`text-ink/80 leading-relaxed font-medium ${i > 0 ? 'mt-3' : ''}`}>
                <Linkified text={para} />
              </p>
            ))}
          </FadeIn>

          <FadeIn>
            <h3 className="text-xl font-fraunces font-bold mb-2 text-accent">
              {c.moreQuestions.involvedQuestion}
            </h3>
            <p className="text-ink/80 leading-relaxed font-medium mb-4">
              {c.moreQuestions.involvedAnswer}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/volunteer"
                className="flex items-center justify-center min-h-[48px] bg-cta text-white px-6 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="flex items-center justify-center min-h-[48px] bg-brand-mustard text-on-gold px-6 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity"
              >
                Donate
              </Link>
              <Link
                href="/how-to-help"
                className="flex items-center justify-center min-h-[48px] border-2 border-secondary text-secondary px-6 rounded-full font-bold text-center hover:bg-secondary hover:text-white dark:hover:text-on-gold transition-colors"
              >
                How to Help
              </Link>
            </div>
          </FadeIn>

          <FadeIn>
            <p className="text-sm text-ink/60 leading-relaxed border-t border-ink/10 pt-8">
              <Linkified
                text={c.finalDisclaimer}
                linkClassName="underline underline-offset-2 hover:text-accent"
              />
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
