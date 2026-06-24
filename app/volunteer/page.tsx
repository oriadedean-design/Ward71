'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, CalendarDays, ClipboardList, Share2, Users, CheckCircle } from 'lucide-react';

const ROLES = [
  {
    id: 'canvassing',
    title: 'Door Knocking & Canvassing',
    description: "Meet neighbours face-to-face across Ward 7 and share Lorna's message.",
    icon: MapPin,
  },
  {
    id: 'phone-banking',
    title: 'Phone Banking',
    description: 'Connect with voters by phone from wherever you are.',
    icon: Phone,
  },
  {
    id: 'events',
    title: 'Event Support & Setup',
    description: 'Help organize and run campaign events, town halls, and canvass launches.',
    icon: CalendarDays,
  },
  {
    id: 'data',
    title: 'Data Entry & Admin',
    description: 'Keep the campaign organized with accurate records and behind-the-scenes support.',
    icon: ClipboardList,
  },
  {
    id: 'social-media',
    title: 'Social Media Support',
    description: "Create content and help amplify Lorna's voice online.",
    icon: Share2,
  },
  {
    id: 'outreach',
    title: 'Community Outreach',
    description: 'Engage community organizations, attend events, and build grassroots support.',
    icon: Users,
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-3">
      {children}
    </p>
  )
}

