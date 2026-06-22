'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { neighbourhoods, type Neighbourhood, type AccentColor } from '@/lib/wardData'

// ─── SVG zone geometry ────────────────────────────────────────────────────────
// ViewBox: 0 0 440 520
// North = Steeles Ave W (y=0)   South = Hwy 401 (y=520)
// West  = Humber River  (x=0)   East  = Keele St (x=440)
// Dividers: Finch Ave W (y=200), Sheppard Ave W (y=355), Jane St (x=155), east column (x=315)
const SVG_ZONES = [
  {
    id: 'glenfield-jane-heights',
    d: 'M 0,0 L 155,0 L 155,200 L 0,200 Z',
    cx: 77,
    cy: 100,
    lines: ['Glenfield-', 'Jane Heights'],
  },
  {
    id: 'jane-and-finch',
    d: 'M 155,0 L 315,0 L 315,355 L 155,355 Z',
    cx: 235,
    cy: 177,
    lines: ['Jane &', 'Finch'],
  },
  {
    id: 'black-creek',
    d: 'M 315,0 L 440,0 L 440,355 L 315,355 Z',
    cx: 377,
    cy: 177,
    lines: ['Black', 'Creek'],
  },
  {
    id: 'humbermede',
    d: 'M 0,200 L 155,200 L 155,355 L 0,355 Z',
    cx: 77,
    cy: 277,
    lines: ['Humbermede'],
  },
  {
    id: 'downsview',
    d: 'M 0,355 L 315,355 L 315,520 L 0,520 Z',
    cx: 157,
    cy: 437,
    lines: ['Downsview'],
  },
  {
    id: 'oakdale-beverley-heights',
    d: 'M 315,355 L 440,355 L 440,520 L 315,520 Z',
    cx: 377,
    cy: 430,
    lines: ['Oakdale-', 'Beverley Hts'],
  },
]

// ─── Color helpers ────────────────────────────────────────────────────────────
const ACCENT_FILLS: Record<AccentColor, string> = {
  red: '#E05A47',
  mustard: '#E8B130',
  forest: '#1F4E3C',
}
const ACCENT_HOVER: Record<AccentColor, string> = {
  red: '#EA7D6E',
  mustard: '#EDCA6A',
  forest: '#2D6E55',
}
const IDLE_FILL = '#DDD8CE'

function zoneFill(color: AccentColor, active: boolean, hovered: boolean): string {
  if (active) return ACCENT_FILLS[color]
  if (hovered) return ACCENT_HOVER[color]
  return IDLE_FILL
}

function zoneLabelFill(color: AccentColor, active: boolean): string {
  if (!active) return '#1e293b'
  return color === 'mustard' ? '#1e293b' : '#ffffff'
}

function accentTag(color: AccentColor): string {
  switch (color) {
    case 'red': return 'bg-brand-red text-white'
    case 'mustard': return 'bg-brand-mustard text-brand-slate'
    case 'forest': return 'bg-brand-forest text-white'
  }
}

function accentDot(color: AccentColor): string {
  switch (color) {
    case 'red': return 'bg-brand-red'
    case 'mustard': return 'bg-brand-mustard'
    case 'forest': return 'bg-brand-forest'
  }
}

function accentBorder(color: AccentColor): string {
  switch (color) {
    case 'red': return 'border-brand-red'
    case 'mustard': return 'border-brand-mustard'
    case 'forest': return 'border-brand-forest'
  }
}

