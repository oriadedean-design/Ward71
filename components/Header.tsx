'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/about', label: 'About Me' },
  { href: '/platform', label: 'Platform' },
  { href: '/our-ward', label: 'Our Ward' },
  { href: '/community', label: 'Community' },
  { href: '/resources', label: 'How to Vote' },
  { href: '/how-to-help', label: 'How to Help' },
  { href: '/volunteer', label: 'Volunteer' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur border-b border-ink/10">
      {/* ── Main nav row ── */}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-fraunces text-ink">
          Lorna Antwi
        </Link>

        <nav className="hidden lg:flex gap-6 items-center text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-accent transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="bg-cta text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-opacity"
          >
            Donate
          </Link>
          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile action bar — sits inside the sticky header, hidden on desktop ── */}
      <div className="lg:hidden border-t border-ink/10 bg-canvas px-4 py-2 flex gap-2">
        <Link
          href="/volunteer"
          className="flex-1 flex items-center justify-center min-h-[44px] rounded-full font-bold text-sm bg-secondary text-brand-cream dark:bg-transparent dark:border-2 dark:border-brand-mustard dark:text-brand-mustard hover:bg-opacity-90 transition-opacity"
        >
          Volunteer
        </Link>
        <Link
          href="/donate"
          className="flex-1 flex items-center justify-center min-h-[44px] rounded-full font-bold text-sm bg-brand-mustard text-on-gold hover:bg-opacity-90 transition-opacity"
        >
          Donate
        </Link>
      </div>

      {/* ── Mobile nav drawer ── */}
      {open && (
        <nav
          className="lg:hidden border-t border-ink/10 bg-canvas px-6 py-4 flex flex-col gap-1 text-sm font-medium"
          aria-label="Mobile navigation"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center min-h-[44px] hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
