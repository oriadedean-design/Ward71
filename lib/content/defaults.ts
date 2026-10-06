// Default site content. This is what scripts/seed-sanity.ts copies into Sanity,
// and what the site falls back to for any field left empty in the Studio.
// Once seeded, edit content in Sanity Studio (/studio), not here.
//
// Multi-paragraph fields use a blank line ("\n\n") between paragraphs.
// Relative imports only: this file is also loaded by `sanity exec`.

import { neighbourhoods } from '../wardData';

export interface SanityImage {
  _key?: string;
  _type?: 'image';
  asset?: { _ref: string; _type?: 'reference' };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
}

export const siteSettingsDefaults = {
  candidatePhoto: null as SanityImage | null,
  contactEmail: 'votelornaantwi@gmail.com',
  social: {
    facebookUrl: 'https://www.facebook.com/lornaantwi',
    facebookName: 'Lorna Antwi',
    instagramUrl: 'https://www.instagram.com/lornaantwi_/',
    instagramHandle: '@lornaantwi_',
    xUrl: '',
    linkedinUrl: '',
  },
  footer: {
    tagline: 'Candidate for Toronto City Council, Ward 7',
    authorization: 'Authorized by the CFO for the Lorna Antwi Campaign.',
  },
  votingBanner: {
    enabled: true,
    text: 'Advance voting Oct 6–11 · Election Day Mon, Oct 26.',
    linkText: 'How to vote in Ward 7 →',
  },
  donationBanner: {
    heading: 'Support Lorna Antwi',
    subheading: 'No corporate money. Just neighbours.',
  },
};

export const homePageDefaults = {
  hero: {
    headingStart: 'Stronger Together.',
    headingHighlight: 'Real Change',
    headingEnd: 'for Ward 7.',
    intro: 'Lorna Antwi for Toronto City Council, Humber River-Black Creek.',
    subIntro:
      'Counsellor with Toronto Shelter & Support Services. Lifelong Humber River-Black Creek resident. Running on lived experience.',
    primaryButton: 'Donate Now',
    secondaryButton: 'Volunteer With Me',
  },
  votingCallout: {
    heading: 'How to vote in Ward 7',
    body:
      'Advance voting runs October 6 to 11, 10 a.m. to 7 p.m., at two ward-wide locations. Election Day is Monday, October 26, 10 a.m. to 8 p.m.',
    buttonLabel: 'Where to vote, dates, and ID →',
  },
  donationStrip: {
    heading: 'Support the Campaign',
    subheading: 'No corporate money. Just neighbours.',
  },
  social: {
    label: 'Follow the Campaign',
  },
  subscribe: {
    heading: 'Vote for Lorna Antwi',
    subheading: 'Join the community to stay updated on the campaign.',
  },
  votingTimeline: {
    heading: 'Key Voting Timelines - 2026',
    advanceLabel: 'Advance Voting',
    advanceDates: 'Tuesday, October 6 to Sunday, October 11',
    advanceHours: '10:00 AM - 7:00 PM',
    electionLabel: 'Election Day',
    electionDate: 'Monday, October 26',
    electionHours: '10:00 AM - 8:00 PM',
    linkText: 'Where to vote in Ward 7: locations, dates, and ID →',
  },
  priorities: {
    heading: "What I'll Fight For in Ward 7",
    items: [
      { title: 'Affordable Housing and Tenant Protections', description: 'Fighting for rent control, stronger eviction prevention, faster construction, and reducing the 10-year wait for subsidized housing. Supporting first-time homebuyers facing affordability barriers.' },
      { title: 'Community Safety and Mental Health', description: 'Investing in prevention, youth outreach, after-school programs, and mental health supports that address root causes.' },
      { title: 'Streets, Parks, and Infrastructure', description: 'Cleaner streets, faster pothole repairs, more parks with pools, and safe gathering spaces for families.' },
      { title: 'Youth Opportunity and Mentorship', description: 'Expanding youth employment, training, and mentorship so young people have clear pathways to success.' },
      { title: 'Small Business and Local Economy', description: 'Reducing barriers for local entrepreneurs and improving access to city supports for community-based businesses.' },
      { title: 'Affordability for Seniors and Families', description: 'Property tax fairness and stronger supports for seniors, newcomers, and low- to moderate-income households.' },
      { title: 'Food Security and Ending Hunger', description: 'Stronger community food programs, affordable and culturally appropriate food, support for food banks and community kitchens, and long-term solutions to poverty.' },
      { title: 'Support for Families and Children with Disabilities', description: 'Accessible community services, inclusive recreation, educational supports, and real resources for families raising children with disabilities. No parent should struggle alone.' },
      { title: 'Lower Property Taxes', description: 'Fighting for responsible spending and lower property taxes at City Hall. Residents already face rising costs for housing, groceries, and essentials — taxpayers deserve a government that spends wisely, reduces waste, and delivers real value for every dollar collected.' },
      { title: 'Safe and Welcoming Community Spaces', description: "Every resident deserves access to safe, inclusive community spaces where people of all ages, backgrounds, and abilities can connect and thrive. I'll invest in community centres, parks, and programming that truly serves Ward 7 residents." },
    ],
  },
  closingCta: {
    heading: 'Join us. This campaign is built by neighbours.',
    primaryButton: 'Donate',
    secondaryButton: 'Volunteer',
  },
};

