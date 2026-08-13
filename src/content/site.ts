/**
 * Real site content — repeating structures lifted out of the markup so the
 * components stay about layout.
 *
 * Nothing in this file may be invented. Every claim here is either verbatim
 * from the approved design or confirmed by the owner. See CLAUDE.md.
 */

/**
 * Root-relative, not bare fragments. These render on /systems-map and /thanks
 * too, where `#services` would resolve against the wrong document and do
 * nothing. From the homepage `/#services` is still a fragment jump, not a
 * reload.
 */
export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'The map', href: '/#map' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
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
    n: '01 · MAP',
    title: 'Thread draws your systems',
    body: 'One conversation, then about a week. Thread traces how a single workflow actually moves through your business and hands back a labelled map of every tool, handoff and gap, with a ranked list of what’s worth fixing first. Free, and yours to keep whether or not you go further.',
  },
  {
    n: '02 · BUILD',
    title: 'Thread closes the gaps',
    body: 'Custom apps, dashboards and automation built against your real process. You see working software every two weeks, not a status update.',
  },
  {
    n: '03 · HAND OVER',
    title: 'Thread documents and steps back',
    body: 'Every build ships with a written plate explaining what it does and why. It runs in your accounts, on your data. Ongoing support is available and it is optional.',
  },
];

/**
 * Typical durations and price floors are deliberately absent. HOMEPAGE-COPY.md
 * marks both `[CONFIRM]` and the owner has not supplied them. The meta lines
 * carry only claims Thread controls outright. Do not invent the rest.
 */
export const services = [
  {
    title: 'Custom internal apps',
    body: 'The software your business needs and nobody sells: job tracking shaped like your workflow, intake that routes itself, approvals that match how decisions actually get made.',
    meta: ['Fixed price', 'You own the code'],
  },
  {
    title: 'Dashboards and reporting',
    body: 'One screen that answers the questions you currently open four tabs to answer. Live data from every system you run, arranged the way your team already thinks about the work.',
    meta: ['Fixed price', 'Live data, no exports'],
  },
  {
    title: 'Automation and integration',
    body: 'Connecting the tools you already pay for so the retyping stops. Getting your systems to agree, so the same number means the same thing everywhere.',
    meta: ['Fixed price or retainer', 'Monitored, not fire and forget'],
  },
  {
    title: 'Practical AI',
    body: 'AI applied where it holds up and nowhere else: pulling information out of documents and forms, routing inbound work, drafting repetitive correspondence, flagging what needs a person. Review by a human is built in.',
    meta: ['Fixed price', 'Human review built in'],
  },
];

export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { label: 'Custom internal apps', href: '/#services' },
      { label: 'Dashboards and reporting', href: '/#services' },
      { label: 'Automation and integration', href: '/#services' },
      { label: 'Practical AI', href: '/#services' },
    ],
  },
  {
    heading: 'Ways to work',
    links: [
      { label: 'Systems map', href: '/systems-map' },
      { label: 'Care plan', href: '/#services' },
      { label: 'Rescue work', href: '/#services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Work', href: '/#work' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];
