'use client';

import { isPending, site } from '@/content/site';
import { track } from '@/lib/analytics';

/**
 * Phone link. Renders nothing until the owner supplies a real public number,
 * so the site never ships a dead tel: link (Volume 1 s.14 anti-pattern).
 * Fires phone_click, which is a GA4 key event (Volume 2 appendix B).
 */
export function PhoneLink({ location, className }: { location: string; className?: string }) {
  if (isPending(site.contact.phone)) return null;

  const e164 = site.contact.phone.replace(/[^\d+]/g, '');

  return (
    <a href={`tel:${e164}`} onClick={() => track.phoneClick(location)} className={className}>
      {site.contact.phone}
    </a>
  );
}
