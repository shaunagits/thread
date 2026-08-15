# Thread — launch checklist

Replaces the `.buildnote` block from `index.html`, which is not ported.
`index.html` stays in the repo untouched as the design reference.

---

## 1. Placeholder content — ✅ removed on `content/remove-fabrications`

`src/content/placeholders.ts` is deleted. So are `ProductGrid.astro` and
`Specimen.astro`, which existed only to render it.

| What | Resolution |
|---|---|
| **Thread Panel / Handoff / Field Kit** and all three prices | Deleted. §04 is now the systems map offer. |
| **Specimen 001**, the Kailua case study and its three metrics | Deleted. §05 states plainly that prior work will appear as permission comes in. |
| **`OPERATIONS · KAILUA YARD`** in Fig. 1 | Now `OPERATIONS · SAMPLE ACCOUNT`, with `CONCEPT DRAWING` on the plate. |
| **Integration strip** | Kept all nine and moved to `site.ts`. Owner confirmed 13 Aug 2026: the label is "Connects to", a capability claim, and every one exposes a public API. |
| **Email address** `aloha@threadhawaii.com` | Real — Namecheap forwards it. Moved to `site.ts`. |

**Still live on `main` until this branch merges.**

Two related items that were never in that file:

- **The free systems map offer.** It is now §04 and the primary CTA, bounded at
  two a month and one workflow each. Only ship it if you will honour that.
- **`site` in `astro.config.mjs`** is set to a placeholder domain.

The `Specimen.astro` shell — mono header rail, serif body, three big serif
figures — was a good frame and is worth restoring when there is real work to put
in it. It is in git history; `git show HEAD~1:src/components/Specimen.astro`
from the tip of this branch brings it back.

---

## 2. Open questions for you

**a. ~~The §07 contact band is 40px out of alignment on desktop.~~ FIXED 13 Aug 2026.**
In `index.html`, `.cta-in{padding:88px 0}` and `.wrap{padding:0 40px}` are both
single-class selectors, so source order alone decides which wins. The result:

- above 640px — §07's content starts at x=130 while every other section starts
  at x=170
- at/below 640px — the later `@media(max-width:640px) .wrap` rule replaces the
  shorthand outright, deleting all 176px of the band's vertical padding on
  phones

Both were reproduced faithfully until the form was rebuilt. Adding fields made
the missing phone padding obvious, so it is now `padding-block` in
`ContactSection.astro` with `.wrap` supplying the horizontal padding. All seven
sections align at x=170, and the band has 66px of vertical padding on phones
instead of none. Recorded as deviation 2 in §3 below.

**b. Double rule under the connects-to strip.** `.strip` has a `border-bottom`
and the section immediately after has a `border-top`, so that one seam renders
2px where every other section rule is 1px. Left as-is. Tell me if it was meant
to be a heavier break.

**c. Seven colours are missing from the handoff's token table.** They are in the
design but were not documented: `#4A5044` (label text inside both figures, 8
uses), `#B87B33` (button hover), and five footer colours. They are tokenised as
`plate`, `ochre-hover` and `foot-*` in `global.css` — rename if you'd prefer
different names.

**d. The handoff describes `--koa` as "hover / pressed"**, but the CSS uses
`#B87B33` for hover and `--koa` for links and small text. The build follows the
CSS.

**e. Public Sans 500 is never used** by the design. Dropping it saves 14.6 KB.
It is currently shipped because the handoff's type spec lists 400/500/600.

---

## 3. Deviations from `index.html` — all agreed or flagged

