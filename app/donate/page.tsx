'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/FadeIn';

export default function DonatePage() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  
  // Entire form disabled state per requirements until CFO registered
  const isSetup = true;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Minimum check
    const finalAmount = amount === 'custom' ? Number(customAmount) : amount;
    if (finalAmount < 5) {
      alert('Minimum donation amount is $5.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          metadata: {
            donation_type: 'individual_contribution',
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-[70vh]">
      {!isSetup && (
        <FadeIn className="bg-brand-mustard text-brand-slate p-4 rounded-xl font-bold text-center mb-12 shadow-sm">
          Donations are not yet live. We're finalizing campaign registration. Check back soon, or contact us to support the campaign directly.
        </FadeIn>
      )}

      <div className="text-center mb-12">
        <FadeIn>
          <div className="flex justify-center mb-6">
            <Image 
              src="/2F92F584-3B85-476F-B8C1-E8B9BC14051D.jpeg"
              alt="Lorna Antwi"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover shadow-xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
          </div>
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Form structure preserved */}
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

            <div className="bg-brand-cream/50 p-6 rounded-xl mt-4 border border-brand-slate/10 flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <input type="checkbox" id="confirm-individual" className="mt-1 w-5 h-5 accent-brand-mustard" required />
                <label htmlFor="confirm-individual" className="font-medium text-brand-slate text-sm leading-relaxed">
                  I am donating as an individual and not on behalf of a corporation or union.
                </label>
              </div>
              <div className="flex gap-4 items-start">
                <input type="checkbox" id="confirm-funds" className="mt-1 w-5 h-5 accent-brand-mustard" required />
                <label htmlFor="confirm-funds" className="font-medium text-brand-slate text-sm leading-relaxed">
                  I confirm that I am an Ontario resident, I am contributing my own personal funds, and this donation will not exceed the $1,200 limit to this candidate or the $5,000 limit across all candidates.
                </label>
              </div>
              <div className="flex gap-4 items-start pb-2 border-b border-brand-slate/10">
                 <p className="text-sm font-medium text-brand-slate/60 ml-9">
                   Notice: Contributions over $100.00 will have the donor's full name and residential address made public on the City of Toronto’s website in the candidate's financial statement.
                 </p>
              </div>
            </div>

            <button type="submit" disabled={!isSetup || isSubmitting} className="bg-brand-red text-white py-5 mt-4 rounded-full font-bold text-xl hover:bg-opacity-90 transition-opacity w-full text-center disabled:opacity-50">
              {isSubmitting ? 'Processing...' : 'Continue to Stripe'}
            </button>
          </form>
        </div>
      </FadeIn>
      
      <FadeIn delay={0.2} className="mt-16 bg-brand-slate text-brand-cream p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-fraunces font-bold mb-8">Donation Rules & Rebates</h2>
        <div className="space-y-8">
           <div>
             <h3 className="text-xl font-bold font-fraunces text-brand-mustard mb-2">Do I have to live in Ward 7?</h3>
             <p className="text-brand-cream/90 font-medium leading-relaxed">No, you do not need to live in Ward 7 to donate, but you must be "normally resident" in Ontario. (While anyone in Ontario can donate, only people who live in or own/tenant property in Ward 7 can vote in the ward).</p>
           </div>
           
           <div>
             <h3 className="text-xl font-bold font-fraunces text-brand-mustard mb-2">Are there limits on how much I can give?</h3>
             <p className="text-brand-cream/90 font-medium leading-relaxed">Yes. The limit is <strong>$1,200</strong> to a single Councillor candidate and a maximum of <strong>$5,000</strong> total across all Toronto council/school board candidates.</p>
           </div>

           <div>
             <h3 className="text-xl font-bold font-fraunces text-brand-mustard mb-2">Who can't donate?</h3>
             <p className="text-brand-cream/90 font-medium leading-relaxed">Corporations and Trade Unions are strictly banned from donating to municipal candidates in Ontario. You must donate your own personal funds (no pooling money from others).</p>
           </div>
           
           <div className="bg-brand-cream/10 p-6 rounded-xl border border-brand-cream/20 mt-6">
             <h3 className="text-2xl font-bold font-fraunces text-white mb-2">Toronto Contribution Rebate Program</h3>
             <p className="text-brand-cream/90 font-medium leading-relaxed mb-4">Toronto offers a generous rebate program for Ontario residents to encourage local donations. The candidate will be registered for this program.</p>
             <ul className="list-disc pl-5 font-medium text-brand-cream/90 space-y-2">
                <li>Example: Donate <strong>$100</strong>, get a <strong>$75</strong> rebate! (Actual cost: $25)</li>
                <li>Cash contributions over $25 cannot be accepted (they must leave a paper trail like credit card).</li>
             </ul>
           </div>
        </div>
      </FadeIn>
    </section>
  );
}
