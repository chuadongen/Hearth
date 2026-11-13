import { source } from '@/lib/source';
import { getTool } from '@/lib/tools';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { ToolHero } from '@/components/tool';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';

export default async function Page(props: PageProps<'/tools/[[...slug]]'>) {
  const params = await props.params;
  // /tools has no page of its own; the landing page is the index.
  if (!params.slug || params.slug.length === 0) redirect('/#family');

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const tool = getTool(page.slugs[0]);
  const isOverview = page.slugs.length === 1;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div data-tool={tool?.accent} className="contents">
        <DocsTitle className="font-serif text-4xl font-medium tracking-tight">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={
              gitConfig
                ? `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/tools/${encodeURI(page.path)}`
                : undefined
            }
          />
        </div>
        <DocsBody>
          {isOverview && tool && <ToolHero tool={tool} />}
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/tools/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) return { title: 'Tools' };
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
