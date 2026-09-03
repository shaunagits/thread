# Thread — working notes

Marketing site for Thread, a custom software / dashboards / automation practice
in Honolulu. **Live at https://threadhawaii.com.**

Astro 7 + Tailwind 4, statically prerendered. **Every page carries two lines of
client JavaScript** — one inline `<script>` in `Base.astro` that sets
`history.scrollRestoration = 'manual'`.

⚠️ **`/` additionally carries a ~90-line hero animation** since the homepage
swap on 1 Sep 2026, on the owner's explicit instruction. It is the only script
on the site that is not those two lines, it is non-interactive, and it is an
exception granted to one drawing — see the homepage section below before citing
it as precedent. Everything a visitor *interacts with* is still scriptless: the
phone menu is a `<details>`, so is the FAQ, and the contact form is a native
POST.

Pages: `/` · `/privacy` · `/terms` · `/thanks` · `/work` (placeholder, noindex,
excluded in robots.txt) · `/og` (card generator, noindex, excluded in
robots.txt) · `/v1` (**previous homepage**, noindex, excluded in robots.txt).
`/systems-map` was deleted and 301s to `/#contact`.

---

## ⚠️⚠️ READ FIRST — the site was redesigned 29 Aug 2026 (Style C)

> **⚠️ 1 Sep 2026: THIS SECTION NOW DESCRIBES `/v1`, NOT THE HOMEPAGE.** The
> owner swapped the homepage that day. The palette, type scale, faces, spacing
> and landmines below are all still current and site-wide. The *page* this
> section describes — its three sections, its nav labels, its CTA, its phone
> layout — is at `/v1`, noindex. See "THE HOMEPAGE WAS SWAPPED" further down
> before treating any of it as a description of `/`.

The owner supplied a complete redesign, `Thread Homepage - Style C.dc.html`, and
instructed that it be built as drawn. **Most of what the sections below describe
about the homepage is now history.** The design file is the reference; where it
and this document disagree, the design file wins.

**Palette: graphite & signal.** Third palette this site has worn. Near-black ink
`#171A18` on graphite paper `#EDEEE9`, one cobalt accent `#2E4FBF` with a darker
step `#253F99`. The ocean palette table further down is **history, not the
target**, and so is the earth palette in `index.html`.

Two things changed structurally rather than just in value:

- **The accent is named `--color-accent` / `--color-accent-dark` /
  `--color-accent-soft`.** `--color-ochre`, `--color-line` and `--color-koa`
  survive as aliases pointing at them so nothing breaks, but new work uses the
  real names. The two-palette joke where `--color-ochre` held a blue is over.
- **Landmine 5 is retired.** Both accent steps carry text on paper (6.03:1 and
  8.00:1), so there is no longer a brand colour that may not hold a label. The
  one place the accent fails is on the ink footer (2.49:1), where the wordmark's
  full stop uses `--color-foot-dot` instead. Same problem, same fix, new token.

**Faces: Petrona display, Public Sans body, JetBrains Mono labels.** Newsreader
and IBM Plex Sans are unreferenced; their files are still in `public/fonts` and
are never downloaded. **Petrona does not contain U+02BB** — checked, it does not
— so `scripts/build-fonts.py` patches it with the same alias trick Newsreader
needed, and `verify()` fails the build if the shipped file lacks it. The
wordmark was repointed to Petrona **deliberately, on the owner's instruction**;
`--font-wordmark` still exists so the next face change has to be that explicit
too.

**The type scale is ten values, up from seven.** The four display steps and the
body size are unchanged in role. What is new is the small end, because labels
and UI text are set in a real mono face now rather than in the body sans. See
the block in `global.css`; the rule that nothing may use an off-scale size still
stands.

**The page is three sections, not five:**

| § | id | Heading | Contains |
|---|---|---|---|
| 01 | `busywork` | If it happens over and over, it should be automated. | `RepetitiveGraphic` |
| 02 | `build` | Your process. Just without all the work. | `ServiceCards` (five) |
| 03 | `contact` | What could you stop doing manually? | `IntakeForm` and the owner card |

### What is actually in `src/components`, verified 1 Sep 2026

⚠️ **This table is the current state. The dated sections further down are a
record of decisions, not an inventory, and several of them name components that
no longer exist** — `SignalList`, `DashboardPlate`, `DashboardWindow`,
`ServiceList`, `ProcessIndex`, `QuestionList` and the `Fig*` plates are all
gone. Read those sections for *why* something was done; read this table for
*what is there*. Recover a deleted component **and** its `site.ts` array
together from git rather than rewriting either — that rule has not changed.

⚠️ Re-verified after the homepage swap, 1 Sep 2026. **`index.astro` is now the
wireframe page and `v1.astro` is the old one**, so most of the components below
render on `/v1` only.

| Component | Imported by | Page |
|---|---|---|
| `Header` · `Footer` | every page | all |
| `Section` | `index.astro`, `v1.astro` | both |
| `IntakeForm` | `ContactSection.astro`, `v2/ContactV2.astro` | both |
| `DevGrid` | `Base.astro`, dev only | all |
| `v2/*` (nine) | `index.astro`, `og.astro` | `/` |
| `Hero` | `v1.astro` | `/v1` |
| `HeroGraphic` | `Hero.astro` | `/v1` |
| `ConnectsStrip` | `v1.astro` | `/v1` |
| `RepetitiveGraphic` | `v1.astro` — §01 | `/v1` |
| `ServiceCards` | `v1.astro` — §02 | `/v1` |
| `ContactSection` | `v1.astro` | `/v1` |
| `StickyCta` | `v1.astro` | `/v1` |
| **`BuildGraphic`** | **nothing — see below** | — |

**`BuildGraphic.astro` renders nowhere, deliberately.** The owner's instruction
on 29 Aug 2026 was to "remove the graphic completely from the process section
for now", and "for now" is explicit, so the component and its keyframes were
kept rather than deleted: putting it back is one import and one line in
`index.astro`. This is the one standing exception to the 18 Aug rule that `src/`
holds only what renders, and making it permanent either way is the owner's call.

**`ConnectsStrip` is alive and renders in `index.astro`.** Two passages below
list it as deleted on 18 Aug 2026. It was, and it was restored the same day
under the owner's "existing graphics" exception; the deletion lines were never
corrected. It is a full-bleed band on the ink ground between the hero and §01.

`site.ts` currently exports `cta`, `ctaHref`, `loginHref`, `loginLabel`, `nav`,
`integrations`, `contact`, `signals`, `signalOpen`, `services`, `questions`,
`guarantee` and `footerColumns`. ⚠️ After the swap, `nav` / `cta` / `ctaHref` /
`footerColumns` are the **new** homepage's — the old ones live in `site-v1.ts`.
`integrations`, `signals`, `signalOpen` and `services` are now read only by /v1
components; `services` no longer feeds the schema either (see the swap section).
`questions` is copy waiting on a section and `guarantee` is gated behind
`approved: false` so unapproved wording cannot ship by accident. **`steps` is
gone from `site.ts`** — a passage below still lists it as a current export, and
the `steps` that exists now is the new homepage's, in `site-v2.ts`.

**Anchors changed.** `#services`, `#how`, `#ownership` and `#questions` are gone;
the page runs `#busywork`, `#build`, `#contact`. `#contact` is unchanged and must
stay so — the hero CTA, the footer and `vercel.json`'s `/systems-map` 301 all
target it. The three retired fragments now land at the top of the page, which is
the harmless failure mode.

**Deleted, with their data:** `ProcessIndex` and the `steps` array (the three-step
arc has no section), `QuestionList` (the `questions` array survives in `site.ts`).
Recover a component *and* its array from git rather than rewriting either. Two
claims died with `steps` and appear nowhere else on the site: "A fixed plan and
price" and the free 30-minute fit call.

**`services` was replaced wholesale.** Four entries became five, every title and
body is new, "AI automation" is gone, "Customer or employee portal" is new, and
**the owner-confirmed durations were dropped** because the design draws no meta
line. Prices remain absent and that rule is unchanged.

**The CTA label lives in `site.ts` as `cta`/`ctaHref`**, because six places render
it. It is **"Start the conversation"**, restored on the owner's instruction after
briefly being "Tell me what's slowing you down". It is not "Book a call" because
there is still no scheduling link, and the button opens the form. The submit
button is deliberately different — just **"Send"** — because it describes sending
rather than arriving.

