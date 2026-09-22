import Image from 'next/image';
import Link from 'next/link';
import { cx } from './primitives';

/** The owner-supplied mark is shown without redrawing or recoloring it. */

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span className={cx('brand-logo', tone === 'light' && 'rounded', className)}>
      <Image
        src="/brand/bold-clicks-original.png"
        alt="Bold Clicks"
        width={1254}
        height={1254}
        sizes="(max-width: 639px) 110px, 146px"
        loading={tone === 'dark' ? 'eager' : 'lazy'}
      />
    </span>
  );
}

export function LogoLink({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link href="/" className={cx('inline-flex items-center', className)}>
      <Logo tone={tone} />
    </Link>
  );
}
