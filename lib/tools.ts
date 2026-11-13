import { source } from './source';

export type Tool = ReturnType<typeof getTools>[number];

/** Every tool = a root folder under content/tools with an index.mdx. */
export function getTools() {
  return source
    .getPages()
    .filter((page) => page.slugs.length === 1)
    .map((page) => ({
      slug: page.slugs[0],
      url: page.url,
      name: page.data.title,
      description: page.data.description,
      tagline: page.data.tagline,
      character: page.data.character,
      status: page.data.status ?? 'idea',
      href: page.data.href,
      repo: page.data.repo,
      research: page.data.research,
      video: page.data.video,
      accent: page.data.accent ?? page.slugs[0],
      technologies: page.data.technologies,
      skills: page.data.skills,
      order: page.data.order,
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getTool(slug: string) {
  return getTools().find((tool) => tool.slug === slug);
}
