export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
    },
    {
      name: 'candidatePhoto',
      title: 'Candidate Photo',
      description: 'Main photo of Lorna — used on the home page hero, About page, and Donate page.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          initialValue: 'Lorna Antwi',
        }
      ]
    },
    {
      name: 'galleryImages',
      title: 'Community Gallery Photos',
      description: 'Photos shown in the gallery on the Community page.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }
          ]
        }
      ]
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'footer',
      title: 'Footer Text',
      type: 'text',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string' },
            { name: 'url', type: 'url' }
          ]
        }
      ]
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'campaignDisclaimer',
      title: 'Campaign Disclaimer Text',
      type: 'string',
    }
  ]
}
