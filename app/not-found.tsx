import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'How to vote in Ward 7' },
  { href: '/about', label: 'About Lorna' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/donate', label: 'Donate' },
];

export default function NotFound() {
  return (
    <section className="px-6 py-24 max-w-2xl mx-auto min-h-[60vh] flex flex-col justify-center text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-slate/40 mb-3">404</p>
      <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-brand-slate mb-4">
        We couldn&apos;t find that page.
      </h1>
      <p className="text-lg text-brand-slate/70 font-medium leading-relaxed mb-10">
        The link may be old or mistyped. Here are the places most people are looking for:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="min-h-[44px] flex items-center px-5 rounded-full border-2 border-brand-slate/15 bg-white font-bold text-brand-slate hover:border-brand-red hover:text-brand-red transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
