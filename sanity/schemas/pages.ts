import {
  ELECTIONS_LINK_HINT,
  PARAGRAPHS_HINT,
  cardList,
  section,
  singleton,
  str,
  txt,
} from './fields';

// One document per page. Each `section` matches a section of that page,
// top to bottom. Empty fields fall back to the site's built-in text.

export const homePage = singleton('homePage', 'Home', [
  section('hero', 'Hero (top of page)', [
    str('headingStart', 'Heading, first part', 'e.g. "Stronger Together."'),
    str('headingHighlight', 'Heading, highlighted in red', 'e.g. "Real Change"'),
    str('headingEnd', 'Heading, last part', 'e.g. "for Ward 7."'),
    str('intro', 'Intro line'),
    txt('subIntro', 'Second line', 2),
    str('primaryButton', 'Donate button label'),
    str('secondaryButton', 'Volunteer button label'),
  ], 'The candidate photo is set in Site Settings.'),
  section('votingCallout', 'How to Vote callout', [
    str('heading', 'Heading'),
    txt('body', 'Text', 3),
    str('buttonLabel', 'Button label'),
  ]),
  section('donationStrip', 'Donation strip', [
    str('heading', 'Heading'),
    str('subheading', 'Subheading'),
  ], 'Amount buttons and the donation form are fixed.'),
  section('social', 'Follow the Campaign', [
    str('label', 'Label'),
  ], 'Links and handles are set in Site Settings → Social links.'),
  section('subscribe', 'Join the community (email signup)', [
    str('heading', 'Heading'),
    str('subheading', 'Subheading'),
  ]),
  section('votingTimeline', 'Key voting timelines', [
    str('heading', 'Heading'),
    str('advanceLabel', 'Advance voting label'),
    str('advanceDates', 'Advance voting dates'),
    str('advanceHours', 'Advance voting hours'),
    str('electionLabel', 'Election Day label'),
    str('electionDate', 'Election Day date'),
    str('electionHours', 'Election Day hours'),
    str('linkText', 'Link to voting guide'),
  ]),
  section('priorities', "What I'll Fight For", [
    str('heading', 'Heading'),
    cardList('items', 'Priorities'),
  ]),
  section('closingCta', 'Closing call to action', [
    str('heading', 'Heading'),
    str('primaryButton', 'Donate button label'),
    str('secondaryButton', 'Volunteer button label'),
  ]),
]);

export const aboutPage = singleton('aboutPage', 'About', [
  section('hero', 'Hero', [str('heading', 'Heading'), str('tagline', 'Tagline')]),
  section('story', 'My story', [
    txt('body', 'Story', 10, PARAGRAPHS_HINT),
    txt('quote', 'Pull quote', 3),
  ]),
  section('whyRunning', "Why I'm Running", [
    str('heading', 'Heading'),
    txt('body', 'Text', 10, PARAGRAPHS_HINT),
  ]),
  section('closing', 'Closing', [
    txt('quote', 'Closing quote', 2),
    str('buttonLabel', 'Volunteer button label'),
  ]),
]);

export const ourWardPage = singleton('ourWardPage', 'Our Ward', [
  section('intro', 'Intro', [
    str('headingPrefix', 'Heading, first part', 'e.g. "Ward 7:"'),
    str('headingHighlight', 'Heading, highlighted in red'),
    txt('body', 'Intro text', 5),
  ]),
  section('whatWard', 'What ward am I in?', [
    str('heading', 'Heading', 'Keep this phrased the way people search.'),
    txt('body', 'Answer', 8, `${PARAGRAPHS_HINT} The first sentence should answer the question on its own. ${ELECTIONS_LINK_HINT}`),
  ]),
  section('neighbourhoodsSection', 'Neighbourhoods heading', [
    str('heading', 'Heading'),
    txt('intro', 'Intro text', 2),
  ]),
  {
    name: 'neighbourhoods',
    title: 'Neighbourhoods (map)',
    description: 'Each entry matches an area on the ward map. Edit the text freely; the map area is fixed.',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          { ...str('mapId', 'Map area'), readOnly: true },
          str('name', 'Name'),
          txt('description', 'Description', 5),
          str('priority', 'Platform priority'),
          {
            ...str('accentColor', 'Colour'),
            options: { list: ['red', 'mustard', 'forest'], layout: 'radio', direction: 'horizontal' },
          },
        ],
        preview: { select: { title: 'name', subtitle: 'priority' } },
      },
    ],
    options: { sortable: false },
  },
]);

export const communityPage = singleton('communityPage', 'Community', [
  section('hero', 'Hero', [str('heading', 'Heading'), txt('intro', 'Intro text', 3)]),
  cardList('concerns', 'What residents are raising (cards)'),
  section('gallerySection', 'Photo gallery heading', [
    str('heading', 'Heading'),
    str('intro', 'Intro text'),
  ]),
  {
    name: 'gallery',
    title: 'Photo gallery',
    type: 'array',
    options: { layout: 'grid' },
    of: [
      {
        type: 'image',
        options: { hotspot: true },
        fields: [{ ...str('alt', 'Alt text', 'Describe the photo for screen readers.') }],
      },
    ],
  },
  txt('quote', 'Quote', 3),
  section('inquiry', 'Contact form', [str('heading', 'Heading')], 'Messages sent through this form appear in Inbox → Community Inquiries.'),
]);

