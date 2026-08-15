import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';

export const prerender = false;

/** Field caps. Anything longer is a bot or a paste accident, not a lead. */
const LIMITS = {
  name: 200, email: 320, website: 500, business: 500,
  tools: 5000, timesink: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

/**
 * What the form sends, in the order it should appear in the email. Must match
 * the fields rendered by IntakeForm.astro — a field added there and not here
 * is collected and silently dropped. See CLAUDE.md landmine 14.
 *
 * There were two forms until 14 Aug 2026, switched on a `kind` parameter. The
 * owner killed the systems map offer and /systems-map is gone, so there is one
 * form and one shape.
 */
const FIELDS: ReadonlyArray<[FieldName, string]> = [
  ['website', 'Company website'],
  ['business', 'What the business does'],
  ['tools', 'Software they run'],
  ['timesink', 'What eats the most time'],
];

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

// Deliberately loose. Real validation is whether the reply bounces.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const seeOther = (location: string) =>
  new Response(null, { status: 303, headers: { Location: location } });

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
  // ⚠️ `contact_fax`, not `company_website`. The form now asks real visitors
  // for their company website, so checking that name here would drop every
  // genuine submission while still showing the sender a success page. If this
  // name ever changes it must change in IntakeForm.astro in the same commit.
  if (clean(form.get('contact_fax'), 100)) {
    return seeOther('/thanks');
  }

  const name = clean(form.get('name'), LIMITS.name);
  const email = clean(form.get('email'), LIMITS.email);

  if (!name || !looksLikeEmail(email)) {
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

  // Long answers get their own block; short ones stay on one line, so the
  // notification is skimmable on a phone.
  const lines = [`Name: ${name}`, `Email: ${email}`];
  for (const [field, label] of FIELDS) {
    const value = clean(form.get(field), LIMITS[field]);
    if (!value) continue;
    if (value.includes('\n') || value.length > 80) {
      lines.push('', `${label}:`, value);
    } else {
      lines.push(`${label}: ${value}`);
    }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Enquiry · ${name}`,
        text: lines.join('\n'),
      }),
    });

    if (!res.ok) {
      console.error('[contact] Resend rejected the send', res.status, await res.text());
      return seeOther('/thanks?status=error');
    }
  } catch (err) {
    console.error('[contact] Could not reach Resend', err);
    return seeOther('/thanks?status=error');
  }

  return seeOther('/thanks');
};

/** A GET here means someone opened the URL directly. Send them home. */
export const GET: APIRoute = () => seeOther('/#contact');
