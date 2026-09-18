import type { Faq, Location } from '@/lib/schema';

/**
 * Location pages - Volume 2 s.18.
 *
 * Exactly one at launch. /texas-ppc-agency/ unlocks at Tier 2 (3+ verified case
 * studies and 60 days of top-10 Austin positions); metro pages require a
 * verified client in that metro first. A page that only swaps the city name is
 * a doorway page - `pnpm audit:doorway` rejects it in CI.
 */

export const austinFaqs: Faq[] = [
  {
    question: 'What’s the minimum ad spend for an Austin campaign?',
    answer: '[OWNER: real minimum monthly ad spend] Austin is a dense market, so a budget that would work in a smaller metro often cannot buy enough data here to optimise on.',
    needsOwnerInput: true,
  },
  {
    question: 'Do Local Services Ads make sense for Austin home services?',
    answer:
      'Often, alongside Search rather than instead of it. LSAs charge per lead and sit above the search results, which suits high-volume common jobs. Search gives control over which service lines you buy. Which split is right depends on your service area, your licensing, and how much booking capacity you have.',
    needsOwnerInput: false,
  },
  {
    question: 'How does service-radius targeting work for the suburbs?',
    answer:
      'We build targeting on drive time rather than a circle on a map. Round Rock, Cedar Park, Georgetown, Pflugerville and Leander behave as separate markets with their own competitive density, and treating the metro as one radius means overpaying in some parts of it and missing others entirely.',
    needsOwnerInput: false,
  },
  {
    question: 'Do you meet clients in person?',
    answer: '[OWNER: confirm whether in-person meetings are offered and from where]',
    needsOwnerInput: true,
  },
  {
    question: 'Do you only work with Austin businesses?',
    answer:
      'No. Austin is where we are and where most of our accounts are, and we work with businesses across Texas and neighboring states, and remotely nationwide.',
    needsOwnerInput: false,
  },
];

export const locations: readonly Location[] = [
  {
    slug: 'austin-ppc-agency',
    metro: 'Austin',
    /**
     * Volume 2 s.18 requires market commentary that could only be true for this
     * market. The qualitative observations below are defensible without account
     * data; the quantitative version (CPC ranges by vertical) is an [OWNER]
     * first-hand input and is rendered by <FirstHand> only once supplied.
     */
    marketCommentary:
      'Austin is one of the most competitive local advertising markets in the country for the exact verticals we work in: home services, med spas, dental and legal. Three things follow from that. Click prices are high enough that a campaign structured around "everything we offer" will run out of budget before it runs out of demand. The metro is really several markets - the urban core, the Round Rock and Cedar Park corridor, and the Hays County side down through Kyle and Buda - with different competitive density and different drive-time economics. And demand is unusually seasonal for a city this size, because storm season moves home-services demand far more sharply than the calendar does.',
    localProofRefs: [],
    localFaqs: austinFaqs,
    serviceRadius: [
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
    ],
    publishable: true,
  },
];

/**
 * Markets tracked for demand signals but deliberately without pages. Volume 2
 * s.18: regional relevance accumulates through content and proof, and a page
 * exists only when the team can say something genuinely useful about that
 * market. The monthly Search Console job reports impressions per region here.
 */
export const watchedRegions = [
  { region: 'Dallas-Fort Worth', tier: 2, queryTerms: ['dallas', 'fort worth', 'dfw', 'plano', 'frisco', 'arlington', 'mckinney', 'irving', 'denton'] },
  { region: 'Houston', tier: 2, queryTerms: ['houston', 'the woodlands', 'katy', 'sugar land', 'pearland', 'cypress', 'spring'] },
  { region: 'San Antonio', tier: 2, queryTerms: ['san antonio', 'new braunfels', 'boerne', 'schertz', 'seguin'] },
  { region: 'Oklahoma', tier: 3, queryTerms: ['oklahoma city', 'tulsa', 'okc', 'norman', 'edmond'] },
  { region: 'Louisiana', tier: 3, queryTerms: ['new orleans', 'baton rouge', 'lafayette', 'shreveport', 'nola'] },
  { region: 'Arkansas', tier: 3, queryTerms: ['little rock', 'fayetteville', 'bentonville', 'rogers', 'springdale'] },
  { region: 'New Mexico', tier: 3, queryTerms: ['albuquerque', 'santa fe', 'las cruces', 'rio rancho'] },
] as const;

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug && l.publishable);
}
