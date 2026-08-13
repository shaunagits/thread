# Build brief — taking the new content into the site

Everything needed is in the repo. This file is the handoff: what to point Claude
Code at, in what order, and the six places it will get stuck if nobody warns it.

---

## What's in the folder now

| File | Role in the build |
|---|---|
| `HOMEPAGE-COPY.md` | **The spec.** Section by section, ready to paste. |
| `GRAPHICS.md` | **The figure plan.** What to keep, fix, add. |
| `thread-figures-v1.html` | **Working SVG source** for the three new plates. Lift the markup, swap hexes for tokens. |
| `OFFER-AND-PIPELINE.md` | Background. Strategy, not build input. |
| `STRATEGY.md` | Background. Earlier review. |
| `Thread_Hawaii_Master_Strategy_Brand_Guide.docx` | Background. The source brand guide. |

**Point Claude Code at the first three only.** The other three are 60kb of
strategy that will crowd out the context it actually needs. Mention they exist
if it asks why a decision was made.

All six are untracked on `main`. Commit them before you start so the build has a
clean diff against them.

---

## Six things it will get stuck on

### 1. `CLAUDE.md` says the content can't change. Resolve this first.

`CLAUDE.md` states that `index.html` is the source of truth, that no new
components or colours are allowed, and that parity with `index.html` is verified
by diffing computed geometry. This work deliberately rewrites the content, adds
two sections' worth of new figures, and changes the form.

Say this explicitly at the top of the session, or you'll spend an hour arguing
with your own instructions:

> `index.html` remains binding for **layout, type scale, colour and spacing**.
> It is no longer binding for **content**. Copy, section content, figures and
> form fields are now specified by `HOMEPAGE-COPY.md`. New plates must reuse
> existing tokens and the existing `Figure.astro` wrapper. No new colours, no new
> spacing values, no new component patterns.

Update `CLAUDE.md` at the end of the work to say the same thing, so the next
session doesn't rediscover it.

### 2. Deleting `placeholders.ts` is the win condition

That file is the entire fabrication surface: `products`, `specimen`,
`integrations`. The build is done when the file no longer exists.

