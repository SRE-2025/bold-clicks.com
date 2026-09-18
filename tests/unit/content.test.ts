import { describe, expect, it } from 'vitest';
import { industries, publishableIndustries } from '@/content/industries';
import { locations } from '@/content/locations';
import { routes, breadcrumbTrail, indexableRoutes, liveRoutes } from '@/content/routes';
import { services } from '@/content/services';
import { pageMeta } from '@/content/seo';
import { isPriorityLead, NEED_VALUES, SPEND_VALUES } from '@/lib/lead-options';

/**
 * Unit tests for the invariants the route registry and content layer rely on.
 * These are the assumptions the audits, sitemap and breadcrumbs are built on;
 * if one breaks, the failure should be here rather than three layers away.
 */

describe('route registry', () => {
  it('has no duplicate paths', () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('uses a trailing slash on every path', () => {
    for (const route of routes) {
      expect(route.path.endsWith('/'), `${route.path} has no trailing slash`).toBe(true);
    }
  });

  it('points every parent at a route that exists and is live', () => {
    for (const route of routes) {
      if (!route.parent) continue;
      const parent = routes.find((r) => r.path === route.parent);
      expect(parent, `${route.path} has parent ${route.parent}, which is not registered`).toBeDefined();
      expect(parent?.live, `${route.path} has a parent that is not live`).toBe(true);
    }
  });

  it('excludes non-indexable routes from the sitemap', () => {
    expect(indexableRoutes.some((r) => r.path === '/thank-you/')).toBe(false);
    expect(indexableRoutes.every((r) => r.indexable && r.live)).toBe(true);
  });

  it('builds a breadcrumb trail that terminates at the homepage', () => {
    const trail = breadcrumbTrail('/google-ads-management/');
    expect(trail.map((r) => r.path)).toEqual(['/', '/services/']);
  });

  it('gives the homepage no breadcrumb trail', () => {
    expect(breadcrumbTrail('/')).toEqual([]);
  });
});

describe('content and registry agree', () => {
  it('registers every service route', () => {
    for (const service of services) {
      const route = routes.find((r) => r.path === service.route);
      expect(route, `${service.route} is not in the route registry`).toBeDefined();
      expect(route?.live).toBe(true);
    }
  });

  it('registers every publishable industry route and no unpublishable one', () => {
    for (const industry of industries) {
      const route = routes.find((r) => r.path === industry.route);
      if (industry.publishable) {
        expect(route, `${industry.route} is publishable but unregistered`).toBeDefined();
      } else {
        expect(route, `${industry.route} is unpublishable but registered`).toBeUndefined();
      }
    }
  });

  it('gives every live route either its own metadata or a registry entry', () => {
    for (const route of liveRoutes) {
      const hasOwn =
        services.some((s) => s.route === route.path) || industries.some((i) => i.route === route.path);
      expect(hasOwn || Boolean(pageMeta[route.path]), `${route.path} has no metadata`).toBe(true);
    }
  });

  it('keeps every relatedRoute pointing at a live route', () => {
    const live = new Set(liveRoutes.map((r) => r.path));
    for (const service of services) {
      for (const path of service.relatedRoutes) {
        expect(live.has(path), `${service.slug} links to ${path}, which is not live`).toBe(true);
      }
    }
    for (const industry of publishableIndustries) {
      for (const path of industry.relatedRoutes) {
        expect(live.has(path), `${industry.slug} links to ${path}, which is not live`).toBe(true);
      }
    }
  });
});

describe('no-fabrication invariants', () => {
  it('leaves every FAQ containing an [OWNER] marker flagged as needing input', () => {
    const allFaqs = [
      ...services.flatMap((s) => s.faqs),
      ...industries.flatMap((i) => i.faqs),
      ...locations.flatMap((l) => l.localFaqs),
    ];
    for (const faq of allFaqs) {
      if (faq.answer.includes('[OWNER')) {
        expect(faq.needsOwnerInput, `"${faq.question}" has a placeholder but is not flagged`).toBe(true);
      }
    }
  });

  it('keeps proofRefs empty while content/proof.json is empty', () => {
    for (const service of services) expect(service.proofRefs).toEqual([]);
    for (const industry of industries) expect(industry.proofRefs).toEqual([]);
  });
});

describe('lead routing', () => {
  it('flags high spend bands as priority', () => {
    expect(isPriorityLead('15k_50k', 'other')).toBe(true);
    expect(isPriorityLead('50k_plus', 'other')).toBe(true);
  });

  it('flags legal and med spa as priority regardless of spend', () => {
    expect(isPriorityLead('under_2k', 'legal')).toBe(true);
    expect(isPriorityLead('', 'med_spa')).toBe(true);
  });

  it('does not flag an ordinary lead', () => {
    expect(isPriorityLead('2k_5k', 'home_services')).toBe(false);
    expect(isPriorityLead('', '')).toBe(false);
  });

  it('keeps option values stable, since they are mapped to CRM fields', () => {
    expect(NEED_VALUES).toContain('google_ads');
    expect(NEED_VALUES).toContain('not_sure');
    expect(SPEND_VALUES).toContain('5k_15k');
  });
});
