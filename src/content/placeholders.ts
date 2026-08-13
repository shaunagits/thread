/**
 * ⚠️  EVERYTHING IN THIS FILE IS INVENTED AND MUST BE REPLACED BEFORE LAUNCH.
 *
 * The approved design file flagged all of it as placeholder. It is collected
 * here — rather than inline in the components — so the swap is one file.
 *
 * See LAUNCH-CHECKLIST.md for the full list and what each item needs.
 */

/** ⚠️ Product names, descriptions and ALL pricing are invented. */
export const products = [
  {
    tag: 'Subscription',
    name: 'Thread Panel',
    blurb:
      'The operations dashboard from Fig. 1, configured for your stack. Live counts, revenue, and job status from every system you run.',
    price: '$390',
    unit: ' /month',
    features: [
      'Up to 8 connected systems',
      'Unlimited team logins with roles',
      'Setup and configuration included',
      'Hosted, or run it yourself',
    ],
    cta: { label: 'Start a trial', href: '#contact', style: 'btn' as const },
  },
  {
    tag: 'One-time purchase',
    name: 'Handoff',
    blurb:
      'A library of automation blueprints for the twelve handoffs that break most often — quote to invoice, job to schedule, payment to books.',
    price: '$1,200',
    unit: ' once',
    features: [
      '12 production-ready blueprints',
      'Works with n8n, Make, or Zapier',
      'Written setup guide for each',
      'Free updates for one year',
    ],
    cta: { label: 'Buy Handoff', href: '#contact', style: 'btn-ghost' as const },
  },
  {
    tag: 'One-time purchase',
    name: 'Field Kit',
    blurb:
      'A starter codebase for internal tools — auth, roles, audit logging, and the panel components we use on every build. For teams with a developer.',
    price: '$2,400',
    unit: ' once',
    features: [
      'Full source, commercial licence',
      'Auth, roles, and audit trail built in',
      'Component library and design tokens',
      'Two hours of onboarding',
    ],
    cta: { label: 'Buy Field Kit', href: '#contact', style: 'btn-ghost' as const },
  },
];

/**
 * ⚠️ The Kailua landscaping case study is fabricated, including all three
 * metrics. Replace with a real client — with written permission — or remove
 * the Work section until there is one.
 */
export const specimen = {
  id: 'Specimen 001 — Landscaping & maintenance · Kailua, Oʻahu',
  scale: '18 staff · 7 systems · 9 weeks',
  paragraphs: [
    {
      label: 'Before.',
      body: 'Jobs booked in one app, invoiced in another, paid through a third, and reconciled by hand every Friday afternoon. The owner’s daughter spent roughly a day and a half each week retyping numbers between systems, and nobody could answer "what did we make last month" without a two-hour spreadsheet exercise.',
    },
    {
      label: 'What we built.',
      body: 'A single operations panel pulling live from their scheduling, POS, and accounting systems, plus automation that generates and sends the invoice the moment a crew marks a job complete. Overdue accounts surface themselves instead of being discovered.',
    },
    {
      label: 'After.',
      body: 'The Friday reconciliation is gone. Invoicing happens same-day instead of same-week, which pulled average time-to-payment down by nearly three weeks. The daughter went back to running sales.',
    },
  ],
  figures: [
    { value: '1.5 days', key: 'Weekly admin removed' },
    { value: '−19 days', key: 'Average time to payment' },
    { value: '7 → 1', key: 'Screens to answer a question' },
  ],
};

/** ⚠️ Confirm Thread actually builds against each of these before listing them. */
export const integrations = [
  'QuickBooks', 'Shopify', 'Square', 'Jobber', 'Airtable',
  'Stripe', 'Slack', 'Google Workspace', 'HubSpot',
];

/** ⚠️ aloha@threadhawaii.com is a guess. Set the real address. */
export const contact = {
  email: 'aloha@threadhawaii.com',
  location: 'Honolulu, Hawaiʻi',
};
