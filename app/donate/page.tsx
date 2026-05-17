'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  CONTRIBUTION_LIMITS,
  CANADIAN_PROVINCES,
  isOntarioPostalCode,
  isValidContributionAmount,
  isValidCanadianPhone,
  isValidEmail,
  isValidFullName,
} from '@/lib/compliance';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const STEP_NAMES = [
  'Ontario Residency',
  'Contributor Type',
  'Self-Attestation',
  'Contribution Amount',
  'Donor Information',
  'Payment',
];

interface FormState {
  province: string;
  ontarioResident: boolean;
  contributorType: '' | 'individual' | 'corporation' | 'union';
  selfAttestation1: boolean;
  selfAttestation2: boolean;
  amount: number | null;
  customAmount: string;
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
}

const initial: FormState = {
  province: 'ON',
  ontarioResident: false,
  contributorType: '',
  selfAttestation1: false,
  selfAttestation2: false,
  amount: null,
  customAmount: '',
  fullName: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: 'Toronto',
  postalCode: '',
};

// ── Shared UI helpers ──────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-bold text-brand-red uppercase tracking-wider mb-2">
        Step {step} of {STEP_NAMES.length}: {STEP_NAMES[step - 1]}
      </p>
      <div className="w-full bg-brand-slate/10 rounded-full h-2 overflow-hidden">
        <div
          className="bg-brand-red h-2 rounded-full transition-all duration-500"
          style={{ width: `${(step / STEP_NAMES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="text-red-600 text-sm mt-1 font-medium">
      {error}
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 font-bold text-brand-slate text-sm">
      {children}
      {required && <span className="text-brand-red ml-1" aria-label="required">*</span>}
    </label>
  );
}

function NavButtons({
  step, onBack, onNext, nextLabel = 'Continue', nextDisabled = false,
}: {
  step: number; onBack?: () => void; onNext: () => void;
  nextLabel?: string; nextDisabled?: boolean;
}) {
  return (
    <div className={`flex gap-4 mt-8 ${step > 1 ? 'flex-row' : ''}`}>
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-brand-slate text-brand-slate px-6 py-4 rounded-full font-bold hover:bg-brand-slate hover:text-white transition-colors"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 bg-brand-red text-white px-6 py-4 rounded-full font-bold hover:bg-opacity-90 transition-opacity disabled:opacity-40"
      >
        {nextLabel}
      </button>
    </div>
  );
}

function EligibilityBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-cream border border-brand-slate/20 rounded-2xl p-6 mt-6" role="alert">
      {children}
    </div>
  );
}

// ── Step 6 inner: must live inside <Elements> ──────────────────────

function PaymentForm({ amount, donorName, onBack }: { amount: number; donorName: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.');
      setSubmitting(false);
    }
    // On success Stripe redirects — no further action needed here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="bg-brand-cream/60 border border-brand-slate/10 rounded-2xl p-5 text-sm">
        <p className="font-bold text-brand-slate mb-1">{donorName}</p>
        <p className="text-brand-slate/70">Contributing <strong className="text-brand-slate">${amount.toLocaleString()} CAD</strong> to Lorna Antwi</p>
      </div>

      <PaymentElement />

      {error && (
        <p role="alert" className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="bg-brand-red text-white py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity disabled:opacity-40 w-full"
        >
          {submitting ? 'Processing…' : `Contribute $${amount.toLocaleString()} to Lorna Antwi`}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-brand-slate text-brand-slate px-6 py-4 rounded-full font-bold hover:bg-brand-slate hover:text-white transition-colors w-full"
        >
          ← Back
        </button>
      </div>
    </form>
  );
}

// ── Main page ──────────────────────────────────────────────────────

export default function DonatePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const goTo = (next: number) => {
    setStep(next);
    setErrors({});
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const back = () => {
    if (step === 6) {
      setClientSecret(null);
      setPaymentError(null);
    }
    goTo(step - 1);
  };

  // Create PaymentIntent when user reaches step 6
  useEffect(() => {
    if (step !== 6) return;
    setPaymentLoading(true);
    setPaymentError(null);

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: form.amount,
        ontarioResident: form.ontarioResident,
        selfAttested: form.selfAttestation1 && form.selfAttestation2,
        contributorType: form.contributorType,
        donor: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          streetAddress: form.streetAddress,
          city: form.city,
          province: form.province,
          postalCode: form.postalCode,
        },
      }),
    })
      .then(async r => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? 'Server validation failed');
        setClientSecret(data.clientSecret);
      })
      .catch(err => setPaymentError(err.message))
      .finally(() => setPaymentLoading(false));
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Step validation ────────────────────────────────────────────

  const validateStep1 = () => {
    if (!form.ontarioResident) {
      setErrors({ ontarioResident: 'Please confirm your Ontario residency to continue.' });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!form.selfAttestation1 || !form.selfAttestation2) {
      setErrors({ attestation: 'Please confirm both statements to continue.' });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    const amt = form.amount;
    if (!amt || amt <= 0) {
      setErrors({ amount: 'Please select or enter a contribution amount.' });
      return false;
    }
    const check = isValidContributionAmount(amt);
    if (!check.valid) {
      setErrors({ amount: check.error! });
      return false;
    }
    return true;
  };

  const validateStep5 = () => {
    const e: Record<string, string> = {};
    if (!isValidFullName(form.fullName)) e.fullName = 'Please enter your full legal name (first and last name).';
    if (!isValidEmail(form.email)) e.email = 'Please enter a valid email address.';
    if (!isValidCanadianPhone(form.phone)) e.phone = 'Please enter a valid 10-digit Canadian phone number.';
    if (!form.streetAddress.trim()) e.streetAddress = 'Street address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    if (!isOntarioPostalCode(form.postalCode)) {
      e.postalCode = 'This postal code is not in Ontario. Please verify your address or return to Step 1 if you live outside Ontario.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-4 bg-white border-2 rounded-xl text-brand-slate focus:outline-none focus:ring-0 transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-brand-slate/20 focus:border-brand-mustard'
    }`;

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto min-h-[70vh]" ref={topRef}>
      <h1 className="text-3xl md:text-4xl font-fraunces font-bold text-brand-slate mb-2">
        Donate to the Campaign
      </h1>
      <p className="text-brand-slate/70 font-medium mb-8">
        No corporate money. Just neighbours.
      </p>

      <ProgressBar step={step} />

      {/* ── STEP 1: Ontario Residency ── */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-6">
            Ontario Residency Confirmation
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="province" required>Province or Territory</Label>
              <select
                id="province"
                value={form.province}
                onChange={e => update('province', e.target.value)}
                className="w-full px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard"
              >
                {CANADIAN_PROVINCES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {form.province !== 'ON' ? (
              <EligibilityBlock>
                <p className="font-bold text-brand-slate mb-3">We can't accept your contribution</p>
                <p className="text-brand-slate/80 text-sm leading-relaxed mb-4">
                  Toronto municipal election rules require that all contributions come from Ontario residents.
                  If you live outside Ontario, we appreciate your support but cannot accept your contribution.
                  You can still help by sharing Lorna's campaign with friends and family in Toronto.
                </p>
                <Link
                  href="/how-to-help"
                  className="inline-block bg-brand-slate text-brand-cream px-6 py-3 rounded-full font-bold text-sm hover:bg-opacity-90 transition-opacity"
                >
                  Share Lorna's campaign
                </Link>
              </EligibilityBlock>
            ) : (
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="ontarioResident"
                    checked={form.ontarioResident}
                    onChange={e => update('ontarioResident', e.target.checked)}
                    aria-required="true"
                    aria-describedby={errors.ontarioResident ? 'ontarioResident-error' : undefined}
                    className="mt-1 w-5 h-5 accent-brand-red flex-shrink-0"
                  />
                  <label htmlFor="ontarioResident" className="text-brand-slate font-medium text-sm leading-relaxed cursor-pointer">
                    I confirm that I am a resident of Ontario.
                  </label>
                </div>
                <FieldError id="ontarioResident-error" error={errors.ontarioResident} />
              </div>
            )}
          </div>

          {form.province === 'ON' && (
            <NavButtons step={1} onNext={() => { if (validateStep1()) goTo(2); }} />
          )}
        </div>
      )}

      {/* ── STEP 2: Contributor Type ── */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-2">
            Contributor Type
          </h2>
          <p className="text-brand-slate/70 text-sm mb-6">
            Toronto municipal campaign law only permits contributions from individual donors.
          </p>

          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">Select your contributor type</legend>
            {[
              { value: 'individual', label: 'I am an individual donor' },
              { value: 'corporation', label: 'I am donating on behalf of a corporation' },
              { value: 'union', label: 'I am donating on behalf of a union or association' },
            ].map(opt => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  form.contributorType === opt.value
                    ? 'border-brand-red bg-brand-red/5'
                    : 'border-brand-slate/15 hover:border-brand-slate/40'
                }`}
              >
                <input
                  type="radio"
                  name="contributorType"
                  value={opt.value}
                  checked={form.contributorType === opt.value}
                  onChange={() => update('contributorType', opt.value as FormState['contributorType'])}
                  className="accent-brand-red"
                />
                <span className="font-medium text-brand-slate">{opt.label}</span>
              </label>
            ))}
          </fieldset>

          {(form.contributorType === 'corporation' || form.contributorType === 'union') && (
            <EligibilityBlock>
              <p className="font-bold text-brand-slate mb-2">We can't accept this contribution</p>
              <p className="text-brand-slate/80 text-sm leading-relaxed">
                Toronto municipal election rules only permit contributions from individual donors.
                Contributions from corporations, unions, and other entities are not permitted.
                Thank you for your interest in supporting the campaign.
              </p>
            </EligibilityBlock>
          )}

          {form.contributorType === 'individual' && (
            <NavButtons step={2} onBack={back} onNext={() => goTo(3)} />
          )}
          {form.contributorType === '' && (
            <NavButtons step={2} onBack={back} onNext={() => goTo(3)} nextDisabled />
          )}
          {(form.contributorType === 'corporation' || form.contributorType === 'union') && (
            <div className="mt-8">
              <button
                type="button"
                onClick={back}
                className="w-full border-2 border-brand-slate text-brand-slate px-6 py-4 rounded-full font-bold hover:bg-brand-slate hover:text-white transition-colors"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── STEP 3: Self-Attestation ── */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-2">
            Self-Attestation
          </h2>
          <p className="text-brand-slate/70 text-sm mb-6">
            Ontario law requires that all contributors confirm the following statements.
          </p>

          <div className="flex flex-col gap-5">
            {[
              {
                id: 'attest1',
                key: 'selfAttestation1' as const,
                text: 'I confirm that the funds I am contributing belong to me and that I have not received them from any other person or entity for the purpose of making this contribution.',
              },
              {
                id: 'attest2',
                key: 'selfAttestation2' as const,
                text: 'I confirm that I am not contributing on behalf of anyone else, and that I am not being reimbursed for this contribution by any other person or entity.',
              },
            ].map(item => (
              <div key={item.id} className="flex items-start gap-3 p-4 border border-brand-slate/10 rounded-xl bg-brand-cream/30">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={form[item.key]}
                  onChange={e => update(item.key, e.target.checked)}
                  aria-required="true"
                  aria-describedby={errors.attestation ? 'attestation-error' : undefined}
                  className="mt-1 w-5 h-5 accent-brand-red flex-shrink-0"
                />
                <label htmlFor={item.id} className="text-brand-slate/80 text-sm leading-relaxed cursor-pointer font-medium">
                  {item.text}
                </label>
              </div>
            ))}

            <FieldError id="attestation-error" error={errors.attestation} />
          </div>

          <NavButtons step={3} onBack={back} onNext={() => { if (validateStep3()) goTo(4); }} />
        </div>
      )}

      {/* ── STEP 4: Contribution Amount ── */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-6">
            Contribution Amount
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[25, 50, 100, 250].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => { update('amount', amt); update('customAmount', ''); }}
                className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                  form.amount === amt && !form.customAmount
                    ? 'border-brand-red bg-brand-red/10 text-brand-red'
                    : 'border-brand-slate/15 hover:border-brand-red/40 text-brand-slate'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <div className="mb-2">
            <Label htmlFor="customAmount">Custom amount</Label>
            <div className="flex items-center border-2 border-brand-slate/20 rounded-xl px-4 focus-within:border-brand-mustard bg-white">
              <span className="text-brand-slate/60 font-bold text-lg">$</span>
              <input
                id="customAmount"
                type="number"
                min="5"
                max={CONTRIBUTION_LIMITS.individualMax}
                step="1"
                value={form.customAmount}
                onChange={e => {
                  const val = e.target.value;
                  update('customAmount', val);
                  update('amount', val ? Number(val) : null);
                }}
                placeholder="Enter amount"
                aria-describedby={errors.amount ? 'amount-error' : undefined}
                className="flex-1 px-2 py-4 bg-transparent focus:outline-none text-lg font-bold text-brand-slate"
              />
            </div>
          </div>
          <FieldError id="amount-error" error={errors.amount} />

          {/* Legal disclosure box */}
          <div className="mt-6 bg-brand-cream border border-brand-slate/20 rounded-2xl p-5">
            <p className="font-bold text-brand-slate text-sm mb-3">Important information about your contribution:</p>
            <ul className="text-brand-slate/75 text-sm space-y-2 leading-relaxed">
              <li>• The maximum individual contribution to a single Toronto council candidate is <strong>${CONTRIBUTION_LIMITS.individualMax}</strong> for this election cycle.</li>
              <li>• Contributions over <strong>${CONTRIBUTION_LIMITS.publicDisclosureThreshold}</strong> will be publicly disclosed on the campaign's financial statement filed with the City of Toronto.</li>
              <li>• Toronto municipal campaign contributions are <strong>NOT</strong> eligible for the federal political contribution tax credit.</li>
              <li>• Toronto residents may be eligible for the City of Toronto's Contribution Rebate Program. Visit <strong>toronto.ca/elections</strong> to learn more.</li>
              <li>• A receipt will be issued for contributions over <strong>${CONTRIBUTION_LIMITS.receiptThreshold}</strong>.</li>
            </ul>
          </div>

          <NavButtons step={4} onBack={back} onNext={() => { if (validateStep4()) goTo(5); }} />
        </div>
      )}

      {/* ── STEP 5: Donor Information ── */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-2">
            Donor Information
          </h2>
          <p className="text-brand-slate/70 text-sm mb-6">
            Required by Ontario law. Your information is kept secure and confidential.
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="fullName" required>Full legal name</Label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={e => update('fullName', e.target.value)}
                aria-required="true"
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                className={inputClass('fullName')}
                placeholder="First and last name"
              />
              <FieldError id="fullName-error" error={errors.fullName} />
            </div>

            <div>
              <Label htmlFor="email" required>Email address</Label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClass('email')}
                placeholder="your@email.com"
              />
              <FieldError id="email-error" error={errors.email} />
            </div>

            <div>
              <Label htmlFor="phone" required>Phone number</Label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClass('phone')}
                placeholder="(416) 555-0100"
              />
              <FieldError id="phone-error" error={errors.phone} />
            </div>

            <div>
              <Label htmlFor="streetAddress" required>Street address</Label>
              <input
                id="streetAddress"
                type="text"
                autoComplete="street-address"
                value={form.streetAddress}
                onChange={e => update('streetAddress', e.target.value)}
                aria-required="true"
                aria-describedby={errors.streetAddress ? 'streetAddress-error' : undefined}
                className={inputClass('streetAddress')}
                placeholder="123 Main Street"
              />
              <FieldError id="streetAddress-error" error={errors.streetAddress} />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city" required>City</Label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  aria-required="true"
                  aria-describedby={errors.city ? 'city-error' : undefined}
                  className={inputClass('city')}
                />
                <FieldError id="city-error" error={errors.city} />
              </div>
              <div>
                <Label htmlFor="province-step5" required>Province</Label>
                <input
                  id="province-step5"
                  type="text"
                  value="Ontario"
                  readOnly
                  className="w-full px-5 py-4 bg-brand-slate/5 border-2 border-brand-slate/10 rounded-xl text-brand-slate/60 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="postalCode" required>Postal code</Label>
                <input
                  id="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  value={form.postalCode}
                  onChange={e => update('postalCode', e.target.value.toUpperCase())}
                  aria-required="true"
                  aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                  className={inputClass('postalCode')}
                  placeholder="M3N 1A1"
                  maxLength={7}
                />
                <p className="text-xs text-brand-slate/50 mt-1">Must start with K, L, M, N, or P (Ontario)</p>
                <FieldError id="postalCode-error" error={errors.postalCode} />
              </div>
              <div>
                <Label htmlFor="country" required>Country</Label>
                <input
                  id="country"
                  type="text"
                  value="Canada"
                  readOnly
                  className="w-full px-5 py-4 bg-brand-slate/5 border-2 border-brand-slate/10 rounded-xl text-brand-slate/60 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Confirmation summary */}
          {!Object.values(errors).some(Boolean) && (
            <div className="mt-6 bg-brand-cream border border-brand-slate/10 rounded-2xl p-5 text-sm">
              <p className="font-bold text-brand-slate mb-2">Your contribution so far</p>
              <ul className="text-brand-slate/70 space-y-1">
                <li>Amount: <strong>${form.amount?.toLocaleString()} CAD</strong></li>
                <li>Ontario resident: <strong>Confirmed</strong></li>
                <li>Individual donor: <strong>Confirmed</strong></li>
                <li>Self-attestation: <strong>Confirmed</strong></li>
              </ul>
            </div>
          )}

          <NavButtons step={5} onBack={back} onNext={() => { if (validateStep5()) goTo(6); }} nextLabel="Continue to Payment" />
        </div>
      )}

      {/* ── STEP 6: Payment ── */}
      {step === 6 && (
        <div>
          <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-6">
            Payment
          </h2>

          {paymentLoading && (
            <div className="text-center py-12 text-brand-slate/60 font-medium">
              Preparing payment…
            </div>
          )}

          {paymentError && !paymentLoading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5" role="alert">
              <p className="font-bold text-red-700 mb-2">Unable to initialize payment</p>
              <p className="text-red-600 text-sm">{paymentError}</p>
              <button
                type="button"
                onClick={back}
                className="mt-4 border-2 border-brand-slate text-brand-slate px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-slate hover:text-white transition-colors"
              >
                ← Go Back
              </button>
            </div>
          )}

          {!paymentLoading && !paymentError && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: { colorPrimary: '#c0392b', borderRadius: '12px' },
                },
              }}
            >
              <PaymentForm
                amount={form.amount!}
                donorName={form.fullName}
                onBack={back}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
}
