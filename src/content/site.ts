/**
 * Real site content — repeating structures lifted out of the markup so the
 * components stay about layout.
 *
 * Nothing in this file may be invented. Every claim here is either verbatim
 * from the approved design or confirmed by the owner. See CLAUDE.md.
 *
 * Copy is the v3 draft, supplied by the owner 14 Aug 2026. First person
 * throughout, and no em dashes in anything a visitor reads.
 */

/**
 * Root-relative, not bare fragments. These render on /thanks, /privacy and
 * /terms too, where `#pricing` would resolve against the wrong document and do
 * nothing. From the homepage `/#pricing` is still a fragment jump, not a
 * reload.
 */
/**
 * The CTA label, in one place because six elements render it and CLAUDE.md's
 * standing rule is that they may never disagree: the header button, the phone
 * menu, the hero, §01, the footer's Contact column, and /thanks.
 *
 * "Start the conversation" since 29 Aug 2026, on the owner's instruction,
 * restoring the label the 27 Aug copy audit chose. Worth knowing: that audit's
 * change was never committed — it lived only as a working-tree edit, so the
 * deployed site went on saying "Book a call" the whole time.
 *
 * "Book a call" is the label the owner wants once there is a scheduling link
 * to point it at. There is not, so the button opens the form instead, and a
 * button that says "Book a call" while sending a message is the exact
 * mismatch the 19 Aug copy review raised. Change both this and `ctaHref` in
 * the same commit when the scheduler exists.
 */
/**
 * ⚠️ REPLACED 1 Sep 2026, when the owner swapped the homepage. It was
 * 'Start the conversation' → '/#contact' for the Style C page, and that pair
 * still ships, on /v1, out of site-v1.ts. Everything above this comment is the
 * history of THAT label; it is kept because the reasoning still applies.
 *
 * The label is the wireframe's own. The href is unchanged in shape: the new
 * homepage's contact section is still `#contact`, which is what makes this
 * swap safe for vercel.json's /systems-map 301 and for every already-indexed
 * link into the old page's contact anchor.
 *
 * It is still not "Book a call": there is still no scheduling link, and the
 * button still opens a form. Change both this and `ctaHref` in the same commit
 * when a scheduler exists.
 */
export const cta = 'Request my audit';

/**
 * ⚠️ `/#contact`, NOT `/automation-audit`, and this was a judgement call worth
 * recording.
 *
 * The build brief asked for `/#contact` from the homepage and
 * `/automation-audit` from everywhere else "if that is simple, otherwise
 * /automation-audit everywhere". It is not simple: `Header` takes a `ctaHref`
 * prop but `Footer` builds its Contact column out of `footerColumns` below, so
 * a per-page href would mean threading the value through both on all six
 * pages, and any page that forgot would point somewhere else.
 *
 * Of the two single-value options, this is the better one. `/#contact` is
 * root-relative, so it resolves from every page: from `/` it scrolls to the
 * audit section, and from /privacy, /terms, /thanks and /work it lands on that
 * same section. `/automation-audit` everywhere would send a homepage visitor
 * away from the page to a near-duplicate of a section three scrolls below
 * them.
 *
 * /automation-audit still earns its place: it is the link for outreach, email
 * signatures and profiles, which is what the brief built it for. It is just
 * not where the site's own chrome should point.
 */
export const ctaHref = '/#contact';

/**
 * The client login, added 29 Aug 2026. Points at the app subdomain, which is a
 * separate deployment from this marketing site.
 *
 * Absolute and cross-origin, so unlike every other href in this file it is not
 * root-relative — landmine 13 is about fragments resolving against the wrong
 * document, and does not apply. Same tab deliberately: a login is a
 * destination, not a side trip, and `target="_blank"` on an auth flow strands
 * people in a tab with no way back.
 *
 * It renders as a quiet text link, never as a second button. A visitor who
 * already has an account is not the person the page is written for, and a
 * login competing with the CTA would sell to the wrong reader.
 */
export const loginHref = 'https://app.threadhawaii.com';
export const loginLabel = 'Log in';

