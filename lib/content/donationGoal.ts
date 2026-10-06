// Default progress bar settings; also used by scripts/seed-sanity.ts.
// Relative imports only: this file is also loaded by `sanity exec`.

export const DONATION_GOAL_ID = 'donationGoal';

export const donationGoalDefaults = {
  targetAmount: 60000,
  offlineAmount: 0,
  offlineDonorCount: 0,
  showDonorCount: false,
  text: {
    headingPrefix: 'Help us reach our',
    headingSuffix: 'grassroots goal.',
    raisedLabel: 'Currently raised:',
    body: 'This campaign is powered by people, not corporate PACs. Every dollar goes directly into community outreach.',
    buttonLabel: 'Contribute Now',
  },
};
