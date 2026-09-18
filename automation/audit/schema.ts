import { extractAll, loadBuiltPages, report, visibleText, type Failure } from '../lib/built-pages';

/**
 * Structured data audit - Volume 2 s.24, s.33 and appendix B.
 *
 * Validates every JSON-LD block that is actually emitted: parseable, typed,
 * with the required properties per type, and - the rule that matters most -
 * only marking up information that is visible and true (Volume 1 s.09).
 *
 * Also fails on FAQPage markup. Volume 1 is explicit that FAQ rich results are
 * limited to authoritative government and health sites, so shipping it here
 * promises a result that will not arrive.
 */

interface Node {
  '@type'?: string;
  [key: string]: unknown;
}

const REQUIRED_BY_TYPE: Record<string, string[]> = {
  Organization: ['name', 'url'],
  ProfessionalService: ['name', 'url'],
  WebSite: ['name', 'url'],
  Service: ['name', 'provider'],
  WebPage: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
  Article: ['headline', 'author', 'datePublished'],
  BlogPosting: ['headline', 'author', 'datePublished'],
};

const BANNED_TYPES = ['FAQPage', 'AggregateRating', 'Review', 'Offer'];

function main(): void {
  const pages = loadBuiltPages();
  const failures: Failure[] = [];
  let blocks = 0;

  for (const page of pages) {
    const raw = extractAll(
      page.html,
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    );
    const text = visibleText(page.html).toLowerCase();

    for (const json of raw) {
      blocks += 1;
      let node: Node;

      try {
        node = JSON.parse(json) as Node;
      } catch {
        failures.push({ page: page.path, message: 'JSON-LD block is not valid JSON' });
        continue;
      }

      const type = node['@type'];
      if (typeof type !== 'string') {
        failures.push({ page: page.path, message: 'JSON-LD block has no @type' });
        continue;
      }

      if (BANNED_TYPES.includes(type)) {
        failures.push({
          page: page.path,
          message: `${type} markup is not permitted (Volume 1 s.09 / Volume 2 appendix B)`,
        });
        continue;
      }

      const required = REQUIRED_BY_TYPE[type];
      if (!required) {
        failures.push({ page: page.path, message: `Unrecognised JSON-LD type "${type}"` });
        continue;
      }

      for (const key of required) {
        if (node[key] === undefined || node[key] === null || node[key] === '') {
          failures.push({ page: page.path, message: `${type} is missing required property "${key}"` });
        }
      }

      // Nothing marked up may still be an owner placeholder.
      if (json.includes('[OWNER')) {
        failures.push({ page: page.path, message: `${type} contains an [OWNER] placeholder` });
      }

      // BreadcrumbList must match what the visitor can see.
      if (type === 'BreadcrumbList' && Array.isArray(node.itemListElement)) {
        for (const item of node.itemListElement as { name?: string }[]) {
          if (item.name && !text.includes(item.name.toLowerCase())) {
            failures.push({
              page: page.path,
              message: `Breadcrumb "${item.name}" is in the markup but not visible on the page`,
            });
          }
        }
      }
    }
  }

  report(`structured data audit (${blocks} blocks)`, failures, pages.length);
}

main();
