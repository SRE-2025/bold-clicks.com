import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/**
 * robots.txt - Volume 1 s.08, Volume 2 s.33.
 *
 * Staging blocks everything. Production allows crawling of all public assets
 * and disallows only /api/ and the paid-variant directory. Note that
 * /thank-you/ is *not* disallowed here: it carries a noindex meta tag, and
 * blocking it in robots.txt would stop Google seeing that tag at all.
 */
export default function robots(): MetadataRoute.Robots {
  const noindex = process.env.NOINDEX === 'true';

  if (noindex) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/lp/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  };
}
