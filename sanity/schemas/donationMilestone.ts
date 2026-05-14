export default {
  name: 'donationMilestone',
  title: 'Donation Milestone',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'targetAmount', title: 'Target Amount', type: 'number' },
    { name: 'currentAmount', title: 'Current Amount', type: 'number' },
    { name: 'order', title: 'Order', type: 'number' }
  ]
}
