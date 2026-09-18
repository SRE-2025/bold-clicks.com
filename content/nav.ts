import { site } from './site';

/**
 * Navigation - Volume 1 s.03.
 *
 * Five items plus the CTA. Desktop nav stays compact; the conversion action is
 * never buried in a mega-menu. There is deliberately no "Locations" dropdown:
 * Volume 2 s.37 lists one as an anti-pattern.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Services', href: '/services/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
] as const;

export const headerCta = site.primaryCta;

export const footerNav: readonly { heading: string; items: readonly NavItem[] }[] = [
  {
    heading: 'Services',
    items: [
      { label: 'Google Ads Management', href: '/google-ads-management/' },
      { label: 'Meta Ads Management', href: '/meta-ads-management/' },
      { label: 'Microsoft Ads Management', href: '/microsoft-ads-management/' },
      { label: 'YouTube Ads Management', href: '/youtube-ads-management/' },
      { label: 'Conversion Tracking', href: '/conversion-tracking/' },
    ],
  },
  {
    heading: 'Industries',
    items: [
      { label: 'Home Services', href: '/industries/home-services/' },
      { label: 'Legal', href: '/industries/legal/' },
      { label: 'Med Spa', href: '/industries/med-spa/' },
      { label: 'Dental', href: '/industries/dental/' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about/' },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Austin PPC Agency', href: '/austin-ppc-agency/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
] as const;

export const legalNav: readonly NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
] as const;
