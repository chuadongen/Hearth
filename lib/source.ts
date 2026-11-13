import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

/**
 * Tool fields are only filled in on a tool's root `index.mdx`.
 * Sub-pages (features, architecture, ...) use the plain page schema.
 */
export const toolStatus = ['idea', 'building', 'beta', 'live'] as const;

const toolPageSchema = pageSchema.extend({
  tagline: z.string().optional(),
  character: z.string().optional(),
  status: z.enum(toolStatus).optional(),
  /** Live deployment of the tool */
  href: z.url().optional(),
  repo: z.url().optional(),
  /** Long-form research lives in the tool's own repo; link to it here */
  research: z.url().optional(),
  /** YouTube URL for the demo video */
  video: z.url().optional(),
  /** Key in app/global.css `[data-tool]` accent map */
  accent: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  /** Sort order on the landing page */
  order: z.number().default(100),
});

const docs = defineDocs({
  dir: 'content/tools',
  docs: {
    schema: toolPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