/**
 * The scheduling link, real as of 1 Sep 2026. "Intro Call - Thread Hawaii",
 * 20 minutes, Google Meet, Pacific/Honolulu.
 *
 * This retires a blocker CLAUDE.md has carried since 14 Aug 2026 — the reason
 * the site-wide CTA was never allowed to say "Book a call" and the reason the
 * contact section drew a placeholder where an embed should be.
 *
 * ⚠️ A PLAIN LINK, EVERYWHERE IT APPEARS. Do not embed Cal.com's script or an
 * iframe. Everything a visitor interacts with on this site is scriptless, a
 * link does the same job, and an embed would be the first third-party script
 * on the site as well as the first cross-origin frame.
 *
 * It renders in page copy and in the auto-reply email, so it lives here rather
 * than in site-v2.ts: the endpoint reads it too, and that is not homepage
 * content.
 */
export const calHref = 'https://cal.com/byshauna/intro-call';
export const calLabel = 'Book a 20-minute call';

/**
 * Relabelled twice on 29 Aug 2026: What I do / How it works / What you get
 * became The busywork / What I build / Start here with the Style C redesign,
 * and then this, on the owner's pick from four directions.
 *
 * These are deliberately the plain, expected words. The previous set used the
 * site's own vocabulary, which read well but made a visitor decode three
 * labels before knowing where anything was; a nav is the one place on a page
 * where being unsurprising is worth more than being distinctive. The voice
 * still lives in the section headings, which are anything but generic.
 *
 * ⚠️ The labels no longer describe the anchors they point at (#busywork,
 * #build). That is deliberate and not drift: the ids are contracts — the
 * footer, the hero CTA and vercel.json's /systems-map 301 target them — and
 * renaming ids to chase a label is how indexed links break. The same
 * mismatch existed before, where "What I do" pointed at #services.
 *
 * The section markers no longer carry labels — they are bare numbers on a rule
 * — so the old rule that the nav had to match the markers exactly no longer
 * has anything to match against. What still holds, and matters more: the
 * header and the footer point at the same three anchors and must label them
 * identically. See footerColumns at the foot of this file.
 */
/**
 * ⚠️ REPLACED 1 Sep 2026 with the homepage swap. The three labels this comment
 * block describes (The problem / The solution / Contact → #busywork / #build /
 * #contact) now live in site-v1.ts and render on /v1. The reasoning above is
 * still the reasoning: a nav is the one place where being unsurprising beats
 * being distinctive.
 *
 * These four are the wireframe's own and, unlike the set they replace, they DO
 * describe the anchors they point at. That is a happy accident of the new
 * page's structure, not a new rule — the ids are still the contract.
 *
 * "Work" points at the new homepage's proof section, not at /work. The
 * wireframe puts the proof inline, so the nav should reach it rather than send
 * a visitor to the holding page. /work still exists, still noindex.
 */
export const nav = [
  { label: 'Offers', href: '/#offers' },
  { label: 'Work', href: '/#proof' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },

  /* Ready to go. The /work route, its layout and its footer entry all exist;
     this line is the switch. It is commented out because a visitor who clicks
     "Work" is looking for proof, and sending them to a holding page is worse
     than not offering the link at all. Uncomment it in the same commit that
     puts real work on the page, and remove both the `noindex` prop in
     work.astro and the Disallow in robots.txt.ts. */
  // { label: 'Work', href: '/work' },
];

/** Real address — Namecheap forwards it. See CLAUDE.md landmine 9. */
/**
 * The connects-to strip under the hero, restored 18 Aug 2026 on the owner's
 * instruction after being deleted with its component earlier the same day.
 *
 * This is the union of two lists that were already in the repo, not a new set:
 * the nine the strip carried before (QuickBooks, Shopify, Square, Jobber,
 * Airtable, Stripe, Slack, Google Workspace, HubSpot) and the nine cycling in
 * HeroGraphic, which added Xero, Sage, Gusto and ADP. Ordered by what they do
 * rather than alphabetically: books, money, commerce, payroll, CRM, then the
 * tools work actually happens in.
 *
 * ⚠️ Every name here is a claim that Thread integrates with it. Adding one is
 * the owner's call, not a gap to fill because a platform is popular or has an
 * API. See CLAUDE.md, "Content that must never be invented".
 */
export const integrations = [
  'QuickBooks', 'Xero', 'Sage',
  'Stripe', 'Square', 'Shopify',
  'Gusto', 'ADP', 'HubSpot',
  'Jobber', 'Airtable', 'Slack', 'Google Workspace',
];

export const contact = {
  email: 'aloha@threadhawaii.com',
  location: 'Honolulu, Hawaiʻi',
};

