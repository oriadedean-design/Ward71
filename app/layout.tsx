import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const OG_IMAGE = 'https://cdn.sanity.io/images/kfgyh53r/production/3279f5a4bbd66e1b50076368d2372c9980c7b90d-3696x5371.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://lornaantwi.ca'),
  title: {
    default: 'Lorna Antwi for Toronto City Council | Ward 7',
    template: '%s | Lorna Antwi for Toronto City Council',
  },
  description: 'Vote Lorna Antwi for Toronto City Council, Humber River-Black Creek (Ward 7). Affordable housing, community safety, youth opportunity, and real change for our neighbourhood.',
  keywords: [
    'Lorna Antwi', 'Toronto City Council', 'Ward 7', 'Humber River Black Creek',
    'Toronto election 2026', 'municipal election Toronto', 'affordable housing Toronto',
    'community safety Ward 7', 'Toronto councillor candidate',
  ],
  authors: [{ name: 'Lorna Antwi Campaign' }],
  creator: 'Lorna Antwi Campaign',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://lornaantwi.ca',
    siteName: 'Lorna Antwi for Toronto City Council',
    title: 'Lorna Antwi for Toronto City Council | Ward 7',
    description: 'Vote Lorna Antwi for Toronto City Council, Humber River-Black Creek (Ward 7). Affordable housing, community safety, and real change.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Lorna Antwi — Candidate for Toronto City Council Ward 7' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorna Antwi for Toronto City Council | Ward 7',
    description: 'Vote Lorna Antwi for Toronto City Council, Humber River-Black Creek (Ward 7). Affordable housing, community safety, and real change.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lornaantwi.ca',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Lorna Antwi",
                "jobTitle": "Candidate for Toronto City Council",
                "description": "Running for Toronto City Council in Humber River-Black Creek (Ward 7) in the 2026 municipal election.",
                "url": "https://lornaantwi.ca",
                "image": OG_IMAGE,
                "sameAs": [],
                "seeksOrOffer": {
                  "@type": "GovernmentService",
                  "name": "Toronto City Council — Ward 7 Humber River-Black Creek"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Lorna Antwi Campaign",
                "url": "https://lornaantwi.ca",
                "logo": OG_IMAGE,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "campaign@lornaantwi.ca",
                  "contactType": "Campaign Office"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Lorna Antwi for Toronto City Council",
                "url": "https://lornaantwi.ca"
              }
            ])
          }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
