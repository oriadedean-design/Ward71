import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { getDonationProgress } from '@/lib/donations';

const formatCad = (n: number) =>
  n.toLocaleString('en-CA', { maximumFractionDigits: n % 1 === 0 ? 0 : 2 });

// Goal, amount raised and text: Sanity Studio → Donation Goal (updated by hand).
// Published changes appear live via <SanityLive />.
export async function ImpactMeter() {
  const { raised, target, donors, percentage, showDonorCount, text } = await getDonationProgress();

  return (
    <section className="py-20 px-6 bg-surface rounded-3xl shadow-sm border border-ink/10 max-w-7xl mx-auto my-24 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-4">
            {text.headingPrefix} ${formatCad(target)} {text.headingSuffix}
          </h2>
          <p className="text-xl text-ink/60 mb-8 font-medium">
            {text.raisedLabel} ${formatCad(raised)}
            {showDonorCount && donors > 0 && (
              <> from {donors.toLocaleString('en-CA')} {donors === 1 ? 'neighbour' : 'neighbours'}</>
            )}
          </p>

          <div
            className="w-full bg-canvas rounded-full h-8 mb-6 overflow-hidden border border-ink/10 relative"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={raised}
            aria-label="Donations raised toward the campaign goal"
          >
            <div
              className="bg-progress h-full absolute left-0 top-0 transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <p className="text-xl text-ink/80 mb-10 font-medium leading-relaxed">{text.body}</p>

          <Link href="/donate" className="bg-cta text-white px-10 py-5 rounded-full font-bold text-xl inline-block hover:bg-opacity-90 transition-opacity">
            {text.buttonLabel}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
