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
/* 155 characters, inside Google's ~160 truncation. Rewritten 2 Sep 2026 to
   follow the hero: the old one opened "I replace spreadsheets and busywork
   with simple tools", which is the sentence the owner replaced, so the search
   snippet was a copy pass behind the page. */
export const description =
  'Custom software and automation for small businesses. I turn spreadsheets, sticky notes, and repetitive work into simple software built around how you work.';

export const hero = {
  h1: 'Custom software for small businesses tired of doing it by hand.',
  /* ⚠️ Supplied by the owner 2 Sep 2026 as "the hero". It replaces the SUB,
     not the h1: at 30 words it is four times the headline's length, and the
     h1 is duplicated by hand in og.astro and scripts/build-og.py, neither of
     which changed. The line it replaces made the same promise; what came out
     with it is "Fixed prices, plain English, one person you can call." */
  sub: 'I turn the spreadsheets, sticky notes, and repetitive work holding your business together into simple software built around how you actually work.',
  secondary: { label: 'See ways to work together', href: `${P}#offers` },
};

/**
 * ⚠️ REWRITTEN 2 Sep 2026, on the owner's instruction, and it NO LONGER HAS A
 * HEADING. The section was a heading, two paragraphs and a closing claim; the
 * owner cut all four and supplied one paragraph and one claim in their place.
 * index.astro renders the h2 only when `heading` is set, so this section is
 * currently the one on the page without one. Raised with the owner.
 *
 * What went with it: the evenings-on-admin heading, the symptom list
 * (retyping orders, chasing invoices), and the two claims about agencies
 * quoting six figures and hiring being a gamble.
 */
export const problem = {
  body: [
    'Off-the-shelf tools make you bend to them. Traditional custom software can be far more project than a small business actually needs.',
  ],
  claim: 'There\u2019s a useful middle ground.',
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
    /* Two paragraphs since 2 Sep 2026, the owner's own line break: a promise
       first, then what it is. OffersV2 accepts a string or an array. */
    body: [
      "Take one repetitive task off your team's plate, for good.",
      'I automate one annoying weekly workflow and get it running within two weeks. One fixed price, one clear result.',
    ],
    list: [
      'Inquiries auto-create a quote and reminder',
      'Forms flow into your calendar and list',
      'AI drafts routine replies to approve',
    ],
    price: 'from $1,500',
    action: { label: 'Start with an audit', href: `${P}#contact` },
  },
  {
    featured: false,
    title: 'Custom business app',
    body: 'Software built around your business, not the other way around. Fixed price, weekly demos, no surprises.',
    /* The wireframe draws a mini mockup thumbnail here. Since 2 Sep 2026 it
       is CustomAppGraphic.astro, a static take-down of the owner's supplied
       drawing; OffersV2 switches on this key rather than importing a
       component per offer. */
    graphic: 'customApp',
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
    shot: 'Screenshot',
  },
  /* "Coming soon" wording since 2 Sep 2026, on the owner's instruction: the
     site is live and the real case studies are being gathered. The wireframe's
     "Same-day invoices" came out with it — it read as a result. */
  {
    placeholder: true,
    result: 'Coming soon',
    body: 'A second case study is on its way.',
    shot: 'Screenshot',
  },
  {
    placeholder: true,
    result: 'Coming soon',
    body: 'A third case study is on its way.',
    shot: 'Screenshot',
  },
];

