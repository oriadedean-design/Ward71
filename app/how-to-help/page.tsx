import { Metadata } from 'next';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { ImpactMeter } from '@/components/ImpactMeter';
import { Linkified } from '@/components/Linkified';
import { getPageContent, paragraphs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How to Help',
  description: 'Three ways to make a difference for Ward 7: Donate, Volunteer, and Spread the Word. Power a grassroots movement behind Lorna Antwi for Toronto City Council.',
  openGraph: {
    title: 'How to Help | Lorna Antwi for Toronto City Council',
    description: 'Donate, volunteer, or spread the word. Every action powers our grassroots campaign in Ward 7.',
    url: 'https://www.lornaantwi.com/how-to-help',
  },
  alternates: { canonical: 'https://www.lornaantwi.com/how-to-help' },
};

// Contribution figures are edited in Sanity (Pages → How to Help). 2026 rules
// from toronto.ca/elections: $1,200 council limit; rebate 75% up to $300, then
// 50% of the amount over $300 + $225, up to $1,000.
export default async function HowToHelpPage() {
  const c = await getPageContent('howToHelpPage');

  return (
    <>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">{c.hero.heading}</h1>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <FadeIn delay={0.1} className="bg-brand-red text-white p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">{c.donateCard.heading}</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              {c.donateCard.body}
            </p>
            <Link href="/donate" className="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
              {c.donateCard.buttonLabel}
            </Link>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-brand-mustard text-brand-slate p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">{c.volunteerCard.heading}</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              {c.volunteerCard.body}
            </p>
            <Link href="/volunteer" className="bg-brand-slate text-brand-cream px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
              {c.volunteerCard.buttonLabel}
            </Link>
          </FadeIn>

          <FadeIn delay={0.3} className="bg-brand-forest text-brand-cream p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">{c.shareCard.heading}</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              {c.shareCard.body}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.lornaantwi.com"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Facebook className="w-5 h-5" /> Facebook
              </a>
              <a
                href="https://www.instagram.com/lornaantwi_/"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://www.lornaantwi.com&text=Vote+Lorna+Antwi+for+Toronto+City+Council+Ward+7"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Twitter className="w-5 h-5" /> X
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.lornaantwi.com"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <FadeIn className="md:w-1/2">
            <h2 className="text-3xl font-fraunces font-bold mb-4 text-brand-slate">{c.whyGrassroots.heading}</h2>
            <div className="prose prose-lg prose-p:leading-relaxed font-medium text-brand-slate/80">
              {paragraphs(c.whyGrassroots.body).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="md:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-brand-slate/10">
            <h2 className="text-xl font-fraunces font-bold mb-4 text-brand-red">{c.contributionUses.heading}</h2>
            <ul className="space-y-3 text-base font-medium text-brand-slate/80">
              {c.contributionUses.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* ── How do contributions work? ── */}
        <div className="max-w-4xl mx-auto mt-12">
          <FadeIn className="bg-white p-8 rounded-3xl shadow-sm border border-brand-slate/10">
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-4 text-brand-slate">
              {c.contributions.heading}
            </h2>
            <p className="text-base md:text-lg font-medium text-brand-slate/80 leading-relaxed mb-5">
              {c.contributions.intro}
            </p>
            <ul className="space-y-3 text-base font-medium text-brand-slate/80 leading-relaxed">
              {c.contributions.points.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                  <span>
                    <strong className="text-brand-slate">{point.title}</strong>{' '}
                    <Linkified text={point.body ?? ''} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-base font-medium text-brand-slate/70 leading-relaxed mt-5">
              {c.contributions.closing}
            </p>
          </FadeIn>
        </div>

        <ImpactMeter />
      </section>
    </>
  );
}
