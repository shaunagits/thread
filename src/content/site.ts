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
export const services = [
  {
    title: 'Custom internal apps',
    body: 'The software your business needs and nobody sells: job tracking shaped like your workflow, intake that routes itself, approvals that match how decisions actually get made.',
    meta: ['Typical: 6\u201310 weeks', 'Fixed price', 'You own the code'],
  },
  {
    title: 'Dashboards & reporting panels',
    body: 'One screen that answers the questions you currently open four tabs to answer. Live data from every system you run, arranged the way your team already thinks about the work.',
    meta: ['Typical: 3\u20136 weeks', 'Fixed price', 'Live data, no exports'],
  },
  {
    title: 'AI automation',
    body: 'AI applied where it holds up and nowhere else: pulling information out of documents and forms, routing inbound work, drafting repetitive correspondence, flagging what needs a person. Review by a human is built in.',
    meta: ['Typical: 4\u20138 weeks', 'Fixed price', 'Human review built in'],
  },
  {
    title: 'Integration & data plumbing',
    body: 'Connecting the tools you already pay for so the retyping stops. Getting your systems to agree, so the same number means the same thing everywhere.',
    meta: ['Typical: 2\u20136 weeks', 'Fixed or retainer', 'Monitored'],
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
