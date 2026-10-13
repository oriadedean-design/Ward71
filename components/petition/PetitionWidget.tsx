import Link from 'next/link';
import { PetitionCounter } from './PetitionCounter';
import { PETITION_CLOSES_AT, PETITION_PATH, countSignatures, getPetition, isPetitionClosed } from '@/lib/petition';

// A compact petition card with the live count, for the platform pages.

export async function PetitionWidget({ planLink = false }: { planLink?: boolean }) {
  const petition = getPetition();
  if (!petition) return null;
  const count = await countSignatures(petition.id);
  const closed = isPetitionClosed();
  const deadline = PETITION_CLOSES_AT.toLocaleDateString('en-CA', { timeZone: 'America/Toronto', month: 'long', day: 'numeric' });

  return (
    <aside aria-label="Petition" className="rounded-2xl border-2 border-brand-mustard bg-surface shadow-md p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
        {closed ? 'Petition closed' : `Petition · Sign by ${deadline}`}
      </p>
      <h2 className="text-2xl md:text-3xl font-fraunces font-bold text-ink leading-snug">{petition.title}</h2>
      <p className="mt-2 text-ink/75">{petition.subtitle}</p>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <PetitionCounter initial={count} label="people have signed" size="small" />
        <div className="flex flex-col sm:items-end gap-2">
          <Link
            href={PETITION_PATH}
            className="inline-flex items-center justify-center min-h-[52px] rounded-full bg-cta text-white font-bold text-lg px-8 hover:opacity-90 transition-opacity"
          >
            {closed ? 'See the petition' : 'Sign the petition →'}
          </Link>
          {planLink && (
            <Link href="/platform/finch-west-transit" className="min-h-[44px] inline-flex items-center font-semibold text-accent hover:underline underline-offset-2">
              Read the Finch West transit plan
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
