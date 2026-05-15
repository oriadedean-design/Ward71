'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/about', label: 'About Me' },
  { href: '/community', label: 'Community' },
  { href: '/how-to-help', label: 'How to Help' },
  { href: '/volunteer', label: 'Volunteer' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur border-b border-brand-slate/10">
      <div className="px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-fraunces text-brand-slate">
          Lorna Antwi
        </Link>

        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-brand-red transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="bg-brand-red text-white px-5 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-opacity"
          >
            Donate
          </Link>
          <button
            className="md:hidden p-2 text-brand-slate"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-brand-slate/10 bg-brand-cream px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-brand-red transition-colors"
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
