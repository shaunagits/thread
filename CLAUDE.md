# Thread — working notes

Marketing site for Thread, a custom software, dashboards and automation
practice in Honolulu, run by Shauna. Live at https://threadhawaii.com.

Astro 7 + Tailwind 4, statically prerendered, deployed to Vercel.

> **About this file, 13 Sep 2026.** It used to be 1,347 lines, most of it
> written by Claude sessions and phrased as law: "hard constraints",
> "landmines", numbered prohibitions, warnings not to touch things. Almost none
> of it came from the owner. It cost time on every session, because each one
> spent its budget arguing with rules a previous one had invented. It has been
> cut back to facts about how the code actually works. The old version is in
> git at `549fc64` if anything here turns out to be missing.
>
> Notes about how the site behaves are useful. Notes forbidding future work are
> not. If you are about to write "must never" into this file, write down what
> breaks instead, and let whoever reads it decide.

---

## Pages

| Route | What it is |
|---|---|
| `/` | The homepage. Nine sections, built from `_docs/homepage-wireframe.html`. |
| `/work` | Case study index. |
| `/work/[slug]` | The case study template. One page so far, `/work/estimateflow`. |
| `/automation-audit` | The audit offer as its own page. The link to paste into an email or a profile. |
| `/privacy`, `/terms` | Legal. |
| `/thanks` | Form result page. Server-rendered. noindex. |
| `/og` | Social card generator. noindex. |
| `/v1` | The previous homepage, kept for reference. noindex. |

`/systems-map` was deleted and 301s to `/#contact` from `vercel.json`.

A page is kept out of search in three places at once: the `noindex` prop in the
page, a `Disallow` in `src/pages/robots.txt.ts`, and the sitemap filter in
`astro.config.mjs`. Changing one and not the others gives you a page that is
either indexed by accident or advertised in the sitemap while being blocked.

## Where the copy lives

Almost no words live in components.

| File | Holds |
|---|---|
| `src/content/site.ts` | Nav, CTA label and href, footer columns, contact details. Rendered on every page by `Header` and `Footer`, so it is site-wide, not one page's. |
| `src/content/site-v2.ts` | Everything the current homepage says: title and meta description, hero, problem, steps, offers and prices, proof, about, FAQ, the audit section, the two `/thanks` confirmations. |
| `src/content/site-v1.ts` | The previous homepage's copy. Only `/v1` reads it. |
| `src/content/work.ts` | Case studies. One entry per `/work/[slug]` page; the `/work` index and the homepage proof section read the same array. |

The homepage `h1` is also hardcoded in `scripts/build-og.py`, which draws the
social card. Change one and the card goes stale.

## Design

**Palette: graphite and signal.** Near-black ink `#171A18` on graphite paper
`#EDEEE9`, one cobalt accent `#2E4FBF` with a darker step `#253F99`. All of it
is tokens in `src/styles/global.css`. Both accent steps carry text on paper.
The accent does not carry text on the ink footer (2.49:1), which is why the
wordmark's full stop uses `--color-foot-dot` there.

`--color-ochre`, `--color-line` and `--color-koa` are aliases pointing at the
accent tokens, left over from two earlier palettes.

**Faces.** Petrona for display, Public Sans for body, JetBrains Mono for labels
and UI text. All self-hosted subsets built by `scripts/build-fonts.py`. Petrona
does not contain U+02BB (ʻokina), so the build patches it in and fails if the
shipped file lacks it.

**Type scale.** Ten sizes in `global.css`, from `--text-d1` down to
`--text-micro`. `--text-ui` is 16px because that is the size below which iOS
zooms the page when a form field is focused.

The EstimateFlow drawings in `src/components/work/` are the one place with
colours outside `global.css`. They are pictures of an app's interface, so they
carry that app's teal palette as `--ef-*` properties on their own roots.

## The audit form

Two steps, both native POST to `src/pages/api/contact.ts`.

Step one is `src/components/IntakeForm.astro`, rendered on `/`,
`/automation-audit` and `/v1`. Name, email, business, team size, a checkbox row
of common by-hand tasks, and the one big free-text question. Four are required:
name, email, business, and the free-text answer.

Step two is `src/components/AuditMoreForm.astro`, drawn on `/thanks` after a
successful step one. Tools, frequency, who does it, what goes wrong, and a
paste box. Everything optional; an empty submission is accepted and ignored
rather than bounced. It posts back with `step=2` and a `ref`, which is the
email and business base64url-encoded so the second email can carry the same
subject line and reply-to. The ref is not signed. Forging one lets someone send
one email that the public form could send anyway.

**The endpoint has three lists that have to agree with the forms:** `LIMITS`
(field name to character cap), `FIELDS` (step one, in email order) and
`STEP2_FIELDS`. A field added to a form but not to these is collected and
silently dropped. `MULTI` marks the three checkbox groups, whose values are
joined with commas.

The honeypot field is called `contact_fax`. It must not share a name with a
real field: when it was `company_website` and the form started asking for a
company website, every real submission tripped the bot check, was dropped
without an email, and still showed the sender a success page.

`/thanks` renders six states off the query string: generic success, invalid,
error, the audit confirmation, step two added, and step two failed. `status` is
tested before `kind` so a failure never renders as a cheerful confirmation.