/**
 * §01's signals list, from "Thread Homepage - Style C", 29 Aug 2026.
 *
 * Every one of these is a description of a symptom, not a claim about Thread,
 * so none of them needs the confirmation a service or a price does. They are
 * deliberately generic enough that a visitor supplies their own specifics —
 * "entering the same information in multiple places" is recognised, where
 * "entering job numbers into QuickBooks and Jobber" would only be recognised
 * by the two businesses that do exactly that.
 *
 * Order runs from the most common to the most particular. Keep it that way:
 * a visitor who does not recognise row 01 is unlikely to read to row 07.
 */
export const signals = [
  'Entering the same information in multiple places',
  'Managing an important process through spreadsheets',
  'Copying data between systems',
  'Chasing approvals, updates, or paperwork',
  'Building reports by hand',
  'Working around software that doesn’t quite fit',
  'Following a 12-step process that should take two',
];

/**
 * The open row that closes the list. SignalList.astro was its consumer until
 * 29 Aug 2026, when §01 became a drawing; it and `signals` now render in
 * RepetitiveGraphic.astro's visually-hidden list, which is what keeps all
 * eight strings indexed and readable once the rows stopped being HTML.
 *
 * ⚠️ THIS ARRAY AND `signals` ABOVE NOW DRIVE A DRAWING, not just a list.
 * RepetitiveGraphic builds its typed phrases as `[...signals, signalOpen]`, so
 * adding, removing or rewording an entry changes what §01 animates. Two things
 * there are derived from this array and neither fails loudly if it goes stale:
 * the per-phrase clip widths, which are measured font metrics, and the
 * per-phrase animation windows, which are computed from the array's length.
 * Re-derive both in the same commit. See the head of RepetitiveGraphic.astro.
 *
 * The supplied JSX omitted signals[6] and ended on this string instead; the
 * owner's instruction on 29 Aug 2026 was to restore it, which is why the
 * component now derives the array rather than restating it.
 */
export const signalOpen = 'Whatever your team keeps redoing';

/**
 * Step 01 was `MAP` and sold the free systems map. The owner killed that offer
 * on 14 Aug 2026; the first step is now learning how the business works, and
 * the fixed scope and price land at the end of it.
 */
/**
 * Rewritten 17 Aug 2026. The previous set duplicated itself: step 02 was
 * labelled "Clear plan" and titled "Get a clear plan", and step 04's label and
 * title were the identical string "Keep it useful". Four steps carried about
 * two steps of information.
 *
 * The structure is now consistent: the label is the stage, the title is what
 * you get out of it, and the body is what actually happens. Step 04 changed
 * from maintenance to handover, which was the concept's third appearance on
 * the page after the §02 card and the care plate in §04.
 *
 * "A fixed plan and price" in step 02 is a commercial term, confirmed by the
 * owner 17 Aug 2026. It is the same claim the retired pricing section made
 * ("Fixed scope. Fixed price. Agreed before I start."). If the terms ever
 * change, this line changes with them.
 */
/**
 * Cut from five (briefly) and four (before that) to three on 19 Aug 2026, on
 * the owner's instruction, for the editorial-index layout. What moved where:
 *
 *  - Build and Live merged into step 03. The first sentence of each survives;
 *    "Then" is the only new word.
 *  - The ownership copy ("The system is yours") went back to §03 as its lead,
 *    where it does the differentiator work testimonials would normally do.
 *    It spent part of this day as timeline step 05; recover that from git if
 *    the arc idea ever returns.
 */
/**
 * ⚠️ `steps` was deleted 29 Aug 2026 with the Style C redesign, along with
 * ProcessIndex.astro, which was its only consumer. The three-step arc (Fit
 * call / Scope / Build) has no section in the new page: it ran four sections
 * and now runs three, and "How it works" is not one of them.
 *
 * The copy was the owner's own and is not lost — recover the array and the
 * component together from git rather than rewriting either, as with every
 * other component this repo has retired. Two claims died with it that
 * appeared nowhere else on the site: "A fixed plan and price" and the free
 * 30-minute fit call. If either needs to be back on the page, it needs a
 * home, not a reinstated array.
 */

/**
 * What ships with every build. Was baked into Fig4CarePlate as SVG text, which
 * meant it could not be selected, searched or read properly, and it drifted out
 * of the site's voice — it said "you hear it from Thread first" on a page that
 * is otherwise first person, and "a written plate", which is the internal word
 * for a figure and means nothing to a visitor.
 *
 * The last two used to be tagged CARE PLAN. Pricing came out of the site on
 * 14 Aug 2026, so that label pointed at an offer the page never described.
 * They are OPTIONAL until there is somewhere to explain a care plan.
 */
