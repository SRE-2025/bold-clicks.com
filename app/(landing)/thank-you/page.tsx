import type { Metadata } from 'next';
import { Container, Eyebrow } from '@/components/primitives';
import { BookingLink } from '@/components/BookingLink';
import { buildMetadata } from '@/lib/seo';

/**
 * Thank-you state - Volume 2 s.30, s.31.
 *
 * noindex (set from the route registry via buildMetadata). generate_lead is
 * fired by LeadForm after the server accepts the submission, not on this page's
 * render - Volume 1 s.10 requires the event follow a real submission, and a
 * page-view trigger would double-count on refresh or a shared URL.
 */

export const metadata: Metadata = buildMetadata('/thank-you/');

const nextSteps = [
  'We confirm by email within one business hour during 9am–6pm CT.',
  'We’ll tell you exactly what read-only access we need, and how to grant it.',
  'Your written audit follows, along with a 30-minute walkthrough call.',
];

export default function ThankYouPage() {
  return (
    <div className="bg-black py-24 md:py-32">
      <Container>
        <div className="max-w-measure">
          <Eyebrow>REQUEST RECEIVED</Eyebrow>
          <h1 className="mt-4 text-display text-cream md:text-display-lg">Got it.</h1>
          <p className="mt-6 text-body text-mist md:text-body-lg">
            Your audit request is in. Here&rsquo;s what happens next.
          </p>

          <ol className="mt-8 space-y-4">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-h3 text-gold">
                  {index + 1}
                </span>
                <span className="text-body text-mist md:text-body-lg">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-sage/30 pt-8">
            <h2 className="text-h3 text-cream md:text-h3-lg">
              Want to lock in your walkthrough call now?
            </h2>
            <p className="mt-3 text-body text-mist md:text-body-lg">
              Booking it ahead of the audit means we can walk through the findings live rather than email them.
            </p>
            <div className="mt-6">
              <BookingLink />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
