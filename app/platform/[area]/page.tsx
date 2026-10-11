import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/FadeIn';
import { PolicyArea } from '@/components/PolicyArea';
import { getPolicyArea, listPolicyAreas } from '@/lib/policies';

// One page per policy export: content/policies/housing.xml → /platform/housing.

const BASE = 'https://www.lornaantwi.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return listPolicyAreas().map((a) => ({ area: a.slug }));
}

function findArea(slug: string) {
  return listPolicyAreas().find((a) => a.slug === slug);
}

const pageHeading = (heading: string) => `Lorna's ${heading} Plan for Ward 7`;

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const summary = findArea((await params).area);
  if (!summary) return {};
  const url = `${BASE}/platform/${summary.slug}`;
  const title = `${summary.heading} Plan for Ward 7`;
  return {
    title,
    description: summary.searchDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `Lorna Antwi's ${summary.heading} Plan for Ward 7 Humber River-Black Creek`,
      description: summary.searchDescription,
      url,
      type: 'article',
    },
  };
}

export default async function PolicyAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const slug = (await params).area;
  const summary = findArea(slug);
  const area = getPolicyArea(slug);
  if (!summary || !area) notFound();

  const url = `${BASE}/platform/${summary.slug}`;
  const heading = pageHeading(summary.heading);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: heading,
              description: summary.searchDescription,
              url,
              inLanguage: 'en-CA',
              author: { '@id': `${BASE}/#lorna` },
              publisher: { '@type': 'Organization', name: 'Lorna Antwi Campaign', url: BASE },
              about: [summary.heading, 'Toronto Ward 7 Humber River-Black Creek', '2026 Toronto municipal election'],
              hasPart: summary.policies.map((p) => ({
                '@type': 'WebPageElement',
                name: p.title,
                url: `${url}#${p.id}`,
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
                { '@type': 'ListItem', position: 2, name: "Lorna's Platform", item: `${BASE}/platform` },
                { '@type': 'ListItem', position: 3, name: summary.heading, item: url },
              ],
            },
          ]),
        }}
      />

      <section className="py-12 px-6">
        <PolicyArea area={area} summary={summary} heading={heading} />
      </section>

      <section className="bg-band text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-6">Help make it happen.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-brand-mustard text-on-gold px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity">
              Donate
            </Link>
            <Link href="/platform" className="border-2 border-brand-cream text-brand-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-cream hover:text-on-gold transition-colors">
              See the full platform
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
