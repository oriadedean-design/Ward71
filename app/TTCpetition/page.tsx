import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PetitionCounter } from '@/components/petition/PetitionCounter';
import { PetitionForm } from '@/components/petition/PetitionForm';
import { SharePetition } from '@/components/petition/SharePetition';
import { Blocks, Credits } from '@/components/xml/XmlRich';
import {
  PETITION_CLOSES_AT,
  PETITION_PATH,
  countSignatures,
  getFormSpec,
  getPetition,
  isPetitionClosed,
  sectionById,
} from '@/lib/petition';
import { childElements, firstChild, textOf } from '@/lib/xmlContent';

// The TTC Finch West petition, from content/petitions/ttc-finch-west.xml.

const PAGE_URL = `https://www.lornaantwi.com${PETITION_PATH}`;
const DESCRIPTION =
  'Sign the petition asking the TTC to restore safe, accessible local bus service along Finch West, alongside Line 6, before winter. Closes October 22.';

// The count is part of the page, so refresh it at least every 30 seconds.
export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Sign: Restore Local Transit on Finch West',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Petition: Restore Safe, Accessible Local Transit Along Finch West Before Winter',
    description: DESCRIPTION,
    url: PAGE_URL,
    type: 'article',
  },
};

// Sections that the page lays out itself rather than as plain text.
const SPECIAL = ['supporterCounter', 'signatureForm'];

export default async function TtcPetitionPage() {
  const petition = getPetition();
  if (!petition) notFound();
  const { root } = petition;
  const spec = getFormSpec(root);
  const count = await countSignatures(petition.id);
  const closed = isPetitionClosed();
  const counter = firstChild(sectionById(root, 'support') ?? root, 'supporterCounter');
  const counterLabel = textOf(counter && firstChild(counter, 'label')) || 'People who have signed this petition';
  const deadline = PETITION_CLOSES_AT.toLocaleString('en-CA', { timeZone: 'America/Toronto', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <div lang={root.attrs.lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: petition.title,
            description: DESCRIPTION,
            url: PAGE_URL,
            inLanguage: 'en-CA',
            author: { '@id': 'https://www.lornaantwi.com/#lorna' },
            about: ['TTC', 'Line 6 Finch West', '36 Finch West bus', 'Accessible transit', 'Ward 7 Humber River-Black Creek'],
          }),
        }}
      />

      {/* ── Heading and live count ── */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{petition.subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-ink leading-tight">{petition.title}</h1>
          <p className="mt-4 text-ink/75 font-medium">{textOf(firstChild(root, 'organizerLine'))}</p>
          <p className="text-ink/75 font-medium">{textOf(firstChild(root, 'plannedSubmission'))}</p>

          <div className="mt-8 rounded-2xl bg-surface border border-ink/10 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <PetitionCounter initial={count} label={counterLabel} />
            {closed ? (
              <p className="font-bold text-ink">This petition is now closed.</p>
            ) : (
              <a
                href="#sign"
                className="inline-flex items-center justify-center min-h-[52px] rounded-full bg-cta text-white font-bold text-lg px-8 hover:opacity-90 transition-opacity"
              >
                Sign the petition ↓
              </a>
            )}
          </div>
          {!closed && <p className="mt-3 text-sm text-ink/60">Signing closes {deadline} (Toronto time).</p>}
          <div className="mt-6 max-w-md mx-auto">
            <p className="text-sm font-semibold text-ink/75 mb-3">Know someone on Finch West? Send them the petition.</p>
            <SharePetition shareUrl={PAGE_URL} />
          </div>
        </div>
      </section>

      {/* ── Petition text, in the order of the export ── */}
      <div className="px-6 pb-14 max-w-3xl mx-auto space-y-12">
        {childElements(root, 'section').map((section) => {
          const isSupport = section.attrs.id === 'support';
          return (
            <section key={section.attrs.id} id={isSupport ? 'sign' : section.attrs.id} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-fraunces font-bold text-ink mb-4">{textOf(firstChild(section, 'heading'))}</h2>
              {isSupport ? (
                <div className="space-y-6">
                  <Blocks node={section} skip={SPECIAL} />
                  <div className="rounded-2xl bg-surface border-2 border-brand-mustard shadow-md p-6 md:p-8 space-y-6">
                    <PetitionCounter initial={count} label={counterLabel} size="small" />
                    {closed || !spec ? (
                      <p className="font-semibold text-ink">
                        This petition closed on October 22 and goes to the TTC on October 23. Thank you to everyone who signed.
                      </p>
                    ) : (
                      <PetitionForm
                        spec={spec}
                        shareUrl={PAGE_URL}
                        shareText="Sign the petition to restore safe, accessible local bus service on Finch West before winter."
                      />
                    )}
                  </div>
                </div>
              ) : (
                <Blocks node={section} />
              )}
            </section>
          );
        })}

        <Credits attribution={petition.attribution} />
      </div>
    </div>
  );
}
