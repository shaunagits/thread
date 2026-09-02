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
      '# The previous homepage. It was / until 1 Sep 2026, when the owner',
      '# swapped in the wireframe design; it is kept live for reference, not',
      '# because anything links to it. Two near-identical homepages competing',
      '# in the index is the duplicate-content problem this rule avoids.',
      '# Remove this, the noindex prop in v1.astro and the sitemap filter in',
      '# astro.config.mjs together if the page is ever deleted outright.',
      'Disallow: /v1',
      '',
      `Sitemap: ${sitemap}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
