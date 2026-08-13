# Thread — build handoff prompt

Copy everything below the line into Claude Code, run from `~/Desktop/claudecode/thread`.

---

I have a finished, approved homepage design as a single static file: `index.html` in this directory. It is the source of truth for layout, copy, type, color, spacing, and graphics. I want you to turn it into a real Astro + Tailwind site without changing how it looks.

**Read `index.html` in full before writing any code.** Every decision in it was made deliberately. Do not redesign, "improve," or modernize anything. If something looks unusual, assume it is intentional.

## What the design is

A marketing homepage for Thread — a custom software, dashboards, and AI automation studio in Honolulu, Hawaiʻi. The visual direction is a naturalist's field guide: warm paper ground, ochre accent, section markers (`§ 01 — The problem`), numbered figures with captions, and margin notes set in the right-hand column.

It is a single file, no JavaScript, two inline hand-authored SVG figures, and Google Fonts as the only external dependency.

## Design tokens — carry these over exactly

Define these as Tailwind theme extensions, not as arbitrary values scattered through the markup.

```
--paper  #FCFBF7   page ground
--wash   #F4F0E6   alternating band / connects-to strip
--white  #FFFFFF   cards
--ink    #1C2118   headlines
--body   #2E3329   body copy
--quiet  #5A6053   secondary text
--faint  #666D5E   captions, margin notes
--rule   #E0DCD0   section rules
--hair   #C3C0B4   card borders, hairlines
--ochre  #C8873F   primary accent, buttons, figure strokes
--line   #AE7126   figure leader lines
--koa    #8F5A1C   hover / pressed
```

Type:

- **Newsreader** (serif, optical sizing, 400/500/600 + italic) — headlines and figure labels
- **Public Sans** (400/500/600) — body and UI
- **JetBrains Mono** (400/500) — eyebrows, section markers, figure captions, data labels, the `AUTO` tags

Layout: content column `1180px`, right margin column `220px`. Breakpoints already in the file are `1000px`, `820px`, `640px` — keep those, they are tuned to where the margin column and the figures need to reflow.

## Page structure

| Section | id | Content |
|---|---|---|
| Header | — | `thread.` wordmark, nav (Services / Products / Work / About), ochre CTA button "Get your systems mapped" |
| Hero | `top` | H1 "A field guide to the software you already own." + subhead, two CTAs, margin note "In the margin", then **Fig. 1 — Operations panel, annotated** |
| Connects-to strip | — | QuickBooks, Shopify, Square, Jobber, Airtable, Stripe, Slack, Google Workspace, HubSpot |
| § 01 The problem | — | "Nothing is broken. That's the problem." + margin note "Typical intake" |
| § 02 How it works | `how` | "One line through everything you run." + **Fig. 2 — The thread, drawn** + three-step row (Map / Build / Hand over) |
| § 03 Services | `services` | "Four kinds of work, one underlying job." |
| § 04 Products | `products` | "Some of it we've already built." |
| § 05 Work | `work` | "Every project ships with its plate." |
| § 06 About | `about` | "Built in Hawaiʻi. Useful anywhere." |
| § 07 Start here | — | "Let's map what you're running." + footer |

## The two figures matter most

**Fig. 1** is an annotated mock operations dashboard: a bordered panel with a mono header bar (`OPERATIONS · KAILUA YARD`), four stat cards (142 open jobs / $18.4k unbilled / 6 overdue / 94% on time), an ochre bar chart, a "Today" list, an active-jobs table with `AUTO` tags, and a synced-status footer. Six numbered ochre badges sit outside the panel on leader lines, three per side.

**Fig. 2** is the thread diagram: five tool boxes on the left (QuickBooks, Shopify, Jobber, Square POS, Spreadsheets) joined by curved ochre bezier paths into a single node, through an ochre `thread` block, then fanning out to three boxes on the right (One dashboard, Automated handoffs, Client portal).

Both are inline SVG. Port them as Astro components with the paths intact. Do not rebuild them with divs, a chart library, or an icon set. The leader lines and curve geometry are the design.

## What I want you to do

1. Scaffold Astro + Tailwind here. Keep `index.html` in the repo untouched as the reference — put the build in a normal Astro structure alongside it.
2. Extract the tokens above into `tailwind.config`. No hardcoded hex in components.
3. Break the page into components: `Header`, `Hero`, `Fig1OperationsPanel`, `ConnectsStrip`, `Section` (a shared wrapper taking the `§ NN — Label` eyebrow, heading, and optional margin-note slot), `Fig2ThreadDiagram`, `StepRow`, `Footer`.
4. Self-host the three fonts rather than hitting Google Fonts. Subset to latin + the ʻokina (U+02BB) — "Hawaiʻi" appears throughout and must render correctly.
5. Preserve semantics and accessibility: real heading hierarchy, `<figure>`/`<figcaption>` for both figures, `aria-label` or a title on each SVG, visible focus states on nav and CTAs, and check ochre-on-paper contrast for any small text.
6. Match the existing breakpoints. Verify at 1440, 1024, 768, and 390 wide before you tell me it's done.

## Open decisions — raise these before you wire them

- **The CTA.** "Get your systems mapped" currently goes nowhere. Ask me before building a form, and tell me what you'd recommend given the rest of the stack.
- **Deployment.** I have Vercel available. Confirm with me before configuring anything.
- Anything else where the design is ambiguous — ask rather than guess.

## Ground rules

- No new colors, fonts, spacing scales, or components that aren't in the design.
- No animation, parallax, or scroll effects. The page is deliberately still.
- Keep it zero-JS where possible. Astro should ship no client bundle for this page.
- If you think something in the design is a mistake, tell me — don't silently fix it.

Start by reading `index.html` and giving me your build plan. Don't write code until I've okayed the plan.
