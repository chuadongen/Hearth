import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CircleCheck,
  Code,
  Flame,
  Lock,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Tool } from '@/lib/tools';

const statusStyles: Record<Tool['status'], { label: string; dot: string }> = {
  idea: { label: 'Idea', dot: 'bg-fd-muted-foreground' },
  building: { label: 'Building', dot: 'bg-amber-400' },
  beta: { label: 'Beta', dot: 'bg-sky-400' },
  live: { label: 'Live', dot: 'bg-emerald-400' },
};

export function StatusBadge({ status }: { status: Tool['status'] }) {
  const s = statusStyles[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background/60 px-2.5 py-0.5 text-xs text-fd-muted-foreground">
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md bg-fd-secondary px-2 py-0.5 text-xs text-fd-secondary-foreground/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article
      data-tool={tool.accent}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-tool/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-tool opacity-[0.07] blur-3xl transition-opacity group-hover:opacity-[0.16]"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-tool">{tool.tagline}</p>
          <h3 className="mt-1 font-serif text-3xl font-medium tracking-tight">{tool.name}</h3>
        </div>
        <StatusBadge status={tool.status} />
      </div>
      {tool.character && (
        <p className="mt-3 font-serif text-lg italic text-fd-muted-foreground">
          {tool.character}
        </p>
      )}
      <Chips items={tool.technologies.slice(0, 5)} className="mt-5" />
      <div className="mt-auto flex items-center gap-2 pt-6">
        <Link
          href={tool.url}
          className="inline-flex items-center gap-1.5 rounded-lg bg-fd-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-fd-accent"
        >
          Read more <ArrowRight className="size-3.5" />
        </Link>
        {tool.href && (
          <a
            href={`/go/${tool.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-tool px-3 py-1.5 text-sm font-medium text-[#1f1e1d] transition-opacity hover:opacity-90"
          >
            Open <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

/** Header block shown at the top of a tool's overview page. */
export function ToolHero({ tool }: { tool: Tool }) {
  return (
    <div className="not-prose mb-8 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={tool.status} />
        {tool.tagline && (
          <span className="text-xs uppercase tracking-[0.14em] text-tool">{tool.tagline}</span>
        )}
      </div>
      {tool.character && (
        <p className="border-l-2 border-tool pl-4 font-serif text-xl italic text-fd-muted-foreground">
          {tool.character}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {tool.href && (
          <LinkButton href={`/go/${tool.slug}`} primary icon={<ArrowUpRight />}>
            Open {tool.name}
          </LinkButton>
        )}
        {tool.research && (
          <LinkButton href={tool.research} icon={<BookOpen />}>
            Research
          </LinkButton>
        )}
        {tool.repo && (
          <LinkButton href={tool.repo} icon={<Code />}>
            Source
          </LinkButton>
        )}
      </div>
      <VideoEmbed url={tool.video} title={`${tool.name} demo`} />
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="mb-2 text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            Built with
          </dt>
          <dd>
            <Chips items={tool.technologies} />
          </dd>
        </div>
        <div>
          <dt className="mb-2 text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            Skills
          </dt>
          <dd>
            <Chips items={tool.skills} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

function LinkButton({
  href,
  children,
  icon,
  primary,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  primary?: boolean;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition [&_svg]:size-4',
        primary
          ? 'bg-tool text-[#1f1e1d] hover:opacity-90'
          : 'border border-fd-border bg-fd-secondary hover:bg-fd-accent',
      )}
    >
      {icon}
      {children}
    </a>
  );
}

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1];
}

/** YouTube embed, or a placeholder slot when no video exists yet. */
export function VideoEmbed({ url, title }: { url?: string; title: string }) {
  const id = url ? youtubeId(url) : undefined;
  if (!id) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-fd-border bg-fd-card text-fd-muted-foreground">
        <Play className="size-6 text-tool" />
        <span className="text-sm">Demo video coming soon</span>
      </div>
    );
  }
  return (
    <iframe
      className="aspect-video w-full rounded-xl border border-fd-border"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; encrypted-media; picture-in-picture"
      allowFullScreen
    />
  );
}

const featureIcons = {
  CircleCheck,
  Flame,
  CalendarDays,
  Lock,
  Sparkles,
  Zap,
  BookOpen,
  Code,
};

export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function Feature({
  title,
  icon = 'Sparkles',
  children,
}: {
  title: string;
  icon?: keyof typeof featureIcons;
  children: ReactNode;
}) {
  const Icon = featureIcons[icon] ?? Sparkles;
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-4">
      <Icon className="mb-3 size-5 text-tool" />
      <h3 className="font-medium">{title}</h3>
      <div className="mt-1 text-sm text-fd-muted-foreground">{children}</div>
    </div>
  );
}
