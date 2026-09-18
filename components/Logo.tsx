import Link from 'next/link';
import { cx } from './primitives';

/**
 * Brand mark.
 *
 * NON-NEGOTIABLE (Volume 1, cover page / CLAUDE.md): the approved Bold Clicks
 * logo must be used exactly as supplied. It has not been supplied, and
 * generating or redrawing one is explicitly forbidden - so this renders a plain
 * typographic wordmark as an interim mark and nothing else.
 *
 * To install the real asset: drop the SVG at /public/brand/bold-clicks.svg and
 * switch `hasApprovedAsset` to true. Nothing else about this component changes.
 * Tracked in docs/owner-inputs.md.
 */

const hasApprovedAsset = false;

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const color = tone === 'light' ? 'text-cream' : 'text-black';

  if (hasApprovedAsset) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fixed-size brand asset, not a content image
      <img
        src={tone === 'light' ? '/brand/bold-clicks-on-black.svg' : '/brand/bold-clicks.svg'}
        alt="Bold Clicks"
        width={148}
        height={28}
        className={className}
      />
    );
  }

  return (
    <span className={cx('font-display text-h3 tracking-tight', color, className)}>
      Bold<span className="text-gold">.</span>Clicks
    </span>
  );
}

/**
 * No aria-label on the wordmark branch: the visible text is already the
 * accessible name, and an aria-label of "Bold Clicks - home" overrode it with a
 * string that does not contain the visible "Bold.Clicks" - a WCAG 2.5.3
 * label-in-name failure, which Lighthouse flags. When the approved asset lands,
 * the image's alt text supplies the name instead.
 */
export function LogoLink({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link href="/" className={cx('inline-flex items-center', className)}>
      <Logo tone={tone} />
    </Link>
  );
}