export const aboutPageDefaults = {
  hero: {
    heading: 'My Story.',
    tagline: 'Rooted in service. Built for our community.',
  },
  story: {
    body:
      'My connection to Humber River-Black Creek is both personal and professional. I attended Brookview Middle School and later studied at Seneca Polytechnic at York — experiences that shaped my understanding of the community and the importance of opportunity, education, and support for young people and families.\n\nOver the years I have worked closely with children, youth, families, seniors, newcomers, and refugees from many backgrounds. Through community advocacy and social services, I have helped residents facing housing instability, food insecurity, unemployment, mental health challenges, and barriers to opportunity — building meaningful relationships throughout the ward and a deep understanding of both its challenges and its strengths.',
    quote:
      'Every resident deserves access to opportunity, support, safety, and leadership that is present, accountable, and community-focused.',
  },
  whyRunning: {
    heading: "Why I'm Running",
    body:
      'I am running because the people of Humber River-Black Creek deserve leadership that is present, compassionate, and focused on real solutions. Through years of work in community advocacy and social services — including as a counsellor with Toronto Shelter & Support Services — I have seen firsthand the challenges residents face: rising housing costs, food insecurity, unemployment, mental health struggles, and a lack of opportunities for youth and families.\n\nI have listened to single parents worried about rent, youth searching for mentorship, seniors struggling with affordability, and newcomers navigating a new city. These experiences showed me that our community needs a strong voice at City Hall — someone connected to the community, who understands its realities, and is committed to creating safer neighbourhoods, affordable housing, and stronger supports for all.',
  },
  closing: {
    quote: 'This campaign is about service, representation, and building a stronger future together.',
    buttonLabel: 'Volunteer With Me',
  },
};

export const ourWardPageDefaults = {
  intro: {
    headingPrefix: 'Ward 7:',
    headingHighlight: 'Humber River-Black Creek',
    body:
      "Ward 7 is one of Toronto's 25 council wards. It covers Humber River-Black Creek in northwest North York, and one city councillor represents it at City Hall. I know these streets because I've spent years working in them, helping neighbours find housing and get through systems that don't always make it easy.",
  },
  whatWard: {
    heading: 'What ward am I in?',
    body:
      "If you live in Humber River-Black Creek, you're in Ward 7. The ward runs from Steeles Avenue in the north to Highway 401 in the south, and from the Humber River in the west to Keele Street in the east.\n\nThat takes in Jane and Finch, Black Creek, Glenfield-Jane Heights, Downsview, Humbermede, Humber Summit and Oakdale-Beverley Heights. Plenty of people aren't sure which ward they're in, especially near the edges, so if you want to be certain, put your address into the City's lookup at toronto.ca/elections. It takes about a minute.",
  },
  neighbourhoodsSection: {
    heading: 'Neighbourhoods in Ward 7',
    intro:
      "Seven neighbourhoods, each with its own character. Here's how I see them, and what people keep telling me at their doors.",
  },
  neighbourhoods: neighbourhoods.map((n) => ({
    mapId: n.id,
    name: n.name,
    description: n.description,
    priority: n.priority,
    accentColor: n.accentColor as string,
  })),
};