// ─── SVG Map ──────────────────────────────────────────────────────────────────
function WardMapSVG({
  activeId,
  onSelect,
  svgClassName,
}: {
  activeId: string | null
  onSelect: (id: string) => void
  svgClassName?: string
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <svg
      viewBox="0 0 440 520"
      className={svgClassName}
      role="img"
      aria-label="Simplified map of Ward 7 Humber River-Black Creek neighbourhoods"
    >
      {/* Background tile */}
      <rect x="0" y="0" width="440" height="520" fill="#F0ECE4" />

      {/* Humber River (decorative west edge) */}
      <path
        d="M 6,0 C 2,80 10,160 4,240 C -2,320 8,400 4,520"
        fill="none"
        stroke="#8BBFD4"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Neighbourhood zones */}
      {SVG_ZONES.map((zone) => {
        const n = neighbourhoods.find((nb) => nb.id === zone.id)!
        const active = activeId === zone.id
        const hovered = hoveredId === zone.id
        const fill = zoneFill(n.accentColor, active, hovered)
        const textFill = zoneLabelFill(n.accentColor, active)
        const lineCount = zone.lines.length
        const textStartY = zone.cy - (lineCount - 1) * 7.5

        return (
          <g key={zone.id}>
            <path
              d={zone.d}
              fill={fill}
              stroke="#FDFBF7"
              strokeWidth="2.5"
              tabIndex={0}
              role="button"
              aria-label={`${n.name}${active ? ' – selected' : ''}`}
              aria-pressed={active}
              onClick={() => onSelect(zone.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(zone.id)
                }
              }}
              onMouseEnter={() => setHoveredId(zone.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer', transition: 'fill 0.18s ease', outline: 'none' }}
            />
            {/* Keyboard focus ring rendered as a separate overlay rect-ish outline */}
            {active && (
              <path
                d={zone.d}
                fill="none"
                stroke={n.accentColor === 'mustard' ? '#1F4E3C' : '#FDFBF7'}
                strokeWidth="3"
                strokeDasharray="6 3"
                opacity="0.6"
                style={{ pointerEvents: 'none' }}
              />
            )}

            {/* Zone labels – hidden on mobile, visible md+ */}
            <text
              x={zone.cx}
              y={textStartY}
              textAnchor="middle"
              fill={textFill}
              fontSize="11"
              fontWeight={active ? '700' : '500'}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'fill 0.18s ease',
              }}
              className="hidden md:block"
            >
              {zone.lines.map((line, i) => (
                <tspan key={i} x={zone.cx} dy={i === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        )
      })}

      {/* ── Road lines (desktop only) ── */}
      {/* Finch Ave W – horizontal at y=200 */}
      <line
        x1="0" y1="200" x2="440" y2="200"
        stroke="#FDFBF7" strokeWidth="1" strokeDasharray="5 3"
        className="hidden md:block"
      />
      {/* Sheppard Ave W – horizontal at y=355 */}
      <line
        x1="0" y1="355" x2="440" y2="355"
        stroke="#FDFBF7" strokeWidth="1" strokeDasharray="5 3"
        className="hidden md:block"
      />
      {/* Jane St – vertical at x=155, north portion */}
      <line
        x1="155" y1="0" x2="155" y2="355"
        stroke="#FDFBF7" strokeWidth="1" strokeDasharray="5 3"
        className="hidden md:block"
      />
      {/* Weston Rd – vertical at x=82, Humbermede zone */}
      <line
        x1="82" y1="200" x2="82" y2="355"
        stroke="#FDFBF7" strokeWidth="1" strokeDasharray="3 4"
        opacity="0.6"
        className="hidden md:block"
      />
      {/* Hwy 400 – vertical at x=118, south half */}
      <line
        x1="118" y1="355" x2="118" y2="520"
        stroke="#FDFBF7" strokeWidth="1" strokeDasharray="3 4"
        opacity="0.6"
        className="hidden md:block"
      />

      {/* ── Road labels (desktop only) ── */}
      <text
        x="220" y="194"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.45"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Finch Ave W
      </text>
      <text
        x="375" y="349"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.45"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Sheppard Ave W
      </text>
      <text
        x="155"
        y="62"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.45"
        transform="rotate(-90, 155, 62)"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Jane St
      </text>
      <text
        x="82"
        y="252"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="6.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.35"
        transform="rotate(-90, 82, 252)"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Weston Rd
      </text>
      <text
        x="118"
        y="420"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="6.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.35"
        transform="rotate(-90, 118, 420)"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Hwy 400
      </text>

      {/* ── Boundary labels (desktop only) ── */}
      <text
        x="220" y="11"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.35"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Steeles Ave W
      </text>
      <text
        x="220" y="517"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.35"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Highway 401
      </text>
      <text
        x="437" y="260"
        textAnchor="middle"
        fill="#1e293b"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.35"
        transform="rotate(90, 437, 260)"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Keele St
      </text>
      <text
        x="8" y="260"
        textAnchor="middle"
        fill="#8BBFD4"
        fontSize="7"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.8"
        transform="rotate(-90, 8, 260)"
        className="hidden md:block"
        style={{ pointerEvents: 'none' }}
      >
        Humber River
      </text>

      {/* Ward outer border */}
      <rect
        x="0" y="0" width="440" height="520"
        fill="none"
        stroke="#C4BFB6"
        strokeWidth="2"
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  )
}

// ─── Desktop info panel ───────────────────────────────────────────────────────
function IntroPanel() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center py-10">
      <div className="w-14 h-14 rounded-full bg-brand-slate/5 flex items-center justify-center mb-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7 text-brand-slate/40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-fraunces font-bold text-brand-slate mb-3">
        Select a Neighbourhood
      </h2>
      <p className="text-brand-slate/55 text-base leading-relaxed max-w-[260px]">
        Click any zone on the map to hear what residents are telling Lorna.
      </p>
    </div>
  )
}

