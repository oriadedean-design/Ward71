export type AccentColor = 'red' | 'mustard' | 'forest'

export interface Neighbourhood {
  id: string
  name: string
  shortName: string
  // Brief neighbourhood context tied to Lorna's platform — edit in her own voice.
  description: string
  priority: string
  accentColor: AccentColor
}

export const neighbourhoods: Neighbourhood[] = [
  {
    id: 'glenfield-jane-heights',
    name: 'Glenfield-Jane Heights',
    shortName: 'Glenfield-Jane Hts',
    description:
      "Residents here consistently raise transit gaps and the need for stronger youth programming. Families rely on Jane Street bus service but say it cuts out too early in the evening — and that young people deserve more structured opportunities close to home.",
    priority: 'Youth Opportunity & Transit',
    accentColor: 'forest',
  },
  {
    id: 'jane-and-finch',
    name: 'Jane and Finch',
    shortName: 'Jane & Finch',
    description:
      "Housing stability, community safety, and youth opportunity are the recurring themes at the door. Residents want real investment — not more promises — and consistent representation at City Hall that actually shows up for this neighbourhood.",
    priority: 'Community Safety & Youth Investment',
    accentColor: 'red',
  },
  {
    id: 'black-creek',
    name: 'Black Creek',
    shortName: 'Black Creek',
    description:
      "Seniors on fixed incomes describe being squeezed by rising rents and isolated by transit gaps. Families also raise food access as a persistent issue — affordable options are far away, and not everyone has the means to reach them.",
    priority: 'Senior Affordability & Food Security',
    accentColor: 'mustard',
  },
  {
    id: 'humbermede',
    name: 'Humbermede (Emery)',
    shortName: 'Humbermede',
    description:
      "Long-time residents worry about displacement as rents rise along the Weston Road corridor. Newcomer families say childcare and settlement supports in the area are too limited to meet the growing demand.",
    priority: 'Affordable Housing & Family Services',
    accentColor: 'red',
  },
  {
    id: 'downsview',
    name: 'Downsview',
    shortName: 'Downsview',
    description:
      "The Downsview lands redevelopment dominates conversations here. Residents want affordable housing guaranteed in every phase of the project — not treated as an afterthought. This is the most consistent ask at the door in Downsview.",
    priority: 'Affordable Housing & Community Land Use',
    accentColor: 'forest',
  },
  {
    id: 'oakdale-beverley-heights',
    name: 'Oakdale-Beverley Heights',
    shortName: 'Oakdale-Beverley Hts',
    description:
      "Food security is the defining concern here. Without a nearby full-service grocery store, families depend on food programs that are already stretched thin. Expanding community kitchen and food bank support is essential.",
    priority: 'Food Security & Community Investment',
    accentColor: 'mustard',
  },
]
