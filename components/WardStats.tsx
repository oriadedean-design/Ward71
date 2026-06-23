import { FadeIn } from '@/components/FadeIn'
import { wardStats } from '@/lib/wardStats'

// ─── Shared primitives ────────────────────────────────────────────────────────

type Accent = 'red' | 'mustard' | 'forest'

function barClass(a: Accent) {
  return a === 'red' ? 'bg-brand-red' : a === 'mustard' ? 'bg-brand-mustard' : 'bg-brand-forest'
}
function textClass(a: Accent) {
  return a === 'red' ? 'text-brand-red' : a === 'mustard' ? 'text-brand-mustard' : 'text-brand-forest'
}

function SectionHeading({ title, accent }: { title: string; accent: Accent }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-1 h-8 rounded-full flex-shrink-0 ${barClass(accent)}`} />
      <h3 className={`text-xl font-fraunces font-bold ${textClass(accent)}`}>{title}</h3>
    </div>
  )
}

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-slate/5 shadow-sm p-5 flex flex-col gap-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 leading-tight">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-fraunces font-bold text-brand-slate leading-none">
        {value}
      </p>
      {note && <p className="text-xs text-brand-slate/45 leading-snug">{note}</p>}
    </div>
  )
}

// Horizontal mini-bar normalised to the max value in the group
function DataBar({
  label,
  pct,
  maxPct,
  accent,
}: {
  label: string
  pct: string
  maxPct: number
  accent: Accent
}) {
  const numeric = parseFloat(pct)
  const width = Math.round((numeric / maxPct) * 100)
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-brand-slate/75">{label}</span>
        <span className="text-sm font-bold text-brand-slate ml-4 flex-shrink-0">{pct}</span>
      </div>
      <div className="h-2 bg-brand-slate/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barClass(accent)}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

// Tenure split — full-width bar showing rental vs owned
function TenureSplit() {
  const { rentalShare, ownerShare } = wardStats.housingAffordability
  const rentalNum = parseFloat(rentalShare.value)
  const ownerNum  = parseFloat(ownerShare.value)
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-slate/5 shadow-sm mb-5">
      <div className="flex" style={{ height: '56px' }}>
        <div
          className="flex items-center justify-center gap-2 bg-brand-red text-white font-bold text-sm"
          style={{ width: `${rentalNum}%` }}
        >
          <span className="text-lg font-fraunces leading-none">{rentalShare.value}</span>
          <span className="text-xs opacity-80 hidden sm:block">Renters</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 bg-brand-mustard text-brand-slate font-bold text-sm"
          style={{ width: `${ownerNum}%` }}
        >
          <span className="text-lg font-fraunces leading-none">{ownerShare.value}</span>
          <span className="text-xs opacity-70 hidden sm:block">Owners</span>
        </div>
      </div>
      <div className="flex bg-white border-t border-brand-slate/5 text-xs text-brand-slate/40">
        <div className="flex-1 px-4 py-2">Rental housing</div>
        <div className="flex-1 px-4 py-2 text-right">Owned housing</div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function WardStats() {
  const { coreDemographics, housingAffordability, immigrationLanguage, labourEducation } = wardStats

  const maxBirthplacePct = Math.max(
    ...immigrationLanguage.topBirthplaces.map((b) => parseFloat(b.pct))
  )
  const maxFieldPct = Math.max(
    ...labourEducation.topEmploymentFields.map((f) => parseFloat(f.pct))
  )

  return (
    <section className="px-6 pb-10 md:pb-16 max-w-7xl mx-auto">
      {/* Divider */}
      <div className="border-t border-brand-slate/10 mb-10 md:mb-14" />

      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-2">
          Ward 7 by the Numbers
        </h2>
        <p className="text-brand-slate/55 text-base max-w-2xl leading-relaxed mb-10">
          Verified 2021 Census data for Humber River-Black Creek. Update figures in{' '}
          <code className="text-xs bg-brand-slate/5 px-1.5 py-0.5 rounded font-mono">
            lib/wardStats.ts
          </code>{' '}
          and all cards refresh automatically.
        </p>
      </FadeIn>

      <div className="flex flex-col gap-10 md:gap-14">

        {/* ── Block 1: Core Demographics ── */}
        <FadeIn>
          <SectionHeading title="Core Demographics" accent="forest" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard label="Total Population"     value={coreDemographics.totalPopulation.value} />
            <StatCard label="5-Year Growth"        value={coreDemographics.fiveYearGrowth.value}   note={coreDemographics.fiveYearGrowth.note} />
            <StatCard label="Median Age"           value={coreDemographics.medianAge.value}         note={coreDemographics.medianAge.note} />
            <StatCard label="Working Age (15–64)"  value={coreDemographics.workingAgePct.value} />
            <StatCard label="Dependency Ratio"     value={coreDemographics.dependencyRatio.value}   note={coreDemographics.dependencyRatio.note} />
          </div>
        </FadeIn>

        {/* ── Block 2: Housing Affordability ── */}
        <FadeIn>
          <SectionHeading title="Housing Affordability" accent="red" />
          <TenureSplit />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <StatCard label="Total Dwellings"                value={housingAffordability.totalDwellings.value} />
            <StatCard label="Avg. Monthly Rent"             value={housingAffordability.avgMonthlyRenterCost.value}       note={housingAffordability.avgMonthlyRenterCost.note} />
            <StatCard label="Tenant Stress Rate"            value={housingAffordability.tenantStressRate.value}            note={housingAffordability.tenantStressRate.note} />
            <StatCard label="Low-Income Rate"               value={housingAffordability.lowIncomeRateOverall.value}        note={housingAffordability.lowIncomeRateOverall.note} />
            <StatCard label="Low Income — Seniors & Youth"  value={housingAffordability.lowIncomeRateSeniorsYouth.value}   note={housingAffordability.lowIncomeRateSeniorsYouth.note} />
          </div>
        </FadeIn>

        {/* ── Block 3: Immigration & Language ── */}
        <FadeIn>
          <SectionHeading title="Immigration & Language" accent="mustard" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <StatCard label="Total Immigrants"              value={immigrationLanguage.totalImmigrants.value}    note={immigrationLanguage.totalImmigrants.note} />
            <StatCard label="Recent Immigrants"             value={immigrationLanguage.recentImmigrants.value}   note={immigrationLanguage.recentImmigrants.note} />
            <StatCard label="English at Home"               value={immigrationLanguage.englishAtHome.value}      note={immigrationLanguage.englishAtHome.note} />
            <StatCard label="Non-Official Language at Home" value={immigrationLanguage.nonOfficialAtHome.value}  note={immigrationLanguage.nonOfficialAtHome.note} />
          </div>
          <div className="bg-white rounded-2xl border border-brand-slate/5 shadow-sm p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-4">
              Top Birthplaces — Immigrant Population
            </p>
            <div className="flex flex-col gap-4">
              {immigrationLanguage.topBirthplaces.map(({ country, pct }) => (
                <DataBar key={country} label={country} pct={pct} maxPct={maxBirthplacePct} accent="mustard" />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Block 4: Labour & Education ── */}
        <FadeIn>
          <SectionHeading title="Labour & Education" accent="forest" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <StatCard label="Unemployment Rate"          value={labourEducation.unemploymentRate.value}        note={labourEducation.unemploymentRate.note} />
            <StatCard label="Labour Force Participation" value={labourEducation.participationRate.value}       note={labourEducation.participationRate.note} />
            <StatCard label="No High School Credential"  value={labourEducation.noHighSchool.value}            note={labourEducation.noHighSchool.note} />
            <StatCard label="Post-Secondary Completion"  value={labourEducation.postSecondaryCompletion.value} note={labourEducation.postSecondaryCompletion.note} />
          </div>
          <div className="bg-white rounded-2xl border border-brand-slate/5 shadow-sm p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-4">
              Top Employment Sectors
            </p>
            <div className="flex flex-col gap-4">
              {labourEducation.topEmploymentFields.map(({ field, pct }) => (
                <DataBar key={field} label={field} pct={pct} maxPct={maxFieldPct} accent="forest" />
              ))}
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Source */}
      <FadeIn delay={0.3}>
        <p className="text-xs text-brand-slate/35 text-right mt-10">
          Source: {wardStats.source}
        </p>
      </FadeIn>

      {/* Phase 2 scope note */}
      <FadeIn delay={0.35}>
        <div className="mt-6 bg-brand-slate/3 border border-brand-slate/10 rounded-2xl px-6 py-5 text-sm text-brand-slate/55">
          <p className="font-semibold text-brand-slate/65 mb-1">Phase 2 — Planned additions</p>
          <p className="leading-relaxed">
            Map overlay toggles for transit corridors, zoning categories, and landmark detail cards
            are scoped for a future release. The SVG zone structure and React state already support
            togglable overlay layers.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
