# Review · homepage copy v3

Written 14 Aug 2026, against the site as it stands on `main` plus the
uncommitted hero work. Hero excluded from scope by the owner, with one
exception noted in §3.

---

## 1. Verdict

**Adopt it, with four things resolved first.** v3 is a large improvement on what
is live and on what `HOMEPAGE-COPY.md` currently specifies. It replaces a
section that sold a free deliverable with two sections that sell the only things
a new practice can honestly claim: a fixed price stated in public, and ownership
terms nobody renting software gets. That is a better trade than testimonials
would have been anyway.

The structure also happens to fit the build. Four of the five existing figures
land somewhere in v3 with light relabelling, `ServiceList.astro` already has the
right-hand meta column that the pricing tiers need, and `StepRow.astro` takes
the three new steps unchanged in shape. This is a copy swap plus one new
section, not a rebuild.

What holds it up is not the writing. It is four numbers, one commitment, six
sentences that imply a track record, and one form field that will silently eat
leads.

---

## 2. Blockers

Nothing below can ship until these are settled. The first is the one that
matters most.

### 2.1 The prices are placeholders, and the copy states so itself

`$14,000`, `$28,000`, `$2,400 per month` and the `$20 to $200` hosting range are
all marked as your own placeholders in call-out 1. `CLAUDE.md` is unambiguous
about this class of content, and it is the exact failure mode the site was
already cleaned up from once: a plausible placeholder price is how it got into
trouble the first time.

**These do not go into `site.ts` until you confirm them.** Not as a draft, not
behind a comment, not "we'll fix it before launch". If you want the pricing
section built before the numbers are settled, it ships with the tier names,
descriptions and durations and no figures at all, and it looks deliberate rather
than unfinished.

The retainer needs one more thing besides a number. "A set amount of new work
each month" is the vaguest sentence in v3, and it is attached to the only
recurring charge on the page. Say hours, or say what it covers.

### 2.2 The guarantee is ambiguous in a way that costs money

> Two weeks in, you'll have working software in your hands. If it's clear by
> then that this isn't going to work, either of us can stop and you owe nothing
> beyond that point.

"You owe nothing beyond that point" reads two ways. Either the client pays for
the two weeks and owes nothing further, or the client walks owing nothing at
all. On a `from $28,000` build, those readings are several thousand dollars
apart, and a prospect will read whichever suits them.

Separately, the promise itself is real work: shipping something clickable in two
weeks on a project whose discovery phase is "a call, then a couple of sessions"
is tight. You flagged this yourself in call-out 2.

Three things need to happen. Decide which reading you mean and write it so it
can only be read that way. Confirm you can hold the two weeks on a `Build`-sized
project. And make sure `/terms` says the same thing the homepage does, because
right now it says nothing about it.

### 2.3 Six sentences imply a track record that doesn't exist yet

Your framing is right: the site shouldn't announce that it's new. But there is a
difference between not raising it and writing sentences that only make sense if
you have a client base. These are the latter, and they are the same soft
fabrication that `src/content/placeholders.ts` was deleted for.

