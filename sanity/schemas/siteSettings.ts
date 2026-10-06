import { section, str } from './fields';

// Site-wide settings. The Studio shows a single document (id "siteSettings").
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'candidatePhoto',
      title: 'Candidate Photo',
      description: 'Main photo of Lorna, used on the home page and About page.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string', initialValue: 'Lorna Antwi' }],
    },
    str('contactEmail', 'Public contact email', 'Shown on the home page and in the footer.'),
    section('social', 'Social links', [
      { ...str('facebookUrl', 'Facebook URL'), type: 'url' },
      str('facebookName', 'Facebook page name'),
      { ...str('instagramUrl', 'Instagram URL'), type: 'url' },
      str('instagramHandle', 'Instagram handle'),
      { ...str('xUrl', 'X / Twitter URL', 'Leave empty to hide the icon in the footer.'), type: 'url' },
      { ...str('linkedinUrl', 'LinkedIn URL', 'Leave empty to hide the icon in the footer.'), type: 'url' },
    ]),
    section('footer', 'Footer', [
      str('tagline', 'Tagline under the name'),
      str('authorization', 'Authorization line', 'Required by election law. Check with the CFO before changing.'),
    ]),
    section('votingBanner', 'Voting banner (top of every page)', [
      { name: 'enabled', title: 'Show the banner', type: 'boolean', initialValue: true },
      str('text', 'Text'),
      str('linkText', 'Link text (goes to the voting guide)'),
    ], 'Turn this off after Election Day.'),
    section('donationBanner', 'Donation banner (bottom of most pages)', [
      str('heading', 'Heading'),
      str('subheading', 'Subheading'),
    ]),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
};
