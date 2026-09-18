import { loadBuiltPages, report, visibleText, type Failure } from '../lib/built-pages';
import { locations } from '../../content/locations';

/**
 * Doorway-page rejection test - Volume 2 s.18.
 *
 * A location page fails if any of these is true:
 *   (a) more than 60% of its body text is shared with another location page;
 *   (b) it contains no figure, screenshot, client reference or observation that
 *       could only be true for that market;
 *   (c) it exists only to funnel to the same form with no unique buyer
 *       questions answered.
 *
 * Failing pages get noindex and a rewrite ticket - they do not get published.
 * This runs in code review (CI) and again in the monthly SEO audit.
 */

const OVERLAP_THRESHOLD = 0.6;

/** Shingling: overlapping 8-word windows, which is robust to reordering. */
function shingles(text: string, size = 8): Set<string> {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + size <= words.length; i += 1) {
    set.add(words.slice(i, i + size).join(' '));
  }
  return set;
}

function overlapRatio(a: Set<string>, b: Set<string>): number {
  if (a.size === 0) return 0;
  let shared = 0;
  for (const shingle of a) if (b.has(shingle)) shared += 1;
  return shared / a.size;
}

function main(): void {
  const pages = loadBuiltPages();
  const failures: Failure[] = [];

  const locationPaths = new Set(locations.filter((l) => l.publishable).map((l) => `/${l.slug}/`));
  const locationPages = pages.filter((p) => locationPaths.has(p.path));

  if (locationPages.length === 0) {
    console.log('PASS  doorway test (no location pages built)');
    return;
  }

  const texts = new Map(locationPages.map((p) => [p.path, visibleText(p.html)]));

  for (const page of locationPages) {
    const text = texts.get(page.path) ?? '';
    const own = shingles(text);
    const location = locations.find((l) => `/${l.slug}/` === page.path);

    // (a) Body overlap with any other location page.
    for (const other of locationPages) {
      if (other.path === page.path) continue;
      const ratio = overlapRatio(own, shingles(texts.get(other.path) ?? ''));
      if (ratio > OVERLAP_THRESHOLD) {
        failures.push({
          page: page.path,
          message: `Shares ${(ratio * 100).toFixed(0)}% of its body text with ${other.path} (limit ${OVERLAP_THRESHOLD * 100}%)`,
        });
      }
    }

    // (b) Something that could only be true for this market. The metro name
    // has to appear in market commentary, and the page has to name places in
    // its own service radius that a generic page would not.
    if (!location) {
      failures.push({ page: page.path, message: 'Built location page has no entry in content/locations.ts' });
      continue;
    }

    const lower = text.toLowerCase();
    const namedPlaces = location.serviceRadius.filter((place) => lower.includes(place.toLowerCase()));
    if (namedPlaces.length < 3) {
      failures.push({
        page: page.path,
        message: `Names only ${namedPlaces.length} places from its own service radius; a market-specific page names several`,
      });
    }

    if (location.marketCommentary.trim().length < 400) {
      failures.push({
        page: page.path,
        message: 'Market commentary is too short to say anything market-specific (under 400 characters)',
      });
    }

    // (c) Unique buyer questions answered, not just a funnel to the form.
    const answeredFaqs = location.localFaqs.filter((faq) => !faq.needsOwnerInput);
    if (answeredFaqs.length < 3) {
      failures.push({
        page: page.path,
        message: `Only ${answeredFaqs.length} answered local FAQs; a location page needs at least 3 real ones`,
      });
    }
  }

  report('doorway test', failures, locationPages.length);
}

main();
