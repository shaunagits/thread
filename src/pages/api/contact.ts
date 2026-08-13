import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';

export const prerender = false;

/** Field caps. Anything longer is a bot or a paste accident, not a lead. */
const LIMITS = { name: 200, email: 320, business: 500, stack: 5000 } as const;

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
  if (clean(form.get('company_website'), 100)) {
    return seeOther('/thanks');
  }

  const name = clean(form.get('name'), LIMITS.name);
  const email = clean(form.get('email'), LIMITS.email);
  const business = clean(form.get('business'), LIMITS.business);
  const stack = clean(form.get('stack'), LIMITS.stack);

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

  const lines = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Business: ${business || 'not given'}`,
    '',
    'Software they are running:',
    stack || 'not given',
  ].join('\n');

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
        subject: `Systems map request · ${name}`,
        text: lines,
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
