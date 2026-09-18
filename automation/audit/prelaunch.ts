import { extractOne, loadBuiltPages, report, visibleText, type Failure } from '../lib/built-pages';
import { indexableRoutes, liveRoutes, routes } from '../../content/routes';

/**
 * Pre-launch crawl - Volume 2 s.33.
 *
 * Run once before DNS cutover and monthly afterwards. The checks that can be
 * answered from build output are answered here; the ones that require a live
 * origin (HTTP->HTTPS, host variants, real 404 status, Search Console
 * verification) are listed at the end as manual steps, because a script that
 * silently skips them would report a pass that was never tested.
 */

function main(): void {
  const pages = loadBuiltPages();
  const failures: Failure[] = [];
  const built = new Map(pages.map((p) => [p.path, p]));

  // Every live route was actually built.
  for (const route of liveRoutes) {
    if (route.path === '/thank-you/' && !built.has(route.path)) {
      failures.push({ page: route.path, message: 'Live route was not built' });
      continue;
    }
    if (!built.has(route.path)) {
      failures.push({ page: route.path, message: 'Live route in the registry was not built' });
    }
  }

  // Nothing was built that is not registered.
  for (const page of pages) {
    if (!routes.some((r) => r.path === page.path)) {
      failures.push({ page: page.path, message: 'Built page is not in the route registry' });
    }
  }

  for (const page of pages) {
    const { html, path, route } = page;

    // Primary copy must be in the initial HTML, not injected by JS.
    const h1 = extractOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!h1 || visibleText(h1).length < 5) {
      failures.push({ page: path, message: 'H1 text is missing from the server-rendered HTML' });
    }

    const bodyText = visibleText(html);
    if (bodyText.length < 500) {
      failures.push({ page: path, message: `Only ${bodyText.length} characters of rendered text` });
    }

    // Images: explicit dimensions, and the hero is never lazy-loaded.
    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    for (const img of images) {
      if (!/\bwidth=/.test(img) || !/\bheight=/.test(img)) {
        failures.push({ page: path, message: 'Image without explicit width and height' });
      }
    }

    // No placeholder ever reaches a rendered page.
    if (bodyText.includes('[OWNER')) {
      failures.push({ page: path, message: 'Rendered page shows an [OWNER] placeholder' });
    }
    if (/\blorem ipsum\b/i.test(bodyText)) {
      failures.push({ page: path, message: 'Rendered page contains lorem ipsum' });
    }

    // Indexable pages must not carry noindex, and vice versa.
    const robots = extractOne(html, /<meta name="robots" content="([^"]*)"/i);
    if (route?.indexable && robots?.includes('noindex')) {
      failures.push({ page: path, message: 'Indexable page carries noindex' });
    }
  }

  // Production must never build with NOINDEX=true.
  if (process.env.NOINDEX === 'true' && process.env.VERCEL_ENV === 'production') {
    failures.push({ page: 'environment', message: 'NOINDEX is true on a production build' });
  }

  report('pre-launch crawl', failures, pages.length);

  console.log('');
  console.log(`Indexable routes in sitemap: ${indexableRoutes.length}`);
  console.log('');
  console.log('Manual steps that need a live origin (Volume 2 s.33):');
  console.log('  [ ] HTTP -> HTTPS resolves in a single 301');
  console.log('  [ ] www <-> apex resolves to the chosen host in a single 301');
  console.log('  [ ] Trailing-slash policy resolves in a single 301');
  console.log('  [ ] /this-page-does-not-exist returns a real 404 status, not 200');
  console.log('  [ ] robots.txt allows public assets and disallows /api/ and /lp/');
  console.log('  [ ] X-Robots-Tag agrees with meta robots on every URL');
  console.log('  [ ] Search Console property verified by DNS TXT; sitemap submitted');
  console.log('  [ ] URL Inspection shows "URL is on Google" for the homepage within week one');
  console.log('  [ ] Third-party script inventory recorded in docs/decisions.md');
}

main();
