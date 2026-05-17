export default {
  name: 'donationMilestone',
  title: 'Donation Milestone',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'targetAmount', title: 'Target Amount', type: 'number' },
    { name: 'currentAmount', title: 'Current Amount (CAD)', type: 'number', initialValue: 0 },
    { name: 'donorCount', title: 'Donor Count', type: 'number', initialValue: 0 },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
