import { ArrowRight, Plus } from 'lucide-react';
import { ToolCard } from '@/components/tool';
import { getTools } from '@/lib/tools';
import { appTagline } from '@/lib/shared';

export default function HomePage() {
  const tools = getTools();

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-x-clip px-4 pb-20 pt-24 sm:pt-32">
        <div
          aria-hidden
          className="hearth-glow pointer-events-none absolute left-1/2 top-24 size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(217_119_87/0.35),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-clay">A personal suite of tools</p>
          <h1 className="mt-5 font-serif text-6xl font-medium tracking-tight sm:text-7xl">
            Hearth
          </h1>
          <p className="mt-4 font-serif text-2xl italic text-fd-muted-foreground">{appTagline}</p>
          <div className="mt-10 flex justify-center">
            <a
              href="#family"
              className="inline-flex items-center gap-2 rounded-lg bg-clay px-4 py-2 text-sm font-medium text-[#1f1e1d] transition-opacity hover:opacity-90"
            >
              Meet the family <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Family */}
      <section id="family" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-28">
        <div className="mb-8 border-b border-fd-border pb-4">
          <h2 className="font-serif text-3xl font-medium tracking-tight">The family</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-fd-border p-6 text-center text-fd-muted-foreground">
            <Plus className="size-5" />
            <p className="font-serif text-lg italic">More tools are on the way</p>
          </div>
        </div>
      </section>
    </main>
  );
}
