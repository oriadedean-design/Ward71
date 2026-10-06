import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { ImpactMeter } from '@/components/ImpactMeter';
import { SubscribeForm } from '@/components/SubscribeForm';
import { Endorsements } from '@/components/Endorsements';
import { getEndorsements } from '@/lib/endorsements';
import { getPageContent, getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Lorna Antwi for Toronto City Council | Ward 7',
  description: 'Vote Lorna Antwi for Toronto City Council, Humber River-Black Creek (Ward 7). Affordable housing, community safety, youth opportunity, and real change for our neighbourhood.',
  alternates: { canonical: 'https://www.lornaantwi.com' },
  openGraph: {
    title: 'Lorna Antwi for Toronto City Council | Ward 7',
    description: 'Stronger Together. Real change for Humber River-Black Creek. Join our grassroots campaign.',
    url: 'https://www.lornaantwi.com',
  },
};
import { urlFor } from '@/sanity/image';

export default async function Home() {
  const [c, settings, endorsements] = await Promise.all([
    getPageContent('homePage'),
    getSiteSettings(),
    getEndorsements(),
  ])
  const photoUrl = settings.candidatePhoto?.asset
    ? urlFor(settings.candidatePhoto).width(800).height(1000).fit('crop').url()
    : null

  const candidateImage =
    photoUrl ??
    'https://cdn.sanity.io/images/kfgyh53r/production/3279f5a4bbd66e1b50076368d2372c9980c7b90d-3696x5371.jpg'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://www.lornaantwi.com/#lorna",
                "name": "Lorna Antwi",
                "jobTitle": "Candidate for Toronto City Council, Ward 7 (Humber River-Black Creek)",
                "description": "Counsellor with Toronto Shelter & Support Services and community advocate running for Toronto City Council in Humber River-Black Creek (Ward 7).",
                "url": "https://www.lornaantwi.com",
                "image": candidateImage,
                "alumniOf": ["Brookview Middle School", "Seneca Polytechnic"],
                "homeLocation": {
                  "@type": "Place",
                  "name": "Humber River-Black Creek, Toronto, Ontario"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://www.lornaantwi.com/#campaign",
                "name": "Lorna Antwi for Toronto City Council",
                "url": "https://www.lornaantwi.com",
                "logo": candidateImage,
                "founder": { "@id": "https://www.lornaantwi.com/#lorna" },
                "areaServed": "Humber River-Black Creek (Ward 7), Toronto, Ontario"
              }
            ]
          })
        }}
      />
      <section className="px-6 py-10 md:py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="contents md:flex md:flex-col md:w-1/2">
          <FadeIn className="order-1 md:order-none w-full">
            <h1 className="text-4xl md:text-6xl font-bold font-fraunces leading-tight mb-4">
              {c.hero.headingStart} <span className="text-brand-red">{c.hero.headingHighlight}</span> {c.hero.headingEnd}
            </h1>
          </FadeIn>
          <FadeIn className="order-3 md:order-none w-full">
            <p className="text-lg md:text-xl text-brand-slate/80 mb-4 leading-relaxed font-medium">
              {c.hero.intro}
            </p>
            <p className="text-base md:text-lg text-brand-slate/70 mb-8 leading-relaxed font-semibold">
              {c.hero.subIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donate" className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
                {c.hero.primaryButton}
              </Link>
              <Link href="/volunteer" className="border-2 border-brand-slate text-brand-slate px-8 py-4 rounded-full font-bold text-center hover:bg-brand-slate hover:text-white transition-colors">
                {c.hero.secondaryButton}
              </Link>
            </div>
          </FadeIn>
        </div>
        <FadeIn className="order-2 md:order-none w-full md:w-1/2 flex justify-center">
          <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            {photoUrl ? (
              <Image src={photoUrl} alt={settings.candidatePhoto?.alt || 'Lorna Antwi'} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-brand-slate/10 flex items-center justify-center text-brand-slate/40 text-sm">
                Upload candidate photo in Sanity Studio
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* ── How to vote callout ── */}
      <section className="px-6 pb-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="rounded-2xl border-2 border-brand-mustard bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-1">
              <h2 className="font-fraunces font-bold text-2xl md:text-3xl text-brand-slate mb-2">
                <Link href="/resources" className="hover:text-brand-red transition-colors">
                  {c.votingCallout.heading}
                </Link>
              </h2>
              <p className="text-brand-slate/75 font-medium leading-relaxed">
                {c.votingCallout.body}
              </p>
            </div>
            <Link
              href="/resources"
              className="flex items-center justify-center min-h-[48px] bg-brand-slate text-white px-6 py-3 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity md:flex-shrink-0"
            >
              {c.votingCallout.buttonLabel}
            </Link>
          </div>
        </FadeIn>
      </section>

      <Endorsements endorsements={endorsements} />

      {/* ── Donation strip ── */}
      <section className="bg-brand-slate text-brand-cream py-10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-fraunces font-bold text-2xl md:text-3xl mb-1">
              {c.donationStrip.heading}
            </h2>
            <p className="text-brand-cream/50 text-sm mb-7">
              {c.donationStrip.subheading}
            </p>

            {/* Preset amounts */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[25, 50, 100, 250].map(a => (
                <Link
                  key={a}
                  href={`/donate?amount=${a}`}
                  className="py-4 rounded-xl font-bold text-lg border-2 border-white/15 bg-white/8 hover:bg-brand-mustard hover:text-brand-slate hover:border-brand-mustard transition-all"
                >
                  ${a}
                </Link>
              ))}
            </div>

            {/* Custom amount — plain GET form navigates to /donate?amount=X */}
            <form action="/donate" method="GET" className="flex gap-2">
              <div className="flex-1 flex items-center bg-white/10 border border-white/15 rounded-full px-5 focus-within:border-brand-mustard transition-colors">
                <span className="text-brand-cream/40 font-bold mr-1 flex-shrink-0">$</span>
                <input
                  type="number"
                  name="amount"
                  min="5"
                  max="1200"
                  step="1"
                  placeholder="Other amount"
                  className="flex-1 bg-transparent py-3.5 text-brand-cream text-sm font-bold focus:outline-none placeholder:text-brand-cream/30"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-red text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-opacity-90 transition-opacity flex-shrink-0"
              >
                Donate →
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ── Social channels ── */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-slate/40 mb-6">
            {c.social.label}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={settings.social.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-brand-slate/10 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-[#1877F2]/30 transition-all min-h-[72px]"
            >
              <Facebook className="w-8 h-8 flex-shrink-0 text-[#1877F2]" aria-hidden="true" />
              <div>
                <p className="font-fraunces font-bold text-brand-slate text-lg leading-snug group-hover:text-[#1877F2] transition-colors">Facebook</p>
                <p className="text-xs text-brand-slate/45">{settings.social.facebookName}</p>
              </div>
            </a>
            <a
              href={settings.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-brand-slate/10 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-brand-red/30 transition-all min-h-[72px]"
            >
              <Instagram className="w-8 h-8 flex-shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="font-fraunces font-bold text-brand-slate text-lg leading-snug group-hover:text-brand-red transition-colors">Instagram</p>
                <p className="text-xs text-brand-slate/45">{settings.social.instagramHandle}</p>
              </div>
            </a>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="group flex items-center gap-5 bg-white border border-brand-slate/10 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-brand-mustard/40 transition-all min-h-[72px]"
            >
              <Mail className="w-8 h-8 flex-shrink-0 text-brand-mustard" aria-hidden="true" />
              <div>
                <p className="font-fraunces font-bold text-brand-slate text-lg leading-snug group-hover:text-brand-mustard transition-colors">Email Us</p>
                <p className="text-xs text-brand-slate/45">{settings.contactEmail}</p>
              </div>
            </a>
          </div>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-4">{c.subscribe.heading}</h2>
            <p className="text-lg md:text-xl text-brand-mustard mb-8 font-bold">
              {c.subscribe.subheading}
            </p>
            <SubscribeForm />

            <div className="mt-8 text-left bg-brand-cream/10 p-6 rounded-2xl border border-brand-cream/20">
              <h3 className="text-xl font-bold font-fraunces mb-4 border-b border-brand-cream/20 pb-3">{c.votingTimeline.heading}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-brand-mustard mb-1">{c.votingTimeline.advanceLabel}</h4>
                  <p className="font-medium">{c.votingTimeline.advanceDates}</p>
                  <p className="text-sm opacity-80 mt-1">{c.votingTimeline.advanceHours}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-mustard mb-1">{c.votingTimeline.electionLabel}</h4>
                  <p className="font-medium">{c.votingTimeline.electionDate}</p>
                  <p className="text-sm opacity-80 mt-1">{c.votingTimeline.electionHours}</p>
                </div>
              </div>
              <Link
                href="/resources"
                className="inline-block mt-5 font-bold text-brand-mustard underline underline-offset-2 hover:opacity-80"
              >
                {c.votingTimeline.linkText}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-8 text-center">{c.priorities.heading}</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.priorities.items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-slate/5 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-fraunces font-bold mb-3">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed">{item.description}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <ImpactMeter />

      <section className="bg-brand-slate text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-6">{c.closingCta.heading}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-brand-mustard text-brand-slate px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity">
              {c.closingCta.primaryButton}
            </Link>
            <Link href="/volunteer" className="border-2 border-brand-cream text-brand-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-cream hover:text-brand-slate transition-colors">
              {c.closingCta.secondaryButton}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