function NeighbourhoodPanel({ n }: { n: Neighbourhood }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span
          className={`inline-block text-xs font-bold tracking-wide px-3 py-1 rounded-full mb-4 ${accentTag(n.accentColor)}`}
        >
          Ward 7 · Humber River-Black Creek
        </span>
        <h2 className="text-3xl font-fraunces font-bold text-brand-slate">{n.name}</h2>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-2">
          What I&apos;m Hearing
        </p>
        <p className="text-brand-slate/80 text-[1.05rem] leading-relaxed">{n.whatImHearing}</p>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-2">
          Platform Priority
        </p>
        <span
          className={`inline-block text-sm font-bold px-4 py-2 rounded-full ${accentTag(n.accentColor)}`}
        >
          {n.priority}
        </span>
      </div>
    </div>
  )
}

// ─── Mobile accordion card ────────────────────────────────────────────────────
function NeighbourhoodCard({
  n,
  isOpen,
  onToggle,
}: {
  n: Neighbourhood
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`rounded-2xl border-2 bg-white shadow-sm overflow-hidden transition-colors duration-150 ${
        isOpen ? accentBorder(n.accentColor) : 'border-brand-slate/10'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-inset"
        style={{ minHeight: '56px' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-3 h-3 rounded-full flex-shrink-0 ${accentDot(n.accentColor)}`}
            aria-hidden="true"
          />
          <span className="font-fraunces font-bold text-[1.05rem] text-brand-slate leading-snug">
            {n.name}
          </span>
        </div>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`text-brand-slate/40 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-brand-slate/5">
          <p className="text-brand-slate/80 leading-relaxed mt-4 mb-4">{n.whatImHearing}</p>
          <span
            className={`inline-block text-sm font-bold px-4 py-2 rounded-full ${accentTag(n.accentColor)}`}
          >
            {n.priority}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function OurWardMap() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const active = activeId ? neighbourhoods.find((n) => n.id === activeId) ?? null : null

  function handleMapSelect(id: string) {
    const next = activeId === id ? null : id
    setActiveId(next)
    // On mobile, scroll the corresponding card into view after accordion expansion
    if (next && typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        cardRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    }
  }

  function handleCardToggle(id: string) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      {/* ── Intro ── */}
      <section className="px-6 py-10 md:py-16 max-w-7xl mx-auto">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold leading-tight mb-5">
            Our Ward,{' '}
            <span className="text-brand-red">Block by Block</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-slate/75 max-w-2xl leading-relaxed">
            I know Humber River-Black Creek because I&apos;ve worked in it for years. Here&apos;s
            what I&apos;m hearing from residents across our neighbourhoods — and what I&apos;ll do
            about it.
          </p>
        </FadeIn>
      </section>

      {/* ── Map section ── */}
      <section className="px-6 pb-10 md:pb-16 max-w-7xl mx-auto">

        {/* ── MOBILE: compact map + accordion ── */}
        <div className="md:hidden">
          <FadeIn>
            <p className="text-sm text-brand-slate/50 text-center mb-3">
              Tap a zone to jump to that neighbourhood ↓
            </p>
            {/* Fixed-height wrapper: SVG scales to fit */}
            <div
              className="flex justify-center mb-6 rounded-2xl overflow-hidden shadow-sm border border-brand-slate/10"
              style={{ height: '210px' }}
            >
              <WardMapSVG
                activeId={activeId}
                onSelect={handleMapSelect}
                svgClassName="h-full w-auto"
              />
            </div>
          </FadeIn>

          {/* Accordion cards */}
          <div className="space-y-3">
            {neighbourhoods.map((n) => (
              <div
                key={n.id}
                ref={(el) => {
                  cardRefs.current[n.id] = el
                }}
              >
                <NeighbourhoodCard
                  n={n}
                  isOpen={activeId === n.id}
                  onToggle={() => handleCardToggle(n.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: two-column map + panel ── */}
        <div className="hidden md:flex gap-10 items-start">
          {/* Left: SVG map ~55% */}
          <FadeIn className="flex-[55]">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-brand-slate/10">
              <WardMapSVG
                activeId={activeId}
                onSelect={handleMapSelect}
                svgClassName="w-full h-auto block"
              />
            </div>
            <p className="text-xs text-brand-slate/40 text-center mt-2">
              Click a neighbourhood zone to explore
            </p>
          </FadeIn>

          {/* Right: info panel ~45% */}
          <FadeIn className="flex-[45] sticky top-24" delay={0.08}>
            <div className="bg-white rounded-2xl shadow-sm border border-brand-slate/5 p-8 min-h-[420px] flex flex-col">
              {active ? <NeighbourhoodPanel n={active} /> : <IntroPanel />}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Placeholder notice ── */}
      <section className="px-6 pb-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-brand-mustard/10 border border-brand-mustard/25 rounded-2xl px-6 py-4 text-sm text-brand-slate/65">
            <strong className="text-brand-slate font-semibold">Note for Lorna:</strong> The
            &ldquo;What I&apos;m hearing&rdquo; text in each neighbourhood is placeholder content
            drawn from your platform priorities. Please refine it in your own words before launch.
          </div>
        </FadeIn>
      </section>
    </>
  )
}
