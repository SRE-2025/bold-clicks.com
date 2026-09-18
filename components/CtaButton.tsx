'use client';

import Link from 'next/link';
import { track, type CtaLocation } from '@/lib/analytics';
import { cx } from './primitives';

/**
 * The only CTA component. Every call to action on the site fires cta_click with
 * its location, which is what makes the "which CTA produced the lead" question
 * answerable (Volume 1 s.11 measurement rule).
 */

type Variant = 'primary' | 'secondary' | 'onDark' | 'outlineOnDark';

const base =
  'inline-flex min-h-[48px] items-center justify-center rounded px-6 py-4 text-button transition duration-200 ease-out';

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-cream hover:bg-black',
  secondary: 'border border-black text-black hover:bg-black hover:text-cream',
  onDark: 'bg-cream text-black hover:bg-gold',
  outlineOnDark: 'border border-mist text-cream hover:border-gold hover:text-gold',
};

export function CtaButton({
  href,
  label,
  location,
  variant = 'primary',
  className,
}: {
  href: string;
  label: string;
  location: CtaLocation;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => track.ctaClick(location, label)}
      className={cx(base, variants[variant], className)}
    >
      {label}
    </Link>
  );
}
