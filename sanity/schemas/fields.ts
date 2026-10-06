// Small helpers so page schemas read like an outline of each page.

export const PARAGRAPHS_HINT = 'Separate paragraphs with a blank line.';
export const ELECTIONS_LINK_HINT = '"toronto.ca/elections" is turned into a link automatically.';

export const str = (name: string, title: string, description?: string) => ({
  name,
  title,
  type: 'string',
  ...(description ? { description } : {}),
});

export const txt = (name: string, title: string, rows = 3, description?: string) => ({
  name,
  title,
  type: 'text',
  rows,
  ...(description ? { description } : {}),
});

export const section = (name: string, title: string, fields: object[], description?: string) => ({
  name,
  title,
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields,
  ...(description ? { description } : {}),
});

/** A list of cards, each with a title and a description. */
export const cardList = (name: string, title: string, description?: string) => ({
  name,
  title,
  type: 'array',
  ...(description ? { description } : {}),
  of: [
    {
      type: 'object',
      fields: [str('title', 'Title'), txt('description', 'Description', 3)],
      preview: { select: { title: 'title', subtitle: 'description' } },
    },
  ],
});

export const singleton = (name: string, title: string, fields: object[]) => ({
  name,
  title,
  type: 'document',
  fields,
  preview: { prepare: () => ({ title }) },
});
