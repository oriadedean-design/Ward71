import { randomUUID } from 'node:crypto';

// Submissions (inquiries, volunteers, subscribers, donations) contain personal
// details. Sanity never returns documents whose _id contains a "." to
// unauthenticated requests, even in a public dataset, so every Inbox document
// gets an id under "inbox.". Logged-in Studio users still see them normally.
export const INBOX_PREFIX = 'inbox.';

export function inboxId(suffix: string = randomUUID()): string {
  return `${INBOX_PREFIX}${suffix}`;
}
