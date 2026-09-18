import type { ReactNode } from 'react';
import { CtaButton } from './CtaButton';
import { Container, Eyebrow, cx } from './primitives';

/**
 * Hero - Volume 2 s.29.
 *
 * Black background. The LCP element is the H1 text, so no hero image is
 * required and none is used: that keeps LCP to a text paint and removes the
 * largest single performance risk on the page.
 *
 * The "ridge motif" from the brand system appears here and in the final CTA
 * only - a single thin angled rule, never a repeated mountain graphic.
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
  subhead: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  proofLine?: string | null;
  size?: 'home' | 'interior';
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Ridge motif: one thin angled gold line. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 opacity-40"
        style={{
          background: 'linear-gradient(115deg, transparent 49.9%, #C6A15B 49.9%, #C6A15B 50.1%, transparent 50.1%)',
        }}
      />

      <Container className="relative">
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

          <p className="mt-6 text-body text-mist md:text-body-lg">{subhead}</p>

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
      </Container>
    </section>
  );
}
