# Thread — homepage graphics plan

Companion to `HOMEPAGE-COPY.md`. What to keep, what to fix, what to add.
Rendered sketches of the three new plates: `thread-figures-v1.html`.

---

## The visual system you already have

Worth naming, because it's the most valuable thing in the project and it should
constrain everything below.

The existing figures are **annotated technical plates**. Hairline strokes on warm
paper, ochre used only as fill, numbered badges on leader lines, JetBrains Mono
for labels and Newsreader for numerals. It reads like a page from a field manual
or a patent drawing: something recorded rather than something advertised.

That's a genuinely good choice for this business, for three reasons:

1. **It looks like the deliverable.** Thread sells maps and documentation. The
   graphics are maps and documentation. Almost no software studio's visuals
   describe their actual work.
2. **It's cheap to extend.** Flat SVG, no photography, no illustration budget,
   no license risk. You can draw a new plate in an afternoon.
3. **It ages slowly.** No gradients, no 3D, no trend markers.

**The rule for everything new: if it couldn't be printed in one colour on
newsprint, it doesn't belong on this page.**

---

## Current figures, audited

### Fig. 1 — Operations panel *(hero)*

**Keep it.** It's the best asset in the project and the six annotated callouts
are doing real selling: live counts, reconciliation, auto-invoicing, roles, "your
account, your data."

Three fixes, all small:

| Fix | Why |
|---|---|
| Change the plate header from `OPERATIONS · KAILUA YARD` | It ties the hero to the fabricated Kailua case study in §05. Use something neutral: `OPERATIONS · CONCEPT` or a made-up-and-obviously-generic `OPERATIONS · SAMPLE ACCOUNT` |
| Add `CONCEPT DRAWING` in the bottom corner, mono, koa | A skeptical reader currently can't tell this from a screenshot of real client software. Saying so costs one line and buys the credibility the rest of the page is trying to earn |
| Check the callouts name only tools you've actually integrated | Callout 1 names Jobber, callout 2 names QuickBooks. Fine if true. `[CONFIRM]` |

Optionally: the three job rows say Kahala, Waimea and ʻAiea. Those are fine and
they do good local work. Keep.

### Fig. 2 — The thread diagram *(§02)*

**Keep, unchanged.** Five tools converge through one node into three outputs.
It's the clearest single explanation of the business on the site.

One note: it becomes much stronger once §01 has the "before" plate below, because
the two then read as a pair. Right now it's an "after" with no "before".

Renumbering: if you add the §01 plate it becomes Fig. 2 and this becomes Fig. 3.
Captions are literal strings in the components, so that's a five-minute change.

### Specimen *(§05)*

**Keep the container, replace the contents.** The spec-sheet shell (mono header
rail, serif body, three big serif figures down the right) is a good frame for a
case study and it's already built and responsive. It's currently filled with the
fabricated Kailua metrics. Swap in your real prior work when you send it to me.

If a project genuinely has no number attached, the right-hand rail can carry
three qualitative markers instead (`REPLACED · 4 SPREADSHEETS`), which is honest
and still reads as evidence.

### Connects strip

**Keep as text, don't add logos.** Logos imply partnership or certification you
don't have, they date fast, and several of those companies have trademark rules
about it. Serif names on the wash band is the more confident choice anyway.
Prune to tools you've actually built against.

### What's missing, structurally

Two problems with the current set:

1. **§01 is the strongest writing on the page and has no picture.** It's the
   section where the reader recognises themselves, and it's a wall of text.
2. **All three plates are wide.** Every one triggers the sideways-scroll hint on
   mobile. A third wide plate makes that a pattern rather than an exception.

---

## Three new plates

All three are drawn and rendered in `thread-figures-v1.html`. Open it in a
browser from the repo root so the fonts resolve.

### A. Where the person sits in the line — *for §01*

> Five tools in a row. Between each pair, a dashed arc that dips down through an
> ochre dot. Under each dot, what a person does there and how often: *typed in by
> hand / every evening*, *exported, re-imported / twice a week*, *reconciled by
> hand / every Friday*, *someone remembers / or they don't*. A rule underneath,
> then: `FOUR HANDOFFS · NONE OF THEM AUTOMATIC · NONE OF THEM ON ANY INVOICE`.

**Why this one first.** §01 says "a person becomes the connection between them."
This draws that sentence. The ochre dots are people, and once you see that the
line only continues because someone carries it, the argument is made before you
finish reading.

It also completes the pair. §01 becomes the before, §02 the after, using the same
five tool boxes so the rhyme is obvious. Dashed strokes mean manual; solid
strokes in Fig. 2 mean automatic. That's the entire visual thesis in one contrast
and it needs no legend.

