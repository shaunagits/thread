// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE = 'https://threadhawaii.com';

export default defineConfig({
  site: SITE,

  // Static by default — the homepage is prerendered and ships no JS. Only the
  // contact endpoint and its result page opt into server rendering, via
  // `export const prerender = false`.
  output: 'static',
  adapter: vercel(),

  // Secrets are read at request time, never inlined into the build. All three
  // are optional so the site still builds and previews without them; the
  // endpoint fails loudly and safely if they are missing in production.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  integrations: [
    sitemap({
      // Neither the social-card generator nor the form result page is content.
      // /work is a noindex placeholder and robots.txt disallows it — listing it
      // here would advertise a URL crawlers are told not to fetch. Drop this
      // clause in the same commit that removes the noindex and the Disallow.
      //
      // /v1 is the PREVIOUS homepage, kept live for reference after the swap
      // on 1 Sep 2026. Same three-part gate as /work: the noindex prop in
      // v1.astro, the robots.txt Disallow, and this line. All three go
      // together if the page is ever deleted.
      filter: (page) =>
        !page.includes('/og') &&
        !page.includes('/thanks') &&
        !page.includes('/work') &&
        !page.includes('/v1'),
    }),
  ],

  // Honour PORT so the dev server can be assigned a free port instead of
  // colliding on Astro's default 4321.
  server: { port: Number(process.env.PORT) || 4321 },

  vite: {
    plugins: [tailwindcss()],
  },
});