- `products` → deleted with `ProductGrid.astro` (§04 becomes prose, so the
  component isn't needed)
- `integrations` → pruned to tools you've actually worked with, then moved into
  `site.ts`
- `specimen` → replaced with real prior work, or an honest placeholder (see §5)

### 3. The form change touches three files, not one

New intake fields means `ContactSection.astro`, `src/pages/api/contact.ts` (the
Resend handler currently reads exactly four fields: `name`, `email`, `business`,
`stack`) and `src/pages/thanks.astro`.

Keep the honeypot. Keep the field caps. Add the new fields to `LIMITS` and to the
email body, or the answers will be collected and silently dropped.

**Related landmine:** more fields makes the contact band taller, and landmine 8
in `CLAUDE.md` says `.cta-in` is deliberately bug-compatible with a shorthand
collision that already costs §07 its vertical padding below 640px. Adding six
fields will make that more visible. Decide whether you're still keeping the bug.

### 4. Anchors, nav and footer all move

- Hero primary button currently goes to `#contact`. New copy sends it to `#map`.
- `id="products"` becomes `id="map"`.
- Nav: `Products` → `The map`. `Work` stays.
- Footer Products column lists Thread Panel, Handoff and Field Kit, none of which
  exist. Replace with Systems map, Care plan, Rescue work.
- Footer Privacy and Terms are plain text. They need to be real pages, because
  the form collects personal data.

### 5. Two blocked items, and one of them can't just wait

**Blocked on you:** §05 prior work, all price floors, your name and photo, and
the honest version of the §06 opening line.

Price floors and the photo can wait. §05 cannot, because waiting means the
fabricated Kailua case study with its three invented metrics stays live. If the
real content isn't ready when the rest ships, replace it with the honest
placeholder rather than leaving the fabrication up. Losing a section is cheaper
than a prospect asking to call a client who doesn't exist.

**Do not let Claude Code fill any `[CONFIRM]` marker.** They exist precisely
because inventing plausible numbers is how this site got into trouble. If it
offers a "reasonable placeholder price," that's the failure mode repeating.

### 6. Decide the em dash question before, not after

The section eyebrows (`§ 01 — The problem`), the three step labels (`01 — MAP`)
and the figure captions all use em dashes, which collides with your rule. It's a
one-line change in `Section.astro`, `site.ts` and the two figure components if
you decide now, and a second pass over everything if you decide later. A middle
dot matches the plates, which already use `·` throughout.

---

## Suggested order

Work on a branch. Vercel preview, check, then promote.

**Phase 1 — remove the fabrications** *(nothing blocked, do this first)*
§04 becomes the map. §05 gets real work or the honest placeholder.
`ProductGrid.astro` and `placeholders.ts` deleted. Nav, footer, anchors updated.

**Phase 2 — the copy**
Hero, §01, §02, §03, §06, §07 rewritten from `HOMEPAGE-COPY.md`. Connects strip
pruned. Em dash decision applied.

**Phase 3 — the figures**
Map specimen into §04 first, it's the one doing the most work. Then the Fig. 1
header and `CONCEPT DRAWING` fix. Then the before plate into §01. Renumber:
Fig. 1 hero, Fig. 2 before, Fig. 3 thread, Fig. 4 map specimen, Fig. 5 care
plate. Convert every hardcoded hex from the preview file into a token class the
way `Fig1OperationsPanel.astro` does.

**Phase 4 — the form**
Intake fields, API handler, thanks page.

**Phase 5 — housekeeping**
Privacy and Terms pages. `LocalBusiness` JSON-LD (your brand guide's §10 wants
entity consistency for AI discovery, and it's twenty lines). Regenerate `og.png`
if the H1 changed. Update `CLAUDE.md` and `LAUNCH-CHECKLIST.md`.

---

## Verification

The geometry-parity method in `CLAUDE.md` still works and is still the right
tool, with one adjustment: it now proves the **shell** is unchanged, not the
content. Probe the type scale, section rhythm, colour and spacing. Ignore text
content differences.

Check specifically:

- **390px.** Three wide plates now instead of two. Every one triggers the
  sideways-scroll hint. Look at whether that reads as an affordance or as broken.
- **The contact band below 640px**, per landmine 8.
- **`grep -ri "kailua yard\|thread panel\|handoff\|field kit" src/`** returns
  nothing.
- **`ls src/content/placeholders.ts`** fails.
- Every `[CONFIRM]` marker is either filled with something real or the sentence
  is cut. None ship.

---

## Two other things

**`npm run assets:build` needs Chrome, `rsvg-convert` and `magick`.** If they
aren't installed wherever you run Claude Code, the og image and favicons can't be
regenerated. Not a blocker, just don't let a failed script stall the session.

**`git push` was blocked by session permissions throughout the last build**
(landmine 11). Expect to be handed the command rather than having it run.

---

## Kickoff prompt

Paste this to start:

> Read `HOMEPAGE-COPY.md`, `GRAPHICS.md` and `BUILD-BRIEF.md`, then read
> `CLAUDE.md`.
>
> Important context that overrides part of `CLAUDE.md`: `index.html` is still
> binding for layout, type, colour and spacing, but it is no longer binding for
> content. Copy, sections, figures and form fields are now specified by
> `HOMEPAGE-COPY.md`. New figures reuse existing tokens and the existing
> `Figure.astro` wrapper. No new colours, spacing values or component patterns.
>
> Work on a branch. Start with Phase 1 in `BUILD-BRIEF.md`: remove the
> fabricated §04 and §05, delete `ProductGrid.astro` and
> `src/content/placeholders.ts`, and update the nav, footer and anchors.
>
> Do not fill in any `[CONFIRM]` marker. Those are deliberately unfilled and I
> will supply the values. If something can't be built without one, stop and ask.
>
> Show me the plan before you edit anything.
