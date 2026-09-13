/**
 * The case studies. One entry per page at /work/[slug]; the /work index and
 * the homepage proof cards read the same array, so a study cannot exist on
 * one and not the other.
 *
 * ⚠️⚠️ READ BEFORE ADDING OR EDITING AN ENTRY.
 *
 * This site carried a fabricated case study with fabricated metrics once, and
 * deleting it is why src/content/placeholders.ts no longer exists. CLAUDE.md,
 * "Content that must never be invented", is the standing rule: no invented
 * client, no invented result, no invented number.
 *
 * THE FIRST ENTRY IS AN EXCEPTION THE OWNER MADE DELIBERATELY, 12 Sep 2026.
 * EstimateFlow is a demonstration build, not a client project. The owner
 * chose to publish it at /work/estimateflow, indexed, linked from the nav and
 * the homepage proof row, and WITHOUT a "sample project" label on the page.
 * That decision was raised twice and confirmed. Do not add the label back
 * and do not take the page down on your own initiative; if the rule and the
 * page are in tension, that is the owner's call and it has been made.
 *
 * What the exception does NOT cover, and what this file still refuses to do:
 *  - No results numbers. `results` is empty and the template omits the band.
 *    "Saved N hours" for a demonstration build would be a fabricated metric,
 *    which is the specific thing that went wrong before.
 *  - No client name. The copy says what the app does; it never says who runs
 *    it or claims anyone does.
 *  - No `builtOn` stack until the owner supplies it. The template draws a
 *    visible gap.
 *  - "Malia Santos", her phone number, her roof and "Pearl City" are the
 *    drawing's own fiction, the same way "Windward Air" is on the homepage.
 *
 * Every `placeholder` step and every empty array below is a gap the page
 * shows with the site's Placeholder component. The list at the bottom of
 * this file is the work order.
 */

export type WorkGraphic = 'ef-hero' | 'ef-before' | 'ef-after' | 'ef-phone';

export interface WorkStep {
  /** "01" */
  n: string;
  title: string;
  /** What the visitor is looking at. One or two sentences. */
  body: string;
  /** Why it matters. One line. */
  why?: string;
  /** A drawing, or a Placeholder with `shot` as its label. */
  graphic: WorkGraphic | 'placeholder';
  shot?: string;
}

