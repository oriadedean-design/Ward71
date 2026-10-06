import type { StructureResolver } from 'sanity/structure';
import {
  BillIcon,
  CogIcon,
  DocumentIcon,
  DocumentsIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  InboxIcon,
  TargetIcon,
  ThumbsUpIcon,
  UsersIcon,
} from '@sanity/icons';

// Listed in the order they appear in the site navigation.
const PAGES: Array<[id: string, title: string]> = [
  ['homePage', 'Home'],
  ['aboutPage', 'About'],
  ['ourWardPage', 'Our Ward'],
  ['communityPage', 'Community'],
  ['resourcesPage', 'How to Vote (Voting Guide)'],
  ['howToHelpPage', 'How to Help'],
  ['volunteerPage', 'Volunteer'],
  ['thankYouPage', 'Thank You (after donating)'],
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items(
              PAGES.map(([id, title]) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .icon(DocumentIcon)
                  .child(S.document().schemaType(id).documentId(id).title(title))
              )
            )
        ),
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),

      S.divider(),

      S.documentTypeListItem('endorsement').title('Endorsements').icon(ThumbsUpIcon),
      S.listItem()
        .title('Donation Goal')
        .icon(TargetIcon)
        .child(S.document().schemaType('donationMilestone').documentId('donationGoal').title('Donation Goal')),

      S.divider(),

      S.listItem()
        .title('Inbox')
        .icon(InboxIcon)
        .child(
          S.list()
            .title('Inbox')
            .items([
              S.documentTypeListItem('inquiry').title('Community Inquiries').icon(HelpCircleIcon),
              S.documentTypeListItem('volunteerSubmission').title('Volunteer Submissions').icon(UsersIcon),
              S.documentTypeListItem('emailSubscriber').title('Email Subscribers').icon(EnvelopeIcon),
              S.documentTypeListItem('donationRecord').title('Donation Records').icon(BillIcon),
            ])
        ),
    ]);
