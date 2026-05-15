import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'ward71-campaign',
  title: 'Ward 71 Campaign',
  projectId: 'kfgyh53r',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
