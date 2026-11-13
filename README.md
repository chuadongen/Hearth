# Hearth

The warm centre where everything gathers: the homepage and showcase for my suite of tools.

Built with [Fumadocs](https://fumadocs.dev) (Next.js) and deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Add a tool

1. Copy `content/tools/ember` to `content/tools/<slug>`.
2. Fill in the frontmatter in `index.mdx` (tagline, character, status, href, technologies, skills, ...).
   The schema lives in `lib/source.ts`.
3. Add `<slug>` to `content/tools/meta.json`.
4. Add an accent colour for it in `app/global.css` under the `[data-tool]` rules.

The landing page and the `/go/<slug>` short link update automatically.

Long-form research lives in each tool's own repo; link it with the `research` field.

## Routes

| Route | What |
| --- | --- |
| `/` | Landing page and tool grid |
| `/tools/<slug>` | The tool's page |
| `/go/<slug>` | Redirect to the tool's live deployment |
