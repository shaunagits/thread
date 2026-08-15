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
  { label: 'What I do', href: '/#services' },
  { label: 'How it works', href: '/#how' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
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
    n: '01 · LEARN',
    title: 'I learn how you actually work',
    body: 'A call, then a couple of sessions with the people who do the job. Not how the org chart says work moves. How it moves. Then you get a fixed scope and a fixed price, in writing, before anything gets built.',
  },
  {
    n: '02 · BUILD',
    title: 'I build it',
    body: 'You see working software every two weeks. Not a status update, not a progress bar. Something you can click. If something I assumed turns out to be wrong, you hear it in week two, not week ten.',
  },
  {
    n: '03 · HAND OVER',
    title: 'I hand it over',
    body: 'It ships documented in plain English: what it does, why it works that way, and what to do when your business changes. It runs in your accounts on your data. Ongoing support is available, and optional.',
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
    title: 'Connect',
    body: 'One place to see and run everything. Live data from the systems you already use, in the shape your team thinks in, with automation closing the handoffs between them. Roles and permissions included.',
    meta: ['4 to 6 weeks', 'Fixed price', 'You own the code'],
  },
  {
    title: 'Build',
    body: 'The custom application: work tracked the way you track it, intake that routes itself, approvals that match how decisions actually get made, plus the integrations that keep it fed. This is the one that replaces the spreadsheet, the group chat, and the person who remembers.',
    meta: ['8 to 12 weeks', 'Fixed price', 'You own the code'],
  },
  {
    title: 'Ongoing',
    body: 'After handover, for teams who would rather not think about it. Monitoring, fixes, and a set amount of new work each month as the business changes.',
    meta: ['Month to month', 'Cancel with thirty days', 'Optional, never bundled'],
  },
];

/**
 * The six questions from the v3 draft, in its order. Every answer is a claim
 * the owner controls outright: structure, process and terms. Nothing here
 * cites a number, a client or a result.
 */
export const questions = [
  {
    q: 'What if you get hit by a bus?',
    a: 'You have the source code, the documentation, and everything running in accounts with your name on them. Any developer can pick it up. That is the structure of every project, not a favor.',
  },
  {
    q: 'We tried custom software before and it went badly.',
    a: 'Usually one of three ways. The scope moved and the bill followed. Nobody used it because it got built from a wishlist instead of a workflow. Or the vendor owned it and the relationship went sour. Fixed price handles the first, sitting with your team handles the second, and the ownership terms handle the third.',
  },
  {
    q: 'Can we just use Zapier?',
    a: 'Sometimes, and when that is the real answer I will say so on the call. Automation tools move a record from A to B well. They get expensive and fragile the moment there is logic, history, permissions, or anything a person needs to look at.',
  },
  {
    q: 'How much of my team’s time does this take?',
    a: 'A few hours up front from the people who do the work, then a demo every two weeks. You will never sit in a meeting with me that is not a demo.',
  },
  {
    q: 'We’re not in Hawaiʻi.',
    a: 'Neither are a lot of the businesses I talk to. I keep hours that overlap the West Coast and the East Coast and reply within one business day.',
  },
  {
    q: 'What does it cost to run after it’s built?',
    a: 'Your existing subscriptions, plus hosting, billed to you directly. I do not mark it up. I will give you the real figure for your setup on the call.',
  },
];

export const footerColumns = [
  {
    heading: 'Work together',
    links: [
      { label: 'Connect', href: '/#pricing' },
      { label: 'Build', href: '/#pricing' },
      { label: 'Ongoing', href: '/#pricing' },
    ],
  },
  {
    heading: 'The detail',
    links: [
      { label: 'How it works', href: '/#how' },
      { label: 'What you own', href: '/#own' },
      { label: 'Questions', href: '/#questions' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Book a call', href: '/#contact' },
    ],
  },
];