⚠️ Worth knowing when reading git history: **the 27 Aug 2026 copy audit was never
committed.** "Start the conversation" and the rest of that pass existed only as
working-tree edits, so the deployed site went on saying "Book a call" throughout,
and `git log -S"Start the conversation"` finds it in exactly one commit — the
Style C rebuild, as a deletion.

**Nav labels are plain and expected: The problem / The solution / Contact.** The
owner picked these from four directions after rejecting the redesign's own
The busywork / What I build / Start here. The reasoning is that a nav is the one
place where being unsurprising beats being distinctive; the voice lives in the
section headings instead. **The labels deliberately no longer describe the
anchors they point at** (`#busywork`, `#build`) — ids are contracts, and renaming
one to chase a label is how indexed links break.

~~**The §02 plate's scroll walk does not dim the drawing.**~~ **History.**
`DashboardPlate` and its `dp-` keyframes no longer exist; §02 is the five
service cards and nothing else. The decision it records still matters as
precedent if a scroll-walked drawing ever returns: the design file's handler
dropped everything but the active callout to 50%, which in a browser makes a
dashboard look disabled rather than focused for most of the time it is on
screen. Recover the component from git rather than rebuilding it.

**There is a client login** at `https://app.threadhawaii.com`, in `site.ts` as
`loginHref`/`loginLabel`, rendering in the header, the phone menu and the
footer's Contact column. It is a quiet text link and never a button: a visitor
who already has an account is not who the page is written for, and a login
competing with the CTA sells to the wrong reader. The subdomain resolves and
one of its A records is Vercel's.

**Sections carry no marker at all, and open on nothing.** Style C made the
marker a bare number above the heading; the number went on 29 Aug 2026 and its
hairline went on 2 Sep 2026. ⚠️ That hairline is why every section on the site
drew TWO plain dividers about 100px apart for four days: the section's own
full-bleed `border-top` at the boundary, and then the marker's rule, which had
read correctly only while it carried a number. The single divider per section
is now the `border-top` in `global.css`. Do not put a rule inside a section's
wrap unless it carries something. So the old rule that the nav must match the
markers has nothing left to match. What still holds: the header and the footer
point at the same three anchors and must label them identically.

### The phone layout, 29 Aug 2026

Built from `Thread Homepage - Mobile.dc.html`. ⚠️ **That file was drawn from
Style C desktop and predates the same day's copy changes** — it still shows the
old headline, the problem paragraph, the Honolulu signature line, the old nav
labels, "Show me your busywork" and `[Owner name]`. Its *layout* was applied to
the *current* content; do not read it as the copy of record.

- **Section numbering is gone**, on the owner's instruction. `.marker` is now
  `hr.section-rule`: the hairline survives, the number does not. ⚠️ **The
  hairline was itself removed 2 Sep 2026** — bare, it was a second divider
  under the section boundary; see the section above. The list
  numerals in §01 and the card tabs in §02 are content, not section markers,
  and stayed.
- **`StickyCta.astro`** is a pinned accent-filled CTA bar, phone only, and the
  only element on the site that follows the viewport. It carries
  `env(safe-area-inset-bottom)` and `body` carries matching bottom padding —
  without that it covers the last of the footer forever. If its height changes,
  change the body padding in `global.css` with it.
- **`--text-d1` and `--text-d2` are re-valued at 640px** (38/32) rather than
  components hardcoding smaller sizes, so nothing goes off-scale.
- **§01's three blocks are flat siblings of the grid**, not an intro and a
  closer in a wrapper. That is load-bearing: nested, the closing statement
  stacked *above* the list it closes on a phone, and a nested child cannot be
  reordered against its parent's sibling.
- **`HeroGraphic` ships a six-row phone composition** in a 300×250 canvas. Six,
  not nine, for legibility; the three-by-hand against six-by-one-click contrast
  is what matters and nobody counts them.
- ⚠️ **Two bullets here described `DashboardWindow.astro` and `DashboardPlate`,
  and both components are gone.** What survives them is the general rule, which
  is still live and still bites: **a stylesheet whose selectors have to match
  markup rendered by a child component must be `is:global`, with every selector
  in it uniquely prefixed.** A scoped rule compiles against its own cid and
  silently matches nothing. `v2/WindwardAir.astro` is the current instance —
  its job list is built with `innerHTML`, so those nodes carry no scope
  attribute at all, and every selector in that file is `wa-` prefixed for
  exactly this reason. See landmine 18.

### Still outstanding from this change

1. ~~**`[Owner name]` and the photo are placeholders**~~ — **both resolved.**
   The name is **Shauna**, first name only, confirmed by the owner 29 Aug 2026.
   The photo landed the same day: `.owner-photo` is a real `<img>` at
   `/shauna.jpg`, shipped at 256px for a 64px slot, cropped square from the
   shauna.digital About shot. The dashed circle and the "Blocked" tag are gone.
2. **`--color-faint` `#767C76` fails AA at 3.66:1 on paper**, worse than the
   ocean palette's 4.21. It carries the hero signature line, the form helper and
   the open row 08 text. Raised with the owner before the build and built as
   drawn. `#6A7076` clears it at 4.54:1 and is barely perceptible.
3. ~~**`/og.png` is stale.**~~ Rebuilt 29 Aug 2026, along with every icon.
   Both now have renderers that need only Python: `npm run og:build` and
   `npm run icons:build`. That is the point of them — `assets:build` needs
   headless Chrome, rsvg-convert and ImageMagick, which is exactly why these
   sat on the ocean palette after the swap. `/og` is still the design of
   record; `scripts/build-og.py` is a renderer that has to catch up if the two
   ever disagree. **A web app manifest was added at the same time**: the site
   had icons for browser tabs and iOS home screens and nothing for Android.
4. ~~The narrow (phone) composition of both drawings was derived, not drawn.~~
   The owner supplied `Thread Homepage - Mobile.dc.html` on 29 Aug 2026 and it
   is built. Still nothing between 640 and 1440 is drawn, so the tablet band
   remains derived.
5. **Nothing about the phone layout has been seen on a phone.** No browser in
   the build environment, and landmine 24 says the preview pane cannot judge
   scroll-driven animation anyway. The zoom walk especially needs a real
   device.

### Verified at build time, 29 Aug 2026

Production build clean. **Landmine 22 checked against the built, minified CSS**:
no `animation-timeline` folded into an `animation` shorthand, `view-timeline-name`
and all nineteen keyframes survive. Every `var()` in `src/` resolves to a defined
token. No hardcoded hex in any component. No nested `<section>`. No bare fragment
hrefs. Contrast audited across twenty-one text roles; the three failures are all
item 2 above.

**Not verified: anything visual.** There is no browser in the build environment,
and landmine 24 says the preview pane cannot verify scroll-driven animation
anyway. The hero loop, the plate's focus walk and every breakpoint need a real
screen.

---

## ⚠️⚠️⚠️ THE HOMEPAGE WAS SWAPPED 1 Sep 2026 — READ THIS BEFORE THE STYLE C SECTION ABOVE

The owner supplied `_docs/homepage-wireframe.html` and a hero animation, asked
for the page to be built beside the live one, then promoted it the same day.

**⚠️ EVERYTHING ABOVE THIS SECTION DESCRIBES `/v1`, NOT `/`.** The Style C
section, its phone layout, its three-section structure, its nav labels and its
CTA are all a description of the page that is now at `/v1`. It is still
accurate about *that* page. It is no longer a description of the homepage. Read
it as history, the same way the ocean and earth palette sections below it are
read.

What did **not** change with the swap, and is still current everywhere:
the graphite & signal palette, the ten-value type scale, the three faces, the
spacing scale, `index.html` as the layout reference, the button treatments, and
every landmine.

**`/v1` is the previous homepage, kept live because the owner asked for it to
stay available for reference.** Nothing links to it. It is gated three ways,
and all three go together if it is ever deleted outright:

1. `noindex` — the prop on `<Base>` in `src/pages/v1.astro`
2. `Disallow: /v1` in `src/pages/robots.txt.ts`
3. the sitemap `filter` in `astro.config.mjs`

Two near-identical homepages competing in the index is the duplicate-content
problem those exist to avoid. Same three-part gate `/work` uses.

