import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';
import { calHref, contact } from '../../content/site';

export const prerender = false;

/** Field caps. Anything longer is a bot or a paste accident, not a lead. */
const LIMITS = {
  name: 200, email: 320, business: 500,
  team: 40, tasks: 600, timesink: 5000,
  tools: 600, tools_other: 500, frequency: 40, who: 200, pain: 600, example: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

/**
 * What step one sends, in the order it should appear in the email. Must match
 * the fields rendered by IntakeForm.astro — a field added there and not here
 * is collected and silently dropped. See CLAUDE.md, "Things that will bite you".
 *
 * There were two forms until 14 Aug 2026, switched on a `kind` parameter. The
 * owner killed the systems map offer and /systems-map is gone. Since 13 Sep
 * 2026 there is one form again in two STEPS: this table is step one
 * (IntakeForm.astro) and STEP2_FIELDS is step two (AuditMoreForm.astro, on
 * /thanks). Same endpoint, switched on a `step` field; see POST below.
 *
 * `tasks`, `tools` and `pain` are checkbox groups: many values under one name,
 * joined with ", " before they are capped. The values are the visible labels,
 * so the email reads what the visitor ticked.
 */
const FIELDS: ReadonlyArray<[FieldName, string]> = [
  ['business', 'Business'],
  ['team', 'People in it'],
  ['tasks', 'Done by hand'],
  ['timesink', 'The one that bothers them most'],
];

const STEP2_FIELDS: ReadonlyArray<[FieldName, string]> = [
  ['tools', 'Where the information lives'],
  ['tools_other', 'Other tools'],
  ['frequency', 'How often'],
  ['who', 'Who does it'],
  ['pain', 'What goes wrong'],
  ['example', 'Example they pasted'],
];

const MULTI: ReadonlySet<FieldName> = new Set(['tasks', 'tools', 'pain']);

/**
 * The two fields beyond name and email that the form marks `required`, so the
 * server enforces what the browser asks for rather than trusting it.
 *
 * They are required because the audit cannot be written without them: it names
 * a specific business and it answers a specific description of a week. A
 * request missing either is not a lead that can be replied to.
 *
 * Rejecting has a real cost: a bounced submission is a lost lead. So this list
 * tracks the `required` attributes in IntakeForm.astro exactly. Adding a field
 * here that the form marks optional turns a complete-looking submission into a
 * silent rejection.
 */
const REQUIRED: ReadonlyArray<FieldName> = ['business', 'timesink'];

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

/** One field, whether it arrived once or as a checkbox group. */
const read = (form: FormData, field: FieldName) =>
  MULTI.has(field)
    ? form.getAll(field).map((v) => clean(v, LIMITS[field])).filter(Boolean).join(', ').slice(0, LIMITS[field])
    : clean(form.get(field), LIMITS[field]);

/**
 * The step-two reference. Step one mints it and puts it in the /thanks URL;
 * step two posts it back so its email can carry the same business in the
 * subject and the visitor's address in reply_to. It is the email and the
 * business, base64url-encoded, and nothing more: not a session, not a secret,
 * not a lookup key, because there is no store to look anything up in. A forged
 * one can do exactly what the public form can already do, which is send the
 * owner one email. The encoding is only so the address is not sitting in the
 * URL in plain text for anyone reading over a shoulder.
 */
const mintRef = (email: string, business: string) =>
  Buffer.from(JSON.stringify({ e: email, b: business }), 'utf8').toString('base64url');
const readRef = (ref: string): { email: string; business: string } | null => {
  try {
    const o = JSON.parse(Buffer.from(ref, 'base64url').toString('utf8'));
    const email = clean(o?.e ?? null, LIMITS.email);
    const business = clean(o?.b ?? null, LIMITS.business);
    return looksLikeEmail(email) && business ? { email, business } : null;
  } catch {
    return null;
  }
};

/** Long answers get their own block; short ones stay on one line, so the
 *  notification is skimmable on a phone. */
const pushLines = (lines: string[], label: string, value: string) => {
  if (!value) return;
  if (value.includes('\n') || value.length > 80) lines.push('', `${label}:`, value);
  else lines.push(`${label}: ${value}`);
};

// Deliberately loose. Real validation is whether the reply bounces.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const seeOther = (location: string) =>
  new Response(null, { status: 303, headers: { Location: location } });

/**
 * One Resend call. Returns whether it landed rather than throwing, so the two
 * sends below can have different failure policies without duplicating the
 * fetch. `tag` is what shows up in the logs — both sends are logged either
 * way, because "the lead arrived but the confirmation did not" is a state the
 * owner has to be able to see.
 */
async function send(
  payload: Record<string, unknown>,
  tag: string,
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`[contact] ${tag}: Resend rejected the send`, res.status, await res.text());
      return false;
    }
    console.log(`[contact] ${tag}: sent`);
    return true;
  } catch (err) {
    console.error(`[contact] ${tag}: could not reach Resend`, err);
    return false;
  }
}

