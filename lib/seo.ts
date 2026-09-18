import type { Metadata } from 'next';
import { breadcrumbTrail, getRoute } from '@/content/routes';
import { getPageMeta } from '@/content/seo';
import { isPending, site } from '@/content/site';

/**
 * Metadata and JSON-LD helpers - Volume 1 s.14, Volume 2 s.28.
 *
 * Every indexable page gets a self-referencing canonical, unique title and
 * description, and Open Graph tags. Non-indexable routes get an explicit
 * robots directive rather than relying on robots.txt (Volume 1 s.08).
 */

const NOINDEX = process.env.NOINDEX === 'true';

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/**
 * Builds Next.js metadata from the route registry plus the metadata registry.
 * Throws at build time if a route is missing from either, which is the point:
 * an unregistered page cannot ship.
 */
export function buildMetadata(path: string, overrides: Partial<Metadata> = {}): Metadata {
  const route = getRoute(path);
  const meta = getPageMeta(path);

  if (!route) throw new Error(`Route ${path} is not in content/routes.ts`);
  if (!meta) throw new Error(`Route ${path} has no entry in content/seo.ts`);

  const indexable = route.indexable && !NOINDEX;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: absoluteUrl(path) },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(path),
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    ...overrides,
  };
}

/**
 * Metadata for a page whose title and description live with its content
 * (service and industry pages) rather than in content/seo.ts.
 */
export function buildContentMetadata(
  path: string,
  { metaTitle, metaDescription }: { metaTitle: string; metaDescription: string },
): Metadata {
  const route = getRoute(path);
  if (!route) throw new Error(`Route ${path} is not in content/routes.ts`);
  const indexable = route.indexable && !NOINDEX;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: absoluteUrl(path) },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: metaTitle,
      description: metaDescription,
      url: absoluteUrl(path),
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription },
  };
}

type JsonLd = Record<string, unknown>;

/**
 * Organization schema for the homepage - Volume 1 s.09, Volume 2 appendix B.
 * Address is included only when the owner has confirmed a real public office;
 * `sameAs` drops any profile that is still an owner placeholder. Marking up
 * information that is not visible and true is the failure mode this avoids.
 */
export function organizationSchema(): JsonLd {
  const sameAs = Object.values(site.profiles).filter((url) => !isPending(url));
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.positioning,
    areaServed: site.areaServed.map((city) => ({ '@type': 'City', name: `${city}, TX` })),
    serviceType: [
      'Google Ads management',
      'Meta Ads management',
      'Microsoft Ads management',
      'YouTube Ads management',
      'Conversion tracking and attribution',
    ],
  };

  if (!isPending(site.legalName)) schema.legalName = site.legalName;
  if (!isPending(site.contact.phone)) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.contact.phone,
      areaServed: 'US',
      availableLanguage: 'English',
    };
  }
  if (site.contact.address.isPublic && !isPending(site.contact.address.street)) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    };
  }
  if (sameAs.length > 0) schema.sameAs = sameAs;

  return schema;
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

/** BreadcrumbList generated from the same registry the visible breadcrumbs use. */
export function breadcrumbSchema(path: string): JsonLd | null {
  const trail = breadcrumbTrail(path);
  const self = getRoute(path);
  if (!self || trail.length === 0) return null;

  const items = [...trail, self].map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.label,
    item: absoluteUrl(entry.path),
  }));

  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

/** Service schema for platform and industry pages. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  audienceType?: string;
}): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { '@id': `${site.url}/#organization` },
    serviceType: input.name,
    areaServed: site.areaServed.map((city) => ({ '@type': 'City', name: `${city}, TX` })),
  };
  if (input.audienceType) {
    schema.audience = { '@type': 'Audience', audienceType: input.audienceType };
  }
  return schema;
}

/** A plain WebPage node for routes with no richer type (Volume 2 appendix B). */
export function webPageSchema(path: string, name: string, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${site.url}/#website` },
  };
}
