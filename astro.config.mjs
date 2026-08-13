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
      filter: (page) => !page.includes('/og') && !page.includes('/thanks'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
