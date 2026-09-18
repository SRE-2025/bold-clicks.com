import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Insights hub - Volume 1 s.03, Volume 2 s.21.
 *
 * Articles are added as MDX under content/insights and listed here. The
 * month-1 calendar items (audit checklist, low-quality-leads diagnostic) are
 * Phase 7 work: Volume 2 s.26 requires a FirstHand block in every Insight, and
 * those are owner inputs, so drafting them now would produce two articles the
 * linter would correctly refuse to publish.
 */

export const metadata: Metadata = buildMetadata('/insights/');

/** Volume 2 s.21, months 1-3. Shown so the hub is useful rather than empty. */
const upcoming = [
  { title: 'The Google Ads account audit checklist we actually use', supports: 'Free ad audit' },
  { title: 'Why your Google Ads leads are low quality — the 7 places we look first', supports: 'Conversion tracking' },
  { title: 'What PPC management costs: pricing models and what changes the price', supports: 'Services' },
  { title: 'Austin home services: seasonality, storm spikes and bid timing', supports: 'Home services' },
  { title: 'Performance Max vs Search: a decision framework from real accounts', supports: 'Google Ads management' },
  { title: 'How we track qualified leads: GoHighLevel and offline conversions', supports: 'Conversion tracking' },
];

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('/insights/')} />

      <Hero
        eyebrow="INSIGHTS"
        headline="Written by the people in the accounts."
        subhead="Practical paid-media writing: audit frameworks, tracking guides, platform changes and account teardowns. No recycled listicles."
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/insights/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="standard">
        <Eyebrow className="text-forest">THE RULE</Eyebrow>
        <SectionHeading id="standard" className="mt-4">
          Every article contains something only we could write.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Each piece here carries a block of first-hand evidence from an account we run &mdash; an observation, a
            number, a pattern, a mistake. If an article cannot contain one, we do not publish it, because an article
            without it is something you could already read anywhere.
          </p>
          <p>
            Every piece also names the person who reviewed it. Numbers appear only when they come from accounts we
            can cite, with the date range and the sample stated, or from a public source we link to.
          </p>
        </div>
      </Section>

      <Section tone="white" labelledBy="upcoming">
        <Eyebrow className="text-forest">COMING FIRST</Eyebrow>
        <SectionHeading id="upcoming" className="mt-4">
          What we&rsquo;re writing.
        </SectionHeading>
        <ul className="mt-8 divide-y divide-sage/40 border-y border-sage/40">
          {upcoming.map((item) => (
            <li key={item.title} className="py-4">
              <p className="text-h3 text-black">{item.title}</p>
              <p className="mt-1 text-small text-ink/60">Supports: {item.supports}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection location="section-insights" />
    </>
  );
}
