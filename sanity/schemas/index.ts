import siteSettings from './siteSettings';
import page from './page';
import person from './person';
import event from './event';
import communityPost from './communityPost';
import volunteerSubmission from './volunteerSubmission';
import donationMilestone from './donationMilestone';
import donationRecord from './donationRecord';
import inquiry from './inquiry';
import endorsement from './endorsement';
import emailSubscriber from './emailSubscriber';
import { pageSchemas } from './pages';

// Singleton documents: one per page plus site settings. Their document id is
// the same as their type, and the Studio only ever shows that one document.
export const SINGLETON_TYPES = new Set([siteSettings.name, ...pageSchemas.map((s) => s.name)]);

export const schemaTypes = [
  siteSettings,
  ...pageSchemas,
  endorsement,
  donationMilestone,
  inquiry,
  volunteerSubmission,
  emailSubscriber,
  donationRecord,
  // Not currently shown on the site; kept so existing documents stay valid.
  page,
  person,
  event,
  communityPost,
];
