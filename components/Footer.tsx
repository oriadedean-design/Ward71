import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-cream py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-red transition-colors"><Facebook className="w-6 h-6" /></a>
          <a href="#" className="hover:text-brand-red transition-colors"><Twitter className="w-6 h-6" /></a>
          <a href="#" className="hover:text-brand-red transition-colors"><Linkedin className="w-6 h-6" /></a>
          <a href="mailto:contact@lornaantwi.ca" className="hover:text-brand-red transition-colors"><Mail className="w-6 h-6" /></a>
        </div>
        <p className="text-brand-cream/80 text-sm max-w-sm">
          campaign@lornaantwi.ca<br />
          Authorized by the CFO for the Lorna Antwi Campaign.
        </p>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/about" className="hover:text-brand-red transition-colors">About</Link>
          <Link href="/community" className="hover:text-brand-red transition-colors">Community</Link>
          <Link href="/how-to-help" className="hover:text-brand-red transition-colors">How to Help</Link>
          <Link href="/volunteer" className="hover:text-brand-red transition-colors">Volunteer</Link>
        </nav>
      </div>
    </footer>
  );
}
