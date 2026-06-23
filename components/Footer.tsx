import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-cream py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/lornaantwi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-brand-red transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/lornaantwi_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-brand-red transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="X / Twitter"
            className="hover:text-brand-red transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-brand-red transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:votelornaantwi@gmail.com"
            aria-label="Email"
            className="hover:text-brand-red transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-brand-cream/80 text-sm max-w-sm">
          votelornaantwi@gmail.com<br />
          Authorized by the CFO for the Lorna Antwi Campaign.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link href="/about" className="hover:text-brand-red transition-colors">About</Link>
          <Link href="/our-ward" className="hover:text-brand-red transition-colors">Our Ward</Link>
          <Link href="/community" className="hover:text-brand-red transition-colors">Community</Link>
          <Link href="/resources" className="hover:text-brand-red transition-colors">Voter Resources</Link>
          <Link href="/how-to-help" className="hover:text-brand-red transition-colors">How to Help</Link>
          <Link href="/volunteer" className="hover:text-brand-red transition-colors">Volunteer</Link>
        </nav>
      </div>
    </footer>
  );
}
