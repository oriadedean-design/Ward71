export type AccentColor = 'red' | 'mustard' | 'forest'

export interface Neighbourhood {
  id: string
  name: string
  shortName: string
  priority: string
  accentColor: AccentColor
}

export const neighbourhoods: Neighbourhood[] = [
  {
    id: 'glenfield-jane-heights',
    name: 'Glenfield-Jane Heights',
    shortName: 'Glenfield-Jane Hts',
    priority: 'Youth Opportunity & Transit',
    accentColor: 'forest',
  },
  {
    id: 'jane-and-finch',
    name: 'Jane and Finch',
    shortName: 'Jane & Finch',
    priority: 'Community Safety & Youth Investment',
    accentColor: 'red',
  },
  {
    id: 'black-creek',
    name: 'Black Creek',
    shortName: 'Black Creek',
    priority: 'Senior Affordability & Food Security',
    accentColor: 'mustard',
  },
  {
    id: 'humbermede',
    name: 'Humbermede (Emery)',
    shortName: 'Humbermede',
    priority: 'Affordable Housing & Family Services',
    accentColor: 'red',
  },
  {
    id: 'downsview',
    name: 'Downsview',
    shortName: 'Downsview',
    priority: 'Affordable Housing & Community Land Use',
    accentColor: 'forest',
  },
  {
    id: 'oakdale-beverley-heights',
    name: 'Oakdale-Beverley Heights',
    shortName: 'Oakdale-Beverley Hts',
    priority: 'Food Security & Community Investment',
    accentColor: 'mustard',
  },
]
