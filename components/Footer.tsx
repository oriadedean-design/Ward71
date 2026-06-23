import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/our-ward',    label: 'Our Ward' },
  { href: '/community',   label: 'Community' },
  { href: '/resources',   label: 'Voter Resources' },
  { href: '/how-to-help', label: 'How to Help' },
  { href: '/volunteer',   label: 'Volunteer' },
  { href: '/donate',      label: 'Donate' },
];

const socialLinks = [
  {
    href: 'https://www.facebook.com/lornaantwi',
    label: 'Facebook',
    icon: Facebook,
    external: true,
  },
  {
    href: 'https://www.instagram.com/lornaantwi_/',
    label: 'Instagram',
    icon: Instagram,
    external: true,
  },
  {
    href: '#',
    label: 'X / Twitter',
    icon: Twitter,
    external: false,
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: Linkedin,
    external: false,
  },
  {
    href: 'mailto:votelornaantwi@gmail.com',
    label: 'Email',
    icon: Mail,
    external: false,
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-cream py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">

        {/* Candidate name */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold font-fraunces text-brand-cream hover:text-brand-mustard transition-colors"
          >
            Lorna Antwi
          </Link>
          <p className="text-brand-cream/50 text-sm mt-1">
            Candidate for Toronto City Council, Ward 7
          </p>
        </div>

        {/* Social icons — comfortable tap targets on mobile */}
        <div className="flex gap-2">
          {socialLinks.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:text-brand-red transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Nav links — 2-col grid on mobile, horizontal row on desktop */}
        <nav
          aria-label="Footer navigation"
          className="w-full max-w-xs grid grid-cols-2 gap-x-4 gap-y-1 md:max-w-none md:flex md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-2 text-sm font-medium"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center min-h-[44px] md:min-h-0 text-brand-cream/70 hover:text-brand-red transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact / legal */}
        <p className="text-brand-cream/55 text-sm max-w-sm leading-relaxed">
          votelornaantwi@gmail.com
          <br />
          Authorized by the CFO for the Lorna Antwi Campaign.
        </p>
      </div>
    </footer>
  );
}
