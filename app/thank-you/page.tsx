import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { getPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Thank You | Lorna Antwi Campaign',
  description: 'Thank you for supporting Lorna Antwi.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function ThankYouPage() {
  const c = await getPageContent('thankYouPage');

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center text-center">
      <FadeIn>
        <div className="w-24 h-24 bg-brand-forest/10 text-brand-forest rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-fraunces font-bold mb-6 text-brand-slate">{c.heading}</h1>
        <p className="text-3xl font-fraunces text-brand-red mb-10 italic">{c.tagline}</p>
        
        <p className="text-xl font-medium text-brand-slate/80 leading-relaxed max-w-2xl mx-auto mb-16">
          {c.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/volunteer" className="bg-brand-mustard text-brand-slate px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity">
            {c.buttons.volunteer}
          </Link>
          <Link href="/how-to-help" className="border-2 border-brand-slate text-brand-slate px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-slate hover:text-white transition-colors">
            {c.buttons.share}
          </Link>
          <Link href="/" className="bg-brand-cream text-brand-slate px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-slate/5 transition-colors">
            {c.buttons.home}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
