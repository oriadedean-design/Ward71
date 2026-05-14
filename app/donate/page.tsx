'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';

export default function DonatePage() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  
  // Entire form disabled state per requirements until CFO registered
  const isSetup = false;

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-[70vh]">
      {!isSetup && (
        <FadeIn className="bg-brand-mustard text-brand-slate p-4 rounded-xl font-bold text-center mb-12 shadow-sm">
          Donations are not yet live. We're finalizing campaign registration. Check back soon, or contact us to support the campaign directly.
        </FadeIn>
      )}

      <div className="text-center mb-12">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-fraunces font-bold mb-4 text-brand-slate">Power a grassroots campaign.</h1>
          <p className="text-xl font-medium text-brand-slate/80">Our goal is $25,000. No corporate money. Just neighbours.</p>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-slate/10 relative ${!isSetup ? 'opacity-50 pointer-events-none grayscale-[20%]' : ''}`}>
          
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-brand-slate">Select Amount</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[25, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                    amount === amt 
                      ? 'border-brand-red bg-brand-red/10 text-brand-red' 
                      : 'border-brand-slate/10 hover:border-brand-red/50 text-brand-slate'
                  }`}
                >
                  ${amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount('custom')}
                className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                  amount === 'custom' 
                    ? 'border-brand-red bg-brand-red/10 text-brand-red' 
                    : 'border-brand-slate/10 hover:border-brand-red/50 text-brand-slate'
                }`}
              >
                Custom
              </button>
            </div>
            
            {amount === 'custom' && (
              <div className="mt-4 flex items-center bg-brand-cream/50 rounded-xl px-5 border border-brand-slate/10 focus-within:ring-2 focus-within:ring-brand-mustard">
                <span className="text-xl font-bold text-brand-slate/60">$</span>
                <input 
                  type="number" 
                  min="5" 
                  step="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="px-3 py-4 bg-transparent focus:outline-none text-xl font-bold text-brand-slate w-full"
                />
              </div>
            )}
          </div>

          <form className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="firstName">First name</label>
                <input id="firstName" type="text" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard border border-transparent" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="lastName">Last name</label>
                <input id="lastName" type="text" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard border border-transparent" required />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="email">Email</label>
              <input id="email" type="email" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard border border-transparent" required />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="address">Street address</label>
              <input id="address" type="text" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard border border-transparent" required />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="postal">Postal code</label>
              <input id="postal" type="text" placeholder="Must start with K, L, M, N, or P" pattern="^[KLMNPklmnp].*" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard border border-transparent" maxLength={7} required />
              <p className="text-sm mt-2 font-medium text-brand-slate/60">Ontario residency required for municipal campaigns.</p>
            </div>

            <div className="bg-brand-cream/50 p-6 rounded-xl mt-4 border border-brand-slate/10 flex gap-4 items-start">
              <input type="checkbox" id="confirm" className="mt-1 w-5 h-5 accent-brand-mustard" required />
              <label htmlFor="confirm" className="font-medium text-brand-slate text-sm leading-relaxed">
                I confirm that I am an Ontario resident, I am contributing my own personal funds, and I have not exceeded the contribution limit for this election cycle.
              </label>
            </div>

            <button type="submit" disabled={!isSetup} className="bg-brand-red text-white py-5 mt-4 rounded-full font-bold text-xl hover:bg-opacity-90 transition-opacity w-full text-center disabled:opacity-50">
              Continue to Stripe
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}
