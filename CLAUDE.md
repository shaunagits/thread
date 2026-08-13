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
- **No animation or scroll effects.** The page is deliberately still.
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
