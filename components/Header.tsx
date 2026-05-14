import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur border-b border-brand-slate/10 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold font-fraunces text-brand-slate">
        Lorna Antwi
      </Link>
      <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
        <Link href="/about" className="hover:text-brand-red transition-colors">About Me</Link>
        <Link href="/community" className="hover:text-brand-red transition-colors">Community</Link>
        <Link href="/how-to-help" className="hover:text-brand-red transition-colors">How to Help</Link>
        <Link href="/volunteer" className="hover:text-brand-red transition-colors">Volunteer</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/donate" className="bg-brand-red text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-opacity">
          Donate
        </Link>
      </div>
    </header>
  );
}