⚠️ **Do not "fix" `/v1`.** It is a record. If something on it looks stale
against `/`, that is the point of it.

### Where the content lives now

| File | Holds | Read by |
|---|---|---|
| `site.ts` | `nav`, `cta`, `ctaHref`, `footerColumns` — **the new homepage's**, because `Header`, `Footer` and /work render them on every page with no props. Plus `contact`, `loginHref`/`loginLabel`, and the arrays only /v1 uses. | everything |
| `site-v2.ts` | the homepage's own copy: `hero`, `problem`, `steps`, `offers`, `proof`, `about`, `leadMagnet`, `faq`, `contactV2`, `title`, `description` | `/`, `og.astro` |
| `site-v1.ts` | the retired page's `nav`, `cta`, `ctaHref`, `footerColumns` | `/v1`, `Hero.astro`, `StickyCta.astro` |

⚠️ **`Hero.astro` and `StickyCta.astro` import from `site-v1.ts`.** Both are used
by `/v1` and nothing else, and pointing them at `site.ts` would put the new
label on the old page and aim its button at a section that is not on it. If
either is ever reused elsewhere it needs a prop, not a different import.

⚠️ **The names `site-v2.ts`, `components/v2/` and the `*V2` suffix were kept
deliberately.** They now read as "homepage version 2", against `/v1`, which is
coherent. Renaming them would touch a dozen files for no reader benefit — the
same reasoning this document records for `--color-ochre` and for
`Fig2CurrentState.astro`.

### What the swap touched outside the two pages

- **`Header` and `Footer` props are now used in the other direction.** They were
  added so `/v2` could differ from `/`; now `/` uses the bare defaults and
  `/v1` passes props. Every default is still the `site.ts` value.
- **`makesOffer` in `Base.astro` maps over `offers`**, not `services`. The five
  build types were §02 of the old homepage and now appear on no indexed page,
  so the schema would have been describing `/v1`. ⚠️ Still no
  `priceSpecification`, and that is now a *choice*: the three prices became
  real and render on the page, so they could be stated. Deciding that deserves
  its own commit.
- **`og.astro` reads `hero.h1` from `site-v2.ts`** instead of duplicating the
  headline by hand. That closes a gap this document used to warn about. ⚠️
  `scripts/build-og.py` still carries the string separately — it is a Python
  renderer and cannot import a `.ts` module — so its `HEADLINE` constant
  changes in the same commit. The card's headline also came down from 74px/17ch
  to 56px/21ch, because the new headline is 63 characters against the old 31 and
  overran the 630px card; measured at 3 lines, bottom at 435 of 630.
- **The sticky bar's `body` padding moved from `global.css` into
  `StickyCta.astro`** as an `is:global` block. It was a global rule for a bar
  rendered by one page, so `/privacy`, `/terms`, `/thanks` and `/work` had been
  carrying 72px of dead space under the footer on a phone since it was added,
  and the swap would have added `/` to that list. Astro only emits a
  component's CSS on pages that import it, so the padding now cannot exist
  without the bar. Verified in the build: present in `v1.css` only.
- **`#contact` is unchanged**, which is what makes the swap safe for
  `vercel.json`'s `/systems-map` 301 and every indexed link into the old page's
  contact anchor. The retired `#busywork` and `#build` now land at the top of
  the new page, which is the harmless failure mode for a fragment.

### What the homepage is

Nine sections, in the wireframe's own build order: hero · problem · how it
works · offers · proof · about · checklist · FAQ · contact. Against `/`'s three.

It **reuses the shared shell** rather than reimplementing it — `Base`, `Header`,
`Footer`, `Section` and `IntakeForm` are the same components, so the palette,
the type scale, the section rhythm and the working contact endpoint come for
free and cannot drift from the rest of the site. Its own content is in
`src/content/site-v2.ts` and its own components in `src/components/v2/`.

**`Header` and `Footer` gained optional props** (`navItems` / `cta` / `ctaHref`
/ `home`, and `columns`) so a second page can run a different nav. **Every default is
the `site.ts` value**, so `<Header />` and `<Footer />` with no props render
exactly what they rendered before. Do not change a default to suit one page —
pass a prop from that page. The standing rule still holds on both pages: the
header and the footer point at the same anchors and label them identically.

### ⚠️ Three of this repo's standing rules are relaxed on the homepage

Each was raised with the owner before building and each was confirmed on
1 Sep 2026. None of them is a general licence — they are three specific,
owner-confirmed exceptions, and each is narrower than it looks.

1. **Prices ship.** `from $1,500`, `from $6,000`, `from $800/mo`, the two
   retainer tiers and the `$10 to $50` hosting range are the owner's own
   figures from the wireframe, confirmed real. **The no-invented-prices rule is
   otherwise untouched**: a price that is not in the wireframe does not go in
   `site-v2.ts`, and STRATEGY.md's older "from $12,000" / "from $25,000" are
   stale, not a source.
2. **One case-study result ships.** "6 hrs/week — HVAC company, Oahu" is real.
   Case studies two and three are the wireframe's own bracketed placeholders
   and render as visible dashed gaps. **Do not write copy into them to balance
   the row.** An invented third card costs the credibility of the first one,
   which is exactly how `src/content/placeholders.ts` came to be deleted.
3. **Client JavaScript.** ~90 lines, in `v2/WindwardAir.astro`. Granted because
   the animation cannot be expressed in CSS — the cursor path is multi-stop
   eased interpolation between seven waypoints and the list reflows against it
   mid-loop. It stays non-interactive: nothing a visitor clicks depends on it,
   and the page is complete without it. **The scriptless rule still governs
   everything a visitor interacts with**, on this page too — the FAQ is a
   native `<details>` and the contact form is still a native POST.

### `v2/WindwardAir.astro`, the hero animation

Ported from `_docs/windward-air-animation.html`. **The motion, the timing
constants and the easing are the supplied file's own and were not re-derived.**
What changed on the way in:

- Fourteen hardcoded hexes became tokens (the file's only remaining `#2E4FBF`
  is inside a comment). Its accent was `#2E4FBF`, which is `--color-accent`
  exactly, so it was already drawn in this palette.
- Instrument Sans, loaded from Google Fonts, became `var(--font-sans)`. The
  site self-hosts its faces, and a third-party font request in the hero would
  block the first paint of the largest element on the page.
- **The stylesheet is `is:global` and every selector is `wa-` prefixed.** The
  job list is built with `innerHTML`, so those nodes never receive a scope
  attribute — landmine 18, and the same fix the retired `DashboardPlate` used.
- `prefers-reduced-motion` renders one settled frame at t=0.5 and stops. The
  loop pauses on `visibilitychange`, so a background tab costs nothing.

**Type inside it is stage-space, not pixels — landmine 17.** The stage is a
fixed 1080px square scaled to its container, so a 27px label renders at 14.0px
in the hero's 560px cap and 8.4px in a 335px phone column. Those sizes are the
design's own and are
exempt from the type scale for the same reason the SVG drawings are.

⚠️ **The confirmation toast was rebuilt 1 Sep 2026** because the owner reported
it was easy to miss. It is the payoff of the whole loop and it was 20px in
stage space — under 10px rendered — in ink, at the very bottom edge, arriving
after the eye had moved up to the card. It is now card-title size, accent
filled, ringed, and it pops on entry. **Its `bottom` is constrained**: with the
new job in place the list runs to y≈914 of the 1080 stage, so raising it much
further, or growing its padding, puts it on top of the last job row. There is
~50 units of clearance at the current size.

⚠️ **Raised, not fixed:** the frame and cards carry 16–18px corner radii, and
every other bounded object on this site is square — `.btn`, `.card`, the form
fields and the panels all set `border-radius: 0` explicitly. Built as supplied,
per the standing rule about design that looks like a mistake. One line to
change if the owner wants it to match.

⚠️ **"Windward Air", its five customers and its three technicians are
invented.** The drawing carried a caption saying so; **the caption was removed
on the owner's instruction 1 Sep 2026**, so the drawing no longer discloses it
itself. That is fine for an illustration in place. It is not fine for anything
derived from it — a screenshot, a social card, a case study — to present it as
a real customer.

### `v2/CustomAppGraphic.astro`, the offers card drawing (2 Sep 2026)

