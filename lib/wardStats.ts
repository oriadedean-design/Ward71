// ─── Ward 7 — Verified 2021 Census Data ──────────────────────────────────────
// Source: 2021 Census of Population, City of Toronto Ward Profile
// All figures verified. To update a value, edit its `value` string below.

export interface StatEntry {
  value: string
  note?: string
}

export interface BirthplaceEntry {
  country: string
  pct: string
}

export interface EmploymentField {
  field: string
  pct: string
}

export const wardStats = {
  ward: 'Ward 7 — Humber River-Black Creek',
  source: '2021 Census of Population, City of Toronto Ward Profile',

  // ── 1. Core Demographics ────────────────────────────────────────────────────
  coreDemographics: {
    totalPopulation:  { value: '111,200'                                  },
    fiveYearGrowth:   { value: '3.2%',    note: '2016–2021'              },
    medianAge:        { value: '37.6',    note: 'years'                  },
    workingAgePct:    { value: '68%',     note: 'ages 15–64'             },
    dependencyRatio:  { value: '46',      note: 'per 100 working-age'    },
  },

  // ── 2. Housing Affordability ────────────────────────────────────────────────
  housingAffordability: {
    totalDwellings:              { value: '37,675'                                          },
    rentalShare:                 { value: '52%',    note: 'rental housing'                 },
    ownerShare:                  { value: '48%',    note: 'owned housing'                  },
    avgMonthlyRenterCost:        { value: '$1,261', note: 'avg. monthly shelter cost'      },
    tenantStressRate:            { value: '33%',    note: 'renters paying >30% of income'  },
    lowIncomeRateOverall:        { value: '15.1%',  note: 'after-tax LICO'                 },
    lowIncomeRateSeniorsYouth:   { value: '18%',    note: 'seniors & youth'                },
  },

  // ── 3. Immigration & Language ───────────────────────────────────────────────
  immigrationLanguage: {
    totalImmigrants:     { value: '62,700',  note: '56.4% of total population'    },
    recentImmigrants:    { value: '8,885',   note: '2016–2021 arrivals'           },
    englishAtHome:       { value: '57%',     note: 'English primary language'     },
    nonOfficialAtHome:   { value: '32%',     note: 'non-official language at home'},
    topBirthplaces: [
      { country: 'Viet Nam',     pct: '17.3%' },
      { country: 'Philippines',  pct: '16.0%' },
      { country: 'Italy',        pct: '13.7%' },
      { country: 'Jamaica',      pct: '12.2%' },
    ] as BirthplaceEntry[],
  },

  // ── 4. Labour & Education ───────────────────────────────────────────────────
  labourEducation: {
    unemploymentRate:         { value: '10.2%',  note: 'local unemployment rate'         },
    participationRate:        { value: '57.5%',  note: 'labour force participation'      },
    noHighSchool:             { value: '28%',    note: 'no credential, ages 15+'         },
    postSecondaryCompletion:  { value: '41%',    note: 'completion, ages 15+'            },
    topEmploymentFields: [
      { field: 'Sales & Service',      pct: '28.1%' },
      { field: 'Trades & Transport',   pct: '21.0%' },
      { field: 'Manufacturing',        pct: '12.9%' },
    ] as EmploymentField[],
  },
}