/**
 * The visitor's confirmation.
 *
 * Copy follows frame 2d of the design, minus its "Read your audit" button:
 * 2d is the *delivery* email and is sent by hand later, when a report exists.
 * At submit time there is nothing to link to, so this one does the three jobs
 * the brief asks of it — confirms the request arrived, sets the one business
 * day expectation, and offers the call.
 *
 * NO EM DASHES, first person, plain. Same rule as everything a visitor
 * reads on the site.
 *
 * Hex is hardcoded here and cannot be otherwise: email clients do not
 * resolve CSS custom properties, and many strip <style> blocks entirely, so
 * every rule is inline. These four values must be kept in step with
 * global.css by hand. scripts/build-og.py carries the same caveat for the same
 * reason.
 */
function autoReply(firstName: string, business: string) {
  const paras = [
    `Thanks for sending that over. I have your request and I am reading through it now.`,
    `Within one business day I will send back a short written reply, with a video walking through the two things I would automate first for ${business}, what I would build instead, and roughly what each would take. There will also be one thing I would leave alone for now.`,
    `Nothing to do in the meantime. If you would rather talk it through before then, you can book twenty minutes here:`,
  ];

  const text = [
    `${firstName},`,
    '',
    paras[0],
    '',
    paras[1],
    '',
    paras[2],
    calHref,
    '',
    'Either way, just reply to this email if anything changes.',
    '',
    'Shauna',
    `Thread · ${contact.location}`,
    `${contact.email} · threadhawaii.com`,
  ].join('\n');

  /* Narrow, left aligned, one column, no banner and no images: it should read
     as a personal email that happens to be well set, which is what the design
     prompt asked for. A system font stack, because the site's self-hosted
     faces cannot be loaded in an email client. */
  const p = 'margin:0 0 16px; font-size:16px; line-height:1.6; color:#3B423D;';
  const html = `<div style="max-width:600px; margin:0; padding:8px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; text-align:left;">
<p style="${p}">${firstName},</p>
<p style="${p}">${paras[0]}</p>
<p style="${p}">${paras[1]}</p>
<p style="${p}">${paras[2]}</p>
<p style="${p}"><a href="${calHref}" style="color:#253F99;">Book a 20-minute call</a></p>
<p style="${p}">Either way, just reply to this email if anything changes.</p>
<p style="margin:24px 0 0; font-size:16px; line-height:1.6; color:#171A18;">Shauna</p>
<p style="margin:0; font-size:14px; line-height:1.6; color:#767C76;">Thread &middot; ${contact.location}<br>${contact.email} &middot; threadhawaii.com</p>
</div>`;

  return { text, html };
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return seeOther('/thanks?status=error');
  }

  // Honeypot. Real people never see this field, so anything in it is a bot.
  // Answer as though it succeeded — telling a bot it failed just invites a retry.
  //
  // `contact_fax`, and it should not share a name with a real field.
  //  It was `company_website` until 14 Aug 2026, when the copy
  // began asking visitors for their company website as a genuine question;
  // had both kept that name, every real submission would have tripped this
  // check, been dropped without an email, and still shown the sender a success
  // page. The `website` field was removed entirely on 1 Sep 2026, so that
  // particular collision is gone twice over — the rule stands regardless, and
  // if this name ever changes it changes in IntakeForm.astro in the same
  // commit.
  if (clean(form.get('contact_fax'), 100)) {
    return seeOther('/thanks');
  }

  /**
   * STEP TWO, 13 Sep 2026. The optional follow-up from /thanks. It has no
   * name or email fields of its own; both come from `ref`. Everything else is
   * optional and an all-empty post is accepted and ignored rather than bounced,
   * because the visitor has already done the thing that mattered.
   *
   * One email to the owner, no auto-reply (they already have one), same
   * subject prefix as step one so mail clients thread the two together.
   * Failure sends the visitor to a step-two error state that says the
   * original request is safe, which it is.
   */
  if (clean(form.get('step'), 4) === '2') {
    const who = readRef(clean(form.get('ref'), 2000));
    if (!who) return seeOther('/thanks?kind=audit&step=2&status=error');

    const lines = [`From: ${who.email}`, `Business: ${who.business}`, ''];
    let any = false;
    for (const [field, label] of STEP2_FIELDS) {
      const value = read(form, field);
      if (value) any = true;
      pushLines(lines, label, value);
    }
    if (!any) return seeOther('/thanks?kind=audit&step=2');

    if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
      console.error('[contact] step 2: missing env');
      return seeOther('/thanks?kind=audit&step=2&status=error');
    }
    const sent = await send(
      {
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: who.email,
        subject: `Audit request · ${who.business} · more detail`,
        text: lines.join('\n'),
      },
      'step 2 notification',
    );
    return seeOther(sent ? '/thanks?kind=audit&step=2' : '/thanks?kind=audit&step=2&status=error');
  }

  const name = clean(form.get('name'), LIMITS.name);
  const email = clean(form.get('email'), LIMITS.email);

  if (!name || !looksLikeEmail(email)) {
    return seeOther('/thanks?status=invalid');
  }

  // Mirrors the form's `required` attributes. See REQUIRED above.
  const values = new Map<FieldName, string>();
  for (const [field] of FIELDS) {
    values.set(field, read(form, field));
  }
  if (REQUIRED.some((field) => !values.get(field))) {
    return seeOther('/thanks?status=invalid');
  }

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    // Missing configuration is our fault, not the visitor's. Make it loud in
    // the logs and honest on screen rather than silently dropping a lead.
    console.error(
      '[contact] Missing env. Set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM in Vercel.',
      {
        RESEND_API_KEY: Boolean(RESEND_API_KEY),
        CONTACT_TO: Boolean(CONTACT_TO),
        CONTACT_FROM: Boolean(CONTACT_FROM),
      },
    );
    return seeOther('/thanks?status=error');
  }

  const lines = [`Name: ${name}`, `Email: ${email}`];
  for (const [field, label] of FIELDS) {
    pushLines(lines, label, values.get(field) ?? '');
  }

  const business = values.get('business') || name;

  /**
   * ORDER IS LOAD-BEARING, AND SO ARE THE TWO DIFFERENT FAILURE POLICIES.
   *
   * The owner notification goes first and its failure fails the request: a
   * lead that never reaches the owner is lost outright, and the visitor should
   * be told rather than shown a success page.
   *
   * The auto-reply goes second and its failure changes nothing. A lead that
   * reaches the owner without a confirmation email is recoverable by hand;
   * telling the visitor their request failed when it is sitting in the owner's
   * inbox is not, because they will either give up or send it twice.
   */
  const ownerSent = await send(
    {
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      /**
       * The business, not the person, because the owner triages these by
       * business and writes an audit per business. Falls back to the name:
       * `business` is required by both the form and REQUIRED above, so an
       * empty one should be impossible, but a subject line reading
       * "Audit request · " would be a silent tell that something upstream
       * broke, and this is not the place to find that out.
       */
      subject: `Audit request · ${business}`,
      text: lines.join('\n'),
    },
    'owner notification',
  );

  if (!ownerSent) {
    return seeOther('/thanks?status=error');
  }

  /**
   * The visitor's confirmation. Best effort by design: `send` swallows its own
   * failures and logs them, and nothing below branches on the result.
   *
   * `reply_to` is the owner, not the sender: a reply to this should reach
   * Shauna, and CONTACT_FROM may be a no-reply address.
   *
   * The greeting takes the first whitespace-delimited token of the name, which
   * is what the design's email does ("Dane,"). It gets "Dr." wrong for
   * "Dr. Jane Smith"; using the full name instead reads stiffer in every other
   * case, so this is the better trade rather than an oversight.
   *
   * This sends one fixed message to whatever address was typed in, so the
   * form can be used to mail a stranger exactly once, with copy the sender
   * cannot control. That is not an open relay and it is the normal cost of a
   * confirmation email, but it is the reason this must stay a fixed template
   * with no visitor-supplied content in the subject or body.
   */
  const firstName = name.split(/\s+/)[0] || name;
  const reply = autoReply(firstName, business);
  await send(
    {
      from: CONTACT_FROM,
      to: [email],
      reply_to: CONTACT_TO,
      subject: `Your automation audit is on the way, ${business}`,
      text: reply.text,
      html: reply.html,
    },
    'auto-reply',
  );

  /* `kind=audit`, which selects the audit confirmation on /thanks. The bare
     /thanks success state still exists for anything that lands there without
     the parameter. See the note over `isAudit` in thanks.astro.

     `r` is the step-two reference (see mintRef). /thanks draws the optional
     follow-up form only when it is present, so a visitor who lands on the
     audit confirmation some other way is not shown a form that cannot post. */
  return seeOther(`/thanks?kind=audit&r=${mintRef(email, business)}`);
};

/** A GET here means someone opened the URL directly. Send them home. */
export const GET: APIRoute = () => seeOther('/#contact');
