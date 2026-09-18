/**
 * Single source of truth for business identity.
 *
 * Volume 1 s.12 requires real legal details in the footer and contact page, and
 * Volume 2 s.18 requires NAP consistency with content/citations.json. Anything
 * still marked [OWNER] renders as nothing, never as visible placeholder text -
 * see components/OwnerValue.tsx.
 */

export const OWNER_PLACEHOLDER = '[OWNER]';

/** True when a value is still an owner input and must not be rendered. */
export function isPending(value: string | undefined | null): boolean {
  return !value || value.includes('[OWNER');
}

export const site = {
  name: 'Bold Clicks',
  /** Exact legal/brand name for GBP and schema. No keywords appended - suspension risk. */
  legalName: '[OWNER: registered legal entity name]',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bold-clicks.com',
  /** Volume 1 s.01 positioning sentence. Reused in GBP description and schema. */
  positioning:
    'Bold Clicks is the specialist paid-media agency: we run ads, track what happens after the click, and optimize toward real business outcomes - not vanity metrics.',
  tagline: 'We run ads. That’s it.',
  /** Volume 1 s.02 preferred brand line. */
  brandLine: 'We run ads. That’s it. We get obsessive about making them work.',

  contact: {
    phone: '[OWNER: public phone]',
    email: '[OWNER: public email]',
    /**
     * Volume 2 s.18: list an address only if it is a real staffed Austin office.
     * A virtual office or co-working mailbox must never be listed. If there is
     * no staffed address, leave this pending and run as a service-area business.
     */
    address: {
      street: '[OWNER: street address, only if a real staffed office exists]',
      locality: 'Austin',
      region: 'TX',
      postalCode: '[OWNER]',
      country: 'US',
      isPublic: false,
    },
    /** Volume 2 s.18: website link in GBP carries this UTM so GBP traffic is attributable. */
    gbpUrl: '[OWNER: Google Business Profile URL]',
    bookingUrl: '[OWNER: GoHighLevel calendar or Calendly URL]',
  },

  /** Volume 2 s.18 appendix A - the Tier 1 service area. */
  areaServed: [
    'Austin',
    'Round Rock',
    'Cedar Park',
    'Georgetown',
    'Pflugerville',
    'Leander',
    'Lakeway',
    'Bee Cave',
    'Dripping Springs',
    'Kyle',
    'Buda',
    'San Marcos',
    'Hutto',
  ],

  /** sameAs targets for Organization schema. Only real, claimed profiles. */
  profiles: {
    linkedin: '[OWNER: LinkedIn company page]',
    facebook: '[OWNER: Facebook page]',
    instagram: '[OWNER: Instagram profile]',
  },

  /** Volume 1 s.03: one sitewide primary CTA, consistent everywhere. */
  primaryCta: {
    label: 'Get My Free Ad Audit',
    href: '/free-ad-audit/',
  },
  secondaryCta: {
    label: 'See How We Work',
    href: '/services/',
  },

  /** Volume 1 s.01: relationship to the Stoneridge family, stated accurately. */
  family: {
    line: 'Bold Clicks is the paid-media arm of the Stoneridge family.',
    sisterAgency: 'Stoneridge Digital',
    sisterAgencyUrl: 'https://stoneridgedigital.com/',
    /** The accurate one-paragraph description is an owner input (Volume 2 s.35). */
    description: '[OWNER: accurate description of the relationship to Stoneridge Digital and Stoneridge Equity]',
  },
} as const;

/** The GBP website link, tagged so Business Profile traffic is attributable. */
export const gbpWebsiteLink = `${site.url}/?utm_source=google&utm_medium=organic&utm_campaign=gbp`;