/**
 * The four services, restored 18 Aug 2026 for §03 on the owner's instruction.
 *
 * Nothing here is invented, which matters in this repo more than most. The
 * titles and bodies are the owner's own, retired from this file in c41772f when
 * v3 landed and taken back out of git rather than rewritten. The durations are
 * the owner's too, from STRATEGY.md: "Typical 3-6 / 6-10 / 2-6 / 4-8 weeks".
 * The terms are the meta lines the retired entries already carried.
 *
 * ⚠️ PRICES ARE DELIBERATELY ABSENT, and this is the standing rule for the file
 * rather than a note about one array. STRATEGY.md carries "from $12,000",
 * "from $25,000" and two more sitting right beside the durations above. The v3
 * draft carried $14,000, $28,000 and $2,400/month, and its own call-out marked
 * all three as placeholders. HOMEPAGE-COPY.md still marks them `[CONFIRM]`.
 *
 * The owner confirmed on 14 Aug 2026: durations and terms only until the real
 * numbers exist. Do not fill any of them in, and in particular do not add one
 * because you found it elsewhere in the repo. Inventing a plausible price is
 * how this site got into trouble the first time. See CLAUDE.md, "Content that
 * must never be invented".
 */
/**
 * Meta terms deduplicated 19 Aug 2026 with the \u00a702/\u00a703 merge. The list now
 * sits in the same section as step 02's "A fixed plan and price", which had
 * "Fixed price" repeated directly beneath it in three rows; and directly
 * under the ownership paragraph, which "You own the code" restated. Both were
 * removed rather than reworded \u2014 the claims still appear once each, in the
 * copy above. "Fixed or retainer" stays on the fourth row because it says
 * something the step does not. Recover the old lines from git if the list
 * ever moves back out of this section.
 */
/**
 * Replaced wholesale 29 Aug 2026 by the five build types drawn in "Thread
 * Homepage - Style C". What changed, so none of it reads as drift:
 *
 *  - Four entries became five. "Customer or employee portal" is new.
 *  - "AI automation" is gone. It was the one service naming a technology
 *    rather than an outcome, and the new set is outcome-named throughout.
 *    The capability is not disclaimed anywhere, it simply has no card.
 *  - Every title and body is new copy, from the design file.
 *  - \u26a0\ufe0f The durations are gone. The previous entries carried owner-confirmed
 *    typical ranges ("Typical: 6-10 weeks") from STRATEGY.md; the design draws
 *    no meta line on any card, so `meta` is dropped rather than kept and
 *    hidden. The ranges are recoverable from git.
 *
 * \u26a0\ufe0f PRICES REMAIN DELIBERATELY ABSENT, and this is still the standing rule
 * for this file rather than a note about one array. STRATEGY.md carries "from
 * $12,000" and "from $25,000"; HOMEPAGE-COPY.md marks them [CONFIRM]. The
 * owner confirmed on 14 Aug 2026 that nothing ships until the real numbers
 * exist. Do not add one because you found it elsewhere in the repo. Inventing
 * a plausible price is how this site got into trouble the first time. See
 * CLAUDE.md, "Content that must never be invented".
 *
 * `span` is the card's width in the six-column grid: three twos on the first
 * row, two threes on the second. It is layout, not content, and it lives here
 * only because the array is what ServiceCards maps over.
 */
export const services = [
  {
    title: 'Custom dashboard',
    body: 'Everything your team needs in one place.',
    span: 2,
  },
  {
    title: 'Internal tool',
    body: 'Software built around the way your business actually works.',
    span: 2,
  },
  {
    title: 'Automated workflow',
    body: 'Routine tasks happen automatically instead of becoming someone\u2019s to-do list.',
    span: 2,
  },
  {
    title: 'System integration',
    body: 'Your existing tools finally talk to each other.',
    span: 3,
  },
  {
    title: 'Customer or employee portal',
    body: 'Give people one simple place to get what they need.',
    span: 3,
  },
];

/**
 * The six questions from the v3 draft, in its order. Every answer is a claim
 * the owner controls outright: structure, process and terms. Nothing here
 * cites a number, a client or a result.
 *
 * Deleted with QuestionList in 589ae02 when the component rendered nowhere,
 * and recovered verbatim from 589ae02^ on 27 Aug 2026 rather than rewritten,
 * because this copy was written and approved once already. Two edits on the
 * way back in, both marked below.
 */