export const resourcesPage = singleton('resourcesPage', 'How to Vote (Voting Guide)', [
  section('hero', 'Hero', [str('heading', 'Heading'), txt('intro', 'Intro text', 3)]),
  section('registrationCard', 'Voter registration card', [
    str('label', 'Label'),
    str('deadline', 'Deadline (large text)'),
    str('source', 'Source line'),
    str('badge', 'Badge text'),
    str('question', 'Question'),
    txt('answer', 'Answer', 3),
  ]),
  section('actionCards', 'Polling station / registration links', [
    str('pollingStationLabel', 'Polling station link label'),
    str('registrationLabel', 'Registration link label'),
    txt('disclaimer', 'Note under the links', 3, ELECTIONS_LINK_HINT),
  ]),
  {
    name: 'votingQuestions',
    title: 'Voting questions',
    description:
      'Each question is a heading on the page and is sent to Google as an FAQ. Phrase questions the way people search, and make the first paragraph answer the question completely.',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          str('question', 'Question'),
          txt('answer', 'Answer', 6, `${PARAGRAPHS_HINT} ${ELECTIONS_LINK_HINT}`),
          {
            name: 'showAdvanceLocations',
            title: 'Show the advance voting locations after the first paragraph',
            type: 'boolean',
            initialValue: false,
          },
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } },
      },
    ],
  },
  {
    name: 'advanceLocations',
    title: 'Advance voting locations',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [str('name', 'Name'), str('address', 'Address')],
        preview: { select: { title: 'name', subtitle: 'address' } },
      },
    ],
  },
  section('candidateNote', 'Note about Lorna', [
    txt('body', 'Text', 4),
    str('linkText', 'Link text (goes to About)'),
  ]),
  section('moreQuestions', 'More questions', [
    str('heading', 'Heading'),
    str('wardQuestion', 'Ward question'),
    txt('wardAnswer', 'Ward answer', 5, `${PARAGRAPHS_HINT} ${ELECTIONS_LINK_HINT}`),
    str('involvedQuestion', 'Get involved question'),
    txt('involvedAnswer', 'Get involved answer', 3),
  ]),
  txt('finalDisclaimer', 'Disclaimer (bottom of page)', 3, ELECTIONS_LINK_HINT),
]);

export const howToHelpPage = singleton('howToHelpPage', 'How to Help', [
  section('hero', 'Hero', [str('heading', 'Heading')]),
  section('donateCard', 'Donate card', [str('heading', 'Heading'), txt('body', 'Text', 2), str('buttonLabel', 'Button label')]),
  section('volunteerCard', 'Volunteer card', [str('heading', 'Heading'), txt('body', 'Text', 2), str('buttonLabel', 'Button label')]),
  section('shareCard', 'Spread the Word card', [str('heading', 'Heading'), txt('body', 'Text', 2)], 'Share buttons are fixed.'),
  section('whyGrassroots', 'Why Grassroots?', [str('heading', 'Heading'), txt('body', 'Text', 6, PARAGRAPHS_HINT)]),
  section('contributionUses', 'Where your contribution goes', [
    str('heading', 'Heading'),
    { name: 'items', title: 'List items', type: 'array', of: [{ type: 'string' }] },
  ]),
  section('contributions', 'How do contributions work?', [
    str('heading', 'Heading'),
    txt('intro', 'Intro', 3, 'Include the current contribution limit. Check figures at toronto.ca/elections before each election.'),
    {
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [str('title', 'Bold lead-in'), txt('body', 'Text', 3, ELECTIONS_LINK_HINT)],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
    },
    txt('closing', 'Closing line', 2),
  ]),
]);

export const volunteerPage = singleton('volunteerPage', 'Volunteer', [
  section('hero', 'Heading', [str('heading', 'Heading'), txt('intro', 'Intro text', 2)]),
  {
    name: 'roles',
    title: 'Volunteer roles',
    description: 'The role title is included in the signup email the team receives. The icon is fixed per role.',
    type: 'array',
    options: { sortable: true },
    of: [
      {
        type: 'object',
        fields: [
          { ...str('roleId', 'Icon'), readOnly: true },
          str('title', 'Title'),
          txt('description', 'Description', 2),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      },
    ],
  },
  section('success', 'After signing up', [
    str('heading', 'Heading'),
    str('body', 'Message (the chosen role is added at the end)'),
    str('donateHeading', 'Donate box heading'),
    txt('donateBody', 'Donate box text', 2),
    str('donateButton', 'Donate button label'),
  ]),
]);

export const thankYouPage = singleton('thankYouPage', 'Thank You (after donating)', [
  str('heading', 'Heading'),
  str('tagline', 'Tagline'),
  txt('body', 'Text', 4),
  section('buttons', 'Buttons', [
    str('volunteer', 'Volunteer button'),
    str('share', 'Share button'),
    str('home', 'Home button'),
  ]),
]);

export const pageSchemas = [
  homePage,
  aboutPage,
  ourWardPage,
  communityPage,
  resourcesPage,
  howToHelpPage,
  volunteerPage,
  thankYouPage,
];
