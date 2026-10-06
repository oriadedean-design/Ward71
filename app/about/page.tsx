import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { getPageContent, getSiteSettings, paragraphs } from '@/lib/content';
import { urlFor } from '@/sanity/image';
import { Endorsements } from '@/components/Endorsements';
import { getEndorsements } from '@/lib/endorsements';

export const metadata: Metadata = {
  title: 'About Lorna Antwi',
  description: 'Rooted in service. Built for our community. Read about Lorna Antwi\'s story and why she is running for Toronto City Council in Humber River-Black Creek (Ward 7).',
  openGraph: {
    title: 'About Lorna Antwi | Toronto City Council Ward 7',
    description: 'Rooted in service. Built for our community. Read Lorna\'s story and why she\'s running for Ward 7.',
    url: 'https://www.lornaantwi.com/about',
  },
  alternates: { canonical: 'https://www.lornaantwi.com/about' },
};

export default async function AboutPage() {
  const [c, settings, endorsements] = await Promise.all([
    getPageContent('aboutPage'),
    getSiteSettings(),
    getEndorsements(),
  ])
  const photoUrl = settings.candidatePhoto?.asset
    ? urlFor(settings.candidatePhoto).width(600).height(800).fit('crop').url()
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Lorna Antwi",
            "jobTitle": "Political Candidate for Toronto City Council",
            "url": "https://www.lornaantwi.com",
            "description": "Running for Toronto City Council in Humber River-Black Creek (Ward 7)."
          })
        }}
      />
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">{c.hero.heading}</h1>
            <p className="text-xl md:text-3xl font-fraunces text-brand-red italic">{c.hero.tagline}</p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <FadeIn className="lg:w-1/3 sticky top-32">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              {photoUrl ? (
                <Image src={photoUrl} alt="Lorna Antwi in the community" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-slate/10 flex items-center justify-center text-brand-slate/40 text-sm p-4 text-center">
                  Upload candidate photo in Sanity Studio
                </div>
              )}
            </div>
          </FadeIn>

          <div className="lg:w-2/3 prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-6 font-medium text-brand-slate/90">
            <FadeIn>
              {paragraphs(c.story.body).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </FadeIn>

            <FadeIn className="my-10">
              <blockquote className="text-2xl md:text-3xl font-fraunces font-bold text-brand-red leading-tight border-none p-0">
                &ldquo;{c.story.quote}&rdquo;
              </blockquote>
            </FadeIn>

            <FadeIn>
              <h2 className="text-3xl font-fraunces font-bold mb-4 text-brand-slate">{c.whyRunning.heading}</h2>
              {paragraphs(c.whyRunning.body).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </FadeIn>

            <FadeIn className="mt-10 text-center">
              <blockquote className="text-2xl md:text-4xl font-fraunces font-bold text-brand-mustard leading-tight mb-8">
                &ldquo;{c.closing.quote}&rdquo;
              </blockquote>
              <Link href="/volunteer" className="bg-brand-slate text-brand-cream px-10 py-4 rounded-full font-bold text-lg inline-block hover:bg-opacity-90 transition-opacity no-underline">
                {c.closing.buttonLabel}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <Endorsements endorsements={endorsements} />
    </>
  );
}
