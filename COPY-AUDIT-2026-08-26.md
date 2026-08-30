# Thread: marketing copy audit, 26 Aug 2026

Audit of every word a visitor reads on threadhawaii.com, from a conversion
and positioning lens. Scope per the owner: challenge everything, including
settled decisions. Settled decisions that are challenged are marked
**[OWNER]**; nothing here should ship against a standing rule without the
owner's say-so, and no rewrite below invents a claim, a client or a price.

---

## The diagnosis in one paragraph

The page is honest, well made, and written in a voice most agencies would pay
for. Its problem is not quality, it is *strategy*: it describes the work
instead of selling the outcome, it never says who it is for, its strongest
permitted proof device (the two-week guarantee) is missing from the page
entirely, its best value-proposition sentence is buried in section 01 instead
of leading the hero, and its conversion path promises a call but delivers a
six-field contact form. A business owner skimming for eight seconds leaves
knowing the site is tasteful and not knowing what you sell, whether you are
for them, or why acting today beats bookmarking it.

---

## How the page reads to a cold visitor

Walking the page as a time-poor Honolulu business owner who got the link from
a friend:

**Hero.** "Built around how you already work." Built... what is? The sentence
has no subject. The category ("Custom software · Honolulu, Hawaiʻi") is
present but sits *below* the headline at 10px uppercase, the least readable
type on the page. The two buttons are clear. There is no sentence anywhere in
the hero that says what Thread does, for whom, or what changes for the buyer.
The graphic carries that argument, and it is a good graphic, but skimmers do
not study diagrams; they read the headline, and the headline is a modifier
waiting for a noun.

**Connects strip.** Quietly effective. Thirteen recognizable names do real
trust work. Keep.

**§01 What I do.** "One screen with the answer on it" plus a dashboard
drawing. The lead here, "I close the gaps between the tools you already use,
then build the ones you're missing," is the best statement of the offer on
the entire site, and it is in body type in section one instead of in the
hero. The section's net effect: a visitor concludes Thread sells dashboards.
The actual four-service menu is two scrolls down, filed under "What you get."

**§02 How it works.** The strongest section. Three steps, plainly written,
"free 30 minutes" up front, "fixed plan and price agreed before any work
starts." No changes needed to the step copy itself. What is missing is the
guarantee, which is the natural closing beat of this section (more below).

**§03 What you get.** The ownership paragraph is a genuine differentiator,
well written. But the section heading says "what you get" and then shows the
four services, which are what you *do*. Nav label, heading and contents
disagree with §01's. See finding 6.

**§04 Contact.** "Tell me where the hours go" is the best line on the page.
The form microcopy is excellent. But the button says "Book a call," the form
sends a message, the lead says a call happens only "if it's a fit," and the
thanks page says "Your request is in" when nothing was requested. Four
adjacent promises, none matching.

---

## Findings, ranked by conversion impact

### 1. The guarantee is gone from the page. Restore it.

CLAUDE.md records the owner's decision that the guarantee "ships as written:
working software in two weeks, either side can stop, nothing owed beyond that
point," and notes it is "doing the job testimonials would normally do." A
grep of `src/` confirms it appears **nowhere a visitor can read**. It was
lost somewhere in the 17–19 Aug rebuilds. This is the single most valuable
sentence the site is permitted to publish: it is proof-by-risk-transfer on a
site that (rightly) refuses to invent case studies.

Where to put it: as the closing line of §02, where the process story ends,
and echoed once beside the form. Proposed copy, first person, no em dashes:

> **§02, after the three steps:**
> The first two weeks come with a simple guarantee. You see working software
> inside them, and either of us can stop there, with nothing owed beyond
> that point.

> **§04, replacing or joining the contact-meta block:**
> First two weeks guaranteed. Either of us can stop, nothing further owed.

**[OWNER]** Confirm the exact wording before shipping; the sentence above is
a rendering of the decision in CLAUDE.md, not owner-approved copy.

### 2. The hero never says what you sell.

The three-second test fails. Two fixes, pick one:

**Option A, smallest change.** Put the category in the headline and let the
eyebrow carry only the place:

> **Custom software built around how you already work.**
> 📍 Honolulu, Hawaiʻi

Layout note: the h1 is measured at 18ch for two even lines; this is longer
and needs re-measuring against the hero column (the repo's own verification
approach applies).

**Option B, keep the headline, restore a lead.** Hero.astro's comments note
the `.lead` styles were kept so restoring it is a one-line change. Give it a
sentence that names offer, audience and payoff, and does not duplicate §02's
lead:

> Built around how you already work.
> Custom software · Honolulu, Hawaiʻi
> Apps, dashboards and automation for Hawaiʻi businesses. I connect the
> tools you already run and build what is missing, so the retyping stops.

If Option B ships, trim §01's lead so the two do not restate each other (the
repo history is right to warn about that). §01's lead could become the pain
line finding 7 asks for.

My recommendation is B: it keeps the owner's headline, adds the missing
noun, names the audience, and states the payoff, all in one sentence.

### 3. There is no human on the page.

The copy says "I" eleven times and never says who "I" is. No name, no face,
no one-line background. STRATEGY.md's own analysis says the Hawaii advantage
is "a named person who answers the phone," and the site hides the named
person. With case studies off the table, a name and face is the cheapest
legitimate trust you can add, and it makes "I read everything myself" mean
something.

Proposed: a small block beside the form in §04 (photo, name, two sentences):

> **[Name]** · Thread is one person, based in Honolulu. I build every system
> myself and I answer this form myself.

**[OWNER]** Needs the owner's name, a photo, and willingness to be the face.
This is a question for you, not a unilateral change.

