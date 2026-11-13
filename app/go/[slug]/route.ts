import { notFound, redirect } from 'next/navigation';
import { getTool, getTools } from '@/lib/tools';

/** Stable short links: /go/<tool> → the tool's live deployment. */
export async function GET(_req: Request, { params }: RouteContext<'/go/[slug]'>) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool?.href) notFound();
  redirect(tool.href);
}

export function generateStaticParams() {
  return getTools()
    .filter((tool) => tool.href)
    .map((tool) => ({ slug: tool.slug }));
}
