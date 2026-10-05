export default {
  name: 'endorsement',
  title: 'Endorsement',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Endorser',
      type: 'string',
      description: 'Organization or person, e.g. "CUPE Local 79". Shown as the card headline.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Union', 'Community organization', 'Local leader', 'Other'] },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Who they are and what they endorsed. Keep it factual; only quote what the endorser actually said.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo (optional)',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'sourceUrl',
      title: 'Source link (optional)',
      type: 'url',
      description: "Link to the endorser's own announcement.",
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
    },
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