export const questions = [
  {
    q: 'Can another developer take this over?',
    a: 'You have the source code, documentation, and accounts. Any competent developer can take it over.',
  },
  {
    /* The guarantee sentence was to be folded into this answer per the
       revision brief. It is not here yet: the wording is still waiting on the
       owner, and this file may not carry an unapproved claim. */
    q: 'We tried custom software before and it went badly.',
    a: 'The scope moved, nobody used it, or the vendor owned it. Fixed scope, working demos, and clear ownership address those risks.',
  },
  {
    q: 'Can we just use Zapier?',
    a: 'Sometimes. It is often the right answer for a simple task. When the work needs logic, history, or permissions, a stronger system may make more sense.',
  },
  {
    q: 'How much of my team’s time does this take?',
    a: 'A few hours up front from the people who do the work, then a demo every two weeks.',
  },
  {
    q: 'We’re not in Hawaiʻi.',
    /* Was "Thread works remotely with businesses outside Hawaii too". First
       person everywhere else on the site, and this was the last sentence that
       referred to the business in the third person. */
    a: 'That is fine. I work remotely with businesses outside Hawaiʻi too.',
  },
  {
    q: 'What does it cost to run after it’s built?',
    a: 'Your existing subscriptions and hosting, billed directly to you. I will outline the real cost for your setup before you decide.',
  },
];

/**
 * ⚠️ NOT APPROVED COPY, and gated so it cannot ship by accident.
 *
 * CLAUDE.md records the owner's decision that the guarantee ships as written:
 * working software in two weeks, either side can stop, nothing owed beyond
 * that point. The 26 Aug 2026 audit found it renders nowhere a visitor can
 * read, lost in the 17-19 Aug rebuilds. It is the strongest thing this site is
 * permitted to say, because it is proof by risk transfer on a page that
 * rightly refuses to invent case studies.
 *
 * Both strings below are the revision brief's rendering of that decision, not
 * the owner's own words. `approved` stays false until the owner confirms the
 * wording, and both call sites (§02 in index.astro, the echo in
 * ContactSection.astro) test it, so nothing renders meanwhile. This is the one
 * place to edit the wording; flip the flag in the same commit.
 */
export const guarantee = {
  approved: false,
  panel:
    'The first two weeks come with a simple guarantee. You see working software inside them, and either of us can stop there, with nothing owed beyond that point.',
  echo: 'First two weeks guaranteed · either of us can stop.',
};

export const footerColumns = [
  /**
   * One column, mirroring the header nav exactly. It was two: a Services
   * column labelled after the §02 cards, and an Approach column. The cards
   * were removed on 17 Aug 2026, which left two links named after content
   * that no longer existed and pointed at a section that never used those
   * words. Two navigations aimed at the same three anchors should not label
   * them differently, so now they don't.
   */
  {
    /* Was "Explore", the one stock web word on the site; nobody explores a
       three-link list. Not dropped entirely because the column sits beside
       Contact, which keeps its heading, and a headerless column misaligns. */
    heading: 'Sections',
    /* Mirrors `nav` above exactly. Two navigations aimed at the same three
       anchors must not label them differently — relabelled and re-anchored
       together, 29 Aug 2026. */
    /* ⚠️ Mirrors `nav` above exactly, and must keep doing so — relabelled and
       re-anchored together with the homepage swap, 1 Sep 2026. Written as a
       reference rather than a copy so the two cannot drift again; they were
       two hand-maintained lists until this change. */
    links: nav,
  },
  /* A WhatsApp "Message me" link was considered and dropped 17 Aug 2026:
     publishing a personal mobile in a footer gets it scraped within days, and
     the form and the email already cover the same intent. */
  {
    heading: 'Contact',
    links: [
      /* Renamed with the other six on 27 Aug 2026; see Header.astro. This one
         and /work's button were the two the design brief's list missed, and
         leaving them would have had the site offering two different things. */
      { label: cta, href: ctaHref },
      { label: 'Email me', href: `mailto:${contact.email}` },
      /* Second home for the login, for a returning client who scrolled past
         the header rather than looking up. Same quiet treatment: it is a link
         in a list here, not a button. */
      { label: loginLabel, href: loginHref },
    ],
  },
];
