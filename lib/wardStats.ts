// ─── Ward 7 Census Data ───────────────────────────────────────────────────────
// Source: 2021 Census of Population, City of Toronto Ward Profile
//
// TO ADD REAL DATA: replace the 'value' string in each entry below with the
// verified figure from the City of Toronto Ward 7 Profile. Keep the 'note'
// field as contextual sub-label. Set verified: true when confirmed.
//
// Download the Ward Profile at:
// https://www.toronto.ca/city-government/data-research-maps/neighbourhoods-communities/ward-profiles/

export interface StatEntry {
  value: string   // actual figure (e.g. "112,020") or 'TO BE VERIFIED'
  note: string    // displayed as sub-label on the stat card
  verified: boolean
}

export const wardStats: {
  totalPopulation: StatEntry
  fiveYearGrowth: StatEntry
  medianAge: StatEntry
  medianHouseholdIncome: StatEntry
  lowIncomeRate: StatEntry
  tenantPct: StatEntry
  ownerPct: StatEntry
  visibleMinorityPct: StatEntry
  immigrantPct: StatEntry
  source: string
} = {
  totalPopulation: {
    value: 'TO BE VERIFIED',
    note: '2021 Census',
    verified: false,
  },
  fiveYearGrowth: {
    value: 'TO BE VERIFIED',
    note: 'Change from 2016',
    verified: false,
  },
  medianAge: {
    value: 'TO BE VERIFIED',
    note: 'Median age (years)',
    verified: false,
  },
  medianHouseholdIncome: {
    value: 'TO BE VERIFIED',
    note: 'After-tax, 2020',
    verified: false,
  },
  lowIncomeRate: {
    value: 'TO BE VERIFIED',
    note: 'After-tax low income (LICO)',
    verified: false,
  },
  tenantPct: {
    value: 'TO BE VERIFIED',
    note: 'Renter households',
    verified: false,
  },
  ownerPct: {
    value: 'TO BE VERIFIED',
    note: 'Owner households',
    verified: false,
  },
  visibleMinorityPct: {
    value: 'TO BE VERIFIED',
    note: 'Visible minority population',
    verified: false,
  },
  immigrantPct: {
    value: 'TO BE VERIFIED',
    note: 'Immigrants & non-permanent residents',
    verified: false,
  },
  source: '2021 Census of Population, City of Toronto Ward Profile',
}
