'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export default function VolunteerPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      title: "Door Knocking and Canvassing",
      desc: "Go door-to-door to speak with residents, share campaign materials, and listen to community concerns. This is how we build real relationships."
    },
    {
      title: "Phone Banking",
      desc: "Help call community members to share campaign updates, gather feedback, and encourage participation in events and voting."
    },
    {
      title: "Event Support and Setup",
      desc: "Help organize and run community events. Set up venues, welcome guests, and manage sign-ins."
    },
    {
      title: "Data Entry and Admin",
      desc: "Help input and organize community feedback, volunteer information, and outreach data to keep the campaign running smoothly."
    },
    {
      title: "Community Outreach",
      desc: "Distribute flyers, share campaign messaging, and support outreach in local neighbourhoods."
    },
    {
      title: "Social Media Support",
      desc: "Help share updates, create posts, and amplify the campaign online."
    }
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally we would POST to an API route here using Formspree or Resend
    // For now, simulate submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(3);
  };

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto min-h-[70vh]">
      {step === 1 && (
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-fraunces font-bold mb-6 text-brand-slate">Join the Team.</h1>
            <p className="text-2xl font-medium text-brand-slate/80">Every role matters. Find where you fit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
              <button 
                key={idx}
                onClick={() => handleRoleSelect(role.title)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-brand-slate/10 hover:shadow-xl hover:-translate-y-1 hover:border-brand-mustard transition-all text-left flex flex-col h-full group"
              >
                <h2 className="text-2xl font-fraunces font-bold mb-4 text-brand-slate group-hover:text-brand-red transition-colors">{role.title}</h2>
                <p className="text-brand-slate/80 leading-relaxed font-medium">{role.desc}</p>
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {step === 2 && (
        <FadeIn className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <button 
              onClick={() => setStep(1)} 
              className="text-brand-slate/60 hover:text-brand-red font-medium mb-8 inline-block"
            >
              &larr; Back to roles
            </button>
            <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-6 text-brand-slate">Sign up to volunteer</h1>
            <p className="text-xl font-medium text-brand-slate/80">You selected: <strong className="text-brand-red">{selectedRole}</strong></p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-brand-slate/10 flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="name">Name</label>
                <input id="name" type="text" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="email">Email</label>
                <input id="email" type="email" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="postal">Postal code</label>
                <input id="postal" type="text" className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" maxLength={7} required />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="role">Role</label>
              <input id="role" type="text" value={selectedRole} readOnly className="px-5 py-4 bg-brand-slate/5 rounded-xl text-brand-slate/60 font-medium cursor-not-allowed" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="availability">When are you available?</label>
              <textarea id="availability" rows={3} placeholder="E.g., Weekday evenings, Saturdays..." className="px-5 py-4 bg-brand-cream/50 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required></textarea>
            </div>

            <button type="submit" className="bg-brand-red text-white py-4 mt-4 rounded-full font-bold text-xl hover:bg-opacity-90 transition-opacity w-full text-center">
              Sign Me Up
            </button>
          </form>
        </FadeIn>
      )}

      {step === 3 && (
        <FadeIn className="max-w-2xl mx-auto text-center py-12">
          <div className="w-24 h-24 bg-brand-forest/10 text-brand-forest rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-6 text-brand-slate">Thank you for volunteering.</h1>
          <p className="text-xl font-medium text-brand-slate/80 mb-16">Someone from the team will be in touch within 48 hours.</p>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-brand-slate/10">
            <h2 className="text-2xl font-fraunces font-bold mb-4 text-brand-slate">Would you also like to contribute to the campaign?</h2>
            <p className="font-medium text-brand-slate/70 mb-8">Grassroots donations help us build momentum.</p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/donate" className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity w-full max-w-sm">
                Donate Now
              </Link>
              <Link href="/" className="text-brand-slate/60 hover:text-brand-slate font-medium underline underline-offset-4">
                No thanks, just volunteering
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
