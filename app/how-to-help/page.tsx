import { Metadata } from 'next';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { ImpactMeter } from '@/components/ImpactMeter';

export const metadata: Metadata = {
  title: 'How to Help',
  description: 'Three ways to make a difference for Ward 7: Donate, Volunteer, and Spread the Word. Power a grassroots movement behind Lorna Antwi for Toronto City Council.',
  openGraph: {
    title: 'How to Help | Lorna Antwi for Toronto City Council',
    description: 'Donate, volunteer, or spread the word. Every action powers our grassroots campaign in Ward 7.',
    url: 'https://www.lornaantwi.com/how-to-help',
  },
  alternates: { canonical: 'https://www.lornaantwi.com/how-to-help' },
};

// TO VERIFY before relying on these: confirm against toronto.ca/elections,
// then replace the placeholder text (and remove the highlight styling).
const CONTRIBUTION_MAX_PLACEHOLDER = '[$ MAXIMUM: TO VERIFY]';
const REBATE_PLACEHOLDER = '[REBATE %: TO VERIFY]';

function Placeholder({ children }: { children: string }) {
  return (
    <mark className="bg-brand-mustard/30 text-brand-slate font-bold px-1 rounded">{children}</mark>
  );
}

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
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.lornaantwi.com"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Facebook className="w-5 h-5" /> Facebook
              </a>
              <a
                href="https://www.instagram.com/lornaantwi_/"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://www.lornaantwi.com&text=Vote+Lorna+Antwi+for+Toronto+City+Council+Ward+7"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Twitter className="w-5 h-5" /> X
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.lornaantwi.com"
                target="_blank" rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 bg-brand-cream text-brand-forest py-3 rounded-xl font-bold hover:bg-opacity-90 transition-opacity"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
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

        {/* ── How do contributions work? ── */}
        <div className="max-w-4xl mx-auto mt-12">
          <FadeIn className="bg-white p-8 rounded-3xl shadow-sm border border-brand-slate/10">
            <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-4 text-brand-slate">
              How do contributions work?
            </h2>
            <p className="text-base md:text-lg font-medium text-brand-slate/80 leading-relaxed mb-5">
              Contributions can only come from individual Ontario residents, not corporations or
              unions, and the City sets a maximum each person can give to a single candidate:{' '}
              <Placeholder>{CONTRIBUTION_MAX_PLACEHOLDER}</Placeholder>. It&apos;s your money, so
              here&apos;s the rest of it straight:
            </p>
            <ul className="space-y-3 text-base font-medium text-brand-slate/80 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                <span>
                  <strong className="text-brand-slate">You may get some of it back.</strong>{' '}
                  Toronto&apos;s Contribution Rebate Program refunds part of an eligible contribution (
                  <Placeholder>{REBATE_PLACEHOLDER}</Placeholder>). The City runs it, so the details
                  and how to apply are at{' '}
                  <a
                    href="https://www.toronto.ca/city-government/elections/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-red underline underline-offset-2 hover:opacity-80"
                  >
                    toronto.ca/elections
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                <span>
                  <strong className="text-brand-slate">Over $100 is public.</strong> If you give more
                  than $100, your name and the amount appear in the campaign&apos;s financial filing.
                  That&apos;s the law, and it&apos;s part of what keeps local elections honest.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-mustard font-bold text-xl leading-none">&bull;</span>
                <span>
                  <strong className="text-brand-slate">It isn&apos;t federally tax deductible.</strong>{' '}
                  Municipal contributions don&apos;t qualify for the federal political tax credit, so
                  the City rebate is the main way any of it comes back to you.
                </span>
              </li>
            </ul>
            <p className="text-base font-medium text-brand-slate/70 leading-relaxed mt-5">
              Give what feels right for your household. Every contribution is reported the same way,
              and every dollar goes to the work listed above.
            </p>
          </FadeIn>
        </div>

        <ImpactMeter />
      </section>
    </>
  );
}
