# Google Business Profile — Thread

Everything needed to fill in the profile, in the order Google asks for it.
Drafted 17 Aug 2026 from the live site copy. Nothing here is invented: every
claim already appears on threadhawaii.com or is a term you confirmed.

---

## Business name

```
Thread
```

**Exactly that. Nothing after it.** Not "Thread — Custom Software Honolulu", not
"Thread | Hawaiʻi Software". Google's name guidelines require the name to match
your real-world branding, and keyword-stuffed names are the single most common
cause of suspension for small service businesses. The category field is where
"software" belongs, and it does the ranking work the name is tempting you to do.

---

## Category

**Primary:** `Software company`

The primary category is the strongest single ranking signal on the profile.
Everything else is secondary to getting this one right.

**Additional (add only what is true):**

- `Computer consultant`
- `Business management consultant`

Do not add `Website designer` unless you want website work. Categories shape
which searches you appear in, so an inaccurate one brings enquiries you will
decline.

---

## Business description

750 character limit. This draft is **683**, so there is room to adjust.

```
Thread builds custom software for small and medium businesses in Honolulu and across Hawaiʻi.

Most businesses run good tools that do not talk to each other, so someone ends up carrying numbers between screens by hand. I close those gaps, and build the software a business needs when no product fits.

Typical work: dashboards that pull accounting, point of sale and scheduling into one screen; automations that move data without anyone chasing it; and internal tools that replace the spreadsheet or group chat holding a process together.

Fixed scope and fixed price, agreed before work starts. You keep the source code, the documentation and the accounts it runs in.

Available across the islands and remotely.
```

Three rules this follows, all of them Google policy rather than style:

1. **No URLs.** Links in the description are against the guidelines. The website
   field is where the URL goes.
2. **No offers or prices.** "Free consultation", "20% off", "starting at" — all
   prohibited here. The fixed-scope line is a description of how you work, not a
   promotion, which is why it passes.
3. **No keyword stuffing.** "Honolulu" and "Hawaiʻi" appear once each, in
   sentences a person would actually say.

The first sentence carries the most weight, because some surfaces truncate the
description to roughly the first 250 characters. It is written to stand alone.

---

## Address and service area

You are a **service-area business**: no storefront, no walk-in trade.

- Enter your real address when asked. Google requires one.
- Then **hide it**. Answer "no" to "do you serve customers at your business
  address". This removes it from public view but keeps it for verification.
- Set the service area. Google allows up to 20, normally within about a
  two-hour drive.

Suggested areas, most specific first:

```
Honolulu, HI
Kailua, HI
Kāneʻohe, HI
ʻAiea, HI
Pearl City, HI
Waipahu, HI
Kapolei, HI
Mililani, HI
Hawaiʻi Kai, HI
Oʻahu, HI
```

A note on the neighbour islands: the drive-time rule makes them awkward to add,
and adding areas you cannot realistically serve weakens the profile rather than
extending it. Oʻahu plus the towns above is the honest version. Your site
already says you work remotely, which covers everyone else.

---

## Contact details

| Field | Value | Note |
|---|---|---|
| Website | `https://threadhawaii.com` | |
| Appointment link | your cal.com discovery link | This field exists and most profiles leave it empty. Use it. |
| Phone | **see below** | |

**On the phone number.** Google usually needs one, and it becomes public. Same
issue as the WhatsApp link you decided against: a number on a public profile is
scraped within days, and you will get spam calls from SEO resellers within a
week of verifying. Practically every new profile does.

Options, best first:

1. **A free Google Voice number.** Rings your mobile, separate number published,
   and you can silence it. Ten minutes to set up.
2. Your mobile, accepting the spam.
3. Leave it blank if Google lets you, though this can limit verification
   options and looks incomplete to a visitor.

---

## Hours

You are one person taking a few projects at a time, so avoid implying a
switchboard. Two honest options:

- Mark the profile **"Open by appointment"** if offered for your category, or
- Set weekday hours you would genuinely answer during, e.g. Mon–Fri 9:00–17:00,
  Sat/Sun closed.

Do not set hours you will not answer during. Google surfaces "open now" in the
map pack, and a call that rings out is worse than being shown as closed.

---

## Services

Add these individually. Each becomes a searchable entry, and this is the second
place after the category where you tell Google what you actually do.

- Custom software development
- Systems integration
- Business process automation
- Operations dashboards
- Internal business tools
- Software maintenance and support

Each takes an optional description. Reuse the site's language rather than
writing new claims.

---

## Photos

Profiles with photos get materially more engagement, and this is where a
one-person practice usually stalls. **No stock photography** — Google's
guidelines want real images of the real business, and visitors can tell.

What you can honestly use today:

- **Logo**, square, 720×720 or larger. The mark plus wordmark on the paper
  background.
- **Cover photo**, 1024×576. The hero graphic on its background works, or a
  clean shot of your desk setup.
- **A photo of you.** For a solo practice this is the highest-value image on the
  profile. People are hiring a person.
- **Two or three screens of real work**, once §05 of the site has any. Not
  before.

You have the logo and the graphics already; the site's `og.png` is close to the
right cover dimensions.

---

## Attributes

Worth checking, if offered for the category:

- Online appointments
- Onsite services
- Identifies as woman-owned

That last one is a real filter in Google Maps and a real differentiator in a
category that is overwhelmingly not. Only if you want it surfaced.

---

## Verification

For a service-area business this is usually **video verification**, not a
postcard. You record a short walkthrough on a call or upload a clip.

Have ready:

- Business documentation with the name on it: a registration, a business licence,
  an invoice, or a bank statement showing the business name
- Your workspace, with a computer showing the work
- Something branded if you have it
- The neighbourhood outside, to establish you operate where you say

Postcard verification takes up to 14 days plus five business days to review the
code once entered, so video is faster if it is offered.

---

## After it is live

Send me the profile URL and your LinkedIn URL and I will add both to the
`sameAs` array in the `ProfessionalService` schema in `src/layouts/Base.astro`.
That is the field that ties threadhawaii.com, the Google profile and the
LinkedIn page together as one entity rather than three unrelated results, and
it is currently the highest-value SEO item on the site. It is deliberately
empty until those URLs exist.

Two habits worth forming once the profile is up:

- **Ask every client for a review.** Reviews are the second-biggest local
  ranking factor after category, and a service business with three real reviews
  outranks one with none by a wide margin.
- **Post occasionally.** Google Posts are low effort and the profile is judged
  partly on freshness.
