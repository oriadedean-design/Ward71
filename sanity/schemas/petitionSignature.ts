// A signature on a petition (see lib/petition.ts). Stored under a private
// "inbox." id, so it's only visible to logged-in Studio users. To exclude a
// duplicate or spam signature from the count and the TTC list, set its status
// to "Removed" rather than deleting it.

export default {
  name: 'petitionSignature',
  title: 'Petition Signature',
  type: 'document',
  fields: [
    { name: 'fullName', title: 'Full name', type: 'string' },
    { name: 'email', title: 'Email (optional)', type: 'string' },
    { name: 'comment', title: 'How the changes affected them (optional)', type: 'text', rows: 4 },
    { name: 'anonymousQuote', title: 'OK to quote the comment anonymously', type: 'boolean' },
    { name: 'petitionUpdates', title: 'Wants petition updates', type: 'boolean' },
    { name: 'communityProjects', title: 'Wants news of future community projects', type: 'boolean' },
    { name: 'campaignUpdates', title: "Wants Lorna's campaign updates", type: 'boolean' },
    { name: 'signedAt', title: 'Signed', type: 'datetime', readOnly: true },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      description: '"Removed" takes the signature out of the public count and the TTC list.',
      options: { list: ['Counted', 'Removed'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'Counted',
    },
    { name: 'petitionId', title: 'Petition', type: 'string', readOnly: true, hidden: true },
    { name: 'nameKey', title: 'Name key', type: 'string', readOnly: true, hidden: true },
    {
      name: 'networkHash',
      title: 'Connection fingerprint',
      type: 'string',
      readOnly: true,
      description: 'A one-way code for the signer’s internet connection (not their address). Many signatures with the same code can point to fake signing.',
    },
    {
      name: 'browserCheck',
      title: 'Automatic bot check',
      type: 'string',
      readOnly: true,
      description: '"Failed" can be a bot, but it also happens to real people on some phones and in-app browsers, so it is still counted. Look at the name and connection fingerprint before removing it.',
    },
  ],
  orderings: [
    { title: 'Newest first', name: 'signedAtDesc', by: [{ field: 'signedAt', direction: 'desc' }] },
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'fullName', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'fullName', status: 'status', signedAt: 'signedAt', browserCheck: 'browserCheck' },
    prepare: ({ title, status, signedAt, browserCheck }: { title?: string; status?: string; signedAt?: string; browserCheck?: string }) => ({
      title: title || '(no name)',
      subtitle: [status === 'Removed' ? 'REMOVED' : null, browserCheck === 'Failed' ? 'Check: bot?' : null, signedAt ? new Date(signedAt).toLocaleString('en-CA', { timeZone: 'America/Toronto' }) : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
};
