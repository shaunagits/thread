# Thread

Marketing site for Thread — a custom software, dashboards, and AI automation
studio in Honolulu, Hawaiʻi. Astro + Tailwind, statically rendered, **no client
JavaScript**.

> ### ⚠️ Not ready to launch
> §04 Products and §05 Work currently contain **invented products, invented
> pricing, and a fabricated client case study with fabricated metrics**. They
> are placeholders from the design file, isolated in
> [`src/content/placeholders.ts`](src/content/placeholders.ts).
> Read [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) before deploying to a public
> domain.

## Commands

```bash
npm install
npm run dev              # local dev on :4321
npm run build            # production build
npm run assets:build     # regenerate og.png + favicons (needs Chrome, rsvg-convert, magick)
npm run fonts:build      # rebuild font subsets (needs python3 + fonttools + brotli)
```

## Layout

```
index.html               the approved design — source of truth, do not edit
src/
  components/            12 components; both plates are hand-authored inline SVG
  content/
    site.ts              real copy
    placeholders.ts      ⚠️ invented copy — every item needs replacing
  layouts/Base.astro     head, meta, Open Graph
  pages/
    index.astro          the homepage (prerendered)
    thanks.astro         form result page (server-rendered)
    og.astro             1200×630 social card generator
    api/contact.ts       form endpoint → Resend
  styles/global.css      design tokens + shared primitives
scripts/                 font and asset build scripts
```

## The rules this build follows

- **`index.html` is the source of truth** for layout, type, colour and spacing,
  and stays untouched in the repo as the reference. The build was verified
  against it at 1440/1024/768/390 — identical apart from one deliberate 6.4px
  fix, documented in the checklist.
- **No hardcoded hex.** Every colour is a token in `global.css`.
- **No client JavaScript.** The mobile menu is a `<details>` element; the contact
  form is a native POST.
- **No new colours, fonts, spacing scales, or components** beyond the design.

## Further reading

- [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) — placeholders to replace, open
  decisions, deployment and DNS
- [FONTS.md](FONTS.md) — why Newsreader and JetBrains Mono are patched (neither
  ships a ʻokina, U+02BB) and the licence position
- [BUILD-HANDOFF.md](BUILD-HANDOFF.md) — the original brief

## Licence

Fonts are SIL OFL 1.1; see [`licenses/`](licenses). Site code and content are
proprietary to Thread.
