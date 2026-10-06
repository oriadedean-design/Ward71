import { section, str, txt } from './fields';

// The donation progress bar. Shown in the Studio as a single document
// (id "donationGoal"). The online total is calculated from Donation Records,
// which the Stripe webhook creates automatically.
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
      name: 'offlineAmount',
      title: 'Raised outside the website (CAD)',
      type: 'number',
      description:
        'Cheques, e-transfers and cash. Added to the online donations, which are counted automatically.',
      initialValue: 0,
    },
    {
      name: 'offlineDonorCount',
      title: 'Donors outside the website',
      type: 'number',
      initialValue: 0,
    },
    { name: 'showDonorCount', title: 'Show number of donors', type: 'boolean', initialValue: false },
    section('text', 'Progress bar text', [
      str('headingPrefix', 'Heading before the goal amount', 'e.g. "Help us reach our"'),
      str('headingSuffix', 'Heading after the goal amount', 'e.g. "grassroots goal."'),
      str('raisedLabel', 'Raised label', 'e.g. "Currently raised:"'),
      txt('body', 'Text under the bar', 2),
      str('buttonLabel', 'Button label'),
    ]),
    // Legacy fields from the original counter-based setup; no longer used.
    { name: 'label', title: 'Label', type: 'string', hidden: true },
    { name: 'currentAmount', title: 'Current Amount (CAD)', type: 'number', hidden: true },
    { name: 'donorCount', title: 'Donor Count', type: 'number', hidden: true },
    { name: 'order', title: 'Order', type: 'number', hidden: true },
  ],
  preview: { prepare: () => ({ title: 'Donation Goal' }) },
};
