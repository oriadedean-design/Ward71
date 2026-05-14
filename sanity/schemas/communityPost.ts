export default {
  name: 'communityPost',
  title: 'Community Post',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      fields: [{ name: 'alt', title: 'Alt text', type: 'string', validation: (Rule: any) => Rule.required() }]
    },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'submitterName', title: 'Submitter Name', type: 'string' },
    { 
      name: 'approvalStatus', 
      title: 'Approval Status', 
      type: 'string',
      options: {
        list: ['Pending', 'Approved', 'Rejected'],
        layout: 'radio'
      },
      initialValue: 'Pending'
    }
  ]
}
