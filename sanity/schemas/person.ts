export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text' },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule: any) => Rule.required(),
        }
      ]
    },
    { name: 'quote', title: 'Quote', type: 'text' }
  ]
}
