export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    { name: 'date', title: 'Date & Time', type: 'datetime' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'registrationLink', title: 'Registration Link', type: 'url' },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      fields: [{ name: 'alt', title: 'Alt text', type: 'string', validation: (Rule: any) => Rule.required() }]
    }
  ]
}
