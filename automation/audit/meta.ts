import { extractAll, extractOne, loadBuiltPages, report, type Failure } from '../lib/built-pages';

/**
 * Metadata audit - Volume 2 s.26 and s.33.
 *
 * Runs on built HTML. Blocks the PR on: a duplicate or out-of-range title or
 * description, a missing or multiple H1, a missing canonical or Open Graph tag
 * on an indexable page, a missing noindex on a non-indexable one, or a built
 * page that is not in the route registry.
 */

const TITLE_MIN = 45;
const TITLE_MAX = 65;
const DESC_MIN = 120;
const DESC_MAX = 160;

function main(): void {
  const pages = loadBuiltPages();
  const failures: Failure[] = [];

  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();

  for (const page of pages) {
    const { path, html, route } = page;

    if (!route) {
      failures.push({ page: path, message: 'Built page is not registered in content/routes.ts' });
      continue;
    }

    const title = extractOne(html, /<title[^>]*>([^<]*)<\/title>/i);
    const description = extractOne(html, /<meta name="description" content="([^"]*)"/i);
    const canonical = extractOne(html, /<link rel="canonical" href="([^"]*)"/i);
    const robots = extractOne(html, /<meta name="robots" content="([^"]*)"/i);
    const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    const ogTitle = extractOne(html, /property="og:title" content="([^"]*)"/i);
    const ogDescription = extractOne(html, /property="og:description" content="([^"]*)"/i);

    // --- Title
    if (!title) {
      failures.push({ page: path, message: 'Missing <title>' });
    } else {
      titles.set(title, [...(titles.get(title) ?? []), path]);
      if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
        failures.push({
          page: path,
          message: `Title is ${title.length} chars, expected ${TITLE_MIN}-${TITLE_MAX}: "${title}"`,
        });
      }
    }

    // --- Description
    if (!description) {
      failures.push({ page: path, message: 'Missing meta description' });
    } else {
      descriptions.set(description, [...(descriptions.get(description) ?? []), path]);
      if (description.length < DESC_MIN || description.length > DESC_MAX) {
        failures.push({
          page: path,
          message: `Description is ${description.length} chars, expected ${DESC_MIN}-${DESC_MAX}`,
        });
      }
    }

    // --- H1: exactly one, always.
    if (h1s.length === 0) failures.push({ page: path, message: 'No H1' });
    if (h1s.length > 1) failures.push({ page: path, message: `${h1s.length} H1 elements, expected 1` });

    // --- Canonical and social tags on indexable pages.
    if (route.indexable) {
      if (!canonical) failures.push({ page: path, message: 'Missing canonical link' });
      if (canonical && !canonical.endsWith(path)) {
        failures.push({ page: path, message: `Canonical points elsewhere: ${canonical}` });
      }
      if (!ogTitle) failures.push({ page: path, message: 'Missing og:title' });
      if (!ogDescription) failures.push({ page: path, message: 'Missing og:description' });
      if (robots?.includes('noindex')) {
        failures.push({ page: path, message: 'Indexable route carries a noindex directive' });
      }
    } else if (!robots?.includes('noindex')) {
      // A thank-you or paid-variant page that forgets noindex is how thin pages
      // reach the index; this is the check that stops it.
      failures.push({ page: path, message: 'Non-indexable route is missing its noindex directive' });
    }
  }

  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      failures.push({ page: paths.join(', '), message: `Duplicate title: "${title}"` });
    }
  }
  for (const [, paths] of descriptions) {
    if (paths.length > 1) {
      failures.push({ page: paths.join(', '), message: 'Duplicate meta description' });
    }
  }

  report('metadata audit', failures, pages.length);
}

main();
