import { extractAll, loadBuiltPages, report, type Failure } from '../lib/built-pages';
import { routes } from '../../content/routes';

/**
 * Internal link check - Volume 2 s.24, s.33.
 *
 * Zero internal 4xx/5xx is the passing condition. Rather than crawling a
 * running server, this resolves every internal href against the route registry,
 * which catches the same class of failure at build time and catches orphans
 * too: a live indexable route nothing links to.
 *
 * External links are checked weekly by the automation job, not per PR.
 */

const livePaths = new Set(routes.filter((r) => r.live).map((r) => r.path));

/** Routes reachable only from a form submission, so never linked. */
const EXPECTED_UNLINKED = new Set(['/thank-you/']);

function normalise(href: string): string | null {
  if (!href || href.startsWith('#')) return null;
  if (/^(https?:|mailto:|tel:)/i.test(href)) return null;
  const path = href.split(/[?#]/)[0] ?? '';
  if (!path.startsWith('/')) return null;
  return path.endsWith('/') ? path : `${path}/`;
}

function main(): void {
  const pages = loadBuiltPages();
  const failures: Failure[] = [];
  const linkedTo = new Set<string>();

  for (const page of pages) {
    const hrefs = extractAll(page.html, /<a\b[^>]*\bhref="([^"]*)"/gi);

    for (const href of hrefs) {
      const path = normalise(href);
      if (!path) continue;

      linkedTo.add(path);

      if (!livePaths.has(path)) {
        failures.push({ page: page.path, message: `Link to a route that is not live: ${path}` });
      }
    }
  }

  // Orphan check: every live indexable route needs at least one crawlable link.
  for (const route of routes) {
    if (!route.live || !route.indexable) continue;
    if (route.path === '/') continue;
    if (EXPECTED_UNLINKED.has(route.path)) continue;
    if (!linkedTo.has(route.path)) {
      failures.push({ page: route.path, message: 'Orphan: no internal link points to this route' });
    }
  }

  report('internal link check', failures, pages.length);
}

main();