**Practical notes.** Vertical space is tight (300 units against Fig. 1's 520) so
it sits comfortably in the text column. The four labels are the only thing to
tune: they should be the four handoffs you hear most often on real calls, so
replace mine once you've done three maps.

### B. The systems map, specimen — *for §04*

> A framed plate. Header rail: `SYSTEMS MAP · LEAD TO INVOICE` on the left,
> `SPECIMEN · NOT A REAL CLIENT` on the right. Six process stages across the top,
> Enquiry to Paid, each with the tool that handles it underneath in mono. Between
> them, connectors: two marked `AUTO`, three interrupted by numbered koa badges.
> Below the rule, two columns. Left: *where the time goes*, three numbered
> frictions matching the badges. Right: *what's worth fixing first*, three ranked
> recommendations with rough durations. The third one is `Don't build a CRM. Your
> scheduler already does this. Turn it on.` and costs nothing.

**This is the most important new graphic on the page, by some distance.**

The map is now your primary call to action. Nobody requests a deliverable they
can't picture, and "I'll draw how your work moves" is abstract until it isn't.
One specimen converts the offer from a promise into a thing.

Three things it does that copy can't:

- **It proves the restraint claim.** Your brand guide's best line is that Thread
  will tell you when you don't need custom software. Saying it is a claim.
  Ranking "don't build this" third on a sample deliverable is evidence.
- **It shows the reasoning, not just the output.** The badges connect the
  friction list to the specific point in the process where it happens. That's
  the judgment you're selling, made visible in about four seconds.
- **It's the production template.** Draw it once and every real map you deliver
  starts from it. That's most of the reason a map costs you three hours rather
  than a week.

**Practical notes.** Swap `LEAD TO INVOICE` for whichever workflow you use in the
sample. The `~2 WEEKS` and `~3 WEEKS` durations should match your real service
timings once you set them, and they're the only numbers on the plate. Everything
else is structural.

Worth doing after this: export the same layout as a one-page PDF and put it
behind a download link. A downloadable specimen will do more for map requests
than any sentence on the page.

### C. The care plate — *optional, for §03*

> A small framed list. `SHIPS WITH EVERY BUILD`, then five rows: the source in
> your repository, a written plate explaining what it does and why, running in
> your accounts on your data, monitoring, a standing monthly hour. Right-hand
> column marks each `INCLUDED` or `CARE PLAN`.

Lower priority than A and B, but it earns its place three ways. It makes the care
plan visible without a sales paragraph. It answers the bus-factor objection with
a list instead of a reassurance. And it's the only compact plate in the set, so
it's the one that behaves on a phone.

---

## Priority

| | Figure | Section | Effort | Why now |
|---|---|---|---|---|
| 1 | **B. Map specimen** | §04 | Half a day | The map is the CTA and it's currently invisible. Also becomes your delivery template. |
| 2 | **Fig. 1 fixes** | Hero | An hour | Removes the last visual link to the fabricated case study |
| 3 | **A. Before plate** | §01 | Half a day | Completes the before/after pair, gives the best copy a picture |
| 4 | Specimen contents | §05 | Blocked on you | Needs your prior work |
| 5 | **C. Care plate** | §03 | Two hours | Nice to have. Do it when the care plan pricing is settled. |
| 6 | Map specimen as PDF | Download | Two hours | The single best conversion asset for a free offer |

---

## Ideas I considered and would not do

**Icons for the four services.** Four small glyphs would be conventional and
would weaken the page. The plates work because each one is a specific drawing of
a specific thing; a row of generic pictograms is the opposite. The services list
is fine as type.

**Photography of Hawaiʻi.** Your brand guide already rules out stereotypical
tropical imagery and it's right. A photograph would also break the one-colour
newsprint rule and make everything around it look thinner.

**A photograph of you, on About.** This one is the exception and you should do
it. Not a graphic in the plate sense, but it's the highest-conversion image on
any solo practice's site. Plain, well-lit, not a studio headshot.

**Animation on the thread diagram.** Drawing the line in on scroll is the obvious
temptation and `CLAUDE.md` rules it out: no client JavaScript, no scroll effects.
Correct call. Stillness is part of why the page reads as considered.

**A logo mark.** Your brand guide has six territories sketched (continuous line,
connected T, two-into-one, interwoven, typographic, icon-only). Worth doing, but
it's a separate exercise and the site works without one. The Fig. 2 node, where
five lines converge into a single ochre point, is arguably already the mark. Take
that circle-and-converging-lines fragment, simplify it to two strokes, and you
have a favicon derived from the diagram rather than invented next to it. That's
the direction I'd explore first.

---

## Production notes

- All three new plates use only existing tokens. No new colours, per `CLAUDE.md`.
- Ochre (`--color-ochre`) carries no text in any of them. Numerals sit on koa
  (`--color-koa`) with paper text, per landmine 5.
- The preview file hardcodes hexes because it's standalone. When these become
  `.astro` components, lift every colour into a class the way
  `Fig1OperationsPanel.astro` does, so no hex sits in a component.
- Each plate needs a real `aria-label` describing what it shows. The two existing
  ones set a good standard; mine follow it.
- Wrap each in the existing `Figure.astro` so they inherit the caption and the
  sideways-scroll affordance.
- One open question for you: `Figure.astro` captions and the section eyebrows use
  em dashes, which collides with your no-em-dash rule. Flagged in
  `HOMEPAGE-COPY.md` too. A middle dot works and is already used elsewhere in the
  plates.
