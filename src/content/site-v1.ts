/**
 * Content for the RETIRED homepage, now at /v1.
 *
 * This page was `/` from the Style C redesign on 29 Aug 2026 until 1 Sep 2026,
 * when the owner swapped it for the wireframe design. It is kept live at a
 * noindex route rather than deleted, because the owner asked for the old
 * homepage to stay available for reference.
 *
 * ⚠️ THIS FILE EXISTS SO /v1 STAYS A FAITHFUL SNAPSHOT. Its four exports were
 * `site.ts`'s own values until the swap; `site.ts` now carries the new
 * homepage's nav, CTA and footer, because those are what every shared
 * component and every other page must point at. Without this file /v1 would
 * render the new labels over its old sections, and its nav would send you to
 * anchors (`#offers`, `#proof`) that do not exist on it.
 *
 * Three components import from here rather than from `site.ts`, because all
 * three are used by /v1 and nothing else: `Hero.astro`, `StickyCta.astro` and
 * `v1.astro` itself. If any of them is ever reused on another page, it needs a
 * prop rather than this import.
 *
 * Nothing here is new copy. Every string is what the page shipped with.
 */

/** Page-qualified, not bare fragments — landmine 13. The footer renders on
 *  /privacy, /terms and /thanks, where `#busywork` resolves against the wrong
 *  document. It was `/#busywork` while this page was `/`. */
const P = '/v1';

/** "Start the conversation", restored on the owner's instruction 29 Aug 2026.
 *  See the (now historic) note in site.ts for why it was never "Book a call". */
export const cta = 'Start the conversation';
export const ctaHref = `${P}#contact`;

/**
 * The plain, expected labels the owner picked from four directions on
 * 29 Aug 2026. ⚠️ They deliberately do not describe the anchors they point at
 * (`#busywork`, `#build`) — ids are contracts and renaming one to chase a
 * label is how indexed links break.
 */
export const nav = [
  { label: 'The problem', href: `${P}#busywork` },
  { label: 'The solution', href: `${P}#build` },
  { label: 'Contact', href: `${P}#contact` },
];

export const footerColumns = [
  {
    heading: 'Sections',
    /* Mirrors `nav` above exactly. Two navigations aimed at the same anchors
       must not label them differently. */
    links: nav,
  },
  {
    heading: 'Contact',
    links: [
      { label: cta, href: ctaHref },
      { label: 'Email me', href: 'mailto:aloha@threadhawaii.com' },
      { label: 'Log in', href: 'https://app.threadhawaii.com' },
    ],
  },
];