export const communityPageDefaults = {
  hero: {
    heading: "What I'm Hearing in Our Community.",
    intro:
      'Across Humber River-Black Creek, residents are raising urgent concerns: affordability, housing instability, community safety, food insecurity, youth opportunity, and access to essential services.',
  },
  concerns: [
    { title: 'Housing and Cost of Living', description: 'Families are worried about rising rent, eviction prevention, overcrowding, and homelessness. First-time homebuyers face real barriers to ownership.' },
    { title: 'Streets and Neighbourhoods', description: 'Residents want cleaner streets, safer public spaces, faster pothole repairs, and better infrastructure throughout the community.' },
    { title: 'Youth and Opportunity', description: 'Parents and young people speak about the need for more employment, mentorship, skills training, safe recreational spaces, and pathways to success.' },
    { title: 'Small Business', description: 'Small business owners share concerns about how difficult it is to start and sustain a business due to rising costs and limited support.' },
    { title: 'Seniors and Newcomers', description: 'Seniors raise concerns about affordability, accessibility, and isolation. Newcomers face barriers to employment, housing, and available resources.' },
    { title: 'Food Security', description: 'Supporting stronger community food programs, expanding access to affordable and culturally appropriate food, backing local food banks and community kitchens, and advocating for long-term solutions to poverty and economic inequality.' },
    { title: 'Families and Children with Disabilities', description: 'Parents and caregivers raising children with disabilities need accessible services, inclusive recreation, and educational supports. They should not have to struggle alone to find help.' },
  ],
  gallerySection: {
    heading: 'In the Community',
    intro: 'Moments from the campaign trail across Humber River-Black Creek.',
  },
  gallery: [] as SanityImage[],
  quote:
    'Residents want leadership that listens, takes action, and works collaboratively with the community to create practical and lasting solutions.',
  inquiry: {
    heading: 'Have a concern? Tell Lorna directly.',
  },
};

