'use client';

import { isPending, site } from '@/content/site';
import { track } from '@/lib/analytics';

/**
 * Booking link. Volume 2 s.28: the calendar loads on interaction rather than on
 * page load, so it costs nothing until someone wants it. Renders nothing until
 * the owner supplies a real calendar URL - a dead booking button is worse than
 * no button.
 */
export function BookingLink({ label = 'Book my walkthrough call' }: { label?: string }) {
  if (isPending(site.contact.bookingUrl)) return null;

  const provider = site.contact.bookingUrl.includes('calendly') ? 'calendly' : 'ghl';

  return (
    <a
      href={site.contact.bookingUrl}
      target="_blank"
      rel="noopener"
      onClick={() => track.calendarOpen(provider)}
      className="inline-flex min-h-[48px] items-center justify-center rounded bg-cream px-6 py-4 text-button text-black transition hover:bg-gold"
    >
      {label}
    </a>
  );
}
