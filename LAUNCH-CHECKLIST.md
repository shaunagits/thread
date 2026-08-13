# Thread — launch checklist

Replaces the `.buildnote` block from `index.html`, which is not ported.
`index.html` stays in the repo untouched as the design reference.

---

## 1. Placeholder content — 🔴 LIVE, and must be replaced

> **The site is already published at https://threadhawaii.com with everything
> below still in place**, on the owner's explicit instruction after being told
> twice. It is publicly readable and indexable: `robots.txt` allows crawling and
> the sitemap advertises the page. This is the top outstanding task.

All of it lives in [`src/content/placeholders.ts`](src/content/placeholders.ts).
Nothing else in the site is invented.

| What | Where | Needs |
|---|---|---|
| **Thread Panel / Handoff / Field Kit** — names, descriptions, feature lists, and **all pricing** ($390/mo, $1,200, $2,400) | `products` | Your real lineup and real prices |
| **Specimen 001** — the Kailua landscaping case study, both header lines, all three paragraphs, and **all three metrics** (1.5 days, −19 days, 7 → 1) | `specimen` | A real client **with written permission**, or delete §05 until you have one |
| **Integration strip** — QuickBooks, Shopify, Square, Jobber, Airtable, Stripe, Slack, Google Workspace, HubSpot | `integrations` | Confirm you actually build against each before listing it |
| **Email address** — `aloha@threadhawaii.com` | `contact.email` | Your real address (also needed for Stage 4) |

Two more that aren't in that file:

- **The free system map offer.** It runs through the whole page as the primary
  CTA and is the strongest thing here — but only ship it if you will honour it.
- **`site` in `astro.config.mjs`** is set to a placeholder domain.

---

## 2. Open questions for you

**a. The §07 contact band is 40px out of alignment on desktop.**
In `index.html`, `.cta-in{padding:88px 0}` and `.wrap{padding:0 40px}` are both
single-class selectors, so source order alone decides which wins. The result:

- above 640px — §07's content starts at x=130 while every other section starts
  at x=170
- at/below 640px — the later `@media(max-width:640px) .wrap` rule replaces the
  shorthand outright, deleting all 176px of the band's vertical padding on
  phones

The build reproduces both faithfully rather than silently correcting them, so
nothing looks different from the approved file. If you want it fixed, the change
is `padding-block: 88px` in `ContactSection.astro` and letting `.wrap` supply the
horizontal padding — that aligns §07 with the other sections and restores phone
padding. **Your call.**

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
| Submit button now renders in Public Sans, not Arial | `.btn` set no `font-family` and `<button>` doesn't inherit it. Also brings the button to the same 52.4px height as the anchor CTAs — **the only pixel difference anywhere in the build** |
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

- **Visual parity** — build vs `index.html` diffed at **1440 / 1024 / 768 / 390**
  across 24 layout probes. Identical at every width apart from the +6.4px
  submit-button fix above.
- **Contrast** — 18 foreground/background pairs checked, all pass WCAG AA.
- **Headings** — no skipped levels, single `h1`.
- **Figures** — both have `<figcaption>`, `role="img"` and a descriptive
  `aria-label`.
- **Form fields** — all labelled.
- **Client JavaScript** — none. `dist/` is one HTML file, one 24 KB stylesheet
  and six woff2.

---

## 5. Launch prep — done

| Asset | Notes |
|---|---|
| `favicon.svg` | The wordmark's ochre period, which is also Fig. 2's node and Fig. 1's badges. Pure geometry — legible at 16px, no webfont needed |
| `favicon.ico` | 16px + 32px, for older browsers |
| `apple-touch-icon.png` | 180×180, iOS home screen |
| `og.png` | 1200×630 social card, rendered by real Chrome against a production preview so it uses the actual Newsreader and JetBrains Mono — including the ʻokina |
| `robots.txt` | Generated from `site`, so the domain lives in one place |
| `sitemap-index.xml` | Homepage only; `/og` is filtered out |
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

- [ ] **Replace the fabricated §04 and §05 content — it is live.** See §1 and §2.
      Owner has decided the shape; the material itself is still outstanding.
- [ ] Gmail filter for form notifications (or verify the domain in Resend)
- [ ] Privacy and Terms pages — the footer links to them as plain text, and the
      form collects personal data
- [ ] A 404 page in the design language — not built; Vercel's default shows
- [ ] Check for the leftover certificate in the client Vercel account
- [ ] Decide items 2a–2e: §07 alignment, the doubled rule under the strip, token
      names, the `--koa` discrepancy, dropping the unused Public Sans 500
