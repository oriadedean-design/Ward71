import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { schemaTypes, SINGLETON_TYPES } from './sanity/schemas'
import { structure } from './sanity/deskStructure'

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'lorna-antwi-campaign',
  title: 'Lorna Antwi Campaign',
  projectId: 'kfgyh53r',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure }), media()],
  schema: {
    types: schemaTypes,
    // Pages and Site Settings can't be created from the "+" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Pages and Site Settings can't be duplicated or deleted.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
})
