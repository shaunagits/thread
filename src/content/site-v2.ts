/**
 * Content for the ALTERNATE homepage at /v2.
 *
 * Separate file from site.ts on purpose. The live homepage's nav, CTA and
 * service copy are shared by Header, Footer, og.astro and the schema block, so
 * editing site.ts to suit a second page would silently rewrite the first one.
 * Nothing here is imported by anything under /; nothing in site.ts changes.
 *
 * Source: _docs/homepage-wireframe.html, supplied by the owner 1 Sep 2026.
 * The wireframe is the reference for structure and copy; where it and the live
 * site disagree, this page follows the wireframe.
 *
 * ⚠️ TWO STANDING RULES OF THIS REPO ARE DELIBERATELY RELAXED HERE, both on
 * the owner's explicit instruction on 1 Sep 2026, both recorded so neither
 * reads as drift:
 *
 *  1. PRICES. site.ts carries a standing rule that no price ships until the
 *     owner supplies real figures, because a plausible placeholder price is
 *     how this site went wrong once. The figures below came from the owner in
 *     the wireframe and were confirmed as real. They are still not to be
 *     invented, extended or rounded — a price that is not in the wireframe
 *     does not go in this file.
 *  2. ONE CASE-STUDY RESULT. `proof[0]` is a real client outcome, confirmed by
 *     the owner. Entries two and three are the wireframe's own bracketed
 *     placeholders and render as visible placeholder blocks, the way /work
 *     does. Do not write copy into them.
 *
 * Everything else in "Content that must never be invented" still applies.
 */

/** Root-relative — landmine 13. A bare `#offers` resolves against the wrong
 *  document from /privacy or /thanks. This was '/v2' until 1 Sep 2026, when
 *  the page was promoted to `/`. */
const P = '/';

/**
 * ⚠️ The CTA, the nav and the footer columns MOVED TO site.ts with the
 * promotion, and are re-exported here only so this file still reads as the
 * homepage's content in one place.
 *
 * They had to move: `Header`, `Footer` and /work render them with no props on
 * every page of the site, so the moment this became `/` they stopped being one
 * page's content and started being the site's. Edit them in site.ts.
 */
export { cta, ctaHref } from './site';

export const title =
  'Custom Software and Automation for Small Business | Hawaii and Mainland US';
export const description =
  'Custom software and automation for small businesses. I replace spreadsheets and busywork with simple tools built around how you already work. Fixed prices, plain English.';

export const hero = {
  h1: 'Custom software for small businesses tired of doing it by hand.',
  sub: 'I replace the spreadsheets, sticky notes, and busywork with simple tools built around how you actually work. Fixed prices, plain English, one person you can call.',
  secondary: { label: 'See pricing', href: `${P}#offers` },
};

export const problem = {
  heading: "You didn't start a business to spend your evenings on admin.",
  body: [
    'Retyping orders. Chasing invoices. Answering the same question for the hundredth time. It all works, until it eats your week.',
    'Off-the-shelf tools make you bend to them. Agencies quote six figures and vanish. Hiring is a gamble.',
  ],
  claim: "There's a better way.",
};

export const steps = [
  {
    title: "Tell me what's slowing you down",
    body: 'A 20-minute call or a short form. You describe your week. No jargon.',
  },
  {
    title: 'Get a fixed price and a plan',
    body: "You know exactly what you're getting, what it costs, and when, before you pay anything.",
  },
  {
    title: 'See it working',
    body: 'Weekly demos on bigger projects. Team training. 30 days of post-launch fixes.',
  },
];

/**
 * ⚠️ The prices below are the owner's own, from the wireframe, confirmed real
 * 1 Sep 2026. See the header of this file. Do not add a price to an offer that
 * does not carry one, and do not reconcile these against STRATEGY.md's older
 * "from $12,000" / "from $25,000" — those are stale, these are current.
 */
export const offers = [
  {
    featured: true,
    pill: 'Best place to start',
    title: 'Automation quick win',
    body: 'Automate your most annoying weekly task, built and running within 2 weeks. One fixed price, one clear result.',
    list: [
      'Inquiries auto-create a quote and reminder',
      'Forms flow into your calendar and list',
      'AI drafts routine replies to approve',
    ],
    price: 'from $1,500',
    action: { label: 'Book a free call', href: `${P}#contact` },
  },
  {
    featured: false,
    title: 'Custom business app',
    body: 'Software built around your business, not the other way around. Fixed price, weekly demos, no surprises.',
    /* The wireframe draws a mini mockup thumbnail here. There is no asset, so
       the card renders a labelled placeholder rather than a stock image. */
    thumb: 'Mini mockup thumbnail (portal / scheduling)',
    price: 'from $6,000',
    action: { label: 'See examples', href: `${P}#proof` },
  },
  {
    featured: false,
    title: 'Fractional tech partner',
    body: 'Ongoing support, new features, and improvements every month. A person who already knows your business.',
    list: ['Essentials $800/mo, up to 8 hrs', 'Growth $2,000/mo, up to 20 hrs'],
    price: 'from $800/mo',
    action: { label: 'Compare plans', href: `${P}#contact` },
  },
];

