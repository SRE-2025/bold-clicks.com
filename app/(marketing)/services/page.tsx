import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { ServiceGrid } from '@/components/cards';
import { MeasurementBlock, ProcessSteps } from '@/components/content-blocks';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Services hub - Volume 1 s.03.
 *
 * Targets "ppc management services" (Volume 2 s.20 cluster 1, P1). It is a hub
 * rather than a sixth service page: the platform detail lives on the platform
 * pages, and duplicating it here would put two pages on the same intent.
 */

export const metadata: Metadata = buildMetadata('/services/');

const processSteps = [
  { name: 'Audit', whatYouGet: 'A written review of accounts, tracking and landing pages, with the leaks ranked by cost.' },
  { name: 'Build or rebuild', whatYouGet: 'Structure, tracking, negatives, creative and landing pages set up correctly.' },
  { name: 'Launch', whatYouGet: 'Live only after conversion tracking has been verified end to end.' },
  { name: 'Optimize', whatYouGet: 'Weekly search-term, bid, creative and budget work informed by CRM lead quality.' },
  { name: 'Scale', whatYouGet: 'Budget and platforms added once cost per qualified lead is proven, not before.' },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('/services/')} />

      <Hero
        eyebrow="PAID MEDIA SERVICES"
        headline="Four platforms, one measurement standard."
        subhead="We manage Google, Meta, Microsoft and YouTube advertising, and we own the conversion tracking underneath all of it. That combination is the whole offer."
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/services/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="what-we-do">
        <Eyebrow className="text-forest">WHAT WE MANAGE</Eyebrow>
        <SectionHeading id="what-we-do" className="mt-4">
          Pick the platform, or let the audit decide.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Most businesses arrive certain they need one platform and leave the audit having changed their mind.
            Each page below covers what we do, how we measure it, and the questions we get asked about it on
            sales calls.
          </p>
        </div>
        <div className="mt-8">
          <ServiceGrid />
        </div>
      </Section>

      <Section tone="white" labelledBy="pricing">
        <Eyebrow className="text-forest">WHAT IT COSTS</Eyebrow>
        <SectionHeading id="pricing" className="mt-4">
          How paid-media pricing actually works.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Agencies price paid media in three ways: a flat monthly management fee, a percentage of ad spend, or a
            hybrid of the two. Each creates a different incentive. A percentage rewards an agency for spending more
            of your money; a flat fee rewards efficiency but has to be set against the work the account needs.
          </p>
          <p>
            What changes the price is not the platform count. It is the number of campaigns and service lines, how
            much creative the account consumes, whether tracking has to be rebuilt, and how much lead-quality
            feedback flows back from your CRM.
          </p>
          <p>
            We state our model and our minimum before an audit, so nobody spends time on a fit that was never
            going to work.
          </p>
        </div>
      </Section>

      <Section tone="cream" labelledBy="process">
        <Eyebrow className="text-forest">HOW WE WORK</Eyebrow>
        <SectionHeading id="process" className="mt-4">
          Audit. Build. Launch. Optimize. Scale.
        </SectionHeading>
        <ProcessSteps steps={processSteps} />
      </Section>

      <Section tone="white" labelledBy="measurement">
        <Eyebrow className="text-forest">THE STANDARD</Eyebrow>
        <SectionHeading id="measurement" className="mt-4">
          Every service is measured the same way.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Whatever platform the budget sits on, the chain is the same: click, lead, qualified, booked, closed.
            The tracking layer runs underneath all of it, and the outcomes at the right-hand end are sent back to
            the platforms so bidding learns from customers rather than from form fills.
          </p>
        </div>
        <MeasurementBlock />
      </Section>

      <CTASection location="section-services" />
    </>
  );
}
