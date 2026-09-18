import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { IndustryGrid } from '@/components/cards';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Industries hub - Volume 1 s.03.
 *
 * Routes to the verticals where the team has real experience, and says plainly
 * that the list is short on purpose. Volume 1: "Route users to only the
 * verticals where Bold Clicks has real experience and differentiated insight."
 */

export const metadata: Metadata = buildMetadata('/industries/');

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('/industries/')} />

      <Hero
        eyebrow="BY INDUSTRY"
        headline="Paid media works differently in every vertical."
        subhead="Lead value, urgency, compliance and sales cycle all change what a good account looks like. These are the verticals we work in and can be specific about."
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/industries/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="verticals">
        <Eyebrow className="text-forest">WHERE WE WORK</Eyebrow>
        <SectionHeading id="verticals" className="mt-4">
          Four verticals, in depth.
        </SectionHeading>
        <div className="mt-8">
          <IndustryGrid />
        </div>
      </Section>

      <Section tone="white" labelledBy="why-short">
        <Eyebrow className="text-forest">WHY THE LIST IS SHORT</Eyebrow>
        <SectionHeading id="why-short" className="mt-4">
          We publish a vertical page when we have something specific to say.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Most agency industry pages are one template with the vertical name swapped in. They rank for a while and
            they tell a buyer nothing. Ours exist only where we can describe how buyers in that vertical actually
            search, how we structure the account, the waste patterns we see, and the numbers we would report.
          </p>
          <p>
            We work with businesses outside these four. If yours is not listed, the audit is still the right first
            step &mdash; it just means we would rather show you the work than a page about it.
          </p>
        </div>
      </Section>

      <CTASection location="section-industries" />
    </>
  );
}
