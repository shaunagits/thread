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
 * Outcome-framed, 17 Aug 2026. Was Services / Process / Ownership: three
 * category nouns that named the shape of the page rather than what a visitor
 * gets from it. These also now match the section headings, which "Services"
 * did not — that section is titled "What I do".
 *
 * "Outcome" itself was considered and rejected: it promises results, and the
 * site carries no case studies, numbers or client names, so it would set an
 * expectation the page cannot meet.
 */
export const nav = [
  { label: 'What I do', href: '/#services' },
  { label: 'How it works', href: '/#how' },
  { label: 'What you get', href: '/#ownership' },

  /* Ready to go. The /work route, its layout and its footer entry all exist;
     this line is the switch. It is commented out because a visitor who clicks
     "Work" is looking for proof, and sending them to a holding page is worse
     than not offering the link at all. Uncomment it in the same commit that
     puts real work on the page, and remove both the `noindex` prop in
     work.astro and the Disallow in robots.txt.ts. */
  // { label: 'Work', href: '/work' },
];

/**
 * The "Connects to" strip. This is a capability claim, not a client list —
 * every one of these exposes a public API Thread can build against. Confirmed
 * by the owner 13 Aug 2026, and kept under the "existing graphics" exception
 * when the v3 copy landed on 14 Aug. Anything added here must clear the same
 * bar.
 */
export const integrations = [
  'QuickBooks', 'Shopify', 'Square', 'Jobber', 'Airtable',
  'Stripe', 'Slack', 'Google Workspace', 'HubSpot',
];

/** Real address — Namecheap forwards it. See CLAUDE.md landmine 9. */
export const contact = {
  email: 'aloha@threadhawaii.com',
  location: 'Honolulu, Hawaiʻi',
};

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
export const steps = [
  {
    n: '01',
    label: 'Fit call',
    title: 'A free 30 minutes',
    body: 'You describe what is slowing you down. I tell you whether I can help, and whether it is worth doing.',
  },
  {
    n: '02',
    label: 'Scope',
    title: 'A fixed plan and price',
    body: 'What gets built, in what order, and what it costs. Agreed before any work starts.',
  },
  {
    n: '03',
    label: 'Build',
    title: 'You see it working early',
    body: 'Working software in front of you as it takes shape, not a demo at the end.',
  },
  {
    n: '04',
    label: 'Live',
    title: 'You start using it',
    body: 'It goes into daily use with your team, and I stay available as the business changes.',
  },
];

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
export const shipsWith = [
  { item: 'Written documentation: what it does, and why', tag: 'Included' },
  { item: 'Running in your accounts, on your data',     tag: 'Included' },
  { item: 'The source code, in your repository',        tag: 'Included' },
  { item: 'Monitoring, so you hear about it from me first', tag: 'Optional' },
  { item: 'A standing hour each month',                 tag: 'Optional' },
];

/**
 * ⚠️ PRICES ARE DELIBERATELY ABSENT. The v3 draft carried $14,000, $28,000 and
 * $2,400/month and its own call-out marked all three as placeholders. The
 * owner confirmed on 14 Aug 2026: durations and terms only until the real
 * numbers exist. HOMEPAGE-COPY.md still marks them `[CONFIRM]`.
 *
 * Do not fill these in. Inventing a plausible price is how this site got into
 * trouble the first time. See CLAUDE.md, "Content that must never be
 * invented".
 */
/**
 * Two, not three. The Maintenance card was cut on 17 Aug 2026: the same idea
 * already appears twice more on the page, as step 04 of the process and inside
 * the care plate in §04, where it is better argued. It was taking a third of
 * the most important section to say something said better elsewhere.
 *
 * `meta` is gone with it. Those lines ("Less manual work · Your existing
 * tools") restated the body in fewer words and carried no new information.
 */
export const plans = [
  {
    label: 'Connect your tools',
    title: 'Stop doing the same work twice.',
    body: 'Your tools stay where they are. I make them talk to each other, so no one retypes the same number twice.',
  },
  {
    label: 'Custom software',
    title: 'Give your team one place to work.',
    body: 'When a spreadsheet and a group chat are holding a process together, I replace them with one thing built for your team.',
  },
];

/**
 * The six questions from the v3 draft, in its order. Every answer is a claim
 * the owner controls outright: structure, process and terms. Nothing here
 * cites a number, a client or a result.
 */
export const questions = [
  {
    q: 'Can another developer take this over?',
    a: 'You have the source code, documentation, and accounts. Any competent developer can take it over.',
  },
  {
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
    a: 'That is fine. Thread works remotely with businesses outside Hawaiʻi too.',
  },
  {
    q: 'What does it cost to run after it’s built?',
    a: 'Your existing subscriptions and hosting, billed directly to you. I will outline the real cost for your setup before you decide.',
  },
];

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
    heading: 'Explore',
    links: [
      { label: 'What I do', href: '/#services' },
      { label: 'How it works', href: '/#how' },
      { label: 'What you get', href: '/#ownership' },
    ],
  },
  /* A WhatsApp "Message me" link was considered and dropped 17 Aug 2026:
     publishing a personal mobile in a footer gets it scraped within days, and
     the form and the email already cover the same intent. */
  {
    heading: 'Contact',
    links: [
      { label: 'Book a call', href: '/#contact' },
      { label: 'Email me', href: `mailto:${contact.email}` },
    ],
  },
];