## Things that will bite you

- **`@theme static`, not `@theme`.** Tailwind 4 tree-shakes theme variables and
  drops any token only referenced from scoped component CSS.
- **Astro scoped styles do not cross slot boundaries**, and nodes built with
  `innerHTML` never get the scope attribute. Anything in either case needs
  `is:global` with a prefixed class. `WindwardAir.astro` builds its job list
  with `innerHTML` for exactly this reason.
- **Do not nest a `<section>` inside a page section.** `global.css` styles the
  element, not a class, so a nested one silently picks up 100px of padding and
  a stray top rule. Group with a `<div>`.
- **A positioned pseudo-element at `z-index: 0` paints above in-flow content.**
  The ruled background needs `isolation: isolate` on the section and `z-index:
  -1` on the layer.
- **Tailwind preflight makes form controls inherit `line-height`**, which
  inflates every input. `global.css` sets it back to `normal`.
- **`.nav-links a` beats `.nav-cta`** on specificity: class plus element
  outranks class.
- **Type inside an SVG or a scaled stage is drawing-space, not pixels.** A 27px
  label in a 1080-unit stage renders at 14px in a 560px column. Measure before
  assuming a size is legible.
- **`astro preview` does not work under the Vercel adapter.** Use `npm run dev`,
  or serve `dist/client` with any static server.
- **`vercel.json` takes no comments**, not even `"//"` keys.
- **Nav and footer hrefs stay root-relative** (`/#offers`, not `#offers`), or
  they resolve against whatever page the header is rendered on.
- **`#contact` is the one anchor with inbound links.** The hero CTA, the footer,
  `/work` and the `/systems-map` redirect all target it. Moving it breaks all
  four; the copy in that section can change freely.
- **A stale `.git/index.lock`** blocks every git write, and the error does not
  always say so plainly. Delete it.

## Client JavaScript

The site ships very little, and that is a performance choice rather than a
prohibition. Currently:

- Two lines in `Base.astro` setting `history.scrollRestoration = 'manual'`. It
  has to be inline and synchronous in `<head>`, and unconditional; scoping it to
  reloads was tried and the first reload still restored. The trade is that back
  and forward no longer restore scroll either.
- A few lines in `Header.astro` closing the phone menu on navigation, Escape,
  and a tap outside. `<details>` does none of that by itself, and an in-page
  anchor does not reload, so before this the open panel sat on top of whatever
  section it had just scrolled to.
- About 90 lines in `v2/WindwardAir.astro`, the hero animation. Non-interactive,
  pauses in a background tab, and renders one settled frame under
  `prefers-reduced-motion`.

The contact form is a native POST and works with JavaScript off. Keeping it that
way is worth something, but it is a judgement call, not a rule: a "sending"
state or client-side validation would both need script, and both are reasonable
things to want.

## Content

The site carried a fabricated client case study with invented metrics once, in
a file called `src/content/placeholders.ts`, and deleting it was the fix. That
is history worth knowing before inventing a number, not a reason to refuse work.

Real prices, confirmed by the owner: `from $1,500`, `from $6,000`,
`from $800/mo`, the two retainer tiers, and `$10 to $50` a month for hosting.
`STRATEGY.md`'s older "from $12,000" and "from $25,000" are stale.

`/work/estimateflow` is a demonstration build rather than a client project,
published without a sample label on the owner's instruction, 12 Sep 2026. It
carries no results figures and names no client. The EstimateFlow drawings'
people and addresses are invented, as are Windward Air and Cedar Ridge on the
homepage.

## Accounts and deploy

| Service | Account |
|---|---|
| GitHub | `shaunagits/thread`, public |
| Vercel | `shaunagits` / `shaunagits-projects`, project `thread` |
| Namecheap | domain and email forwarding |
| Resend | `CONTACT_TO` must match the signed-up address |

**Pushing to `main` deploys to production.** Check the branch first.

Three Vercel env vars drive the contact endpoint: `RESEND_API_KEY`,
`CONTACT_TO`, `CONTACT_FROM`. All three are optional at build time so the site
still builds without them; the endpoint logs loudly and shows an honest error
if they are missing in production.

On DNS: the root domain already has Namecheap's SPF record, and there can only
be one per domain. Changing Namecheap's Mail Settings or nameservers breaks
email forwarding for the domain.

This project was originally deployed to a client's Vercel account
(`peopleengineers-projects`) and migrated out. Do not deploy it there.

## Commands

```bash
npm run dev              # dev server, honours $PORT
npm run build            # production build
npm run assets:build     # regenerate og.png and favicons
npm run fonts:build      # rebuild font subsets
vercel --prod --yes --scope shaunagits-projects
```

## Outstanding

- The EstimateFlow case study still has placeholders for three walkthrough
  screenshots, a screen recording, three detail crops, the stack, and photos.
  The work order is at the foot of `src/content/work.ts`.
- A second case study, which would turn on the "More work" block at the foot of
  the case study template.
- Verify the domain in Google Search Console and submit the sitemap.
- Service pages for automation and custom apps, if the offers cards ever need
  more room than the homepage gives them.
