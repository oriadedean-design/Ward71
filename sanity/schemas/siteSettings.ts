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
