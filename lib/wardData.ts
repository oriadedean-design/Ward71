export type AccentColor = 'red' | 'mustard' | 'forest'

export interface Neighbourhood {
  id: string
  name: string
  shortName: string
  whatImHearing: string
  priority: string
  accentColor: AccentColor
}

// PLACEHOLDER — Lorna should refine these in her own words before launch.
export const neighbourhoods: Neighbourhood[] = [
  {
    id: 'glenfield-jane-heights',
    name: 'Glenfield-Jane Heights',
    shortName: 'Glenfield-Jane Hts',
    whatImHearing:
      "Parents tell me their kids need more after-school options and that the Jane Street bus cuts out too early in the evening. Youth programming and reliable transit are what I hear most at every door in this neighbourhood.",
    priority: 'Youth Opportunity & Transit',
    accentColor: 'forest',
  },
  {
    id: 'jane-and-finch',
    name: 'Jane and Finch',
    shortName: 'Jane & Finch',
    whatImHearing:
      "Years of underinvestment has residents asking for basic dignity — safe parks, reliable transit, and youth jobs that don't require a car to reach. The energy and pride here are real. What's been missing is follow-through from City Hall.",
    priority: 'Community Safety & Youth Investment',
    accentColor: 'red',
  },
  {
    id: 'black-creek',
    name: 'Black Creek',
    shortName: 'Black Creek',
    whatImHearing:
      "Seniors on fixed incomes are being squeezed by rising rents and feeling isolated by transit gaps. Families tell me the walking routes to the nearest food programs are not safe after dark.",
    priority: 'Senior Affordability & Food Security',
    accentColor: 'mustard',
  },
  {
    id: 'humbermede',
    name: 'Humbermede (Emery)',
    shortName: 'Humbermede',
    whatImHearing:
      "New families moving in are looking for childcare and community spaces that feel genuinely welcoming. Long-time residents worry about displacement as rents rise along the Weston Road corridor.",
    priority: 'Affordable Housing & Family Services',
    accentColor: 'red',
  },
  {
    id: 'downsview',
    name: 'Downsview',
    shortName: 'Downsview',
    whatImHearing:
      "The Downsview lands redevelopment is a massive opportunity — and a real risk. Residents want affordable housing guaranteed in every phase, not just promised on paper. I hear this at nearly every door I knock.",
    priority: 'Affordable Housing & Community Land Use',
    accentColor: 'forest',
  },
  {
    id: 'oakdale-beverley-heights',
    name: 'Oakdale-Beverley Heights',
    shortName: 'Oakdale-Beverley Hts',
    whatImHearing:
      "Food security comes up at almost every door. This neighbourhood is a food desert — grocery stores are far away and not everyone can get there. Community kitchens and food programs here need more support, not less.",
    priority: 'Food Security & Community Investment',
    accentColor: 'mustard',
  },
]
