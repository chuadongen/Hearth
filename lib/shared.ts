import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Hearth';
export const appTagline = 'The warm centre where everything gathers';
export const docsRoute = '/tools';
export const docsImageRoute = '/og/tools';
export const docsContentRoute = '/llms.mdx/tools';

/**
 * Set this once Hearth has a GitHub remote to enable "edit on GitHub" links.
 * e.g. { user: 'your-name', repo: 'hearth', branch: 'main' }
 */
export const gitConfig: { user: string; repo: string; branch: string } | null = null;

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
