/**
 * Canonical route registry - Volume 2 s.28 / Volume 1 s.14.
 *
 * sitemap.ts, robots.ts, canonical tags, breadcrumbs and the pre-launch crawl
 * all derive from this file. A page that is not registered here is not a page:
 * the metadata audit fails on any built route missing from the registry, and
 * the pre-launch crawl fails on any registered route that does not return 200.
 */

export type RouteSection = 'core' | 'services' | 'industries' | 'proof' | 'insights' | 'local' | 'company' | 'legal' | 'landing';

export interface RouteEntry {
  /** Canonical path, always with a trailing slash. */
  path: string;
  /** Human label used in breadcrumbs. */
  label: string;
  section: RouteSection;
  /** Parent path for BreadcrumbList generation. `null` for top-level. */
  parent: string | null;
  /** False keeps the route out of the sitemap and adds a noindex robots directive. */
  indexable: boolean;
  /**
   * Sitemap priority. Kept coarse on purpose - Google largely ignores it, and a
   * finely tuned ladder is false precision.
   */
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /**
   * Routes that only exist once the owner supplies proof or a tier unlocks.
   * `false` means the route is defined but not built or linked yet.
   */
  live: boolean;
}

export const routes: readonly RouteEntry[] = [
  // --- Core
  { path: '/', label: 'Home', section: 'core', parent: null, indexable: true, priority: 1.0, changeFrequency: 'weekly', live: true },

  // --- Services
  { path: '/services/', label: 'Services', section: 'services', parent: '/', indexable: true, priority: 0.9, changeFrequency: 'monthly', live: true },
  { path: '/google-ads-management/', label: 'Google Ads Management', section: 'services', parent: '/services/', indexable: true, priority: 0.9, changeFrequency: 'monthly', live: true },
  { path: '/meta-ads-management/', label: 'Meta Ads Management', section: 'services', parent: '/services/', indexable: true, priority: 0.9, changeFrequency: 'monthly', live: true },
  { path: '/microsoft-ads-management/', label: 'Microsoft Ads Management', section: 'services', parent: '/services/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/youtube-ads-management/', label: 'YouTube Ads Management', section: 'services', parent: '/services/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/conversion-tracking/', label: 'Conversion Tracking', section: 'services', parent: '/services/', indexable: true, priority: 0.9, changeFrequency: 'monthly', live: true },

  // --- Industries. Only publishable verticals are live (Volume 1 s.06).
  { path: '/industries/', label: 'Industries', section: 'industries', parent: '/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/industries/home-services/', label: 'Home Services', section: 'industries', parent: '/industries/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/industries/legal/', label: 'Legal', section: 'industries', parent: '/industries/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/industries/med-spa/', label: 'Med Spa', section: 'industries', parent: '/industries/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/industries/dental/', label: 'Dental', section: 'industries', parent: '/industries/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  // Not live: orthodontics, podiatry, ent-sinus, primary-care. They publish when
  // the owner confirms real expertise and first-hand material (docs/owner-inputs.md).

  // --- Proof and content hubs
  { path: '/case-studies/', label: 'Case Studies', section: 'proof', parent: '/', indexable: true, priority: 0.8, changeFrequency: 'monthly', live: true },
  { path: '/insights/', label: 'Insights', section: 'insights', parent: '/', indexable: true, priority: 0.7, changeFrequency: 'weekly', live: true },

  // --- Local. Tier 1 only; /texas-ppc-agency/ and metro pages unlock per Volume 2 s.00.
  { path: '/austin-ppc-agency/', label: 'Austin PPC Agency', section: 'local', parent: '/', indexable: true, priority: 0.9, changeFrequency: 'monthly', live: true },

  // --- Company
  { path: '/about/', label: 'About', section: 'company', parent: '/', indexable: true, priority: 0.7, changeFrequency: 'monthly', live: true },
  { path: '/contact/', label: 'Contact', section: 'company', parent: '/', indexable: true, priority: 0.7, changeFrequency: 'yearly', live: true },

  // --- Legal
  { path: '/privacy/', label: 'Privacy Policy', section: 'legal', parent: '/', indexable: true, priority: 0.3, changeFrequency: 'yearly', live: true },
  { path: '/terms/', label: 'Terms', section: 'legal', parent: '/', indexable: true, priority: 0.3, changeFrequency: 'yearly', live: true },

  // --- Landing. Conversion page is indexable; thank-you and paid variants are not.
  { path: '/free-ad-audit/', label: 'Free Ad Audit', section: 'landing', parent: '/', indexable: true, priority: 1.0, changeFrequency: 'monthly', live: true },
  { path: '/thank-you/', label: 'Thank You', section: 'landing', parent: '/', indexable: false, priority: 0.0, changeFrequency: 'yearly', live: true },
] as const;

/** Routes that are built and linked. */
export const liveRoutes = routes.filter((r) => r.live);

/** Routes that belong in sitemap.xml. */
export const indexableRoutes = liveRoutes.filter((r) => r.indexable);

export function getRoute(path: string): RouteEntry | undefined {
  return routes.find((r) => r.path === path);
}

/** Ancestors of `path`, root first, excluding the page itself. */
export function breadcrumbTrail(path: string): RouteEntry[] {
  const trail: RouteEntry[] = [];
  let current = getRoute(path);
  while (current?.parent) {
    const parent = getRoute(current.parent);
    if (!parent) break;
    trail.unshift(parent);
    current = parent;
  }
  return trail;
}
