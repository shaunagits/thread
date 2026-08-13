/**
 * Real site content — repeating structures lifted out of the markup so the
 * components stay about layout.
 *
 * Nothing in this file may be invented. Every claim here is either verbatim
 * from the approved design or confirmed by the owner. See CLAUDE.md.
 */

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'The map', href: '#map' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

/**
 * The "Connects to" strip. This is a capability claim, not a client list —
 * every one of these exposes a public API Thread can build against. Confirmed
 * by the owner 13 Aug 2026. Anything added here must clear the same bar.
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

export const steps = [
  {
    n: '01 — MAP',
    title: 'We draw your systems',
    body: 'About a week. We sit with your team, trace how work actually moves, and hand you a labelled map of every tool, handoff, and gap. Free, and yours to keep.',
  },
  {
    n: '02 — BUILD',
    title: 'We close the gaps',
    body: 'Custom apps, dashboards, and automation built against your real process. You see working software in two-week increments, not a status update.',
  },
  {
    n: '03 — HAND OVER',
    title: 'We document and step back',
    body: 'Every build ships with an annotated plate explaining what it does and why. It runs in your accounts on your data. Support is optional, not a hostage situation.',
  },
];

export const services = [
  {
    title: 'Custom internal apps',
    body: 'The software your business needs but nobody sells: job tracking shaped like your workflow, intake forms that route themselves, approval flows that match how decisions actually get made.',
    meta: ['Typical: 6–10 weeks', 'Fixed price', 'You own the code'],
  },
  {
    title: 'Dashboards & reporting panels',
    body: 'One screen that answers the questions you currently open four tabs to answer. Live data from every system you run, in the shape your team thinks in, on any device.',
    meta: ['Typical: 3–6 weeks', 'Fixed price', 'Live data, no exports'],
  },
  {
    title: 'AI automation',
    body: 'Automation applied where it holds up: sorting and routing inbound work, drafting the repetitive correspondence, extracting data from documents, flagging what needs a human. We’re specific about where it does and doesn’t belong.',
    meta: ['Typical: 4–8 weeks', 'Fixed price', 'Human review built in'],
  },
  {
    title: 'Integration & data plumbing',
    body: 'The unglamorous half. Getting your systems to talk reliably, reconciling records that disagree, and building the pipes so the same number means the same thing everywhere.',
    meta: ['Typical: 2–6 weeks', 'Fixed or retainer', 'Monitored, not fire-and-forget'],
  },
];

export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Custom internal apps', href: '#services' },
      { label: 'Dashboards', href: '#services' },
      { label: 'AI automation', href: '#services' },
      { label: 'Integration', href: '#services' },
    ],
  },
  {
    heading: 'Ways to work',
    links: [
      { label: 'Systems map', href: '#map' },
      { label: 'Care plan', href: '#services' },
      { label: 'Rescue work', href: '#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];