### 4. The site never says who it is for.

No audience sentence exists. The drawing hints (jobs, crews, invoices reads
as field services and operations-heavy small business) but the words never
commit. One sentence anywhere in the top half fixes it, and it doubles as
qualification, so unfit leads self-select out before the fit call spends
your 30 minutes. Cheapest placement is the hero lead in finding 2, Option B
("for Hawaiʻi businesses"). A sharper version if the owner will commit to a
narrower reader:

> For Hawaiʻi businesses that run on QuickBooks, spreadsheets and one
> person's memory.

**[OWNER]** How narrow are you willing to go? "Hawaiʻi businesses" is safe;
naming the operational profile converts better but excludes more.

### 5. The conversion path promises a call and delivers a form.

Today: hero button "Book a call" → six-field message form → submit button
"Book a call" → thanks page "Your request is in" → §04 lead "if it's a fit,
we book a free 30-minute call." The visitor was told three times they were
booking a call; they were actually applying to maybe be offered one. The 19
Aug review flagged two pieces of this and the owner has not ruled; here is
the full fix as one package:

1. Get the scheduling link (already on the owner's blocked list). When it
   exists, "Book a call" becomes true and the form becomes the fallback for
   people who prefer to write first.
2. Until then, rename the submit button honestly. Proposed: **"Send it
   over"**. Keep "Book a call" on the hero and header only if the §04 lead
   stays, since the lead does explain the two-step. Cleaner: rename all of
   them **"Start the conversation"**, which matches §02's heading and is
   true today.
3. Thanks page heading: "Your request is in." → **"Got it."** Body stays.

Also tighten the reply promise, which currently exists in three variants
("within a business day, usually sooner" / "usually same day" / "within one
business day, usually the same day"). Pick one string and reuse it.

**[OWNER]** Which way: scheduling link soon, or rename the buttons now?

### 6. "What I do" and "What you get" have swapped contents.

Nav says What I do → the visitor gets one heading and a dashboard drawing.
Nav says What you get → the visitor gets the four services, which are what
you do. The ownership paragraph, which *is* what you get, shares its section
with a menu. Two options:

**Option A, copy only.** Retitle §01's heading so it does not read
dashboard-only. Proposed: **"Your whole business on one screen, and the
software behind it."** Weaker fix, no structural change.

**Option B, structural. [OWNER]** Move ServiceCards up into §01 under the
drawing, and let §03 be ownership plus the restored guarantee, which
together are genuinely "what you get." The owner picked the current layout
from four mockups on 19 Aug, so this reopens a settled decision; the case
for reopening is that the decision was about *shape* (index vs cards vs
rows), and this is about *placement*, which was never separately decided.

### 7. The pain arrives three scrolls too late.

"Tell me where the hours go" and "The thing that made you open this form"
are the page's most resonant lines and both live in §04. Above that, the
pain is only implied by callout labels ("Reconciled, not retyped"). One
concrete pain sentence early would make the skimmer feel found. If finding
2 Option B ships, repurpose §01's lead slot:

> The number that gets typed into three systems. The job status that lives
> in someone's head. The Friday spent building the same report again. That
> is the gap I close.

(Then the current §01 lead retires, since the hero lead absorbed it.)

### 8. Nothing on the page filters by budget. **[OWNER]**

Standing rule respected: no invented prices, and none appear below. But as
strategy: with no floor, no range and no anchor, the fit call is your
qualification mechanism and you pay for it in calendar time. The moment a
real floor exists, publish it in §02 step 02 ("Projects start at $X, fixed
before any work starts"). Until then, one allowed addition that helps: add
to step 02's body a promise of price candor:

> What gets built, in what order, and what it costs. Agreed before any work
> starts, and I give you a straight number on the first call.

That last clause is a claim about behavior, not a price, so it does not
touch the rule. Confirm you are willing to live up to it.

### 9. Objections go unanswered; the FAQ copy already exists.

There is no section handling: what does hosting cost, what happens if you
disappear, do I need to know what I want, how disruptive is this. The
`questions` copy was written, approved, and deleted with its component; the
repo's own notes say to recover `QuestionList` and its array from git rather
than rewriting. Restoring it (with the guarantee folded in) gives the page
an objection-handling beat between §03 and §04 at near-zero writing cost.

### 10. Small keeps and small trims

Worth protecting as-is: the form note ("One reply from a person, usually
same day. No sales sequence."), the form placeholders, the ownership
paragraph, all three step bodies, the AI card ("AI applied where it holds up
and nowhere else" is the most credible AI sentence on any agency site), and
the §04 heading. The error-state and invalid-state copy on /thanks is also
unusually good.

One trim: §02's lead "You don't need to know the answer before the first
call" is good but floats; consider "You don't need a spec, a budget or even
the right words. You need to know what is eating your week." Optional.

---

## Priority order

If only three things ship this week: the guarantee (1), the hero fix (2),
and the CTA integrity package (5). Those are the highest-leverage words on
the page. The human block (3) is next and is blocked only on the owner's
photo and name. Findings 6 and 9 are the structural pass after that. 4, 7,
8, 10 ride along with whichever section is already open.

## Open questions for the owner

1. Guarantee wording: is the rendering in finding 1 faithful to what you
   are willing to stand behind?
2. Hero: Option A (category in headline) or Option B (restored lead)?
3. Are you willing to put your name and face on the site?
4. Audience line: "Hawaiʻi businesses" or the narrower operational profile?
5. CTA: scheduling link soon, or rename the buttons now?
6. May ServiceCards move to §01 (reopens the 19 Aug layout decision)?
7. Step 02 price-candor clause: will you commit to a number on call one?
8. Restore the FAQ section from git?