export const resourcesPageDefaults = {
  hero: {
    heading: 'How to Vote in Ward 7',
    intro:
      'Dates, locations, ID and registration for the 2026 Toronto municipal election in Humber River-Black Creek (Ward 7), in plain language. For anything official, the City of Toronto has the final word.',
  },
  registrationCard: {
    label: 'Voters\' list deadline (online)',
    deadline: 'Sun, Oct 11, 7 p.m.',
    source: 'City of Toronto · MyVote',
    badge: 'Update at toronto.ca/elections',
    question: 'Can I still register on voting day?',
    answer:
      'Yes. In Ontario municipal elections you can register to vote in-person at your polling station on election day and during advance voting. Bring qualifying ID that shows your name and your Toronto address.',
  },
  actionCards: {
    pollingStationLabel: 'Find Your Polling Station',
    registrationLabel: 'Check Your Voter Registration',
    disclaimer:
      'Official information from the City of Toronto. Election Day voting places are assigned by address. For the most current details, visit toronto.ca/elections.',
  },
  // Each answer's first paragraph must fully answer the question on its own.
  votingQuestions: [
    {
      question: 'How do I vote in the 2026 Toronto municipal election?',
      answer:
        "Make sure you're on the voters list, find out where to go, bring ID with your name and Toronto address, and vote during advance voting (October 6 to 11) or on Election Day, Monday, October 26, 2026.\n\nThat's honestly all there is to it. If this is your first time voting in Toronto, or your first time voting since becoming a citizen, you belong there as much as anyone, and the election workers will walk you through it.",
      showAdvanceLocations: false,
    },
    {
      question: 'When is advance voting?',
      answer:
        "Advance voting in Ward 7 runs Tuesday, October 6 to Sunday, October 11, 2026.\n\nThat's six days, including a full weekend. If Election Day is a work day for you, or you'd just like it done, this is your chance.",
      showAdvanceLocations: false,
    },
    {
      question: 'What are the voting hours?',
      answer:
        'Advance voting is open 10 a.m. to 7 p.m. each day from October 6 to 11. On Election Day, Monday, October 26, polls are open 10 a.m. to 8 p.m.\n\nThe City sets these hours. If anything changes, toronto.ca/elections will have it first.',
      showAdvanceLocations: false,
    },
    {
      question: 'Where are the advance voting locations in Ward 7?',
      answer:
        "Ward 7 has two advance voting locations, and any Ward 7 voter can use either one:\n\nGo to whichever is easier for you to get to. You don't need an appointment.",
      showAdvanceLocations: true,
    },
    {
      question: 'Where do I vote on Election Day?',
      answer:
        "On Election Day you vote at the polling place assigned to your address, which may not be one of the advance voting locations. It's printed on the voter information card the City mailed you, and you can also look it up on MyVote at toronto.ca/elections.\n\nIt's worth checking the night before. It might not be where you voted last time.",
      showAdvanceLocations: false,
    },
    {
      question: 'What do I need to bring?',
      answer:
        "Bring ID that shows your name and your Toronto address.\n\nLots of documents count, not just a driver's licence. Check the City's full list at toronto.ca/elections before you head out so you're not turned around at the door.",
      showAdvanceLocations: false,
    },
    {
      question: 'Am I registered to vote?',
      answer:
        "You can check in a couple of minutes on MyVote at toronto.ca/elections, and update your details there if anything has changed.\n\nIf you're not on the list, you can still register in person when you vote, as long as you bring qualifying ID. If you've moved recently, check anyway, because your old address could send you to the wrong place.",
      showAdvanceLocations: false,
    },
  ],
  advanceLocations: [
    { name: 'Domenico DiLuca Community Rec Centre', address: '25 Stanley Road' },
    { name: 'Driftwood Community Recreation Centre', address: '4401 Jane Street' },
  ],
  candidateNote: {
    body:
      "Lorna Antwi is running for Toronto City Council in Ward 7, Humber River-Black Creek, so whether you vote early or on October 26, her name will be on your ballot for City Councillor. She's spent years helping neighbours get through complicated systems, and she'd like voting to be one thing that feels simple.",
    linkText: 'Learn more about Lorna',
  },
  moreQuestions: {
    heading: 'More Questions',
    wardQuestion: 'Am I in Ward 7 (Humber River-Black Creek)?',
    wardAnswer:
      "If you live in Humber River-Black Creek, between Steeles and the 401 and between the Humber River and Keele, you're in Ward 7. The City's ward lookup at toronto.ca/elections will confirm it for your exact address.\n\nPostal codes starting with M3L, M3M, M3N, M9L, M9M and M9N are mostly in the ward, but boundaries don't follow postal codes exactly, so near the edges it's worth the minute to check.",
    involvedQuestion: 'How can I get involved beyond voting?',
    involvedAnswer:
      'You can volunteer, chip in a contribution, or just tell your neighbours about the campaign. All of it helps, and none of it requires experience.',
  },
  finalDisclaimer:
    'For official election information, always refer to the City of Toronto Elections office at toronto.ca/elections. This page is provided by the Lorna Antwi campaign as a convenience and is not an official election resource.',
};

