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
    id: 'humber-summit',
    name: 'Humber Summit',
    shortName: 'Humber Summit',
    description:
      "Humber Summit is the quiet northwest corner of the ward, tucked between Steeles and the Humber River valley. It's a mix of family homes, apartment towers and industrial land, with some of the best trail access in the city right at the edge of the neighbourhood. The hard part is getting anywhere else: without rapid transit, a lot of daily life here depends on long bus rides or a car.",
    priority: 'Transit & Family Services',
    accentColor: 'mustard',
  },
  {
    id: 'glenfield-jane-heights',
    name: 'Glenfield-Jane Heights',
    shortName: 'Glenfield-Jane Hts',
    description:
      "Glenfield-Jane Heights is full of families, and a lot of them are raising kids while working shifts that don't end at five. They rely on the Jane buses and tell me service thins out just when people are heading home late. Young people here are capable and ready. What they need are more programs and real opportunities close to home.",
    priority: 'Youth Opportunity & Transit',
    accentColor: 'forest',
  },
  {
    id: 'jane-and-finch',
    name: 'Jane and Finch',
    shortName: 'Jane & Finch',
    description:
      "Jane and Finch is one of the most diverse and close-knit communities in Canada, and it's had to be. Neighbours, faith groups and local organizations have carried a lot of weight here for decades, often with far less support from the City than they deserved. Housing stability, safety and youth opportunity come up at every door, and people are tired of promises. They want investment that actually arrives, and a councillor who shows up.",
    priority: 'Community Safety & Youth Investment',
    accentColor: 'red',
  },
  {
    id: 'black-creek',
    name: 'Black Creek',
    shortName: 'Black Creek',
    description:
      "Black Creek has green space a lot of the city would envy, from the ravine trails to the community farm on Jane Street. It also has many seniors on fixed incomes who are being squeezed by rent increases and cut off by transit gaps. Families raise food access again and again: affordable groceries are often too far away for anyone without a car.",
    priority: 'Senior Affordability & Food Security',
    accentColor: 'mustard',
  },
  {
    id: 'humbermede',
    name: 'Humbermede (Emery)',
    shortName: 'Humbermede',
    description:
      "Humbermede sits along the Humber River, and plenty of people here have called it home for a long time. Long-time residents are worried about being priced out as rents climb along the Weston Road corridor. Newcomer families are arriving and putting down roots, and they tell me childcare and settlement services haven't kept up with them.",
    priority: 'Affordable Housing & Family Services',
    accentColor: 'red',
  },
  {
    id: 'downsview',
    name: 'Downsview',
    shortName: 'Downsview',
    description:
      "In Downsview, the conversation always comes back to the redevelopment of the Downsview lands. People aren't against change. They want to make sure the families already living here get to stay, which means affordable housing built into every phase, not tacked on at the end. That's the most consistent thing I hear at the door here.",
    priority: 'Affordable Housing & Community Land Use',
    accentColor: 'forest',
  },
  {
    id: 'oakdale-beverley-heights',
    name: 'Oakdale-Beverley Heights',
    shortName: 'Oakdale-Beverley Hts',
    description:
      "Oakdale-Beverley Heights is a steady, hard-working neighbourhood near the 401, and food is the biggest worry here. Without a full-service grocery store close by, many families lean on food programs that are already stretched thin. The community kitchens and food banks doing that work need more support, not more thanks.",
    priority: 'Food Security & Community Investment',
    accentColor: 'mustard',
  },
]
