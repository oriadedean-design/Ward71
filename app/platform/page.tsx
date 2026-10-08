import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { PlatformGrid } from '@/components/PlatformGrid';
import { getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: "Lorna Antwi's Platform for Ward 7",
  description:
    "Lorna Antwi's platform for Toronto City Council, Ward 7 Humber River-Black Creek: affordable housing, community safety, youth opportunity, food security, and more.",
  alternates: { canonical: 'https://www.lornaantwi.com/platform' },
  openGraph: {
    title: "Lorna Antwi's Platform for Ward 7 | Lorna Antwi for Toronto City Council",
    description:
      'The priorities Lorna Antwi will bring to City Hall for Humber River-Black Creek.',
    url: 'https://www.lornaantwi.com/platform',
  },
};

export default async function PlatformPage() {
  const [page, home] = await Promise.all([getPageContent('platformPage'), getPageContent('homePage')]);

  return (
    <>
      <section className="bg-canvas py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-ink">{page.hero.heading}</h1>
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed font-medium">{page.hero.intro}</p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-14 px-6 max-w-7xl mx-auto">
        <PlatformGrid items={home.priorities.items} />
      </section>

      <section className="bg-band text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-6">{page.closing.heading}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-brand-mustard text-on-gold px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity">
              {page.closing.primaryButton}
            </Link>
            <Link href="/volunteer" className="border-2 border-brand-cream text-brand-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-cream hover:text-on-gold transition-colors">
              {page.closing.secondaryButton}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
