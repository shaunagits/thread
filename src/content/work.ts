/**
 * The case studies. One entry per page at /work/[slug]; the /work index and
 * the homepage proof section read the same array, so a study cannot exist on
 * one and not the other.
 *
 * Some history worth knowing: this site once carried a fabricated client case
 * study with invented metrics, in a file called src/content/placeholders.ts,
 * and deleting it was the fix. That is a reason to check a number before
 * publishing it, not a reason to refuse to write one.
 *
 * EstimateFlow is a demonstration build rather than a client project. The
 * owner chose, 12 Sep 2026, to publish it at /work/estimateflow, indexed,
 * linked from the nav and from the homepage proof section, with no sample
 * label. It carries no results figures and names no client, so nothing on the
 * page claims an outcome that did not happen. Malia Santos, her phone number,
 * her roof and Pearl City are the drawings’ own fiction, as are Windward Air
 * and Cedar Ridge on the homepage.
 *
 * `results` is empty, and the template omits the whole band when it is, rather
 * than drawing empty cards. `builtOn` is empty until the stack is supplied and
 * draws a visible gap. The work order at the foot of this file lists what is
 * still missing from the page.
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
  /** The proof card's short name and the page's own label. */
  name: string;
  /** The <title> tag. Written for search, where nobody types a product name
   *  they have never heard of: lead with the work, not the brand. */
  seoTitle: string;
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
    seoTitle: 'Roofing Intake & Estimating Workflow: EstimateFlow | Thread',
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
