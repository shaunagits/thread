# Thread — launch checklist

Replaces the `.buildnote` block from `index.html`, which is not ported.
`index.html` stays in the repo untouched as the design reference.

---

## 1. Placeholder content — must be replaced before launch

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

## 6. Deployment — threadhawaii.com

### Current state (preview only)

| | |
|---|---|
| Vercel team | `peopleengineers-projects` |
| Project | `thread` |
| Preview URL | `https://thread-pw5dy5kfp-peopleengineers-projects.vercel.app` |
| Protection | Vercel Authentication — sign-in required, `x-robots-tag: noindex` |
| Public aliases | none |
| threadhawaii.com | untouched, still parked at `162.255.119.38` |

The preview needs a Vercel login, so it opens for you but is not shareable as-is.
To show it to someone outside the team, either turn off Deployment Protection in
project settings, or add a Protection Bypass token — say the word and I'll walk
through it.

**⚠️ Note on the first deploy.** Vercel automatically promotes a *new* project's
first deployment to production, which it did here — creating two public aliases
(`thread-nine-alpha.vercel.app` and `thread-peopleengineers-projects.vercel.app`)
carrying the placeholder content, with no `noindex`, for roughly two minutes.
Both aliases were removed and now return 404. Nothing linked to them and the
domain was never involved. Subsequent deploys are genuine previews — the
auto-promote only happens once, on a project's first deploy.

The original production deployment still exists without any alias, and is
sign-in protected. Harmless; say if you'd rather I delete it.

**The form does not send on the preview** — no env vars are set, so it correctly
shows the "not sent" state and logs the missing configuration. Add the three
variables from `.env.example` in Vercel to make it live.

---


`site` in `astro.config.mjs` is set to `https://threadhawaii.com`. Canonical URL,
`og:url`, `og:image`, `sitemap.xml` and `robots.txt` all derive from it.

### What's currently on the domain

| | |
|---|---|
| Registrar / DNS | Namecheap (`dns1/dns2.registrar-servers.com`) |
| A record | `162.255.119.38` — a **parked page**, not a real site |
| MX | Namecheap email forwarding (`eforward1–5.registrar-servers.com`) |
| SPF | `v=spf1 include:spf.efwd.registrar-servers.com ~all` |
| DMARC | none |

Nothing of value is being served, so this is a clean launch rather than a
cutover — no traffic or SEO to preserve. But **email forwarding is live on this
domain**, and that constrains two things below.

### ⚠️ Do not move the nameservers to Vercel

Vercel will offer it. Taking it would drop the MX and SPF records above and
**break email forwarding to `@threadhawaii.com`** — including whatever address
you use for contact. Keep Namecheap's nameservers and change only the host
records:

| Type | Host | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Vercel shows the exact values when the domain is added — use those if they
differ. Leave every MX and TXT record alone.

### Email — no DNS work needed to launch

Two separate problems, two separate answers.

**Receiving** at `aloha@threadhawaii.com`. The site prints this address publicly
as a `mailto:` link, so it has to work no matter how the form is wired.
Namecheap's forwarding MX records are already in place — create the alias in the
Namecheap dashboard pointing `aloha@` → your Gmail. No DNS changes. **Do this
regardless.**

**Sending** from the form. Resend's shared sender `onboarding@resend.dev` works
without verifying any domain. Its one restriction — it can only deliver to the
address you signed up with — is exactly what this form needs, since it only ever
writes to one inbox. So: sign up for Resend with your Gmail, set `CONTACT_TO` to
that Gmail, and `CONTACT_FROM` to `Thread <onboarding@resend.dev>`. Nothing
touches DNS. `Reply-To` still carries the visitor's address, so replying from
Gmail reaches them directly. See `.env.example`.

### ⚠️ Later, when you send from your own domain

Only relevant once you switch `CONTACT_FROM` to an `@threadhawaii.com` address.

There is already an SPF record at the root, and a domain can only have one.
**Adding a second breaks SPF entirely** — they don't merge. Resend's verification
asks for records on a `send.threadhawaii.com` subdomain plus a DKIM key at
`resend._domainkey`; that's the safe shape, because the sending SPF lives on the
subdomain and the root record stays untouched. If it instead asks you to put
`include:amazonses.com` at the root, don't add a second record — merge it into
the existing one and check with me first.

### Division of labour

| Step | Who |
|---|---|
| `@astrojs/vercel`, `vercel.json`, cache + security headers | ✅ done |
| Namecheap: forward `aloha@` → your Gmail | **You** |
| Resend: sign up with that Gmail, copy the API key | **You** |
| `vercel login` | **You** — I never handle credentials |
| Set `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` in Vercel | **You** — see `.env.example` |
| First deploy to a preview URL | Me, on your say-so |
| Verify the preview: fonts, live form send, social card, four widths | Me |
| Add the domain in Vercel, then the two host records above | **You** |
| Promote to production | Me, on your say-so |

Domain verification in Resend is **not** on this list — it isn't needed until you
want mail sent from `@threadhawaii.com`.

I won't change DNS, buy domains, or deploy anything without you asking each time.

---

## 7. The contact form — built

`POST /api/contact` → validate → send via Resend → 303 redirect to `/thanks`.
Post-Redirect-Get, so refreshing the result page never resubmits. **No client
JavaScript**, and it works with JS disabled.

| Behaviour | Result |
|---|---|
| Valid submission | Emails `CONTACT_TO`, `Reply-To` set to the sender, → `/thanks` |
| Honeypot filled (bot) | Silently → `/thanks`. Telling a bot it failed just invites a retry |
| Missing name / bad email | → `/thanks?status=invalid`, nothing lost |
| Resend down or misconfigured | → `/thanks?status=error` showing the direct email address, and a loud server log |
| Cross-origin POST | `403` — Astro's CSRF origin check |
| Oversized fields | Truncated (name 200, email 320, business 500, stack 5000) |

All six verified locally. The success path was exercised against Resend's real
API with a dummy key: the request was accepted and rejected **only** on the key,
confirming the endpoint, auth header and JSON body are well-formed. The genuine
send gets verified on the preview deploy, once a real key exists.

Three env vars are needed — see `.env.example`. The site builds and previews
fine without them; only sending needs them.

**Not included:** rate limiting. The honeypot stops naive bots but not a
determined one. If it gets abused, Vercel's WAF or a Resend-side cap is the fix.

---

## 8. Still to do

- [ ] Privacy and Terms pages — the footer links to them as plain text today,
      and a privacy policy becomes necessary once the form collects data.
- [ ] A 404 page in the design language — not built; Vercel's default shows
      otherwise. Say the word.
- [ ] Decide on items 2a–2e above.
- [ ] Replace everything in section 1.
