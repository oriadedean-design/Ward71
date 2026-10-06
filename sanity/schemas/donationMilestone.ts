import { section, str, txt } from './fields';

// The donation progress bar, updated by hand. Shown in the Studio as a single
// document (id "donationGoal"). Changes appear on the site as soon as they're published.
export default {
  name: 'donationMilestone',
  title: 'Donation Goal',
  type: 'document',
  fields: [
    {
      name: 'targetAmount',
      title: 'Goal (CAD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'raisedAmount',
      title: 'Amount raised so far (CAD)',
      type: 'number',
      description: 'Update this by hand, e.g. from the Stripe dashboard plus any cheques or e-transfers.',
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'donorCount',
      title: 'Number of donors',
      type: 'number',
      description: 'Only shown if "Show number of donors" is on.',
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0),
    },
    { name: 'showDonorCount', title: 'Show number of donors', type: 'boolean', initialValue: false },
    section('text', 'Progress bar text', [
      str('headingPrefix', 'Heading before the goal amount', 'e.g. "Help us reach our"'),
      str('headingSuffix', 'Heading after the goal amount', 'e.g. "grassroots goal."'),
      str('raisedLabel', 'Raised label', 'e.g. "Currently raised:"'),
      txt('body', 'Text under the bar', 2),
      str('buttonLabel', 'Button label'),
    ]),
  ],
  preview: { prepare: () => ({ title: 'Donation Goal' }) },
};