export const howToHelpPageDefaults = {
  hero: {
    heading: 'Three ways to make a difference.',
  },
  donateCard: {
    heading: 'Donate',
    body: 'Power a grassroots campaign. Every dollar helps us reach more residents and listen to more stories.',
    buttonLabel: 'Donate Now',
  },
  volunteerCard: {
    heading: 'Volunteer',
    body: 'Join the team. From door knocking to phone banking, every role matters.',
    buttonLabel: 'Volunteer With Me',
  },
  shareCard: {
    heading: 'Spread the Word',
    body: "Share Lorna's campaign with your neighbours, family, and community.",
  },
  whyGrassroots: {
    heading: 'Why Grassroots?',
    body:
      'This campaign is rooted in people, not big money. Our goal is to build a grassroots movement powered by residents and community members who believe in stronger neighbourhoods, safer communities, and real change at City Hall.\n\nYour contribution is not just a donation — it is an investment in a stronger, more connected future for everyone in our community.',
  },
  contributionUses: {
    heading: 'Where your contribution goes',
    items: [
      'Community outreach materials (flyers, brochures, signage)',
      'Door-to-door canvassing',
      'Community events and town halls',
      'Volunteer coordination and training',
      'Basic campaign operations (transportation, communication, supplies)',
    ],
  },
  // Figures from toronto.ca/elections (2026). Re-check before each election.
  contributions: {
    heading: 'How do contributions work?',
    intro:
      "Contributions can only come from individual Ontario residents, not corporations or unions, and each person can give up to $1,200 to a single council candidate. It's your money, so here's the rest of it straight:",
    points: [
      {
        title: 'You may get some of it back.',
        body: "Toronto's Contribution Rebate Program refunds 75% of eligible contributions over $25 and up to $300, and a smaller share of larger amounts. A $100 contribution gets $75 back; a $1,200 contribution gets about $642 back. The City runs the program, so the details and how to apply are at toronto.ca/elections.",
      },
      {
        title: 'Over $100 is public.',
        body: "If you give more than $100, your name and the amount appear in the campaign's financial filing. That's the law, and it's part of what keeps local elections honest.",
      },
      {
        title: "It isn't federally tax deductible.",
        body: "Municipal contributions don't qualify for the federal political tax credit, so the City rebate is the main way any of it comes back to you.",
      },
    ],
    closing:
      'Give what feels right for your household. Every contribution is reported the same way, and every dollar goes to the work listed above.',
  },
};

export const volunteerPageDefaults = {
  hero: {
    heading: 'Join the Team',
    intro: "Every role matters. Pick what fits your schedule and skills — we'll take it from there.",
  },
  // `roleId` picks the icon and must stay one of the built-in ids.
  roles: [
    { roleId: 'canvassing', title: 'Door Knocking & Canvassing', description: "Meet neighbours face-to-face across Ward 7 and share Lorna's message." },
    { roleId: 'phone-banking', title: 'Phone Banking', description: 'Connect with voters by phone from wherever you are.' },
    { roleId: 'events', title: 'Event Support & Setup', description: 'Help organize and run campaign events, town halls, and canvass launches.' },
    { roleId: 'data', title: 'Data Entry & Admin', description: 'Keep the campaign organized with accurate records and behind-the-scenes support.' },
    { roleId: 'social-media', title: 'Social Media Support', description: "Create content and help amplify Lorna's voice online." },
    { roleId: 'outreach', title: 'Community Outreach', description: 'Engage community organizations, attend events, and build grassroots support.' },
  ],
  success: {
    heading: 'Thank you for joining.',
    body: 'Someone from the team will be in touch within 48 hours about',
    donateHeading: 'Want to also contribute?',
    donateBody: 'Grassroots donations fund canvassing, signs, and events. No corporate money.',
    donateButton: 'Donate to the Campaign',
  },
};

export const thankYouPageDefaults = {
  heading: 'Thank you.',
  tagline: 'Your support powers this campaign.',
  body:
    'Your contribution helps us connect with more residents, listen to more stories, and bring real change to Humber River-Black Creek. A receipt will be sent to your email shortly.',
  buttons: {
    volunteer: 'Volunteer With Me',
    share: "Share Lorna's Campaign",
    home: 'Return Home',
  },
};

// Singleton document id (= schema type) → defaults.
export const PAGE_DEFAULTS = {
  siteSettings: siteSettingsDefaults,
  homePage: homePageDefaults,
  aboutPage: aboutPageDefaults,
  ourWardPage: ourWardPageDefaults,
  communityPage: communityPageDefaults,
  resourcesPage: resourcesPageDefaults,
  howToHelpPage: howToHelpPageDefaults,
  volunteerPage: volunteerPageDefaults,
  thankYouPage: thankYouPageDefaults,
};

export type PageId = keyof typeof PAGE_DEFAULTS;
