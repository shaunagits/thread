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
export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#how' },
  { label: 'Ownership', href: '/#ownership' },
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
export const steps = [
  {
    n: '01',
    label: 'Fit call',
    title: 'Tell us what is slowing you down',
    body: 'Start with a free 30-minute fit call.',
  },
  {
    n: '02',
    label: 'Clear plan',
    title: 'Get a clear plan',
    body: 'Decide what is worth fixing first.',
  },
  {
    n: '03',
    label: 'Build together',
    title: 'Build it around your team',
    body: 'See working software as it takes shape.',
  },
  {
    n: '04',
    label: 'Keep it useful',
    title: 'Keep it useful',
    body: 'Get help when the business changes.',
  },
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
export const plans = [
  {
    label: 'Connect your tools',
    title: 'Stop doing the same work twice.',
    body: 'Connect the tools you already rely on.',
    meta: ['Less manual work', 'Your existing tools'],
  },
  {
    label: 'Custom software',
    title: 'Give your team one place to work.',
    body: 'Replace the spreadsheet, inbox, or workaround holding a process together.',
    meta: ['Built for your team', 'Clear next steps'],
  },
  {
    label: 'Maintenance',
    title: 'Keep improving what works.',
    body: 'Get maintenance and small changes as the business changes.',
    meta: ['Ongoing support', 'Always optional'],
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
  {
    heading: 'Services',
    links: [
      { label: 'Connect', href: '/#services' },
      { label: 'Automate', href: '/#services' },
      { label: 'Build', href: '/#services' },
    ],
  },
  {
    heading: 'Approach',
    links: [
      { label: 'The process', href: '/#how' },
      { label: 'Ownership', href: '/#ownership' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book a call', href: '/#contact' },
      { label: 'Email Thread', href: `mailto:${contact.email}` },
    ],
  },
];