| Change | Why |
|---|---|
| Submit button now renders in Public Sans, not Arial | `.btn` set no `font-family` and `<button>` doesn't inherit it. Also brings the button to the same 52.4px height as the anchor CTAs |
| `.cta-in` padding collision fixed | §07 aligned with every other section, and 66px of vertical padding restored on phones. See §2a |
| Content no longer matches `index.html` | Deliberate, and the point of the rebuild. Copy, figures, sections and form fields now come from `HOMEPAGE-COPY.md` and `GRAPHICS.md`. The shell still matches |
| ʻokina (U+02BB) added to Newsreader and JetBrains Mono | Neither font contains it, upstream or in any subset. See [FONTS.md](FONTS.md) |
| U+2192 restored to JetBrains Mono; sourced from it for serif contexts | Dropped by Google's latin subset; Newsreader has no arrow at all |
| Phone menu added (`<details>`, no JavaScript) | The original hid the nav links *and* the CTA together below 640px |
| Step row `h4` → `h3`; footer `h5` → `h2` | Both skipped heading levels. Renders identically |
| `<div class="figcap">` → `<figure>`/`<figcaption>` | Real figure semantics |
| `:focus-visible` outline added | The original had no focus styles outside form inputs |
| `prefers-reduced-motion` guard on `scroll-behavior` | The design is deliberately still |
| Footer year computed at build time | Was hardcoded `2026` |
| `.buildnote` block not ported | Replaced by this file |
| **Light text on `--koa` for every fill carrying a label** | Requested by the owner. Light-on-`--ochre` would have been **2.90:1** — the token's own comment reads "fills only". Moving the fill to `--koa` gives **5.56:1**, marginally better than the 5.46:1 dark text it replaced. Covers CTAs, nav button, phone menu, service numbers, Fig. 1 badges, Fig. 2 thread block. Ochre still fills everything with no text on it |
| `.nav-links a.nav-cta` specificity fix | `.nav-links a` is class+element and outranked `.nav-cta`, so the nav button's label was always `--color-quiet`. Latent in the original; invisible at 1.13:1 once the fill darkened |
| `www` → apex 308 redirect | Both hostnames served identical content. Vercel's `has: host` rule only matches with `(.*)`/`$1` |
| `server.port` reads `$PORT` | So the dev server can take an assigned port |

---

## 4. Verification status

- **Shell parity** — build vs `index.html` diffed at **1440 / 1024 / 768 / 390**
  across 24 layout probes. Type scale, section rhythm, grid, colour and spacing
  unchanged. Content deliberately differs; probe geometry, not words.
- **Contrast** — 18 foreground/background pairs checked, all pass WCAG AA.
- **Headings** — no skipped levels, single `h1`.
- **Figures** — all five have `<figcaption>`, `role="img"` and a descriptive
  `aria-label`. Fig. 4 is the only one that fits a phone without scrolling.
- **Form fields** — all labelled. Every field rendered by `IntakeForm.astro` has
  a matching entry in `FIELDS` and `LIMITS` in the handler, checked by diffing
  the two; nothing is collected and dropped.
- **Form behaviour** — both forms post and redirect correctly, the honeypot
  returns a success page and sends nothing, a missing email returns `invalid`
  and remembers which form it came from, and with credentials set the request
  reaches Resend.
- **Client JavaScript** — none.

---

## 5. Launch prep — done

| Asset | Notes |
|---|---|
| `favicon.svg` | The wordmark's ochre period, which is also Fig. 2's node and Fig. 1's badges. Pure geometry — legible at 16px, no webfont needed |
| `favicon.ico` | 16px + 32px, for older browsers |
| `apple-touch-icon.png` | 180×180, iOS home screen |
| `og.png` | 1200×630 social card, rendered by real Chrome against the built output so it uses the actual Newsreader and JetBrains Mono — including the ʻokina. Regenerated 13 Aug 2026 for the new headline |
| `robots.txt` | Generated from `site`, so the domain lives in one place |
| `sitemap-index.xml` | `/`, `/systems-map`, `/privacy`, `/terms`; `/og` and `/thanks` filtered out |
| `ProfessionalService` JSON-LD | Homepage only, in `Base.astro`. No street address, phone, hours, price range, rating or `sameAs` — all would be invented. Add `sameAs` once LinkedIn and Google Business Profile exist |
| Meta | Canonical, full Open Graph set with dimensions and alt text, Twitter `summary_large_image`, `theme-color` |

Regenerate the rasters any time the copy changes:

```bash
npm run assets:build
```

`/og` is a real page, not a hand-drawn SVG, so the card can never drift from the
site's actual type. It is `noindex`, disallowed in `robots.txt`, and excluded
from the sitemap.

---

## 6. Deployment — live

| | |
|---|---|
| **Live** | **https://threadhawaii.com** |
| Vercel | `shaunagits` / `shaunagits-projects`, project `thread` |
| GitHub | `shaunagits/thread` — public |
| Registrar | Namecheap (`Sharnold83`), nameservers unchanged |
| TLS | Let's Encrypt, both hostnames, expires 11 Nov 2026 |
| `www` | 308 → apex, path-preserving |

Deployed with the placeholder products, pricing and case study still in place, on
the owner's explicit instruction.

### DNS as it now stands

