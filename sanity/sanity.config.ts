import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { apiVersion, dataset, projectId } from './env';

export default defineConfig({
  name: 'prodlog-landing',
  title: 'Prodlog Landing',
  projectId,
  dataset,
  basePath: '/studio',
  apiVersion,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
