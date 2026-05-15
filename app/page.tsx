'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { ImpactMeter } from '@/components/ImpactMeter';

export default function Home() {
  return (
    <>
      <section className="px-6 py-10 md:py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <FadeIn className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold font-fraunces leading-tight mb-4">
            Stronger Together. <span className="text-brand-red">Real Change</span> for Our Community.
          </h1>
          <p className="text-lg md:text-xl text-brand-slate/80 mb-8 leading-relaxed font-medium">
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
          <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/seed/lorna/800/1000"
              alt="Lorna Antwi"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-4">Vote for Lorna Antwi</h2>
            <p className="text-lg md:text-xl text-brand-mustard mb-8 font-bold">
              Join the community to stay updated on the campaign.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-6 py-4 rounded-full bg-white text-brand-slate font-medium text-lg border-2 border-brand-slate/20 focus:border-brand-mustard focus:outline-none focus:ring-0"
                required
              />
              <button type="submit" className="bg-brand-mustard text-brand-slate px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-opacity">
                Join Us
              </button>
            </form>

            <div className="mt-8 text-left bg-brand-cream/10 p-6 rounded-2xl border border-brand-cream/20">
              <h3 className="text-xl font-bold font-fraunces mb-4 border-b border-brand-cream/20 pb-3">Key Voting Timelines - 2026</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-brand-mustard mb-1">Advance Voting</h4>
                  <p className="font-medium">Tuesday, October 6 to Sunday, October 11</p>
                  <p className="text-sm opacity-80 mt-1">10:00 AM - 7:00 PM</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-mustard mb-1">Election Day</h4>
                  <p className="font-medium">Monday, October 26</p>
                  <p className="text-sm opacity-80 mt-1">10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-8 text-center">What I'll Fight For in Ward 7</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-slate/5 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-fraunces font-bold mb-3">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <ImpactMeter />

      <section className="bg-brand-slate text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-6">Join us. This campaign is built by neighbours.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
