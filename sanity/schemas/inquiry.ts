export default {
  name: 'inquiry',
  title: 'Community Inquiry',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'postalCode', title: 'Postal Code', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Housing',
          'Community Safety',
          'Streets and Parks',
          'Youth and Family',
          'Seniors',
          'Small Business',
          'Other',
        ],
      },
    },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['New', 'Contacted', 'Resolved'] },
      initialValue: 'New',
    },
  ],
  orderings: [
    { title: 'Most Recent', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
}
