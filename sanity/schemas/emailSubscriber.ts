export default {
  name: 'emailSubscriber',
  title: 'Email Subscriber',
  type: 'document',
  fields: [
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'submittedAt', title: 'Subscribed', type: 'datetime' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Active', 'Unsubscribed'] },
      initialValue: 'Active',
    },
  ],
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: { select: { title: 'email', subtitle: 'status' } },
};
