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
      '# The social-card generator page is not content.',
      'Disallow: /og',
      '',
      `Sitemap: ${sitemap}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