| Line | Problem | Suggested |
|---|---|---|
| "Neither are a lot of the businesses I talk to" | Implies a volume of conversations | "Thread works with businesses on the mainland too." |
| "for clients on the mainland who'd rather talk to the person writing the code" | Asserts existing mainland clients | "for people on the mainland who'd rather talk to…" (this is what the live §06 already says, and it's the safer construction) |
| "I take a few projects at a time… It also means the calendar fills" | Implies a filling calendar | Either drop the scarcity line or make it conditional: "which means timing is worth raising early." |
| "I build custom software for businesses across the islands" | Present tense plural, reads as a current roster | "Thread builds custom software for businesses across the islands." Same sentence, no implied count. |
| "We tried custom software before and it went badly. Usually one of three ways." | "Usually" claims observed pattern | Defensible as industry knowledge. Keep, but "It usually goes wrong one of three ways" is honest about being general. |
| "Most projects land between fifteen and forty thousand" | Claims a distribution of completed projects | This one is only in the in-person script, not on the site. Fine there, but know that it's the same claim. |

None of these needs the site to say "I'm new." They just need the verbs to stop
implying history.

### 2.4 "Company website" is the honeypot field

This one is a bug, not a judgement call, and it will look like everything
working.

`IntakeForm.astro` has a hidden field labelled **Company website**, named
`company_website`. `src/pages/api/contact.ts` treats anything in it as a bot:
it returns the success page and **sends no email**, deliberately, so bots don't
retry.

v3's form asks for **Company website** as a real, visible field. Implemented
without care, every prospect who fills in their website gets a thank-you page
and vanishes. No error, no bounce, nothing in your inbox.

The fix is trivial once you know: name the real field something else
(`website`), rename the honeypot to something a bot would still take (`fax`,
`address_2`), or drop the field. But see `CLAUDE.md` landmine 14: the form and
the handler must be edited together, because a field rendered in one and absent
from the other is collected and silently dropped.

---

## 3. Contradictions to settle

Not blockers, but each one is a place where the page argues with itself or with
something already live.

**The hero gets a new line under the buttons.** v3 adds "Thirty minutes. I'll
tell you what I'd build, roughly what it costs, and whether it's worth doing at
all." That block was deleted from the hero earlier today and the deletion is
recorded in `CLAUDE.md`. The new line is a different animal (17 words that turn
the CTA into a trade, versus 45 words that pre-explained the systems map) and I
think it earns its place. But you said leave the hero as is, so it needs your
explicit yes rather than my judgement.

**"You'll never sit in a meeting with me that isn't a demo"** contradicts step 1,
which is "a call, then a couple of sessions with the people who do the job." You
can read the first as addressing the owner and the second as addressing staff,
but a prospect reading top to bottom hits the contradiction. Pick one.

**Thirty minutes or twenty-five?** v3 says thirty in three places. The live
`ContactSection.astro` and `OFFER-AND-PIPELINE.md` both say twenty-five.

**Two different reply promises.** v3's contact section says "usually same day"
and the FAQ says "within one business day". Live copy says "within one business
day". Pick one and use it in both places.

**And a warning attached to that promise:** form notifications currently land in
spam. That is open in `LAUNCH-CHECKLIST.md` §7, unresolved. Promising a same-day
human reply while notifications go to a folder you don't check is the worst
version of this. Fix the spam problem before, not after.

**The voice seam.** v3 is first person throughout, which reverses the decision in
`HOMEPAGE-COPY.md` ("Thread as the subject everywhere; I on About only"). The
reversal is right: "you talk to the person building it" is the whole credibility
argument and it can't be made in the third person. But the hero stays third
person, so there is a visible handover.

It happens to land well. The hero is the brand, then §01 closes with "It's also
the first thing I remove" and the person steps forward. Read in order, that's a
reveal rather than an inconsistency. Worth keeping deliberately: don't let a
later edit put "I" in the hero or "Thread" back into the body.

**The meta description mixes both.** "Thread builds custom software… I connect
the tools you run." Pick one for a 155-character string.

**The title tag reverses the current order.** v3 puts the brand first: `Thread ·
Custom software and automation, Honolulu, Hawaiʻi`. The live one is
keyword-first. Brand-first works once people search for you by name; nobody does
yet. I'd keep keyword-first for now.

---

## 4. Section mapping

What each v3 section becomes, and what it costs to build.

| v3 section | Where it goes | Work |
|---|---|---|
| Hero | `Hero.astro`, unchanged | None, unless you take the line under the buttons |
| *(connects strip)* | `ConnectsStrip.astro` **deleted** | v3 replaces it with the "If it already connects to anything" paragraph inside What I do. Note it's a text strip, not logos, so "logo strip removed" already describes something that isn't there. Removing it means hero runs straight into §01 with no visual break |
| The problem | §01, `Section.astro` | Copy swap. Keeps `Fig2CurrentState` |
| What I do | §02 or §03, `Section.astro` | Copy swap. The Connect / Build pair replaces the four-item `ServiceList` |
| How it works | §02, `Section.astro` + `StepRow` | Rewrite the three `steps` in `site.ts`. Step 01 changes from `MAP` and must lose "Free, and yours to keep" |
| What you own | New section | Five claims, which is exactly `Fig4CarePlate`'s shape. Reuse the plate rather than building a list component |
| Pricing | §03, `ServiceList.astro` | Fits the existing component: three items, and the right-hand meta column already exists for "4 to 6 weeks · from $14,000". Blocked on §2.1 |
| Questions | New section | See below |
| About | §06, `Section.astro` | Copy swap, with the §2.3 rewrites |
| Contact | §07, `ContactSection.astro` + `IntakeForm` | Form fields change. See §2.4 and landmine 14 |
| Footer | `Footer.astro` + `footerColumns` | Rewrite. The "Systems map" link must go |
| *(§05 Work)* | **Cut** | Per your call-out 5. Note this removes the only sentence on the site that acknowledges Thread is new, which is consistent with your framing |
| Selling this in person | **Not on the site** | Sales enablement. Should live in `OFFER-AND-PIPELINE.md` or its own file |

**The FAQ needs a decision.** There is no component for it and the original brief
says no new component patterns. It also can't be an accordion in the usual sense
without JavaScript, though `<details>` works and is already used for the phone
menu. Cheapest compliant option: stacked bold question, plain paragraph answer,
using the existing `.txt` styles. That's six Q&A pairs, no new pattern, no JS.

**Nav is now too small.** It currently reads Services / The map / Work / About.
v3 has seven candidates. Four is what the bar holds: What I do, How it works,
Pricing, About. Header CTA becomes "Book a call".

---

## 5. The graphics

You asked me not to touch these. Here is where each one lands, so nothing gets
orphaned by accident.

| Figure | Fate |
|---|---|
| `HeroGraphic` | Stays. Hero untouched |
| `Fig2CurrentState` · current state, typical intake | Stays in §01. The new §01 copy names QuickBooks and Square in prose, so the figure naming the same tools is now *more* consistent, not less. See the note below on call-out 4 |
| `Fig3ThreadDiagram` · the thread, drawn | Stays. Belongs with either How it works or What I do. It literally draws "one system instead of seven", which is What I do's closing line |
| `Fig4CarePlate` · what ships with every build | **Best reuse in the set.** Five rows, and What You Own has five claims. Needs its rows relabelled and the right column's `CARE PLAN` changed to `ONGOING` to match the new tier name |
| `Fig5SystemsMap` · systems map, specimen sheet | **The one at risk.** §04 is gone, so its home is gone. Don't delete it: it illustrates step 1 ("I learn how you actually work") better than anything else, and its third recommendation is *"Don't build a CRM"*, which is the only place on the site where "sometimes the answer is neither, and I'll say so" is evidence instead of assertion. Move it to How it works, keep `SPECIMEN · NOT A REAL CLIENT` |

**On call-out 4.** The operations panel figure you're referring to was already
deleted (`Fig1OperationsPanel.astro`, removed with the fabricated case study).
The named tools now live in `Fig2` and `Fig3`. My recommendation is to keep them
named: they're a capability claim, every one exposes a public API, the owner
already confirmed that framing for the connects strip, and v3's own §01 body copy
names two of them. Genericising the figures while the prose names tools would be
the inconsistent choice. Flagging rather than acting.

---

## 6. Suggested build order

1. Settle the four blockers in §2.
2. `site.ts` first: `steps`, `services` to pricing tiers, `footerColumns`, `nav`.
   Most of the copy lives there, not in markup.
3. §01, What I do, How it works, About: straight copy swaps in `index.astro`.
4. What You Own and Questions: the two new sections.
5. `IntakeForm` and `api/contact.ts` **together**, honeypot rename included.
6. `Base.astro`: title, meta description, and the `makesOffer` block, which still
   advertises the systems map to search engines.
7. Retire `/systems-map`, plus the nine other references listed in
   `LAUNCH-CHECKLIST.md` §8.
8. `npm run assets:build` at the end, because the social card renders real copy
   and every headline change makes it stale.

---

## 7. What I need from you

1. Confirmed prices, or permission to ship the pricing section without figures.
2. Which reading of the guarantee you mean, and whether two weeks is holdable.
3. Yes or no on the new line under the hero buttons.
4. Thirty or twenty-five minutes. Same day or one business day.
5. Whether the §2.3 rewrites are acceptable, or you'd rather phrase them yourself.
