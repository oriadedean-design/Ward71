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

export const metadata: Metadata = {
  title: 'Lorna Antwi for Toronto City Council | Ward 7',
  description: 'Grassroots campaign for Lorna Antwi, running for Toronto City Council in Humber River-Black Creek (Ward 7).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lorna Antwi Campaign",
              "url": "https://lornaantwi.ca",
              "logo": "https://lornaantwi.ca/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "campaign@lornaantwi.ca",
                "contactType": "Campaign Support"
              }
            })
          }}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
