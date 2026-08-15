# Thread — working notes

Marketing site for Thread, a custom software / dashboards / automation practice
in Honolulu. **Live at https://threadhawaii.com.**

Astro 7 + Tailwind 4, statically prerendered, **zero client JavaScript**.

Pages: `/` · `/systems-map` · `/privacy` · `/terms` · `/thanks` · `/og` (card
generator, noindex, excluded in robots.txt).

---

## ⚠️ What `index.html` is still binding for

`index.html` remains the source of truth for **layout, type scale, colour and
spacing**. It is **no longer binding for content.** Copy, section content,
figures and form fields are specified by
[`HOMEPAGE-COPY.md`](HOMEPAGE-COPY.md) and [`GRAPHICS.md`](GRAPHICS.md).

New figures reuse existing tokens and the existing `Figure.astro` wrapper. Still
no new colours, no new spacing values, no new component patterns.

Decided with the owner, 13 Aug 2026. Do not re-litigate it.

**One layout deviation, decided with the owner 14 Aug 2026.** The hero no longer
stacks a full-width plate under the copy. `HeroGraphic.astro` sits *beside* the
copy in the `.doc` grid. Reason: the graphic animates on load and rotates
continuously, and the stacked version put it below the fold on a laptop, which
spends both for nothing. The grid override lives in `Hero.astro`'s scoped
styles. Everything else on the page still uses the original `.doc` grid
unchanged.

**The hero copy was rewritten on the same date, second pass.** It is now
eyebrow, headline, one 15-word paragraph, two buttons, and nothing else:

> Software that brings your business together.
> Thread builds software that fits how your business already works. Not the
> other way around.
> **[ Book a call ]**  [ See how it works ]

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

- **`index.html` is the source of truth** for layout, type, colour and spacing.
  It stays in the repo, untouched, as the reference. Do not edit it.
- **No hardcoded hex in components.** Every colour is a token in `global.css`.
- **No client JavaScript.** The phone menu is a `<details>`; the contact form is
  a native POST.
- **No new colours, fonts, spacing scales, or components** beyond the design.
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
2. **Neither Newsreader nor JetBrains Mono contains U+02BB (ʻokina)** — not in any
   subset, not upstream. `scripts/build-fonts.py` patches it in by aliasing the
   codepoint to each font's existing `quoteleft` outline, and restores U+2192 to
   JetBrains Mono. **Never replace the woff2 files without re-running that
   script**, or "Hawaiʻi" silently falls back mid-word. See [FONTS.md](FONTS.md).
3. **Vercel `has: host` redirects only match with `"source": "/(.*)"` and
   `"$1"`.** The `:path*` named-parameter form parses fine and silently no-ops
   under the Build Output API the Astro adapter emits.
4. **`.nav-links a` (class+element) outranks `.nav-cta`** (class). The nav button
   needs `.nav-links a.nav-cta` or its label inherits `--color-quiet`.
5. **`--ochre` (#C8873F) is a fills-only colour** — 2.9:1 against light text.
   Anything carrying a label uses `--koa` (#8F5A1C) with `--paper` text (5.56:1).
   Ochre still fills everything with no text on it.
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
11. **`git push` was blocked by session permissions** throughout. Expect to hand
    the command to the owner rather than running it.
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
15. **The honeypot is `contact_fax`, and it must never share a name with a real
    field.** It was `company_website` until 14 Aug 2026, when the v3 copy began
    asking visitors for their company website as a genuine question. Had both
    kept that name, every real submission would have tripped the bot check in
    `contact.ts`, been dropped without an email, and still shown the sender a
    success page — silent lead loss with nothing in the logs and no bounce. If
    the honeypot name changes it changes in both files in the same commit. The
    label matters as much as the name: nothing on this site asks for a fax
    number, so no visitor will ever fill it in.

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

See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) for the full list. Highest value first:

1. **Blocked on the owner:** real prior work for §05, price floors and typical
   durations for §03, a background line and photo for §06. All are absent rather
   than invented — keep it that way.
2. Gmail filter so form notifications stop landing in spam, or verify the domain
   in Resend for a proper fix
3. `sameAs` links in the `ProfessionalService` schema in `Base.astro`, once the
   LinkedIn and Google Business Profile URLs exist
4. Owner decisions still open: the doubled rule under the
   connects-to strip, dropping the unused Public Sans 500
