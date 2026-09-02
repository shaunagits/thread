# Thread

Marketing site for Thread, a custom software and automation practice in
Honolulu, Hawaiʻi.

**Live at [threadhawaii.com](https://threadhawaii.com)**

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com),
statically prerendered and deployed on Vercel. Pages ship almost no client
JavaScript: the navigation and FAQ are native `<details>` elements and the
contact form is a native POST.

## Requirements

- Node.js 22 or later
- Python 3 with `fonttools` and `brotli`, only for the font and asset scripts

## Getting started

```bash
npm install
npm run dev      # local dev server on :4321
npm run build    # production build
```

The contact form needs three environment variables. Copy `.env.example` to
`.env` and fill them in; see that file for what each one does.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run fonts:build` | Rebuild the self-hosted font subsets |
| `npm run icons:build` | Regenerate the favicon and app icon set |
| `npm run og:build` | Regenerate the Open Graph card |
| `npm run assets:build` | Full asset rebuild (needs Chrome, rsvg-convert, ImageMagick) |

## Project structure

```
src/
  components/          shared UI, plus homepage components in components/v2/
  content/             site copy, separated from markup
  layouts/Base.astro   head, metadata, Open Graph, structured data
  pages/               routes, including the contact API endpoint
  styles/global.css    design tokens and shared primitives
public/fonts/          self-hosted font subsets
scripts/               font, icon and social-card build scripts
licenses/              font licences
```

Copy lives in `src/content` rather than in components, so wording can be
changed without touching markup.

## Design system

Colour, type, spacing and motion are defined as tokens in
`src/styles/global.css`. Components reference tokens only, never literal
values, which keeps a palette or type change to a single file.

Type is set in Petrona, Public Sans and JetBrains Mono, self-hosted as latin
subsets. See [FONTS.md](FONTS.md) for how the subsets are built and why
Petrona and Newsreader are patched to include the ʻokina (U+02BB).

## Licence

Fonts are licensed under the SIL Open Font License 1.1; the full texts are in
[`licenses/`](licenses). Site code and content are proprietary to Thread.