export const about = {
  heading: 'One person. Start to finish.',
  body: [
    'You talk to the person building your software, not an account manager. I explain things in plain English, show progress every week, and stick around after launch.',
    "I work with businesses in Hawaii and across the mainland, and I price competitively because I don't have an office full of overhead to cover.",
    /* The owner's own background copy, supplied 2 Sep 2026, replacing the
       wireframe's bracketed "[Add 2 to 3 lines about your background]"
       placeholder. Apple and Nike are named on the owner's instruction; they
       are prior employers, not Thread clients, and the sentence says
       "built for organizations including" rather than claiming them as
       clients. Do not rewrite it to name projects — the owner cut that
       detail deliberately as too much for a marketing page. */
    'With 10+ years across technology, design, and operations, I\u2019ve built for organizations including Apple, Nike, local businesses, and nonprofits. Thread brings that experience to growing companies that need thoughtful, custom software without hiring a large agency or internal development team.',
  ],
  claim:
    "Everything I build is yours, documented, and built on tools any developer knows. You're never locked in to me.",
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

/**
 * The audit section, from frame 1a of `_docs/Automation Audit.dc.html`.
 *
 * ⚠️ THE OFFER CHANGED 1 Sep 2026. This section was a general "Tell me what's
 * slowing you down" contact form; it is now the way into a free automation
 * audit, and the form, the endpoint, the auto-reply and the site-wide CTA all
 * changed with it. The copy here is the design's own.
 *
 * It is "a free automation audit", never "a free 10-minute audit" — the offer
 * has no stated duration, deliberately, because the reply is written and the
 * video is three minutes and neither of those is a promise worth pinning a
 * number to.
 *
 * The reply is written, with a video in it. That phrasing is load-bearing and
 * appears in three places that must agree: here, the confirmation on /thanks,
 * and the auto-reply in api/contact.ts.
 */
export const audit = {
  /* Only the standalone page draws an eyebrow. Frame 1a (the homepage
     section) has none, because the section already sits under a heading
     hierarchy the page provides. */
  eyebrow: 'Free automation audit',
  heading: 'Get a free automation audit.',
  sub: 'Tell me how your week actually runs. Within one business day I\u2019ll send back a short written reply, with a video walking through the two things worth automating first and what each would take. No cost, no pitch.',

  /* Three steps, mono numerals on hairlines. Not a process diagram: the job is
     to show that this costs the reader one message and commits them to
     nothing. */
  steps: [
    'You describe your week.',
    'I send a short audit.',
    'You decide what to do next.',
  ],

  talkHeading: 'Prefer to talk?',
  talkBody: 'If it is easier to say out loud than to type, book twenty minutes. I will ask the same questions and send the same audit afterwards.',
  /* The fallback for someone who wants neither a form nor a calendar. */
  emailPrefix: 'Or email',

  /* Frame 1b only. The homepage already carries an About section with the same
     photo, so a second owner card there would be the third time the page says
     one person built this. On the standalone page it is the only such signal,
     and the standalone page is what outreach links point at. Note the wording
     is specific to this offer: "I read every audit request myself" is a
     promise about the audit, not the general "I build every system myself" the
     old contact card carried. */
  ownerLine: 'Thread is one person, based in Honolulu. I read every audit request myself and I write the reply myself.',
};

/**
 * The confirmation, from frame 1c. Shown at /thanks?kind=audit.
 *
 * ⚠️ The three steps here are NOT `audit.steps`. The section's strip describes
 * what the visitor is about to do; this one describes what happens after they
 * have done it, so step 01 is "I read what you sent" rather than "You describe
 * your week". The build brief called them "the same three steps"; the design
 * draws different ones, and the design is right — reprinting the pre-submit
 * steps on a post-submit page tells someone to do a thing they just did.
 *
 * "a short written reply with a video" is load-bearing and appears in three
 * places that must agree: this, the section copy, and the auto-reply in
 * api/contact.ts.
 */
export const auditThanks = {
  eyebrow: 'Request received',
  heading: 'Got it. I\u2019ll send your audit within one business day.',
  body: 'It\u2019ll be a short written reply with a video walking through the two things I\u2019d automate first for your business. Check your inbox, and your spam folder just in case.',
  nextHeading: 'What happens next',
  next: [
    'I read what you sent.',
    'You get the written audit and the video.',
    'You decide what to do next.',
  ],
  note: 'No cost. No obligation. I won\u2019t add you to any list.',
};