The "Custom business app" card's thumbnail slot, which was a Placeholder. The
owner supplied `_docs/design_handoff_custom_app_graphic/` (a `wa-app.js` web
component, its README and a demo page): a 1080-unit square with a monitor
bezel, a sidebar and a ten-second scripted sync loop, sized for a 620px
column. **It was not ported. It was taken down**, on the owner's decision the
same day: the card column is ~313px at 1440, and the square scaled into it
renders its table at 4px.

What shipped is a **static inline SVG, no script**, drawn for the slot at 3:2
on a 560×380 stage: the settled post-sync frame (t=6.2s, the frame the
supplied file itself renders under reduced motion), bezel, sidebar, search
field and status-bar dots cut, phone overlapping the screen. Every surviving
string, value and colour role is the supplied file's own. `OffersV2` switches
on `graphic: 'customApp'` in `site-v2.ts` rather than importing a component
per offer. Stylesheet `is:global`, every selector `cag-` prefixed, same
pattern as `WindwardAir`.

- **Type is stage-space — landmine 17.** 16-unit table text renders at 9.0px
  in the card column and 11.4px at the 400px cap the single-column layout
  gets. Thumbnail sizes, measured with the shipped font's advances and
  accepted. Every string was checked against its column: the widest,
  "Contactor 2-pole 30A", ends at 266 of the 286 available.
- **Two colour roles have no token and were mapped, not added.** The file's
  green "In stock" tag is the neutral rule/quiet pair; its orange "Below min"
  KPI is `--color-accent-dark`; the toast dot is `--color-foot-dot`. Raised:
  adding `--color-ok` and `--color-warn` to `global.css` is the alternative.
- **Radii kept as drawn**, same standing exception as the hero.
- **"Cedar Ridge Mechanical" is invented**, same rule as Windward Air. The
  handoff README calls it "one of the case-study businesses" and names a
  "Northline Service" site; both are the design tool's boilerplate, not a
  plan. It also mentions companion files `wa-minis.js` and `cs-graphics.js`
  that were not supplied. Do not build against their descriptions.
- **Motion is available if wanted**: the 3 → 2 flip and the toast are a
  two-keyframe CSS loop. Not built; the owner asked for static.
- Verified by rendering the SVG with resvg against the shipped Public Sans
  subsets at 313, 400 and 626px, not in a browser. A tell for anyone reading
  those subsets: their internal family names say "Public Sans Thin" — an
  artefact of instancing the variable font — but `usWeightClass` and the
  advances are 400/500/600 and correct.

### Still outstanding on the homepage

1. **The lead magnet is deliberately inert.** No checklist PDF exists, and
   `api/contact.ts` is a six-field message form, not a list endpoint — posting
   one address at it would produce a malformed notification. The field and
   button render disabled with a note saying why. Wiring it means deciding
   where addresses go, then editing the form and the endpoint together
   (landmine 14).
2. **No scheduling link, still.** The wireframe draws a Calendly/Cal.com embed
   in the contact section; it renders as a labelled gap. Do not put an
   `<iframe>` there pointing at a guessed URL. This is the same blocker that
   keeps the site-wide CTA off "Book a call".
