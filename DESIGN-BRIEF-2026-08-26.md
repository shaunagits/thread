# Thread homepage revision: design brief

Handoff brief for implementing the 26 Aug 2026 copy audit
(`COPY-AUDIT-2026-08-26.md`) on the live site. A clickable prototype of the
target state exists; ask Shauna for the link. The prototype is a *copy and
structure* reference, not a pixel reference: the live site's own components,
tokens and spacing remain the source of truth for how things are built.

## Read first, in this order

1. `CLAUDE.md` in full, especially the landmines. Every one of them cost real
   debugging time. Do not rediscover them.
2. `COPY-AUDIT-2026-08-26.md`, the rationale for every change below.
3. The prototype, with audit notes toggled on, to see where each change lands.

## Ground rules, non-negotiable

The working branch is `thread-homepage-refresh`, and pushing `main` deploys
straight to production, so check your branch before every push. No hardcoded
hex anywhere; every colour is a token in `global.css`. The seven-value type
system is closed; nothing gets a new size, leading or tracking. Spacing
values must already exist in `index.html`. No client JavaScript beyond the
existing two-line scroll-restoration script; the FAQ disclosure must be a
native `<details>`. No em dashes in anything a visitor reads. Nothing
invented: no prices, no clients, no metrics, no testimonials. If a change
below conflicts with something you find in the repo, stop and raise it
rather than resolving it silently.

## The changes

### 1. Restore the guarantee (audit finding 1)

New content block at the end of §02, after the three process steps: a
bounded, white, koa-edged panel. Copy, pending owner sign-off:

> The first two weeks come with a simple guarantee. You see working software
> inside them, and either of us can stop there, with nothing owed beyond
> that point.

Echo near the form in §04/§05 as a one-line micro label: "First two weeks
guaranteed · either of us can stop." Do not ship either string until the
owner confirms the wording.

### 2. Hero lead restored (finding 2, Option B)

Headline and eyebrow stay exactly as they are. Add back the hero lead (the
`.lead` styles in `Hero.astro` were kept for exactly this):

> Apps, dashboards and automation for Hawaiʻi businesses. I connect the
> tools you already run and build what is missing, so the retyping stops.

Check the hero still clears the fold on a laptop after adding it; the 80px
hero padding was chosen for that.

### 3. Human block (finding 3)

Small card beside the form in the contact band: photo, name, two sentences:

> [Owner name] · Thread is one person, based in Honolulu. I build every
> system myself and I answer this form myself.

Blocked on the owner's name and photo. Build it behind real assets only; do
not ship with a placeholder.

### 4. New §01 lead, pain-first (finding 7)

The current §01 lead ("I close the gaps between the tools you already use,
then build the ones you're missing") retires, absorbed by the new hero lead.
Replace with:

> The number that gets typed into three systems. The job status that lives
> in someone's head. The Friday spent building the same report again. That
> is the gap I close.

### 5. CTA integrity (finding 5)

Until a real scheduling link exists: every "Book a call" button (header,
phone menu, hero, §01, form submit) becomes "Start the conversation", except
the form submit, which becomes "Send it over". Header and hero buttons must
always say the same thing (see `Header.astro`). Thanks-page ok heading
becomes "Got it." with the body unchanged. Unify the reply promise to one
string, "within one business day, usually sooner", in the §04 lead, the form
note and the thanks page. When the owner supplies a scheduler, "Book a call"
returns as the primary CTA pointing at it and the form becomes the
write-first path.

### 6. Services move to §01 (finding 6, Option B) · owner approval required

`ServiceCards` moves from §03 into §01, below the dashboard plate, above the
button row. §03 becomes ownership plus the guarantee context only. This
reopens the 19 Aug layout decision, so it ships only with the owner's
explicit yes; the prototype shows the intended result. Nav labels do not
change. If the owner declines, fall back to finding 6 Option A: retitle §01
only.

### 7. FAQ section restored (finding 9)

New section between §03 and the contact band: eyebrow "04 · Questions",
heading "Fair questions." Recover `QuestionList.astro` and the `questions`
array from git (commit `589ae02^` has the array; the component was deleted
in the same-day sweep) rather than rewriting. Two copy edits to the
recovered array: "Thread works remotely" becomes "I work remotely" to match
the site's first-person voice, and the "went badly" answer gains the
guarantee sentence from change 1. Renumber the contact band's marker from
"04 · Start here" to "05 · Start here", and remember the section markers,
nav and footer must stay in agreement.

### 8. Step 02 price candor (finding 8) · owner approval required

Step 02 body gains a final clause: "…Agreed before any work starts, and I
give you a straight number on the first call." Ships only if the owner
commits to doing it. No prices anywhere, still.

## Mechanical cautions for these specific changes

Adding the FAQ means a new section: use a top-level `<section>` only, never
nested (landmine 23), and `<details>` styling that reuses ServiceList-era
row rules rather than new patterns. If any new block gets a scroll reveal,
longhands only with the from-state inside the keyframes, and verify the
built CSS, not the dev server (landmine 22). Any selector reaching into
`Section.astro`'s `.wrap` sits fully inside `:global()` (landmine 18). The
form itself does not change fields, so `contact.ts` should not need
touching; if a field ever does change, both files move in one commit
(landmine 14). Run the geometry parity probes after the structural changes,
ignoring words.

## Sequencing

Ship in two commits minimum: first the copy-only changes (2, 4, 5), which
carry no structural risk; then the structural set (1, 6, 7) once the owner
has answered the open questions. Changes 3 and 8 land whenever their owner
inputs arrive.

## Open owner decisions, blocking

Guarantee wording (change 1). ServiceCards move (change 6). Price-candor
clause (change 8). Name and photo (change 3). Scheduling link (change 5's
end state). These are listed with fuller context at the end of
`COPY-AUDIT-2026-08-26.md`.
