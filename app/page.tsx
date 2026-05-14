'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export default function Home() {
  const [postalCode, setPostalCode] = useState('');
  const [wardStatus, setWardStatus] = useState<string | null>(null);

  const checkWard = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = postalCode.trim().toUpperCase().substring(0, 3);
    const ward7Prefixes = ['M3L', 'M3M', 'M3N', 'M9L', 'M9M', 'M9N'];
    
    if (prefix.length < 3) return;
    
    if (ward7Prefixes.includes(prefix)) {
      setWardStatus("Yes, you're in Ward 7. Lorna is running to represent you.");
    } else {
      setWardStatus("You're outside Ward 7, but you can still help spread the word.");
    }
  };

  return (
    <>
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <FadeIn className="md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold font-fraunces leading-tight mb-6">
            Stronger Together. <span className="text-brand-red">Real Change</span> for Our Community.
          </h1>
          <p className="text-xl md:text-2xl text-brand-slate/80 mb-10 leading-relaxed font-medium">
            Lorna Antwi for Toronto City Council, Humber River-Black Creek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/donate" className="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
              Donate Now
            </Link>
            <Link href="/volunteer" className="border-2 border-brand-slate text-brand-slate px-8 py-4 rounded-full font-bold text-center hover:bg-brand-slate hover:text-white transition-colors">
              Volunteer With Me
            </Link>
          </div>
        </FadeIn>
        <FadeIn className="md:w-1/2 flex justify-center">
          <div className="relative w-full aspect-[4/5] max-w-md rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/lorna_portrait/800/1000" 
              alt="Lorna Antwi" 
              fill 
              className="object-cover" 
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-6">Are you in Ward 7?</h2>
            <p className="text-lg md:text-xl text-brand-cream/80 mb-10">
              Enter your postal code to find out if Lorna will be your candidate.
            </p>
            <form onSubmit={checkWard} className="flex gap-4 max-w-md mx-auto relative z-10">
              <input 
                type="text" 
                maxLength={3}
                placeholder="Ex. M3M"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full text-brand-slate font-medium text-lg focus:outline-none focus:ring-2 focus:ring-brand-mustard"
                required
              />
              <button type="submit" className="bg-brand-mustard text-brand-slate px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-opacity">
                Check
              </button>
            </form>
            {wardStatus && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                className="mt-6 text-lg font-medium p-4 bg-brand-cream/10 rounded-xl"
              >
                {wardStatus}
              </motion.div>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-16 text-center">What I'll Fight For in Ward 7</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Affordable Housing and Tenant Protections",
              desc: "Fighting for rent control, stronger eviction prevention, and reducing the 10-year wait for subsidized housing."
            },
            {
              title: "Community Safety and Mental Health",
              desc: "Investing in prevention, youth outreach, after-school programs, and mental health supports that address root causes."
            },
            {
              title: "Streets, Parks, and Infrastructure",
              desc: "Cleaner streets, faster pothole repairs, more parks with pools, and safe gathering spaces for families."
            },
            {
              title: "Youth Opportunity and Mentorship",
              desc: "Expanding youth employment, training, and mentorship so young people have clear pathways to success."
            },
            {
              title: "Small Business and Local Economy",
              desc: "Reducing barriers for local entrepreneurs and improving access to city supports for community-based businesses."
            },
            {
              title: "Affordability for Seniors and Families",
              desc: "Property tax fairness and stronger supports for seniors, newcomers, and low- to moderate-income households."
            }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-slate/5 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-fraunces font-bold mb-4">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed text-lg">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-8">Help us reach our $25,000 grassroots goal.</h2>
            <div className="w-full bg-brand-cream rounded-full h-8 mb-6 overflow-hidden border border-brand-slate/10 relative">
              <div className="bg-brand-forest h-full absolute left-0 top-0 transition-all duration-1000 w-[5%]"></div>
            </div>
            <p className="text-xl text-brand-slate/80 mb-10 font-medium">This campaign is rooted in people, not big money.</p>
            <Link href="/donate" className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg inline-block hover:bg-opacity-90 transition-opacity">
              Donate to the Campaign
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-brand-slate text-brand-cream py-24 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-10">Join us. This campaign is built by neighbours.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/donate" className="bg-brand-mustard text-brand-slate px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity">
              Donate
            </Link>
            <Link href="/volunteer" className="border-2 border-brand-cream text-brand-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-cream hover:text-brand-slate transition-colors">
              Volunteer
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