3. **Assets that do not exist**, all rendering as dashed placeholders: three
   app screenshots, ~~the offer thumbnail~~ (built 2 Sep 2026, see
   `CustomAppGraphic` above), the checklist mockup, and the owner's
   background lines. The About photo uses the real `/shauna.jpg`; the wireframe
   asks for a different kind of shot ("at a desk or on site, not a grey-backdrop
   headshot"), so swap the file and keep the markup.
4. **Nothing on this page has been seen on a phone**, and the browser pane in
   the build environment could not paint it reliably — landmine 24. Geometry
   was verified numerically at 1440, 1280 and 375: nine sections present, no
   horizontal overflow at any width, `body` padding correctly 0 now the sticky
   bar is gone, and the animation confirmed running at 60fps on its real
   timeline.
5. ~~**`/og.png` is stale.**~~ **Rebuilt 1 Sep 2026** with the new headline,
   3 lines at 56px. A `.venv` now exists for the asset renderers (gitignored):

   ```
   python3 -m venv .venv && .venv/bin/pip install fonttools brotli pillow
   .venv/bin/python3 scripts/build-og.py
   ```

   ⚠️ Call the script directly, not `npm run og:build` — the npm script calls
   bare `python3` and the packages are in the venv, not on the system
   interpreter.

   Two things were corrected in the renderer while doing it, both because /og
   is the design of record and this file is the renderer that catches up:
   **the headline weight was 650 and the page has always said 500**, so every
   card this script has ever produced was heavier than the design; and the
   wrap is now measured at 21ch off the display face's "0" advance rather than
   at the full column, so the script and the page break lines identically at
   any size.

6. ⚠️ **The card's meta line still reads `CONNECT · BUILD · ONGOING`.** Those
   are the v3 copy's three engagements, retired 19 Aug 2026, and they now
   appear on no page at all. The homepage sells Automation quick win / Custom
   business app / Fractional tech partner. Raised, not changed: it is a copy
   decision and the three real names are long for the slot. It lives in two
   places that must change together — `META` in `scripts/build-og.py` and the
   `.meta` span in `src/pages/og.astro` — and needs `og:build` re-run after.

---

## ⚠️ What `index.html` is still binding for

`index.html` remains the source of truth for **layout and spacing**. It is **no
longer binding for content**, and **no longer binding for colour or for the body
type scale** — see the palette section below. Copy, section content, figures and
form fields are specified by [`HOMEPAGE-COPY.md`](HOMEPAGE-COPY.md) and
[`GRAPHICS.md`](GRAPHICS.md).

New figures reuse existing tokens. Still no new spacing values and no new
component patterns. (`Figure.astro` was the wrapper until 18 Aug 2026, when the
owner deleted every unrendered component; recover it from git if a figure needs
it again rather than writing a new one.)

Decided with the owner, 13 Aug 2026. Do not re-litigate it.

## ⚠️ The palette is ocean, not earth, since 17 Aug 2026

Every colour token in `global.css` was replaced with a blue-green palette. The
ochre-and-koa earth palette in `index.html` is **history, not the target**. Do
not "restore" it, and do not diff colour against `index.html` — it will differ
everywhere, by design.

The token **names did not change, only their values**, so several are now
misleading and that is deliberate rather than an oversight:

| Token | Now holds | Name suggests |
|---|---|---|
| `--color-ochre` | `#8DB9C4` light ocean blue | warm ochre |
| `--color-line` | `#4D8798` ocean blue | — |
| `--color-koa` | `#235F70` deep teal | koa brown |
| `--color-ink` | `#172A2D` blue-green | — |

Renaming them touches every component for no reader benefit, so it was not done.
**Landmine 5 applies as written:** its figures were re-measured against these
hexes and are current. The whole palette, measured 18 Aug 2026 against paper
`#FCFCF9`:

| Token | Hex | On paper | AA text (4.5) | AA large/UI (3.0) |
|---|---|---|---|---|
| `--color-ink` | `#172A2D` | 14.54:1 | pass | pass |
| `--color-body` | `#314447` | 9.97:1 | pass | pass |
| `--color-koa` | `#235F70` | 6.94:1 | pass | pass |
| `--color-quiet` | `#5B6A6C` | 5.49:1 | pass | pass |
| `--color-faint` | `#6F7C7D` | **4.21:1** | **fail** | pass |
| `--color-line` | `#4D8798` | 3.90:1 | fail | pass |
| `--color-ochre` | `#8DB9C4` | 2.07:1 | fail | fail |

`--color-line` and `--color-ochre` failing is fine and expected: line draws
strokes and ochre fills shapes, and neither carries text. `--color-faint` is the
one real problem — see Outstanding.

`p.txt` moved to `--text-body` and the button treatments were rebuilt again on
17 Aug; see the type system above, which supersedes this line. The `.doc` grid, section rhythm
and spacing scale are untouched, so the geometry probes described under
Verification approach still apply — probe geometry, ignore colour and body type.

This landed via several Codex sessions that were deployed straight to production
with `vercel --prod` and never committed, which is why the repo and the live site
had diverged. Committed and pushed 17 Aug 2026.

**One layout deviation, decided with the owner 14 Aug 2026.** The hero no longer
stacks a full-width plate under the copy. `HeroGraphic.astro` sits *beside* the
copy in the `.doc` grid. Reason: the graphic animates on load and rotates
continuously, and the stacked version put it below the fold on a laptop, which
spends both for nothing. The grid override lives in `Hero.astro`'s scoped
styles. Everything else on the page still uses the original `.doc` grid
unchanged.

**The hero copy was rewritten on the same date, second pass.** It is now
eyebrow, headline, one 15-word paragraph, two buttons, and nothing else:

> Put your busywork on autopilot.
> I build custom software that does that work for you.
> **[ Tell me what's slowing you down ]**

**The hero is headline, subtitle and one button, since 29 Aug 2026.** The
headline is "Put your busywork on autopilot.", replacing "Turn busywork into
software." from earlier the same day and "Built around how you already work."
before that. The headline text is duplicated by hand in `src/pages/og.astro`
(see the comment there) — the two must always agree, or the share card outlives
the page edit in every already-scraped cache.

Two blocks of copy were cut in the same change, on the owner's instruction:

- The problem paragraph, which named four symptoms. §01's signal list names
  seven of them one scroll down, so the hero was doing that section's job.
- ⚠️ The signature line, "Custom software, built in Honolulu, Hawaiʻi." **That
  was the last mention of the location above the fold**, the Style C eyebrow
  having already gone. The place still appears in §03, in both footer rows and
  in the `ProfessionalService` schema, so it is not gone from the page — but
  nothing on the first screen says where this business is. Raised with the
  owner and cut as instructed.

"Built around how you already work." replaced "Software that brings your
business together." on 17 Aug 2026. That
line was outcome-framed and the name earned it, but it was a claim any SaaS
could make and it said nothing about *custom*, *yours* or *one person*. The
eyebrow now carries the category and the location, so the headline is free to
make the promise instead. `--text-d1`'s ceiling dropped 62px to 56px in the
same change so the new line sets as two even lines in the hero's ~473px
column rather than three with a widow.

The margin note was **deleted outright** — it restated the lead and pre-explained
the systems map. `aside.side-note` and its media-query override went with it;
the class is now unused anywhere in `src/`. Don't reintroduce a note under the
buttons without checking §04 doesn't already say it.

**⚠️ The free systems map is no longer the CTA.** The owner killed it 14 Aug
2026; the first step is now a conversation. This is not yet done anywhere but
the hero, and the hero's primary `href` is a **placeholder** (`#contact`) until
the owner supplies a scheduling link. Nine other places still sell the map,
including indexed structured data and the whole `/systems-map` page. They are
listed in `LAUNCH-CHECKLIST.md` §8. **`OFFER-AND-PIPELINE.md` and `STRATEGY.md`
are stale on this point** — read them for voice and audience, not offer.

The hero copy went through roughly a dozen rejected drafts. What the rejections
were about, every time: **too long, too convoluted, written for someone who
already knows software.** The reader doesn't. `HOMEPAGE-COPY.md` lists the exact
phrasings that are dead.

`Fig1OperationsPanel.astro` was **deleted** in the same change — it was the plate
the hero graphic replaces, and the last visual descendant of the fabricated case
study. Don't restore it.

**Plates are no longer numbered, decided with the owner 14 Aug 2026.** Captions
are the label alone — `Current state, typical intake`, not `Fig. 1 · Current
state, typical intake`. The numbering was load-bearing for nothing and went
stale every time a plate moved. `BUILD-HANDOFF.md`, `BUILD-BRIEF.md`,
`GRAPHICS.md`, `HOMEPAGE-COPY.md`, `STRATEGY.md` and `LAUNCH-CHECKLIST.md` still
refer to plates by number; they're history, not instructions. Component
filenames still carry the old numbers (`Fig2CurrentState.astro`) — left alone
deliberately, renaming them is churn for no reader.

## ⚠️ The homepage was rebuilt 17 Aug 2026 — read this before editing `/`

The structure, the type system and both graphics changed in one long session
with the owner. Most of what the older sections below describe about the
homepage is now history. The sections are:

| § | id | Heading | Contains |
|---|---|---|---|
| 01 | `services` | One screen with the answer on it. | `DashboardPlate`, then the buttons |
| 02 | `how` | Start with a conversation, not a commitment. | `ProcessIndex`, three steps as an editorial index |
| 03 | `ownership` | The system is yours. | the ownership paragraph, then `ServiceCards`, on the wash |
| 04 | `contact` | Tell me what is taking too much time. | `IntakeForm` |

**§02 and §03 were merged, unified and re-split, all on 19 Aug 2026, all on
the owner's instruction.** The history matters because each state fixed a real
problem and the final one keeps all three fixes. The merge deduplicated copy:
"Fixed price" came out of three service metas (step 02 already says it),
"You own the code" out of one (the ownership lead says it), and the ownership
copy's two paragraphs became one — those cuts survive in `site.ts` and are
not to be undone. The unification (ownership as timeline step 05) proved the
two ideas cramped in one section. The re-split fixed what the first split had
wrong: both sections were numbered rows on threads and read as the same
drawing twice. So they are separate again **in different shapes** — §02 is
typographic (display numerals, hairlines), §03 is bounded cards on the wash.
The owner picked this from four mockups; a five-step arc version and an
h3-block version of §02 both exist in git history from this day.

**The steps were cut to three in the same pass** — Build and Live merged,
"Then" being the only new word, and the ownership copy left the steps for
§03's lead. See the comment over `steps` in `site.ts`. The contact band is
`04 · Start here` again.

**§01 "The problem" is gone**, folded into §01 What I do along with the two
service cards. The page was saying the same thing three ways: a question about
screens, two cards naming the halves of the offer, and a drawing showing both.
What survives is one heading, one line, the drawing and the ask. **The drawing
now carries the explanation**, which is why its six callouts are content rather
than decoration. Do not re-add a problem section without removing something.

**Section markers are `01 · What I do`, not `§ 01 · …`.** The section sign was
removed everywhere on the owner's instruction, including `/thanks`. They were
briefly moved into the right margin and moved back the same day: opposite a
heading a marker reads as a stray label.

**The nav is outcome-framed** and matches the section markers exactly: What I
do / How it works / What you get (dropped with the 19 Aug merge, restored with
the re-split the same day). Two navigations point at the same anchors, so the
header and the footer must always agree. "Outcome" as a label
was considered and rejected: it promises results the site does not have.

**A `Work` nav entry is staged and commented out** in `site.ts`. The `/work`
route, page and `noindex` all exist. Uncomment the nav line, drop the `noindex`
prop and remove the `Disallow: /work` from `robots.txt.ts` in the same commit
that puts real work on the page. Not before — a visitor clicking Work wants
proof, and a holding page is worse than no link.

### The type system

Seven values. Nothing may use a size, leading or tracking outside it. Before
this the live page carried 23 DOM sizes, 11 tracking values and 4 weights,
which is why it read as unresolved regardless of which faces were in it.

```
--text-d1/d2/d3   display, clamped
--text-body       16.5px — EVERYTHING a visitor reads, form fields included
--text-micro      10px — uppercase labels only, never prose
--text-nav        14px — header nav and phone menu only
--leading-tight   1.12 display   --leading-body 1.6 everything else
--tracking-tight  -.02em display --tracking-wide .14em uppercase labels
```

`--text-lead` and `--text-small` were **removed deliberately**. A section opener
at 21px above body at 16.5px is not a hierarchy, it is two sizes close enough to
look like a mistake; `p.lead` is now body size in `--color-ink`. Interface text
at 14px was a second reading size that existed only by convention. One
consequence worth keeping: form fields at 16.5px stop iOS zooming the page on
focus, which it does to any field under 16px.

**Faces: Newsreader for display and the wordmark, IBM Plex Sans for everything
else.** `--font-serif`, `--font-sans` and `--font-mono` all resolve to Plex Sans;
the names are historic and kept for the same reason `--color-ochre` is. A
Bodoni Moda / Archivo pairing was trialled the same day and removed.

**The wordmark is exempt from the scale** and has its own `--font-wordmark`
token, at 24px / 600 / -.025em. It is a mark, not text. It got swept up by a
font change once already; that is what the separate token prevents. **Do not
repoint it.**

### Buttons

One object, six places: header, phone menu, hero, §01, the form submit, and
`/thanks`. 48px, mono uppercase at `--text-micro`. On hover the fill **deepens**
to `--color-koa-hover` and a rule runs the length of the label, landing in a
full stop past the last letter — that is the `<span class="ln">` inside every
`.btn`. The hover used to invert the fill to white, which is 1.03:1 against the
paper ground: the strongest element on the site disappeared when pointed at.
`.nav-cta`'s scoped rule now only wins the specificity fight in landmine 4 and
must not reintroduce size, type or hover.

### The graphics

Both `HeroGraphic` and `DashboardPlate` ship **two compositions**, wide and
narrow, swapped with `display`. Neither pans sideways. Type inside them is
drawing-space, not pixels — see landmine 17.

`ProcessTimeline` replaced `StepRow`, and was itself replaced by
`ProcessIndex` on 19 Aug 2026 (evening re-split) — the spine-and-nodes
composition is gone; recover it from git if it returns. `ServiceList` was
replaced by `ServiceCards` in the same change. `ShipsWith` replaced
`Fig4CarePlate`, as real HTML rather than baked SVG text.

Both new components carry a scroll reveal (or none) under the same rules as
before: longhands only, from-state inside the keyframes — landmine 22.

**Orphaned by this change, and deleted 18 Aug 2026** on the owner's
instruction: `StepRow`, `Fig4CarePlate`, `Fig2CurrentState`,
`Fig3ThreadDiagram`, `Figure`, `ConnectsStrip`, `QuestionList`, `ProblemFlow`,
`ServicesLine` and `ShipsWith`. `ServiceList` survived: §03 uses it again.

Their data went too, on the owner's instruction the same day: `integrations`,
`shipsWith`, `questions` and `plans` are gone from `site.ts`, which now exports
only what a page imports — `nav`, `contact`, `steps`, `services` and
`footerColumns`. Recover a component *and* its array from git rather than
rewriting either.

The prices rule that used to sit above `plans` was folded into the comment over
`services` rather than deleted with it. It is the standing rule for the file,
not a note about one array.

`DevGrid.astro` renders layout guides behind `import.meta.env.DEV`, so it is
absent from production entirely. Toggle bottom left.

## ⚠️ The site copy is v3, adopted 14 Aug 2026, polished 19 Aug 2026

A copy review on 19 Aug 2026 (owner approved every change) rewrote the
contact section ("Tell me where the hours go."), contracted the stiff
patches, fixed the dashboards card's repetition of §01's heading, swapped
"repetitive correspondence" for plain English, and renamed the footer's
"Explore". The v3 rules below still hold in full. Two items the review
raised and the owner has not ruled on: the submit button says "Book a call"
but submitting sends a message rather than booking anything, and /thanks
opens with "Your request is in" when nothing was requested.

The owner supplied a full rewrite ("Thread · Website Copy, v3") and it is now
live on `/`. It is **first person throughout**, carries **no case studies and no
invented proof**, and uses **no em dashes in anything a visitor reads** (code
comments are unaffected). `HOMEPAGE-COPY.md` predates it and is now **history
for the homepage**, not instructions.

Four decisions the owner made when it landed, none of which should be
re-litigated:

1. **Prices are absent, deliberately.** v3 carried `$14,000`, `$28,000` and
   `$2,400/month`, and its own call-out marked all three as placeholders. The
   Pricing section ships **durations and terms only** until real figures exist.
   The same applies to the hosting range in the Questions section, which said
   `$20 to $200` and now says the real figure comes on the call. There is no
   `priceSpecification` in the structured data either, for the same reason.
   **Do not fill any of these in.** See the section below.
2. **The guarantee ships as written** — working software in two weeks, either
   side can stop, nothing owed beyond that point. The owner will reassess after
   a production check. It is doing the job testimonials would normally do.
3. **`/systems-map` is deleted**, and the offer is retired everywhere: nav CTA,
   §04, the step labelled `MAP`, the contact link, the `map` branch of the
   intake form and API, the meta description and the `makesOffer` schema. The
   page was indexed, so `vercel.json` 301s it to `/#contact` rather than
   letting it 404.
4. ~~**`ConnectsStrip` stays**~~ — it did, under the owner's "existing graphics"
   exception, until it was deleted unrendered on 18 Aug 2026. Originally:
   even though v3's body copy replaces it with a prose line.

`Fig5SystemsMap.astro` was unreferenced once its subject stopped existing, and
was deleted before the 18 Aug sweep. Plates are the owner's call, and the owner
made it: every component that rendered nowhere is gone.

`QuestionList.astro` was the one new component v3 required, reusing ServiceList's
row, rules and type. It never ended up on a page and went in the same sweep. Its
`questions` array is still in `site.ts`, so the copy survives if the section is
ever built — recover the component from git rather than rewriting it.

## Content that must never be invented

The site previously carried invented products, invented pricing and a fabricated
client case study with fabricated metrics, all isolated in
`src/content/placeholders.ts`. **That file is now deleted and must not come
back.** §04 is the systems map offer; §05 carries real prior work or an honest
statement that there isn't any yet.

`HOMEPAGE-COPY.md` uses `[CONFIRM: …]` markers for every number and claim the
owner has not supplied. **Never fill one in.** A plausible placeholder price is
how the site got into trouble the first time. If a section cannot be built
without one, ship it without the claim or stop and ask.

## Accounts

| Service | Account | Notes |
|---|---|---|
| GitHub | `shaunagits` → `shaunagits/thread` | public |
| Vercel | `shaunagits` / `shaunagits-projects` | project `thread` |
| Namecheap | `<registrar-account>` | domain + email forwarding |
| Resend | signed up as `<owner-account-email>` | `CONTACT_TO` **must** match this |

The project was originally deployed to a **client's** Vercel account
(`peopleengineers-projects`, used only for Gradient work) and migrated out. Never
deploy this there. A stale TLS certificate may still exist in that account.

## Commands

```bash
npm run dev              # dev server; honours $PORT
npm run build            # production build
npm run assets:build     # regenerate og.png + favicons (Chrome, rsvg-convert, magick)
npm run fonts:build      # rebuild font subsets (python3 + fonttools + brotli)
vercel --prod --yes --scope shaunagits-projects
```

Env vars live in Vercel (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`); see
`.env.example`. They only take effect on a **new build**, so redeploy after
changing them.

## Hard constraints from the original brief

- **`index.html` is the source of truth** for layout and spacing. It stays in the
  repo, untouched, as the reference. Do not edit it. ~~colour and type~~
  **superseded 17 Aug 2026** — the palette is now ocean and `p.txt` is 16px sans;
  see the palette section above.
- **No hardcoded hex in components.** Every colour is a token in `global.css`.
  Still in force, and it is what made the palette swap a one-file change.
- ~~**No client JavaScript.**~~ **Amended 18 Aug 2026, by the owner.** The phone
  menu is still a `<details>` and the contact form is still a native POST — the
  rule holds for anything a visitor interacts with, and those must stay
  scriptless. The single exception is an inline two-line `<script>` in
  `Base.astro` setting `history.scrollRestoration = 'manual'`, so a reload
  part-way down the page starts at the top instead of where the browser put you.

  It is JavaScript because it has to be: no CSS property reaches scroll
  restoration. Three things to know before touching it, each of which cost a
  measurement:

  1. **It must be unconditional.** The value lives on the history entry and is
     read when the browser decides whether to restore, so setting it during a
     load is too late for that load. Scoping it to `navigation.type ===
     'reload'` was tried and measured: the first reload still restored, and only
     later ones landed at the top.
  2. **It must be inline and synchronous in `<head>`.** A deferred or external
     script runs after the restore and does nothing.
  3. **Back and forward no longer restore either.** Returning from `/privacy`,
     `/terms` or `/work` lands at the top of the homepage rather than where you
     left. `scrollRestoration` is one switch covering both; this was accepted
     knowingly. Keeping back-restore *and* top-on-reload means storing scroll
     positions by hand, which is far more JavaScript than this site should carry.

  `scroll-behavior: smooth` was removed from `global.css` in the same change.
  It applied to browser-initiated scrolls as well as anchor jumps, so the
  restore animated and read as the page scrolling itself. Anchor jumps are now
  instant. `html:has(:target)` would restore the glide without touching
  restores, but it depends on style recalc beating the browser's scroll and
  degrades silently when it does not.
- ~~**No new colours, fonts, spacing scales, or components** beyond the design.~~
  **Narrowed 17 Aug 2026.** No new *spacing scales* or *fonts*, and no new
  component patterns. Colour is now the owner's call and the tokens have already
  been replaced wholesale. `simple-icons` was added as a dependency for the
  connects-to marks in `HeroGraphic.astro`.
- ~~**No animation or scroll effects.**~~ **Lifted by the owner, 14 Aug 2026.**
  Motion on the plates is now allowed. The replacement rule is narrower, not
  absent: **CSS only, no JavaScript, no libraries, no SMIL.** Scroll-driven
  reveals use `animation-timeline: view()` behind `@supports`, because Firefox
  still has it behind a flag, so the no-support path must land on the finished
  composition rather than an empty one. Everything sits inside
  `@media (prefers-reduced-motion: no-preference)`. `GRAPHICS.md` still argues
  against motion in "Ideas I considered and would not do" — that entry is now
  superseded, not policy.
- If something in the design looks like a mistake, **raise it — don't silently
  fix it.**

## Spacing

Audited 18 Aug 2026 after the owner asked whether spacing was standardised. It
largely already was, in a way worth knowing before "fixing" it:

**35 of the 47 px spacing values in `src/` come from `index.html` itself.** They
are not drift, they are the design's own rhythm, and `index.html` is still the
source of truth for spacing. Normalising them onto a tidier scale would mean
overriding the reference and would move the whole page — which is also what the
geometry parity check under Verification approach measures against.

Only twelve values had been introduced since, and most of those were deliberate.
The genuinely accidental ones were normalised onto the nearest value the design
already used: nav gap 29 to 30, hero column gap floor 36 to 34, plate margin 46
to 44, and three uses of 42 to 40.

Four off-scale values survive in the live files, all on purpose:

| Value | Where | Why |
|---|---|---|
| `104px` | `section { padding: 104px 0 }` | the page's section rhythm |
| `80px` | `section.hero` top | opened up 18 Aug; deliberately short of 104 so the hero graphic clears the fold |
| `120px` | `.legal` bottom | legal pages, which have no following section to breathe against |
| `2px` | `.menu summary` horizontal | not rhythm, it is optical padding on a tap target |

Dead components were left alone during that audit and deleted outright later the
same day, so `src/components` now holds only what renders. If spacing looks
inconsistent against something in git history, that file is gone on purpose.

Before adding a spacing value, check it exists in `index.html` first.

## Landmines

Each of these cost real debugging time. Don't rediscover them.

1. **`@theme static`, not `@theme`.** Tailwind v4 tree-shakes theme variables and
   silently drops any not referenced in generated utilities — which kills tokens
   used only from scoped component CSS.
2. **Newsreader does not contain U+02BB (ʻokina)** — not in any subset, not
   upstream. `scripts/build-fonts.py` patches it in by aliasing the codepoint to
   the font's existing `quoteleft` outline. **Never replace
   `newsreader-latin-var.woff2` without re-running that script**, or "Hawaiʻi"
   silently falls back mid-word. See [FONTS.md](FONTS.md).

   **IBM Plex Sans carries U+02BB natively**, verified 17 Aug 2026 by reading the
   cmap of the shipped subset. Body copy therefore needs no patch. Checked at the
   same time, for any future swap: Literata, Spectral, EB Garamond and Public Sans
   have it; Fraunces, Instrument Serif, DM Serif Display, Archivo, Karla, Figtree,
   Manrope, DM Sans and JetBrains Mono do not.

   JetBrains Mono is now referenced only by the U+2192 `@font-face` on Newsreader.
   Public Sans is unreferenced entirely.
3. **Vercel `has: host` redirects only match with `"source": "/(.*)"` and
   `"$1"`.** The `:path*` named-parameter form parses fine and silently no-ops
   under the Build Output API the Astro adapter emits.
4. **`.nav-links a` (class+element) outranks `.nav-cta`** (class). The nav button
   needs `.nav-links a.nav-cta` or its label inherits `--color-quiet`.
5. **`--color-ochre` is a fills-only colour.** Re-measured against the ocean
   palette 17 Aug 2026: ochre `#8DB9C4` is **2.1:1** on paper, so it carries no
   text anywhere. `--color-koa` `#235F70` is **6.94:1** on paper and is the only
   token that may sit under light text. This is why the header's wordmark full
   stop is koa while the footer's is ochre — the footer sits on ink, where ochre
   reads correctly.
6. **Tailwind preflight sets `line-height: inherit` on form controls**, which the
   original didn't. `global.css` restores `normal` for `input/textarea/select`;
   without it every field grows 5.9px and the contact band 24px.
7. **Astro scoped styles don't cross slot boundaries.** Anything used by slotted
   content must live in `global.css`, not a component `<style>`.
8. **`.cta-in` used to be deliberately bug-compatible** with a shorthand collision
   in the original. **Fixed 13 Aug 2026** — `padding-block` here, horizontal
   padding left to `.wrap`. §07 now aligns with every other section and keeps
   66px of vertical padding on phones. See the comment in `ContactSection.astro`
   before reintroducing a `padding` shorthand on that element.
9. **Namecheap: never change Mail Settings, and never switch nameservers to
   Vercel.** MX records live behind that dropdown; either action breaks email
   forwarding for `aloha@threadhawaii.com`.
10. **One SPF record per domain.** The root already has Namecheap's. If verifying
    the domain in Resend, its SPF must go on the `send.` subdomain.
11. **Pushing to `main` deploys straight to production.** The Vercel project is
    connected to `shaunagits/thread` via the GitHub integration, so every push
    to `main` starts a production deployment on its own — there is no separate
    deploy step and no staging in between. `vercel --prod` is only needed when
    deploying without a push. (This entry used to say pushing was blocked by
    session permissions; the owner corrected that 14 Aug 2026.)

    Because there is no staging, a bad `vercel.json` or a broken build reaches
    production as a failed deploy: the previous deployment keeps serving, so
    the site does not break, but the change silently does not ship. Check the
    deployment state after pushing rather than assuming the push was the end
    of it.
12. **`astro preview` does not work under the Vercel adapter** — it exits with
    "Preview server process exited before becoming ready". `scripts/build-assets.sh`
    serves `dist/client` with `python3 -m http.server` instead. Don't switch it
    back. The script also refuses to start if its port is already held, because a
    stale server there silently screenshots an old build.
13. **Nav and footer hrefs must stay root-relative** (`/#services`, not
    `#services`). They render on `/systems-map`, `/privacy`, `/terms` and
    `/thanks`, where a bare fragment resolves against the wrong document and does
    nothing.
14. **`IntakeForm.astro` and `src/pages/api/contact.ts` must be edited together.**
    A field rendered in the form but absent from `FIELDS`/`LIMITS` is collected
    from the visitor and silently dropped. The cross-check is a one-liner:
    compare `name="…"` in the component against the `FIELDS` table.
15. **`vercel.json` takes no comments, not even `"//"` keys.** Vercel validates
    it against a strict schema and rejects unknown properties outright:
    ``redirects[1] should NOT have additional property `//` ``. The deployment
    fails **before the build starts**, so there are no build logs to read, and
    `npm run build` never looks at the file — it passes locally every time.
    This cost a failed production deploy on 14 Aug 2026. Explain redirects here
    in `CLAUDE.md`, never in the JSON.

    The `/systems-map` → `/#contact` 301 is the deleted page's redirect: it was
    indexed and linked from the footer. It sits after the www rule so a www
    request resolves host first, then path.
16. **The honeypot is `contact_fax`, and it must never share a name with a real
    field.** It was `company_website` until 14 Aug 2026, when the v3 copy began
    asking visitors for their company website as a genuine question. Had both
    kept that name, every real submission would have tripped the bot check in
    `contact.ts`, been dropped without an email, and still shown the sender a
    success page — silent lead loss with nothing in the logs and no bounce. If
    the honeypot name changes it changes in both files in the same commit. The
    label matters as much as the name: nothing on this site asks for a fax
    number, so no visitor will ever fill it in.

17. **SVG type is drawing-space, not pixels.** Rendered size is
    `value × (rendered width ÷ viewBox width)`, so a value that looks right in one
    column is wrong in another. Both graphics were rendering labels at 29px next
    to 16.5px body copy at tablet width, because a 380-unit canvas was being
    stretched to 688px. Two rules now hold it: **every narrow composition is
    capped near its own design width**, and each composition declares exactly
    three roles — `--fs-micro`, `--fs-name`, `--fs-fig` — which are re-valued per
    breakpoint band rather than added to. Verified across 14 widths from 1440 to
    390: labels land 8.2-11.6px, names 14.0-18.6px. Re-run that check before
    changing any canvas.

18. **A selector that touches another component's markup must sit inside
    `:global()` in full.** `:global(#services) > .wrap` compiles to
    `#services > .wrap[data-astro-cid-THIS-FILE]`, and `.wrap` is rendered by
    `Section.astro`, so it silently matches nothing. This disabled §01's accent
    rule and a z-index fix without any error. Write `:global(#services .wrap)`.

19. **A positioned pseudo-element at `z-index: 0` paints above in-flow content.**
    §01's blueprint watermark was drawn over the dashboard plate for exactly this
    reason. It needs `z-index: -1` plus `isolation: isolate` on the section, which
    keeps it behind the content but above the section's own background.

20. **A stale `.git/index.lock` blocks every git write silently-ish.** One was
    left behind on 17 Aug and made `git add` and `git commit` fail while
    `git status` still worked, so it looked like the commands were running.
    `ls -la .git/*.lock`, and delete it only after confirming no git process is
    running.

21. **Check which branch you are on before pushing.** The working branch is
    `thread-homepage-refresh`, not `main`. `git push origin main` from it pushes
    the local `main` ref, which reports "Everything up-to-date" and ships
    nothing. There is also a worktree at `.claude/worktrees/`.

22. **Never put a scroll-driven animation's hidden state in the rule.** Lightning
    CSS folds `animation-timeline` into the `animation` shorthand when both are
    present, emitting `animation: linear both tl-in view()`. No browser parses
    `view()` inside the shorthand, so the whole declaration is dropped — while
    `opacity: 0` in the same rule survives. The result is a section that is
    permanently invisible **in production only**, because the dev server does
    not minify. `@supports (animation-timeline: view())` does not save you: the
    property is supported, it is the minified value that is broken.

    Two rules, both required. Use the **longhands** (`animation-name`,
    `animation-timing-function`, `animation-fill-mode`) so there is no shorthand
    to fold into. And put the from-state **inside the keyframes**, never in the
    rule, so that if a declaration is ever dropped the content renders normally
    instead of vanishing. This cost §02 on production on 17 Aug 2026.
    **Always check the built CSS, not the dev server, after touching a
    scroll-driven animation.**

23. **Never nest a `<section>`.** `global.css` styles the element, not a class:
    `section { padding: 104px 0; border-top: 1px solid var(--color-rule); }`. Any
    `<section>` inside a page section silently inherits the page's own framing —
    104px of dead space and a stray rule — and the markup looks perfectly
    reasonable in review, so it does not get caught by reading. It cost 127px of
    space in `ShipsWith` on 18 Aug 2026 where the CSS asked for 22. Use a `<div>`
    for grouping inside a section, and reach for `<section>` only for the page's
    own top-level sections.

24. **The preview pane cannot verify scroll-driven animation.** In this
    session's browser tooling `document.visibilityState` is `"hidden"`, which
    throttles frames, freezes a view timeline at a constant value and returns
    stale computed styles and blank screenshots. It reads as a bug in the page
    and is not one — the tell is a timeline reporting the identical percentage
    at two different scroll positions. Reason about scroll animation from the
    CSS, verify it on a real screen, and do not trust a runtime reading from a
    hidden pane. Layout and computed geometry *are* reliable there; only
    animation and painting are not.

## Verification approach

Parity against `index.html` was established by diffing computed geometry
numerically at 1440/1024/768/390 — both pages loaded in matched iframes, ~24
probes compared on position, size, type and colour. That's more reliable than
screenshots and it caught a 24px regression screenshots would have missed. If you
change layout, re-run that rather than eyeballing.

The **shell** — type scale, section rhythm, colour, spacing, grid — is still
verified this way, and still matches. **Content is not**: copy, figures, sections
and form fields are now specified by `HOMEPAGE-COPY.md` and `GRAPHICS.md`, so
text differences against `index.html` are expected. Probe geometry, ignore words.

Two deliberate deviations from the original, both recorded above:
1. The submit button's font (6.4px), which the original left in the UA font.
2. `.cta-in`'s padding collision — landmine 8.

## Where the site stands, 18 Aug 2026

The owner signed off on the site on this date. What changed that day, in case
something looks deliberate that used to look accidental:

- **§02 runs horizontally.** Four steps along one thread above the columns,
  returning to the vertical composition below 820px. `tl-grow` is `scaleX` for
  the horizontal spine and `tl-grow-y` for the vertical one; the override sits
  at the same breakpoint as the layout so the axis and its keyframe cannot drift.
- **§03 carries the four services**, replacing the ships-with list. The
  ownership copy stays as its lead-in because it is the differentiator, not
  decoration. Full width, since the service rows are a three-column grid.
- **The hero opened up** to 80/96 from 58/66, deliberately short of the 104 every
  other section uses so the graphic still clears the fold on a laptop.
- **Every load starts at the top.** `history.scrollRestoration = 'manual'`, the
  site's only executable JavaScript, and `scroll-behavior: smooth` is gone.
- **The phone menu draws itself** in the mark's own language, and swaps to a
  cross with the label on `[open]`.
- **§01's plate reveals on scroll and its callouts are sized as labels.** The
  top row reveals first, ahead of the window it labels, because it reaches the
  viewport first.
- **`src/` holds only what renders.** Ten components and four `site.ts` arrays
  were deleted. Recover from git rather than rewriting.

Two things a fresh reader should not mistake for problems: `ServiceList` renders
`services` and no longer has a `plans` array behind it, and `--text-micro` text
inside the drawings is smaller than the token because SVG text scales with its
viewBox.

## Outstanding

See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) for the full list, though note it
predates the 17 Aug rebuild and is stale on section numbering and the offer.
Highest value first:

1. ~~**`sameAs` in the `ProfessionalService` schema in `Base.astro`.**~~ —
   filled 19 Aug 2026 with the owner's URLs: the LinkedIn company page and the
   Google Business Profile listing in its canonical `?cid=` form (derived from
   the full Maps URL the owner supplied; see the comment in `Base.astro`).
   Next SEO items needing the owner: verify the domain in Google Search
   Console and submit the sitemap.
2. **Blocked on the owner:** real work for `/work`, and price floors if pricing
   ever returns. Both absent rather than invented — keep it that way.
3. ~~**The meta description in `Base.astro` is 190 characters**~~ — fixed
   19 Aug 2026 in an SEO pass with the owner. The default description is now
   144 characters, chosen by the owner from three drafts. The same pass fixed
   the stale earth-palette `theme-color`, swapped the unreferenced Public Sans
   preload for the two Plex weights actually above the fold, synced
   `makesOffer` to the four services in `site.ts` (it now maps over the array
   so it cannot drift), noindexed `/thanks`, and anchored the robots.txt `/og`
   rule so it stops blocking `/og.png`.
4. **Cloudflare migration**, if the owner proceeds: Email Routing replaces
   Namecheap forwarding, which means moving nameservers and therefore triggering
   landmine 9 deliberately. Site records stay DNS-only; Vercel recommends against
   proxying in front of it, and there is no speed benefit since Vercel already
   has a CDN.
5. Gmail filter so form notifications stop landing in spam, or verify the domain
   in Resend for a proper fix (landmine 10 applies).
6. **`--color-faint` `#6F7C7D` is 4.21:1 on paper and fails AA for text.** It
   carries the contact form's field labels, ServiceList's terms column,
   ProcessTimeline's step numbers and the figure captions — all at
   `--text-micro`, so the 4.5 threshold applies rather than 3.0. Darkening it
   five points per channel to `#6A7778` clears it at 4.52:1 and is barely
   perceptible; `--color-quiet` `#5B6A6C` at 5.49:1 is the other option. Left
   alone because colour is the owner's call. Its uses inside the two SVG
   drawings are arguably incidental, but the form labels are not.
7. Owner decision still open: the doubled rule under the connects-to strip.
   (The orphaned components and their arrays were deleted 18 Aug 2026.)