export interface WorkDetail {
  /** Placeholder label until there is a crop to show. */
  shot: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  /** "Case study · Roofing" */
  eyebrow: string;
  title: string;
  /** The <title> and the proof card's short name. */
  name: string;
  intro: string;
  description: string;
  /** The facts strip under the intro. Non-numeric unless the number is real. */
  facts: string[];
  hero: WorkGraphic;
  /** Omitted from the page while empty. See the header. */
  results: { value: string; label: string }[];
  beforeAfter: {
    lead: string;
    before: { graphic: WorkGraphic; caption: string };
    after: { graphic: WorkGraphic; caption: string };
  };
  walkthrough: { heading: string; lead: string; steps: WorkStep[] };
  clip: { heading: string; note: string; shot: string };
  details: { heading: string; items: WorkDetail[] };
  scope: string[];
  builtOn: string[];
  builtOnNote: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'estimateflow',
    eyebrow: 'Case study · Roofing · Intake and estimating',
    name: 'EstimateFlow',
    title: 'Every roofing inquiry arrives ready to estimate.',
    intro:
      'EstimateFlow is an intake and estimating app for roofing contractors. A homeowner answers a short guided form on their phone, and the office gets a scored, photographed project it can act on, instead of a two-line message it has to chase.',
    description:
      'EstimateFlow, a customer intake and estimating app for roofing contractors, built by Thread in Honolulu.',
    facts: ['Customer intake', 'Urgency scoring', 'Photo capture', 'Estimator review'],
    hero: 'ef-hero',
    results: [],
    beforeAfter: {
      lead:
        'The same leak, twice. First, what a website contact form sends the office. Then, what the estimator opens.',
      before: {
        graphic: 'ef-before',
        caption:
          'Eight questions the office has to ask before anyone can quote, and a phone call to ask them.',
      },
      after: {
        graphic: 'ef-after',
        caption:
          'The questions were asked on the way in. Urgency is scored, the roof is described, the photos are attached, and the next step is a button.',
      },
    },
    walkthrough: {
      heading: 'Follow one leak, from the phone to the quote.',
      lead: 'Four moments. Each one is a screen, what you are looking at, and why it matters.',
      steps: [
        {
          n: '01',
          title: 'The homeowner answers five questions',
          body:
            'The intake runs on the customer’s phone, one question at a time. Picking the problem, adding a photo from the camera, and choosing a time all happen before the office hears about it.',
          why: 'Nothing here needs a follow-up call.',
          graphic: 'ef-phone',
        },
        {
          n: '02',
          title: 'The office sees a scored project',
          body:
            'Each submission lands in the estimator’s queue with an urgency level and a readiness score, so an active leak sorts above a gutter question without anyone reading both.',
          why: 'Triage happens before the first click.',
          graphic: 'placeholder',
          shot: 'Screenshot · estimator queue',
        },
        {
          n: '03',
          title: 'The estimate is built from what is already there',
          body:
            'Roof type, age, access and the customer’s photos are on the project when the estimator opens it. The estimate form starts filled in rather than blank.',
          why: 'The site visit confirms; it does not collect.',
          graphic: 'placeholder',
          shot: 'Screenshot · build estimate',
        },
        {
          n: '04',
          title: 'The quote goes out with one tap',
          body:
            'A recommended next action sits on the project: an emergency tarp quote and an inspection slot, ready to send. The customer gets it while the leak is still their problem, not the office’s backlog.',
          why: 'The fastest quote usually wins the job.',
          graphic: 'placeholder',
          shot: 'Screenshot · quote sent',
        },
      ],
    },
    clip: {
      heading: 'Twenty seconds of it running.',
      note: 'Watch the readiness ring fill as the customer finishes the intake.',
      shot: 'Clip · screen recording, no sound, loops',
    },
    details: {
      heading: 'Decisions you can see.',
      items: [
        { shot: 'Detail · urgency pill', body: 'Urgency is a word, not a number. An estimator reads "high" faster than "7.4".' },
        { shot: 'Detail · readiness ring', body: 'The score tells the office what is missing before they call, so the call is one question, not eight.' },
        { shot: 'Detail · photo row', body: 'Photos come from the customer’s camera roll on the spot. Nobody emails a picture later.' },
      ],
    },
    scope: [
      'Guided customer intake, five steps, built for a phone',
      'Urgency scoring and a readiness check on every submission',
      'Estimator project view with property details and photos',
      'Recommended next action with a one-tap quote',
    ],
    builtOn: [],
    builtOnNote: 'It runs in their accounts, on their data.',
  },
];

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

/**
 * WORK ORDER for /work/estimateflow, 12 Sep 2026. Each item is a Placeholder
 * on the live page until it is supplied.
 *
 *  1. Results band: three real figures, or leave it off. (Off.)
 *  2. Step 02 screenshot: the estimator queue, sorted by urgency.
 *  3. Step 03 screenshot: the build-estimate form, prefilled.
 *  4. Step 04 screenshot: the sent quote, with the inspection slot.
 *  5. Clip: a muted screen recording, ~20s, looping. Needs a <video> element
 *     and a hosted file; the template draws the slot.
 *  6. Three detail crops: urgency pill, readiness ring, photo row.
 *  7. `builtOn`: the stack, as chips.
 *  8. Roof photos for the three photo stand-ins in EfHero, EfAfter, EfPhone.
 *  9. A second case study, so "More work" at the foot of the page has
 *     something to point at. Until then that block is omitted.
 */
