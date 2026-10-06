'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { usePrefersDark } from '@/hooks/use-prefers-dark';
import {
  CONTRIBUTION_LIMITS,
  isOntarioPostalCode,
  isValidContributionAmount,
  isValidCanadianPhone,
  isValidEmail,
  isValidFullName,
} from '@/lib/compliance';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRESET_AMOUNTS = [25, 50, 100, 250]

// Reads ?amount= from the URL and calls back once on mount
function AmountPreloader({ onAmount }: { onAmount: (n: number) => void }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const raw = searchParams.get('amount')
    if (!raw) return
    const n = Number(raw)
    if (!isNaN(n) && n > 0) onAmount(n)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

// ── Toggle switch ──────────────────────────────────────────────────────────────
function Toggle({
  id,
  checked,
  onChange,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative flex-shrink-0 inline-flex h-8 w-[3.25rem] items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        checked ? 'bg-cta' : 'bg-ink/20'
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-surface shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-[1.625rem]' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// ── Compliance gate row ────────────────────────────────────────────────────────
function ComplianceGate({
  id,
  label,
  sublabel,
  checked,
  onChange,
}: {
  id: string
  label: string
  sublabel: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      className={`rounded-2xl border-2 px-5 py-4 transition-all duration-200 ${
        checked
          ? 'border-accent/25 bg-accent/4'
          : 'border-ink/10 bg-surface'
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex-1 min-w-0">
          <label htmlFor={id} className="font-bold text-ink text-sm leading-snug cursor-pointer block">
            {label}
          </label>
          <p className="text-xs text-ink/50 mt-1 leading-relaxed">{sublabel}</p>
        </div>
        <Toggle id={id} checked={checked} onChange={onChange} />
      </div>
      {checked && (
        <div className="flex items-center gap-1.5 mt-3">
          <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" aria-hidden="true" />
          <span className="text-xs text-accent font-semibold">Confirmed</span>
        </div>
      )}
    </div>
  )
}

// ── Section divider + label ────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-3">
      {children}
    </p>
  )
}

// ── PaymentForm (must live inside <Elements>) ──────────────────────────────────
function PaymentForm({ amount, fullName }: { amount: number; fullName: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/thank-you` },
    })
    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="bg-canvas border border-ink/10 rounded-2xl px-5 py-4 text-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2">
          Contributing as
        </p>
        <p className="font-bold text-ink">{fullName}</p>
        <p className="text-ink/65 mt-0.5">
          <span className="text-ink font-bold text-lg">${amount.toLocaleString()}</span>
          {' '}CAD to Lorna Antwi for Ward 7
        </p>
      </div>

      <PaymentElement />

      {error && (
        <p role="alert" className="text-red-600 dark:text-red-300 text-sm font-medium bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/40 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="bg-cta text-white py-5 rounded-full font-bold text-base hover:bg-opacity-90 transition-opacity disabled:opacity-40 w-full"
      >
        {submitting ? 'Processing…' : `Contribute $${amount.toLocaleString()} CAD`}
      </button>

      <p className="text-[11px] text-ink/35 text-center leading-relaxed">
        Secured by Stripe. Authorized by the CFO for the Lorna Antwi Campaign.
      </p>
    </form>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const prefersDark = usePrefersDark()
  // Compliance
  const [ontarioResident, setOntarioResident] = useState(false)
  const [isIndividual, setIsIndividual]       = useState(false)
  const [selfAttested, setSelfAttested]       = useState(false)

  // Amount
  const [amount, setAmount]           = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  // Donor info
  const [fullName, setFullName]           = useState('')
  const [email, setEmail]                 = useState('')
  const [phone, setPhone]                 = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity]                   = useState('Toronto')
  const [postalCode, setPostalCode]       = useState('')

  // Touch tracking (show errors only after user has visited the field)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  function touch(field: string) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  // Stripe
  const [clientSecret, setClientSecret]   = useState<string | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError]   = useState<string | null>(null)

  // Ref to latest form values — avoids stale closure in the PaymentIntent effect
  const formRef = useRef({ amount, ontarioResident, selfAttested, fullName, email, phone, streetAddress, city, postalCode })
  useEffect(() => {
    formRef.current = { amount, ontarioResident, selfAttested, fullName, email, phone, streetAddress, city, postalCode }
  })

  // ── Derived state ────────────────────────────────────────────────────────────
  const allCompliant = ontarioResident && isIndividual && selfAttested

  const amountResult = amount ? isValidContributionAmount(amount) : { valid: false, error: '' }
  const amountValid  = !!amount && amountResult.valid

  const donorErrors = {
    fullName:      !isValidFullName(fullName)       ? 'Full legal name (first and last) is required.' : '',
    email:         !isValidEmail(email)             ? 'A valid email address is required.' : '',
    phone:         !isValidCanadianPhone(phone)     ? 'A valid 10-digit Canadian phone number is required.' : '',
    streetAddress: !streetAddress.trim()            ? 'Street address is required.' : '',
    city:          !city.trim()                     ? 'City is required.' : '',
    postalCode:    !isOntarioPostalCode(postalCode) ? 'Must be a valid Ontario postal code (e.g. M3N 1A1).' : '',
  }
  const donorInfoValid = Object.values(donorErrors).every(e => !e)

  function fieldError(field: string) {
    return touched[field] ? donorErrors[field as keyof typeof donorErrors] : ''
  }

  const readyForPayment = allCompliant && amountValid && donorInfoValid

  // ── Reset PaymentIntent when amount changes ─────────────────────────────────
  useEffect(() => {
    setClientSecret(null)
    setPaymentError(null)
  }, [amount])

  // ── Reset PaymentIntent when compliance toggles off ─────────────────────────
  useEffect(() => {
    if (!allCompliant) {
      setClientSecret(null)
      setPaymentError(null)
    }
  }, [allCompliant])

  // ── Create PaymentIntent when all conditions are met ────────────────────────
  useEffect(() => {
    if (!readyForPayment || clientSecret) return

    let cancelled = false
    const vals = formRef.current

    setPaymentLoading(true)
    setPaymentError(null)

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: vals.amount,
        ontarioResident: vals.ontarioResident,
        selfAttested: vals.selfAttested,
        contributorType: 'individual',
        donor: {
          fullName: vals.fullName,
          email: vals.email,
          phone: vals.phone,
          streetAddress: vals.streetAddress,
          city: vals.city,
          province: 'ON',
          postalCode: vals.postalCode,
        },
      }),
    })
      .then(async r => {
        if (cancelled) return
        const data = await r.json()
        if (!r.ok) throw new Error(data.error ?? 'Server validation failed.')
        setClientSecret(data.clientSecret)
      })
      .catch(err => { if (!cancelled) setPaymentError(err.message) })
      .finally(() => { if (!cancelled) setPaymentLoading(false) })

    return () => { cancelled = true }
  }, [readyForPayment, clientSecret]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Shared input styles ──────────────────────────────────────────────────────
  const inputBase =
    'w-full px-4 py-3.5 bg-surface border-2 rounded-xl text-ink text-sm focus:outline-none focus:ring-0 transition-colors placeholder:text-ink/30'
  const inputCls = (field: string) =>
    `${inputBase} ${
      fieldError(field)
        ? 'border-red-400 focus:border-red-500 dark:border-red-400/70'
        : 'border-ink/15 focus:border-brand-mustard'
    }`

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-canvas px-5 py-10 md:py-14">
      <div className="max-w-lg mx-auto md:max-w-2xl flex flex-col gap-8">

        {/* Pre-fill amount from ?amount= query param (e.g. from the DonationBanner) */}
        <Suspense fallback={null}>
          <AmountPreloader
            onAmount={n => {
              setAmount(n)
              if (!PRESET_AMOUNTS.includes(n)) setCustomAmount(String(n))
            }}
          />
        </Suspense>

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-fraunces font-bold text-ink mb-2">
            Donate to the Campaign
          </h1>
          <p className="text-ink/60 text-sm leading-relaxed">
            No corporate money. Just neighbours supporting neighbours.
            All contributions must comply with Ontario&apos;s <em>Municipal Elections Act</em>.
          </p>
        </div>

        {/* ── Section 1: Compliance ── */}
        <div>
          <SectionLabel>Step 1 — Eligibility Confirmation</SectionLabel>
          <div className="flex flex-col gap-3">
            <ComplianceGate
              id="toggle-ontario"
              label="I am a resident of Ontario"
              sublabel="Toronto municipal law limits contributions to Ontario residents only. If you live outside Ontario we cannot accept your contribution."
              checked={ontarioResident}
              onChange={setOntarioResident}
            />
            <ComplianceGate
              id="toggle-individual"
              label="I am contributing as an individual"
              sublabel="Contributions from corporations, unions, and other organizations are not permitted under Ontario law."
              checked={isIndividual}
              onChange={setIsIndividual}
            />
            <ComplianceGate
              id="toggle-attest"
              label="These funds are my own"
              sublabel="I confirm the funds I am contributing belong to me, I have not received them from another person or entity for this purpose, and I am not acting on behalf of anyone else."
              checked={selfAttested}
              onChange={setSelfAttested}
            />
          </div>
          {!allCompliant && (
            <p className="text-xs text-ink/40 text-center mt-4">
              All three confirmations are required before you can contribute.{' '}
              {!ontarioResident && (
                <Link href="/how-to-help" className="underline hover:text-ink transition-colors">
                  Other ways to help →
                </Link>
              )}
            </p>
          )}
        </div>

        {/* ── Section 2: Amount ── */}
        <div className={`transition-opacity duration-300 ${!allCompliant ? 'opacity-35 pointer-events-none select-none' : ''}`}>
          <SectionLabel>Step 2 — Contribution Amount</SectionLabel>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESET_AMOUNTS.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => { setAmount(a); setCustomAmount('') }}
                className={`py-3.5 rounded-xl font-bold text-base border-2 transition-all ${
                  amount === a && !customAmount
                    ? 'border-accent bg-cta text-white shadow-sm'
                    : 'border-ink/12 bg-surface text-ink hover:border-accent/40'
                }`}
              >
                ${a}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-surface border-2 border-ink/15 rounded-xl px-4 focus-within:border-brand-mustard transition-colors mb-2">
            <span className="text-ink/40 font-bold text-sm mr-1 flex-shrink-0">$</span>
            <input
              type="number"
              min="5"
              max={CONTRIBUTION_LIMITS.individualMax}
              step="1"
              value={customAmount}
              onChange={e => {
                setCustomAmount(e.target.value)
                setAmount(e.target.value ? Number(e.target.value) : null)
              }}
              placeholder="Other amount"
              className="flex-1 py-3.5 bg-transparent focus:outline-none text-ink font-bold text-sm"
            />
          </div>
          {amount && !amountResult.valid && (
            <p className="text-red-500 dark:text-red-300 text-xs font-medium mb-2">{amountResult.error}</p>
          )}

          <div className="bg-surface border border-ink/8 rounded-xl px-5 py-4 text-xs text-ink/55 leading-relaxed space-y-1">
            <p>• Maximum individual contribution: <strong className="text-ink">${CONTRIBUTION_LIMITS.individualMax} CAD</strong></p>
            <p>• Contributions over <strong className="text-ink">${CONTRIBUTION_LIMITS.publicDisclosureThreshold}</strong> are publicly disclosed on the campaign&apos;s financial statement</p>
            <p>• Not eligible for the federal political contribution tax credit</p>
            <p>• You may be eligible for the <strong className="text-ink">City of Toronto Contribution Rebate Program</strong> — visit toronto.ca/elections</p>
          </div>
        </div>

        {/* ── Section 3: Donor Information ── */}
        <div className={`transition-opacity duration-300 ${!allCompliant ? 'opacity-35 pointer-events-none select-none' : ''}`}>
          <SectionLabel>Step 3 — Your Information</SectionLabel>
          <p className="text-xs text-ink/45 mb-4 leading-relaxed">
            Required by Ontario law for campaign finance disclosure. Kept secure and confidential.
          </p>

          <div className="flex flex-col gap-4">
            {/* Full name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                Full Legal Name <span className="text-accent">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                onBlur={() => touch('fullName')}
                placeholder="First and last name"
                className={inputCls('fullName')}
              />
              {fieldError('fullName') && (
                <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('fullName')}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={() => touch('email')}
                  placeholder="your@email.com"
                  className={inputCls('email')}
                />
                {fieldError('email') && (
                  <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('email')}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                  Phone <span className="text-accent">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onBlur={() => touch('phone')}
                  placeholder="(416) 555-0100"
                  className={inputCls('phone')}
                />
                {fieldError('phone') && (
                  <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('phone')}</p>
                )}
              </div>
            </div>

            {/* Street address */}
            <div>
              <label htmlFor="streetAddress" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                Street Address <span className="text-accent">*</span>
              </label>
              <input
                id="streetAddress"
                type="text"
                autoComplete="street-address"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
                onBlur={() => touch('streetAddress')}
                placeholder="123 Main Street"
                className={inputCls('streetAddress')}
              />
              {fieldError('streetAddress') && (
                <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('streetAddress')}</p>
              )}
            </div>

            {/* City + Province + Postal code */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label htmlFor="city" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                  City <span className="text-accent">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  onBlur={() => touch('city')}
                  className={inputCls('city')}
                />
                {fieldError('city') && (
                  <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('city')}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                  Province
                </label>
                <input
                  type="text"
                  value="Ontario"
                  readOnly
                  className={`${inputBase} border-ink/8 bg-ink/4 text-ink/40 cursor-not-allowed`}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="postalCode" className="block text-xs font-bold text-ink/55 uppercase tracking-wider mb-1.5">
                  Postal Code <span className="text-accent">*</span>
                </label>
                <input
                  id="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value.toUpperCase())}
                  onBlur={() => touch('postalCode')}
                  placeholder="M3N 1A1"
                  maxLength={7}
                  className={inputCls('postalCode')}
                />
                {fieldError('postalCode') && (
                  <p className="text-red-500 dark:text-red-300 text-xs mt-1.5">{fieldError('postalCode')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Payment — revealed dynamically ── */}
        {allCompliant && (
          <div>
            <SectionLabel>Step 4 — Payment</SectionLabel>

            {/* Waiting for amount */}
            {!amountValid && (
              <div className="rounded-2xl border-2 border-dashed border-ink/12 px-6 py-8 text-center">
                <p className="text-sm text-ink/40">Select a contribution amount above to continue.</p>
              </div>
            )}

            {/* Waiting for donor info */}
            {amountValid && !donorInfoValid && (
              <div className="rounded-2xl border-2 border-dashed border-ink/12 px-6 py-8 text-center">
                <p className="text-sm text-ink/40">Complete your information above to continue.</p>
              </div>
            )}

            {/* Loading PaymentIntent */}
            {amountValid && donorInfoValid && paymentLoading && (
              <div className="rounded-2xl border border-ink/8 bg-surface px-6 py-10 text-center">
                <div className="inline-block w-6 h-6 border-2 border-accent/30 border-t-brand-red rounded-full animate-spin mb-3" />
                <p className="text-sm text-ink/50">Preparing secure payment…</p>
              </div>
            )}

            {/* PaymentIntent error */}
            {amountValid && donorInfoValid && paymentError && !paymentLoading && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/40 rounded-2xl p-5" role="alert">
                <p className="font-bold text-red-700 dark:text-red-300 mb-1 text-sm">Unable to initialize payment</p>
                <p className="text-red-600 dark:text-red-300 text-sm">{paymentError}</p>
                <button
                  type="button"
                  onClick={() => { setClientSecret(null); setPaymentError(null) }}
                  className="mt-4 text-sm font-bold text-ink underline underline-offset-2 hover:text-accent transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Stripe payment form */}
            {amountValid && donorInfoValid && clientSecret && !paymentLoading && !paymentError && (
              <div className="bg-surface rounded-2xl border border-ink/8 shadow-sm p-6">
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    // Matches the site's light/dark mode (see app/globals.css).
                    appearance: prefersDark
                      ? {
                          theme: 'night',
                          variables: {
                            colorPrimary: '#E8B130',
                            colorBackground: '#15264A',
                            colorText: '#F4EFE6',
                            colorDanger: '#FCA5A5',
                            borderRadius: '12px',
                            fontSizeBase: '14px',
                          },
                        }
                      : {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#E05A47',
                            colorText: '#1e293b',
                            borderRadius: '12px',
                            fontSizeBase: '14px',
                          },
                        },
                  }}
                >
                  <PaymentForm amount={amount!} fullName={fullName} />
                </Elements>
              </div>
            )}
          </div>
        )}

        {/* Legal footer */}
        <p className="text-[11px] text-ink/30 text-center leading-relaxed pb-4">
          Authorized by the CFO for the Lorna Antwi Campaign. Contributions are subject to Ontario{' '}
          <em>Municipal Elections Act</em> limits and disclosure requirements.
        </p>

      </div>
    </div>
  )
}
