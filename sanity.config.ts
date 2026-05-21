import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'lorna-antwi-campaign',
  title: 'Lorna Antwi Campaign',
  projectId: 'kfgyh53r',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },
})
