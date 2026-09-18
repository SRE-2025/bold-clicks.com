import type { MetadataRoute } from 'next';
import { indexableRoutes } from '@/content/routes';
import { site } from '@/content/site';

/**
 * sitemap.xml - generated from the canonical route registry (Volume 1 s.08).
 * Canonical indexable URLs only: a route that is noindex or not live never
 * appears here, so the sitemap and the robots directives cannot disagree.
 *
 * lastModified is deliberately omitted. Volume 2 s.22 forbids fake freshness,
 * and a build-time timestamp on every URL is exactly that. It is added per-URL
 * once content carries a real material-update date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
