# Thread — working notes

Marketing site for Thread, a custom software / dashboards / automation practice
in Honolulu. **Live at https://threadhawaii.com.**

Astro 7 + Tailwind 4, statically prerendered, **zero client JavaScript**.

Pages: `/` · `/privacy` · `/terms` · `/thanks` · `/work` (placeholder, noindex,
excluded in robots.txt) · `/og` (card generator, noindex, excluded in
robots.txt). `/systems-map` was deleted and 301s to `/#contact`.

---

## ⚠️ What `index.html` is still binding for

`index.html` remains the source of truth for **layout and spacing**. It is **no
longer binding for content**, and **no longer binding for colour or for the body
type scale** — see the palette section below. Copy, section content, figures and
form fields are specified by [`HOMEPAGE-COPY.md`](HOMEPAGE-COPY.md) and
[`GRAPHICS.md`](GRAPHICS.md).

New figures reuse existing tokens and the existing `Figure.astro` wrapper. Still
no new spacing values and no new component patterns.

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
**Landmine 5 still applies in spirit:** `--color-ochre` remains the fills-only
colour and `--color-koa` the one that carries text, but the contrast figures
recorded there (2.9:1 and 5.56:1) were measured on the old hexes and have **not**
been re-measured against the new ones. Re-check before relying on them.

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

> Built around how you already work.
> **[ Book a call ]**  [ See how it works ]

Replaced "Software that brings your business together." on 17 Aug 2026. That
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
| 02 | `how` | Start with a conversation, not a commitment. | `ProcessTimeline` |
| 03 | `ownership` | The system is yours. | two paragraphs, then `ShipsWith` |
| 04 | `contact` | Tell me what is taking too much time. | `IntakeForm` |

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

**The nav is outcome-framed** and matches the section headings exactly: What I
do / How it works / What you get. Two navigations point at the same three
anchors, so the header and the footer must always agree. "Outcome" as a label
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

`ProcessTimeline` replaced `StepRow`: a vertical spine on the section's left
edge with content indented 34px, and a second accent spine that grows on scroll
via `animation-timeline: view()` behind `@supports`. `ShipsWith` replaced
`Fig4CarePlate`, as real HTML rather than baked SVG text.

**Orphaned by this change, all still on disk:** `StepRow`, `ServiceList`,
`Fig4CarePlate`, `Fig2CurrentState`, `Fig3ThreadDiagram`, `Fig5SystemsMap`,
`ConnectsStrip`, `QuestionList`, `ProblemFlow`, `ServicesLine`, and the `plans`
and `questions` arrays in `site.ts`. Deleting is the owner's call.

`DevGrid.astro` renders layout guides behind `import.meta.env.DEV`, so it is
absent from production entirely. Toggle bottom left.

## ⚠️ The site copy is v3, adopted 14 Aug 2026

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
4. **`ConnectsStrip` stays**, under the owner's "existing graphics" exception,
   even though v3's body copy replaces it with a prose line.

`Fig5SystemsMap.astro` is now **unreferenced** — its subject no longer exists.
Left in place rather than deleted, because plates are the owner's call.

`QuestionList.astro` is the one new component v3 required. It reuses
ServiceList's row, rules and type exactly and introduces no new tokens.

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
| Namecheap | `Sharnold83` | domain + email forwarding |
| Resend | signed up as `shauna.coy@gmail.com` | `CONTACT_TO` **must** match this |

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
- **No client JavaScript.** The phone menu is a `<details>`; the contact form is
  a native POST.
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

## Outstanding

See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) for the full list, though note it
predates the 17 Aug rebuild and is stale on section numbering and the offer.
Highest value first:

1. **`sameAs` in the `ProfessionalService` schema in `Base.astro`.** Empty on
   purpose until the Google Business Profile and LinkedIn URLs exist. This is
   the single highest-value SEO item left: it is what makes search resolve the
   site, the profile and the LinkedIn to one entity instead of three results.
   `GOOGLE-BUSINESS-PROFILE.md` has the profile copy ready to go.
2. **Blocked on the owner:** real work for `/work`, and price floors if pricing
   ever returns. Both absent rather than invented — keep it that way.
3. **The meta description in `Base.astro` is 190 characters**, so Google
   truncates it around 155-160. Everything after "build the one nobody sells" is
   invisible.
4. **Cloudflare migration**, if the owner proceeds: Email Routing replaces
   Namecheap forwarding, which means moving nameservers and therefore triggering
   landmine 9 deliberately. Site records stay DNS-only; Vercel recommends against
   proxying in front of it, and there is no speed benefit since Vercel already
   has a CDN.
5. Gmail filter so form notifications stop landing in spam, or verify the domain
   in Resend for a proper fix (landmine 10 applies).
6. Owner decisions still open: whether to delete the orphaned components listed
   in the rebuild section, and the doubled rule under the connects-to strip.
