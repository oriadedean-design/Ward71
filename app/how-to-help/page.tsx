import { Metadata } from 'next';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { ImpactMeter } from '@/components/ImpactMeter';

export const metadata: Metadata = {
  title: 'How to Help | Lorna Antwi Campaign',
  description: 'Three ways to make a difference: Donate, Volunteer, and Spread the Word. Power a grassroots movement in Ward 7.',
};

export default function HowToHelpPage() {
  return (
    <>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">Three ways to make a difference.</h1>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <FadeIn delay={0.1} className="bg-brand-red text-white p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">Donate</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              Power a grassroots campaign. Every dollar helps us reach more residents and listen to more stories.
            </p>
            <Link href="/donate" className="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
              Donate Now
            </Link>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-brand-mustard text-brand-slate p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">Volunteer</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              Join the team. From door knocking to phone banking, every role matters.
            </p>
            <Link href="/volunteer" className="bg-brand-slate text-brand-cream px-8 py-4 rounded-full font-bold text-center hover:bg-opacity-90 transition-opacity">
              Volunteer With Me
            </Link>
          </FadeIn>

          <FadeIn delay={0.3} className="bg-brand-forest text-brand-cream p-8 rounded-3xl shadow-xl flex flex-col h-full">
            <h2 className="text-2xl font-fraunces font-bold mb-4">Spread the Word</h2>
            <p className="text-lg opacity-90 mb-8 flex-1 font-medium leading-relaxed">
              Share Lorna's campaign with your neighbours, family, and community.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity">
                <Facebook className="w-5 h-5" /> Facebook
              </a>
              <a href="#" className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity">
                <Twitter className="w-5 h-5" /> X
              </a>
              <a href="#" className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity">
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
              <button className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity">
                <LinkIcon className="w-5 h-5" /> Copy Link
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <FadeIn className="md:w-1/2">
            <h2 className="text-3xl font-fraunces font-bold mb-4 text-brand-slate">Why Grassroots?</h2>
            <div className="prose prose-lg prose-p:leading-relaxed font-medium text-brand-slate/80">
              <p>
                This campaign is rooted in people, not big money. Our goal is to build a grassroots movement powered by residents and community members who believe in stronger neighbourhoods, safer communities, and real change at City Hall.
              </p>
              <p>
                Your contribution is not just a donation — it is an investment in a stronger, more connected future for everyone in our community.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="md:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-brand-slate/10">
            <h2 className="text-xl font-fraunces font-bold mb-4 text-brand-red">Where your contribution goes</h2>
            <ul className="space-y-3 text-base font-medium text-brand-slate/80">
              {[
                "Community outreach materials (flyers, brochures, signage)",
                "Door-to-door canvassing",
                "Community events and town halls",
                "Volunteer coordination and training",
                "Basic campaign operations (transportation, communication, supplies)"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <ImpactMeter />
      </section>
    </>
  );
}
