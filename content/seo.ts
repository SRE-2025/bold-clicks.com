/**
 * Metadata registry - Volume 1 s.03 page-level SEO map, Volume 2 s.20.
 *
 * One primary intent per route. Titles are 45-65 characters and descriptions
 * 120-160 (Volume 2 s.26); `pnpm audit:meta` fails the build on a duplicate or
 * an out-of-range value, so this file is the only place they are edited.
 *
 * Service and industry metadata lives with the content in services.ts /
 * industries.ts; this registry covers everything else.
 */

export interface PageMeta {
  title: string;
  description: string;
  /** The single primary query this route is responsible for. */
  primaryIntent: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Paid Media Agency for Lead Generation | Bold Clicks',
    description:
      'Google, Meta, Microsoft and YouTube ads managed around qualified leads and booked calls - with tracking that shows what actually worked. Austin, Texas.',
    primaryIntent: 'paid media agency',
  },
  '/services/': {
    title: 'Paid Media & PPC Management Services | Bold Clicks',
    description:
      'PPC management across Google, Meta, Microsoft and YouTube, plus the conversion tracking behind it. What we do, how we work, and what you get.',
    primaryIntent: 'ppc management services',
  },
  '/industries/': {
    title: 'Paid Media by Industry – PPC Specialists | Bold Clicks',
    description:
      'How paid media differs by vertical: home services, legal, med spa and dental. Campaign structure, waste patterns, KPIs and the objections we hear.',
    primaryIntent: 'ppc agency by industry',
  },
  '/case-studies/': {
    title: 'Paid Media Case Studies & Results | Bold Clicks',
    description:
      'Verified client results with the metric defined and the date range stated. Every figure here is confirmed by the client before it is published.',
    primaryIntent: 'ppc agency case studies',
  },
  '/insights/': {
    title: 'PPC & Paid Media Insights from Operators | Bold Clicks',
    description:
      'Practical paid-media writing from the people managing the accounts: audit frameworks, tracking guides, platform changes and account teardowns.',
    primaryIntent: 'ppc insights',
  },
  '/austin-ppc-agency/': {
    title: 'Austin PPC Agency – Google & Meta Ads | Bold Clicks',
    description:
      'Austin-based paid-media specialists running Google, Meta, Microsoft and YouTube ads for local businesses across the metro and the surrounding suburbs.',
    primaryIntent: 'ppc agency austin',
  },
  '/about/': {
    title: 'About Bold Clicks – Austin Paid Media Specialists',
    description:
      'The paid-media arm of the Stoneridge family. Who does the work, why we only run ads, and how we work with the accounts and data you own.',
    primaryIntent: 'bold clicks agency',
  },
  '/contact/': {
    title: 'Contact Bold Clicks – Austin Paid Media Agency',
    description:
      'Talk to the operator who would run your account. Request a free ad audit, book a call, or send a question about your current campaigns.',
    primaryIntent: 'contact bold clicks',
  },
  '/free-ad-audit/': {
    title: 'Free PPC & Ad Account Audit – No Pitch | Bold Clicks',
    description:
      'A written review of your Google, Meta, Microsoft or YouTube accounts: structure, tracking, search terms, creative and landing pages. No obligation.',
    primaryIntent: 'free google ads audit',
  },
  '/thank-you/': {
    title: 'Thanks – Your Ad Audit Request Is In | Bold Clicks',
    description:
      'Your audit request has been received. Here is what happens next, and how to lock in your walkthrough call while the review is being prepared.',
    primaryIntent: 'n/a - noindex confirmation state',
  },
  '/privacy/': {
    title: 'Privacy Policy – How We Handle Your Data | Bold Clicks',
    description:
      'What data this site collects, which advertising and analytics vendors receive it, how consent is handled, and how to ask for your data to be removed.',
    primaryIntent: 'n/a - legal',
  },
  '/terms/': {
    title: 'Terms of Use for the Bold Clicks Website | Bold Clicks',
    description:
      'The terms that apply to using this website, the limits of what is published here, and how they relate to any separate services agreement.',
    primaryIntent: 'n/a - legal',
  },
};

export function getPageMeta(path: string): PageMeta | undefined {
  return pageMeta[path];
}
