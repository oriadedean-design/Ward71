import Image from 'next/image';
import { FadeIn } from '@/components/FadeIn';
import type { Endorsement } from '@/lib/endorsements';

export function Endorsements({ endorsements }: { endorsements: Endorsement[] }) {
  if (endorsements.length === 0) return null;
  const single = endorsements.length === 1;

  return (
    <section className="px-6 py-10 md:py-14 max-w-7xl mx-auto" aria-labelledby="endorsements-heading">
      <FadeIn>
        <h2
          id="endorsements-heading"
          className="text-3xl md:text-4xl font-fraunces font-bold text-brand-slate mb-2 text-center"
        >
          Endorsements
        </h2>
        <p className="text-brand-slate/60 font-medium text-center mb-8">
          Organizations and people supporting Lorna Antwi in Ward 7.
        </p>
      </FadeIn>

      <ul
        className={
          single
            ? 'max-w-2xl mx-auto'
            : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {endorsements.map((e) => (
          <li key={e.name}>
            <FadeIn className="h-full">
              <article className="h-full bg-white rounded-2xl border border-brand-slate/10 shadow-sm p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  {e.logoUrl && (
                    <Image
                      src={e.logoUrl}
                      alt={e.logoAlt || `${e.name} logo`}
                      width={48}
                      height={48}
                      className="h-12 w-auto object-contain flex-shrink-0"
                    />
                  )}
                  <div>
                    {e.category && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/45 mb-1">
                        {e.category}
                      </p>
                    )}
                    <h3 className="font-fraunces font-bold text-2xl text-brand-slate leading-tight">
                      {e.name}
                    </h3>
                  </div>
                </div>
                <p className="text-brand-slate/80 leading-relaxed font-medium">{e.description}</p>
                {e.sourceUrl && (
                  <a
                    href={e.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-bold text-brand-red underline underline-offset-2 hover:opacity-80 self-start"
                  >
                    Read the announcement from {e.name}
                  </a>
                )}
              </article>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