/**
 * ⚠️ Entry one is a real result, confirmed by the owner 1 Sep 2026. Entries
 * two and three are the wireframe's bracketed placeholders and `placeholder`
 * is what makes them render as visible gaps rather than as claims. Flip the
 * flag only when the owner supplies the real business, problem and result —
 * never to make the row look finished.
 */
export const proof = [
  {
    placeholder: false,
    result: '6 hrs/week',
    body: 'HVAC company, Oahu. Replaced a text-thread dispatch with a job list.',
    shot: 'App screenshot (data blurred)',
  },
  {
    placeholder: true,
    result: 'Same-day invoices',
    body: 'Case study 2: business type, problem, result.',
    shot: 'App screenshot',
  },
  {
    placeholder: true,
    result: 'Result',
    body: 'Case study 3.',
    shot: 'App screenshot',
  },
];

export const about = {
  heading: 'One person. Start to finish.',
  body: [
    'You talk to the person building your software, not an account manager. I explain things in plain English, show progress every week, and stick around after launch.',
    "I work with businesses in Hawaii and across the mainland, and I price competitively because I don't have an office full of overhead to cover.",
  ],
  claim:
    "Everything I build is yours, documented, and built on tools any developer knows. You're never locked in to me.",
  /* The wireframe's "[Add 2 to 3 lines about your background and who you've
     built for.]" — a bracketed placeholder, so it renders as one rather than
     being written on the owner's behalf. */
  backgroundTodo: "2 to 3 lines about your background and who you've built for.",
};

export const leadMagnet = {
  heading: 'Not sure where to start? Grab the checklist.',
  body: '“20 Tasks Your Business Is Still Doing by Hand” is a one-page checklist. Tick off what applies and you’ll see where automation would pay off first.',
  action: 'Send me the checklist',
};

export const faq = [
  {
    q: 'Do I need to know anything about software?',
    a: 'No. You know your business. I handle the technical side and explain anything you want to understand.',
  },
  {
    q: "What if it doesn't work the way I expected?",
    a: "That's what weekly demos are for. You see progress every week and we adjust as we go. Every project includes 30 days of fixes after launch.",
  },
  {
    /* Shortened on the owner's instruction, 1 Sep 2026. It was "What happens
       if you're unavailable or stop doing this?" — the second clause asked the
       same thing twice and made the row the longest in the set. The question
       mark is kept: every other entry in this array is a question and ends
       with one. */
    q: "What happens if you're unavailable?",
    a: 'You own the code and the accounts. Everything is built with common, well-documented tools, and I hand over full documentation so any competent developer can pick it up.',
  },
  {
    q: 'Is the price really fixed?',
    a: "Yes. Once we agree on scope, the price doesn't change. Additions later get scoped and priced separately.",
  },
  {
    /* Carries a price. Same confirmation as the offers above — the owner's own
       figure from the wireframe, not the "$20 to $200" the retired v3 Questions
       section used to guess at. */
    q: 'Are there ongoing costs?',
    a: 'Hosting for most small business apps runs $10 to $50 a month, and I tell you the number up front. No surprise fees.',
  },
  {
    q: 'Do you work with businesses outside Hawaii?',
    a: 'Yes. Most of my work is remote and I work with clients across the mainland US.',
  },
];

export const contactV2 = {
  heading: "Tell me what's slowing you down.",
  talkHeading: 'Prefer to talk?',
  talkBody:
    'Pick a time for a free 20-minute call. No pitch, just a conversation about what’s possible.',
  /* ⚠️ There is still no scheduling link. CLAUDE.md has recorded this since
     14 Aug 2026 and it is why the site-wide CTA is not "Book a call". The
     wireframe draws a Calendly/Cal.com embed here; until a real URL exists it
     renders as a labelled placeholder, not an <iframe> pointing at nothing. */
  calendarEmbed: 'Calendar embed (Calendly / Cal.com)',
  reply: "You'll hear back from me within one business day.",
};
