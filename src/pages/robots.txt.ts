import type { APIRoute } from 'astro';

/**
 * Generated rather than kept in public/ so the sitemap URL derives from `site`
 * in astro.config.mjs. One place to change the domain, not two.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# The social-card generator page is not content. The rule was a bare',
      '# `Disallow: /og` until 19 Aug 2026, which prefix-matched /og.png as',
      '# well and blocked the social card image itself from crawlers that',
      '# honour robots.txt for card fetches. `$` anchors the bare path (Google,',
      '# Bing); the trailing-slash form covers the same page for parsers that',
      '# ignore `$`. /og.png matches neither.',
      'Disallow: /og$',
      'Disallow: /og/',
      '',
      '# Placeholder until there is real work on it. Remove with the noindex',
      '# prop in work.astro when the page ships.',
      'Disallow: /work',
      '',
      `Sitemap: ${sitemap}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
