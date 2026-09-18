'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { track } from '@/lib/analytics';

/**
 * StickyMobileCTA - Volume 2 s.29.
 *
 * Appears after the user scrolls past the hero on mobile. One button,
 * dismissible, respects safe-area insets, and is never shown on the audit page
 * (the form is already there) or the thank-you page.
 */
const HIDDEN_ON = ['/free-ad-audit/', '/thank-you/'];

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed || HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-30 border-t border-sage/30 bg-black px-4 py-3 transition-transform duration-200 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-3">
        <Link
          href={site.primaryCta.href}
          onClick={() => track.ctaClick('sticky', site.primaryCta.label)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded bg-cream px-6 text-button text-black"
        >
          {site.primaryCta.label}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded text-mist"
        >
          <span className="sr-only">Dismiss</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
