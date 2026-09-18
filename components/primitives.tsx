import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Layout and type primitives. Every other component composes these so the
 * spacing scale and container width from Volume 2 s.29 stay in one place.
 */

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-container px-4 md:px-8', className)}>{children}</div>;
}

type Tone = 'cream' | 'black' | 'forest' | 'white';

const toneClasses: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  black: 'bg-black text-mist',
  forest: 'bg-forest text-cream',
  white: 'bg-white text-ink',
};

/** Section padding: 64px mobile, 96px desktop (Volume 2 s.29). */
export function Section({
  children,
  tone = 'cream',
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx(toneClasses[tone], 'py-16 md:py-24', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx('text-eyebrow uppercase text-gold md:text-eyebrow-lg', className)}>{children}</p>
  );
}

export function SectionHeading({
  children,
  id,
  className,
  tone = 'dark',
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <h2
      id={id}
      className={cx('text-h2 md:text-h2-lg', tone === 'light' ? 'text-cream' : 'text-black', className)}
    >
      {children}
    </h2>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'onDark';

const buttonBase =
  'inline-flex items-center justify-center rounded px-6 py-4 text-button transition duration-200 ease-out min-h-[48px]';

const buttonVariants: Record<ButtonVariant, string> = {
  // Forest on cream: passes AA for button text at 16px semibold.
  primary: 'bg-forest text-cream hover:bg-black focus-visible:bg-black',
  secondary: 'border border-black text-black hover:bg-black hover:text-cream',
  // On black sections, cream fill reads as the primary action.
  onDark: 'bg-cream text-black hover:bg-gold hover:text-black',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
  prefetch,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={onClick}
      className={cx(buttonBase, buttonVariants[variant], className)}
    >
      {children}
    </Link>
  );
}

/** A thin gold rule - the only decorative use of gold (Volume 2 s.29). */
export function GoldRule({ className }: { className?: string }) {
  return <hr className={cx('h-px w-16 border-0 bg-gold', className)} aria-hidden="true" />;
}
