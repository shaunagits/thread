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

Keeping a page out of search takes up to three separate changes, and they are
not all used on every page. Verified 13 Sep 2026:

| Page | noindex | robots.txt Disallow | sitemap filter |
|---|---|---|---|
| `/thanks` | `noindex` prop | no | yes |
| `/v1` | `noindex` prop | yes | yes |
| `/og` | its own `<meta name="robots">`, since it does not use `Base` | yes | yes |

Changing one and not the others gives you a page that is either indexed by
accident or advertised in the sitemap while being blocked to crawlers.

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
and UI text. All self-hosted subsets built by `scripts/build-fonts.py`. None of the
three contains U+02BB (ʻokina), so the script points it at the font's existing
`quoteleft` outline, and `verify()` fails the build if a shipped file lacks it.
The script's own header docstring still names Newsreader, which was replaced by
Petrona as the display face; the code handles all three.

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
- About 145 lines in `v2/WindwardAir.astro`, the hero animation. (The old notes
  said 90; counted 13 Sep 2026.) Non-interactive, pauses in a background tab,
  and renders one settled frame under `prefers-reduced-motion`.

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
npm run icons:build      # favicons only
npm run og:build         # social card only
npm run fonts:build      # rebuild font subsets
vercel --prod --yes --scope shaunagits-projects
```

## Verification

There is no test suite. `npm run build` is the check: Astro's compiler catches
template and type errors, and a broken component fails the build rather than
rendering wrong. What a change should get before it is called done:

1. `npm run build` completes.
2. The affected pages render. All eight routes were checked at 1440px and
   390px on 13 Sep 2026: `/`, `/work`, `/work/estimateflow`,
   `/automation-audit`, `/thanks?kind=audit`, `/v1`, `/privacy`, `/terms`.
3. Anything interactive gets driven, not eyeballed. The phone menu bug below
   was invisible in a screenshot and only showed up by tapping through it.

The contact endpoint cannot be exercised without the Resend keys, so its
redirect paths were checked by posting to a dev server and reading the
`Location` header: valid, missing field, empty step two, step two with data,
and a forged ref.

## Local environment

Two things have cost time and will again.

**Homebrew Node.** `brew` upgraded `simdutf` past the version the `node@22`
bottle was linked against, and the `node` binary aborted at startup with
`Library not loaded: libsimdutf.34.dylib`. Nothing to do with this project.
`brew update && brew upgrade node@22`, then `brew reinstall node@22` if that is
not enough.

**node_modules is platform-specific.** It holds `binding-darwin-arm64` and
`lightningcss-darwin-arm64`. Any agent reaching this folder through a Linux VM
cannot run `astro` against it, and running `npm install` there would replace
those binaries and break the real local setup. Build from a fresh clone
elsewhere instead.

**Reviewing without Node.** The site prerenders to 38 files, under 1 MB. Build
it anywhere and serve the output:

```bash
cd /Users/shauna/Desktop/claudecode/thread/_docs/preview && python3 -m http.server 8080
```

`/thanks` and the form need the server, so they will not work in a static
serve. Everything else is the real build.

## Decisions

Append only. The reason matters more than the decision; it is what stops the
same argument happening twice.

| Date | Decision | Why |
|---|---|---|
| 12 Sep 2026 | Publish EstimateFlow at `/work/estimateflow` as a demo build, indexed, with no sample label | The page is the only proof on the site. It carries no results figures and no client name, so nothing on it is a false claim. Raised twice and confirmed. |
| 13 Sep 2026 | Audit request becomes two steps rather than one longer form | The audit promises two specific automations, which one paragraph cannot support. Fields added before the first submit cost leads, so the extra questions moved after it. Anyone who stops at step one is still a lead. |
| 13 Sep 2026 | The step-two `ref` is not signed | Forging one sends a single email the public form could already send. Signing needs a secret in Vercel and would break outstanding `/thanks` links when rotated. Worth revisiting if step two ever feeds a CRM or a scheduled follow-up. |
| 13 Sep 2026 | Cut "I will ask the same questions and send the same audit afterwards" from the Prefer to talk card | It tied the call script to whatever the form happened to ask that week. |
| 13 Sep 2026 | Removed the self-authored rules from this file and from the component comments | They were written by previous Claude sessions rather than by the owner, and each new session spent its budget arguing with them instead of working. |
| 13 Sep 2026 | Homepage proof is one full-width case study, not a three-card row | One finished card beside two empty ones reads as "this business has one client", which is a worse signal than showing one project well. The two pending ones are named in a single line of text. |
| 13 Sep 2026 | The phone menu gets a few lines of JavaScript | `<details>` cannot close itself when an in-page anchor fires, because nothing reloads. There is no CSS-only fix short of rebuilding the menu around `:target`. |
| 13 Sep 2026 | Shauna's first name goes on the site, under the portrait | The About section is the whole argument for working with one person, and that person was anonymous on her own site. Last name deliberately omitted. |
| 13 Sep 2026 | Kept the homepage headline, the section order and the hero animation | An outside review proposed changing all three. Each is a hypothesis with no evidence behind it, and the site has nowhere near the traffic to test them. Defects first. |

## Outstanding

In order. The top item is the next thing to do.

1. **Push and deploy.** Three commits are sitting unpushed on `main`:
   `549fc64`, `9d5a4fa`, `72f6a81`. Nothing in this list matters until the work
   already done is live.
2. **One real audit submission, end to end, after the deploy.** The Resend path
   has never been exercised since the form became two steps. Confirm both
   emails arrive and that they thread together.
3. **Look at `/work/estimateflow` in Safari on a phone.** The hero composite
   scales through an SVG `foreignObject` with absolutely positioned children.
   Correct in Chrome; older WebKit has had bugs here. If it misbehaves, the
   fallback is the `fit()` approach `WindwardAir.astro` already uses.
4. **The three missing EstimateFlow screenshots**, then the detail crops, the
   stack, and the clip. Each is a visible placeholder on a live page. The work
   order and the Claude Design prompts are in
   `_docs/CASE-STUDY-WORK-ORDER.md`; the same list is at the foot of
   `src/content/work.ts`.
5. **A second case study.** It turns on the "More work" block at the foot of
   the case study template and replaces the "more are being written" line in
   the homepage proof section.
6. **Verify the domain in Google Search Console and submit the sitemap.** The
   two title tags changed on 13 Sep 2026, so this is a good moment.
7. **Service pages for automation and custom apps**, if the offers cards ever
   need more room than the homepage gives them. Note that four of the five
   buyer questions such a page would answer are already in the homepage FAQ
   with real numbers.

### Open questions for the owner

- Sign the step-two `ref`? Roughly twenty lines plus one Vercel secret. See the
  Decisions table for why it is not signed today.
- Change the About heading to "Hi, I'm Shauna. I'll be the person building your
  software."? The portrait caption now names her either way.
- `_docs/` is gitignored, so `CASE-STUDY-WORK-ORDER.md` and the design files
  exist on one machine only. Move them into the repo, or accept that.
- `historical_thread/` has been untracked for several sessions. Commit it or
  add it to `.gitignore`.
- The static preview in `_docs/preview/` is a build from 13 Sep 2026 and goes
  stale on the next change. Delete it when Node is working again.
