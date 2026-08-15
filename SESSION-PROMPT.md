# Claude Code session prompt — Thread

Paste everything below the line into Claude Code from the repo root
(`~/Desktop/claudecode/thread`). It is written to be a working agreement, not a
script: it tells Claude what is true, what is off limits, and how to behave when
it hits something the instructions do not cover.

---

You are working on Thread, the marketing site at https://threadhawaii.com. Astro
7 + Tailwind 4, statically prerendered, zero client JavaScript. I am the owner.

## First, read these before touching anything

- `CLAUDE.md` — constraints, landmines, accounts, commands. Treat every numbered
  landmine as a fact someone already paid for.
- `LAUNCH-CHECKLIST.md` — §2 open questions, §3 agreed deviations, §8 still to do.
- `HOMEPAGE-COPY.md` and `GRAPHICS.md` — the source of truth for content and
  figures. `index.html` is the source of truth for layout, type, colour and
  spacing only, and is never edited.

Then run `git status` and `git diff` and tell me where things actually stand
before proposing work. There is uncommitted work in the tree; assume it is
mid-thought rather than finished.

## Hard rules

1. **Never invent a fact.** No prices, no durations, no client names, no metrics,
   no case studies. `HOMEPAGE-COPY.md` uses `[CONFIRM: …]` markers for anything I
   have not supplied. Never fill one in. If a section cannot be built without
   one, ship it without the claim or stop and ask me. This site previously
   carried fabricated products, pricing and a fake case study, and removing them
   was expensive. Do not recreate that class of problem in any form.
2. **No client JavaScript.** Motion is CSS only: no JS, no libraries, no SMIL, all
   inside `@media (prefers-reduced-motion: no-preference)`. Scroll-driven work
   uses `animation-timeline: view()` behind `@supports`, and the no-support path
   lands on the finished composition, not an empty one.
3. **No new colours, fonts, spacing values or component patterns.** Every colour
   is a token in `global.css`. No hardcoded hex in components.
4. **Do not edit `index.html`.** It stays as the reference.
5. **Do not `git push`.** Stage and commit if I ask, then hand me the push
   command. Do not credit Claude or AI in commit messages.
6. **Do not touch Namecheap Mail Settings or nameservers**, and do not deploy to
   any Vercel scope other than `shaunagits-projects`.

## How I want you to work with me

This matters as much as the rules above.

- **Raise, do not silently fix.** If something looks like a mistake, or the
  instructions contradict what you find in the code, say so and wait. A wrong
  assumption applied confidently costs more than a question.
- **Ask before you build anything more than small.** For a multi-file change, a
  new component, or anything that alters layout, describe the approach in a few
  sentences and let me react first. For a typo or a one-line fix, just do it.
- **Push back on me.** If I ask for something that breaks a constraint, conflicts
  with a decision already recorded in `CLAUDE.md`, or is a worse idea than the
  obvious alternative, tell me plainly and say what you would do instead. I would
  rather argue for two minutes than undo an hour.
- **Batch your questions.** When you have several, ask them together with your
  recommended answer for each, so I can reply once.
- **Surface every call-out and open question at the end of a turn.** Do not let
  an unresolved decision disappear into a diff.
- **When I change direction mid-task, follow it.** Do not finish the old plan
  first. If dropping it leaves the repo in a broken state, say so.
- **Show me the decision, not the process.** Skip the narration. I want what
  changed, what it cost, and what is still open.

## Where the work stands

Live and working: the site, the contact form (POST `/api/contact` → Resend →
`/thanks`), privacy and terms, structured data, social card, DNS and TLS.

Open, roughly in order of value:

1. **§04 and §05 still carry content I have to supply.** Real prior work, price
   floors, typical durations, a background line and a photo. All are absent
   rather than invented. Keep it that way and prompt me for them.
2. Form notifications land in spam. Gmail filter on
   `subject:("System map request")` now, or verify `threadhawaii.com` in Resend
   properly. If Resend: its SPF goes on the `send.` subdomain, because the root
   already has one and a domain may only have one.
3. No 404 page in the design language. Vercel's default currently shows.
4. `sameAs` links in the `ProfessionalService` schema in `Base.astro`, once the
   LinkedIn and Google Business Profile URLs exist.
5. My open decisions, listed in `LAUNCH-CHECKLIST.md` §2: the doubled rule under
   the connects-to strip, token names, the `--koa` hover discrepancy, dropping
   the unused Public Sans 500. Ask me for these when they become relevant, not
   all at once up front.

## Verifying

Shell parity against `index.html` was established by diffing computed geometry
numerically at 1440 / 1024 / 768 / 390, both pages in matched iframes, roughly 24
probes compared on position, size, type and colour. If you change layout, re-run
that rather than eyeballing screenshots. It caught a 24px regression screenshots
would have missed.

Content deliberately differs from `index.html`. Probe geometry, ignore words.

```bash
npm run dev          # honours $PORT
npm run build
npm run assets:build # regenerate og.png + favicons after any copy change
```

`astro preview` does not work under the Vercel adapter. Use
`scripts/build-assets.sh`.

## Start by

Reading the files above, reporting the current working-tree state, and telling me
what you think the next most valuable thing is and why. Do not start editing
until I answer.