export default function VolunteerPage() {
  const [selectedRole, setSelectedRole] = useState('')

  // Contact fields
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [postalCode, setPostalCode]   = useState('')
  const [availability, setAvailability] = useState('')

  // UI state
  const [touched, setTouched]         = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function touch(field: string) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  const errors = {
    name:         name.trim().split(/\s+/).length < 2    ? 'First and last name required.' : '',
    email:        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Valid email required.' : '',
    phone:        phone.replace(/\D/g, '').length !== 10 ? 'Valid 10-digit Canadian phone required.' : '',
    postalCode:   !postalCode.trim()                     ? 'Postal code required.' : '',
    availability: !availability.trim()                   ? 'Please share your availability.' : '',
  }

  function fieldError(field: string) {
    return touched[field] ? errors[field as keyof typeof errors] : ''
  }

  const formValid = !!selectedRole && Object.values(errors).every(e => !e)

  const inputBase =
    'w-full px-4 py-3.5 bg-white border-2 rounded-xl text-brand-slate text-sm focus:outline-none focus:ring-0 transition-colors placeholder:text-brand-slate/30'

  function inputCls(field: string) {
    return `${inputBase} ${
      fieldError(field)
        ? 'border-red-400 focus:border-red-500'
        : 'border-brand-slate/15 focus:border-brand-mustard'
    }`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, postalCode: true, availability: true })
    if (!formValid) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, postalCode, role: selectedRole, availability }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Signup failed. Please try again.')
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-cream px-5 py-14">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-brand-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-brand-forest" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-fraunces font-bold text-brand-slate mb-3">
            Thank you for joining.
          </h1>
          <p className="text-brand-slate/60 font-medium mb-10 leading-relaxed">
            Someone from the team will be in touch within 48 hours about{' '}
            <strong className="text-brand-slate">{selectedRole}</strong>.
          </p>

          <div className="bg-white rounded-2xl border border-brand-slate/8 shadow-sm p-6 text-left">
            <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-2">
              Want to also contribute?
            </h2>
            <p className="text-brand-slate/55 text-sm leading-relaxed mb-5">
              Grassroots donations fund canvassing, signs, and events. No corporate money.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/donate"
                className="flex items-center justify-center min-h-[52px] bg-brand-red text-white rounded-full font-bold hover:bg-opacity-90 transition-opacity"
              >
                Donate to the Campaign
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center min-h-[44px] text-brand-slate/45 hover:text-brand-slate text-sm font-medium transition-colors"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Main form ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-cream px-5 py-10 md:py-14">
      <div className="max-w-lg mx-auto md:max-w-2xl flex flex-col gap-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-fraunces font-bold text-brand-slate mb-2">
            Join the Team
          </h1>
          <p className="text-brand-slate/60 text-sm leading-relaxed">
            Every role matters. Pick what fits your schedule and skills — we&apos;ll take it from there.
          </p>
        </div>

        {/* ── Section 1: Role picker ── */}
        <div>
          <SectionLabel>Step 1 — Choose Your Role</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLES.map(({ id, title, description, icon: Icon }) => {
              const active = selectedRole === title
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedRole(title)}
                  className={`text-left rounded-2xl border-2 px-5 py-4 transition-all duration-150 ${
                    active
                      ? 'border-brand-red bg-brand-red/4 shadow-sm'
                      : 'border-brand-slate/10 bg-white hover:border-brand-red/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${
                        active ? 'text-brand-red' : 'text-brand-slate/35'
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className={`font-bold text-sm leading-snug ${active ? 'text-brand-red' : 'text-brand-slate'}`}>
                        {title}
                      </p>
                      <p className="text-xs text-brand-slate/50 mt-1 leading-relaxed">{description}</p>
                    </div>
                  </div>
                  {active && (
                    <div className="flex items-center gap-1.5 mt-3">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-red flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-brand-red font-semibold">Selected</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Section 2: Contact info — dimmed until role is chosen ── */}
        <div className={`transition-opacity duration-300 ${!selectedRole ? 'opacity-35 pointer-events-none select-none' : ''}`}>
          <SectionLabel>Step 2 — About You</SectionLabel>

          <div className="flex flex-col gap-4">
            {/* Full name */}
            <div>
              <label htmlFor="vol-name" className="block text-xs font-bold text-brand-slate/55 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-brand-red">*</span>
              </label>
              <input
                id="vol-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => touch('name')}
                placeholder="First and last name"
                className={inputCls('name')}
              />
              {fieldError('name') && <p className="text-red-500 text-xs mt-1.5">{fieldError('name')}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vol-email" className="block text-xs font-bold text-brand-slate/55 uppercase tracking-wider mb-1.5">
                  Email <span className="text-brand-red">*</span>
                </label>
                <input
                  id="vol-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={() => touch('email')}
                  placeholder="your@email.com"
                  className={inputCls('email')}
                />
                {fieldError('email') && <p className="text-red-500 text-xs mt-1.5">{fieldError('email')}</p>}
              </div>
              <div>
                <label htmlFor="vol-phone" className="block text-xs font-bold text-brand-slate/55 uppercase tracking-wider mb-1.5">
                  Phone <span className="text-brand-red">*</span>
                </label>
                <input
                  id="vol-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onBlur={() => touch('phone')}
                  placeholder="(416) 555-0100"
                  className={inputCls('phone')}
                />
                {fieldError('phone') && <p className="text-red-500 text-xs mt-1.5">{fieldError('phone')}</p>}
              </div>
            </div>

            {/* Postal code */}
            <div>
              <label htmlFor="vol-postal" className="block text-xs font-bold text-brand-slate/55 uppercase tracking-wider mb-1.5">
                Postal Code <span className="text-brand-red">*</span>
              </label>
              <input
                id="vol-postal"
                type="text"
                autoComplete="postal-code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value.toUpperCase())}
                onBlur={() => touch('postalCode')}
                placeholder="M3N 1A1"
                maxLength={7}
                className={`${inputCls('postalCode')} max-w-[200px]`}
              />
              {fieldError('postalCode') && <p className="text-red-500 text-xs mt-1.5">{fieldError('postalCode')}</p>}
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="vol-availability" className="block text-xs font-bold text-brand-slate/55 uppercase tracking-wider mb-1.5">
                Availability <span className="text-brand-red">*</span>
              </label>
              <textarea
                id="vol-availability"
                rows={3}
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                onBlur={() => touch('availability')}
                placeholder="e.g. Weekday evenings after 6 pm, Saturdays anytime…"
                className={`${inputCls('availability')} resize-none`}
              />
              {fieldError('availability') && <p className="text-red-500 text-xs mt-1.5">{fieldError('availability')}</p>}
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className={`transition-opacity duration-300 ${!selectedRole ? 'opacity-35 pointer-events-none select-none' : ''}`}>
          {submitError && (
            <p role="alert" className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              {submitError}
            </p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-brand-red text-white py-5 rounded-full font-bold text-base hover:bg-opacity-90 transition-opacity disabled:opacity-40"
          >
            {submitting ? 'Signing you up…' : 'Sign Me Up to Volunteer'}
          </button>
          <p className="text-[11px] text-brand-slate/30 text-center mt-3 leading-relaxed">
            Your information is only used to coordinate volunteering with the Lorna Antwi campaign.
          </p>
        </div>

      </div>
    </div>
  )
}
