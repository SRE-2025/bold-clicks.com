import { site } from '@/content/site';
import { CtaButton } from './CtaButton';
import { Container, Eyebrow } from './primitives';

/**
 * CTASection - Volume 2 s.29. Black section, headline, one line of supporting
 * copy, one button. Fires cta_click with a location attribute via CtaButton.
 *
 * The ridge motif appears here and in the hero only.
 */
export function CTASection({
  headline = 'Want to know where your ad spend is leaking?',
  body = 'Request a free audit. You’ll get a written review of your accounts, tracking and landing pages — whether or not you hire us.',
  ctaLabel = site.primaryCta.label,
  ctaHref = site.primaryCta.href,
  location = 'section-final-cta',
}: {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  location?: `section-${string}`;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24" aria-labelledby="final-cta-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-full w-1/2 opacity-30"
        style={{
          background: 'linear-gradient(65deg, transparent 49.9%, #C6A15B 49.9%, #C6A15B 50.1%, transparent 50.1%)',
        }}
      />
      <Container className="relative">
        <div className="max-w-measure">
          <Eyebrow>FREE AD AUDIT</Eyebrow>
          <h2 id="final-cta-heading" className="mt-4 text-h1 text-cream md:text-h1-lg">
            {headline}
          </h2>
          <p className="mt-6 text-body text-mist md:text-body-lg">{body}</p>
          <div className="mt-8">
            <CtaButton href={ctaHref} label={ctaLabel} location={location} variant="onDark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