| Type | Host | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |
| MX × 5 | `@` | `eforward1–5.registrar-servers.com` — **untouched** |
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` — **untouched** |

The original parking setup was a **URL Redirect Record** on `@` plus a CNAME on
`www` — there was no A record at all. Both were replaced.

**⚠️ Never switch the nameservers to Vercel.** It will offer. Doing so drops the
MX and SPF records and breaks email forwarding. Equally, never change Namecheap's
**Mail Settings** dropdown — the MX records live behind it.

### It was originally deployed to the wrong account

The first deploys went to `peopleengineers-projects`, a Vercel account the owner
uses **only for client work**. The project, its domains and its deployments were
migrated to `shaunagits-projects`.

Moving a domain between Vercel accounts needs it removed in **two** places — the
project's domain settings *and* the team's account-level Domains page. Removing it
from just the project leaves it claimed, and the new account gets a flat 403.

A **TLS certificate may still remain** in the client account; certificates are
account-level and survive both removals. Check
`vercel.com/peopleengineers-projects/~/settings/certs` when next in that account.

### Email

`aloha@threadhawaii.com` and a catch-all forward to `shauna.coy@gmail.com` via
Namecheap's free forwarding. Already configured; needs nothing.

---

## 7. The contact form — live and working

`POST /api/contact` → validate → send via Resend → 303 to `/thanks`.
Post-Redirect-Get, **no client JavaScript**, works with JS disabled.

Verified end to end on production — a real submission was delivered.

| Behaviour | Result |
|---|---|
| Valid submission | Emails `CONTACT_TO`, `Reply-To` = sender, → `/thanks` |
| Honeypot filled | Silently → `/thanks`. Telling a bot it failed invites a retry |
| Missing name / bad email | → `/thanks?status=invalid` |
| Resend down or misconfigured | → `/thanks?status=error` showing the direct address |
| Cross-origin POST | `403` — Astro's CSRF origin check |
| Oversized fields | Truncated (name 200, email 320, business 500, stack 5000) |

Three env vars in Vercel; see `.env.example`. **They only apply to a new build** —
redeploy after changing them.

### 🟡 Notifications land in spam

Expected: `onboarding@resend.dev` is a shared sender with no DKIM alignment to
this domain. **Only the owner receives mail from this site**, so it affects one
inbox — but a system-map request in spam is a missed lead.

- **Now:** a Gmail filter on `subject:("System map request")` → *Never send it to
  Spam*. Filter on the subject, not the sender — the subject is set in code and
  survives a change of sending domain.
- **Properly:** verify `threadhawaii.com` in Resend and switch `CONTACT_FROM` to
  an address on it. Keep Resend's SPF on the `send.` subdomain — **there is
  already an SPF record at the root and a domain may only have one.**

**Not implemented:** rate limiting. The honeypot stops naive bots, not a
determined one.

---

## 8. Still to do

- [ ] **The primary CTA's booking URL.** The owner killed the free systems map
      as the call to action on 14 Aug 2026 and replaced it with "book a call".
      A scheduling link exists but has not been supplied, so `Hero.astro`'s
      primary button points at `#contact` as a **placeholder**. Swap the href
      when the URL lands.
- [x] **Retire the systems map everywhere else.** Done 14 Aug 2026 with the v3
      copy. Nav CTA now "Book a call", §04 replaced by "What you own", step 01
      relabelled `LEARN`, the contact link and the `map` branch of both
      `IntakeForm.astro` and `api/contact.ts` removed, `Base.astro`'s meta
      description and `makesOffer` rewritten, `/systems-map` deleted and 301'd
      to `/#contact` in `vercel.json` because it was indexed. `thanks.astro`
      lost its `form=map` branch. `Fig5SystemsMap.astro` is now unreferenced.
      `OFFER-AND-PIPELINE.md` and `STRATEGY.md` remain stale on this point.

- [x] **Replace the fabricated §04 and §05 content.** Done 14 Aug 2026. §04 is
      gone with the systems map; §05 (Work) is removed entirely and does not
      return until there is a real project with real numbers to put in it.

- [ ] **Confirm the numbers v3 is shipping without.** Pricing carries durations
      and terms only: the `$14,000`, `$28,000` and `$2,400/month` in the draft
      were the owner's own placeholders, and the `$20 to $200` hosting range in
      the Questions section was never confirmed. All are absent rather than
      invented. Supply them and they go in `plans` in `site.ts`, the hosting
      answer in `questions`, and only then a `priceSpecification` in the schema.

- [ ] **Reassess the guarantee after a production check.** It ships as written:
      working software in two weeks, either side can stop, nothing owed beyond
      that point. The owner wants to revisit whether to soften it to a
      scope-and-price checkpoint once the site is live.
- [ ] Gmail filter for form notifications (or verify the domain in Resend)
- [ ] Privacy and Terms pages — the footer links to them as plain text, and the
      form collects personal data
- [ ] A 404 page in the design language — not built; Vercel's default shows
- [ ] Check for the leftover certificate in the client Vercel account
- [ ] Decide items 2a–2e: §07 alignment, the doubled rule under the strip, token
      names, the `--koa` discrepancy, dropping the unused Public Sans 500
