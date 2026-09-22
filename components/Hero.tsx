import type { ReactNode } from 'react';
import Image from 'next/image';
import { CtaButton } from './CtaButton';
import { Container, Eyebrow, cx } from './primitives';

/**
 * Hero - Volume 2 s.29.
 *
 * The homepage shows the exact owner-supplied logo beside the message.
 * Interior pages keep the text-led composition.
 */
export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  proofLine,
  size = 'interior',
}: {
  eyebrow: string;
  headline: ReactNode;
  subhead: string | [string, string];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  proofLine?: string | null;
  size?: 'home' | 'interior';
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <Container>
        <div className={cx('grid items-center gap-12', size === 'home' && 'lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]')}>
        <div className="max-w-measure">
          <Eyebrow>{eyebrow}</Eyebrow>

          <h1
            className={cx(
              'mt-4 text-cream',
              size === 'home' ? 'text-display md:text-display-lg' : 'text-h1 md:text-h1-lg',
            )}
          >
            {headline}
          </h1>

          {Array.isArray(subhead) ? (
            <>
              <p className="mt-6 text-body text-mist md:text-body-lg">{subhead[0]}</p>
              <p className="mt-2 text-body text-mist md:text-body-lg">{subhead[1]}</p>
            </>
          ) : (
            <p className="mt-6 text-body text-mist md:text-body-lg">{subhead}</p>
          )}

          {proofLine && <p className="mt-6 text-small-lg text-gold">{proofLine}</p>}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {primaryCta && (
                <CtaButton href={primaryCta.href} label={primaryCta.label} location="hero" variant="onDark" />
              )}
              {secondaryCta && (
                <CtaButton
                  href={secondaryCta.href}
                  label={secondaryCta.label}
                  location="hero"
                  variant="outlineOnDark"
                />
              )}
            </div>
          )}
        </div>
        {size === 'home' && (
          <div className="mx-auto hidden w-full max-w-[360px] rounded-card bg-cream p-2 shadow-card lg:block">
            <Image
              src="/brand/bold-clicks-original.png"
              alt=""
              width={1254}
              height={1254}
              sizes="360px"
              className="block h-auto w-full"
            />
          </div>
        )}
        </div>
      </Container>
    </section>
  );
}
