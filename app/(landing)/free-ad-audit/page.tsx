import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { Container, Eyebrow, GoldRule } from '@/components/primitives';
import { site } from '@/content/site';
import { buildMetadata, webPageSchema } from '@/lib/seo';

/**
 * Free Ad Audit - Volume 2 s.30.
 *
 * Landing layout, no nav, form above the fold on desktop and directly after the
 * headline block on mobile. One conversion action. No Offer markup: Volume 2
 * appendix B allows it only for a genuine free offer with stated terms, and the
 * turnaround time is still an owner input.
 */

export const metadata: Metadata = buildMetadata('/free-ad-audit/');

const whatYouGet = [
  'A score for each of the five leak points.',
  'The specific search terms, audiences or placements wasting budget.',
  'Whether your conversion tracking counts real leads or noise.',
  'Landing-page fixes ranked by impact.',
  'A plain-English plan you can act on with or without us.',
];

const howItWorks = [
  { step: 'Request the audit.', detail: 'One form. It takes under a minute.' },
  {
    step: 'Grant read-only access.',
    detail: 'We’ll show you how — it takes two minutes, and we never make changes during an audit.',
  },
  {
    step: 'Get your written audit and a 30-minute walkthrough call.',
    detail: 'Yours to keep, and yours to act on with or without us.',
  },
];

/**
 * Volume 2 s.30 phrases the subhead as "delivered in [X] business days" and
 * scopes the audience by a spend threshold. Both are owner inputs, so the copy
 * below is written to stand without them; once supplied, the turnaround belongs
 * in the subhead and the threshold in "Who it's for".
 */
export default function FreeAdAuditPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          '/free-ad-audit/',
          'Free PPC & Ad Account Audit',
          'A written review of your Google, Meta, Microsoft or YouTube ad accounts.',
        )}
      />

      <div className="bg-black py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-measure">
              <Eyebrow>FREE AD AUDIT</Eyebrow>
              <h1 className="mt-4 text-display text-cream md:text-display-lg">
                Find out where your ad spend is leaking.
              </h1>
              <p className="mt-6 text-body text-mist md:text-body-lg">
                A written review of your Google, Meta, Microsoft or YouTube accounts &mdash; campaign structure,
                tracking, search terms, creative and landing pages. No pitch deck. No obligation.
              </p>

              <GoldRule className="mt-8" />

              <h2 className="mt-8 text-h3 text-cream md:text-h3-lg">What you get</h2>
              <ul className="mt-4 space-y-3">
                {whatYouGet.map((item) => (
                  <li key={item} className="relative pl-6 text-body text-mist md:text-body-lg">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-h3 text-cream md:text-h3-lg">Who it&rsquo;s for</h2>
              <p className="mt-4 text-body text-mist md:text-body-lg">
                Lead-driven businesses already spending on ads, or ready to start &mdash; healthcare, legal, home
                services and similar, in Texas and beyond.
              </p>

              <h2 className="mt-8 text-h3 text-cream md:text-h3-lg">How it works</h2>
              <ol className="mt-4 space-y-4">
                {howItWorks.map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span aria-hidden="true" className="font-display text-h3 text-gold">
                      {index + 1}
                    </span>
                    <span className="text-body text-mist md:text-body-lg">
                      <strong className="text-cream">{item.step}</strong> {item.detail}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-8 border-l-2 border-gold pl-4 text-small-lg text-mist">
                You own your accounts. Read-only access only. We never make changes during an audit.
              </p>
            </div>

            {/* Form: beside the headline on desktop, directly beneath it on mobile. */}
            <div className="rounded-card bg-cream p-6 shadow-card md:p-8">
              <h2 className="text-h2 text-black">Request your audit</h2>
              <p className="mt-2 text-small-lg text-ink/70">
                We&rsquo;ll confirm by email and tell you exactly what access we need.
              </p>
              <div className="mt-6">
                <LeadForm formId="free-ad-audit" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-cream py-12">
        <Container>
          <p className="mx-auto max-w-measure text-center text-small-lg text-ink/70">
            {site.family.line} We run ads only &mdash; SEO, web design and social are handled by{' '}
            {site.family.sisterAgency}.
          </p>
        </Container>
      </div>
    </>
  );
}
