export default {
  name: 'donationRecord',
  title: 'Donation Record',
  type: 'document',
  fields: [
    { name: 'donorName', title: 'Donor Full Name', type: 'string' },
    { name: 'donorEmail', title: 'Donor Email', type: 'string' },
    { name: 'donorPhone', title: 'Donor Phone', type: 'string' },
    {
      name: 'donorAddress',
      title: 'Donor Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'province', title: 'Province', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    },
    { name: 'amount', title: 'Amount (CAD)', type: 'number' },
    { name: 'stripePaymentIntentId', title: 'Stripe Payment Intent ID', type: 'string' },
    { name: 'ontarioResidencyConfirmed', title: 'Ontario Residency Confirmed', type: 'boolean' },
    { name: 'selfAttested', title: 'Self-Attestation Confirmed', type: 'boolean' },
    { name: 'contributorType', title: 'Contributor Type', type: 'string' },
    { name: 'paidAt', title: 'Paid At', type: 'datetime' },
    { name: 'receiptSent', title: 'Receipt Sent', type: 'boolean', initialValue: false },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['completed', 'refunded'], layout: 'radio' },
      initialValue: 'completed',
    },
  ],
  orderings: [
    { title: 'Most Recent', name: 'paidAtDesc', by: [{ field: 'paidAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'donorName', subtitle: 'amount', media: 'paidAt' },
    prepare({ title, subtitle }: Record<string, any>) {
      return { title, subtitle: `$${subtitle} CAD` };
    },
  },
}
