import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Case studies hub - Volume 1 s.03, s.06.
 *
 * No case studies exist yet. Rather than an empty grid or invented cards, the
 * page publishes the standard each study will be held to - which is itself
 * useful to a buyer comparing agencies, and is the honest version of this page.
 *
 * Studies appear here automatically once content/case-studies holds an entry
 * with permissionOnFile and verifiedAt (the case-study-trigger job drafts them
 * from the CRM; a human still merges the PR).
 */

export const metadata: Metadata = buildMetadata('/case-studies/');

const standard = [
  {
    heading: 'Client profile, not a logo wall',
    body: 'Industry, geography and business model. The client name appears only where we have written permission to use it.',
  },
  {
    heading: 'The starting point, honestly stated',
    body: 'What was wrong or constrained before we arrived, including the parts that were not the previous agency’s fault.',
  },
  {
    heading: 'What we changed',
    body: 'Campaign structure, tracking, audiences, creative, landing pages, budget allocation — specifically, so another operator could evaluate the decisions.',
  },
  {
    heading: 'Metrics with definitions',
    body: 'Every figure states what the metric means, the date range it covers, and who verified it. A percentage with no denominator is not a result.',
  },
  {
    heading: 'Context that could undercut the story',
    body: 'If spend changed, the season helped, or the offer improved at the same time, it is in the study. Omitting it would make the number misleading.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('/case-studies/')} />

      <Hero
        eyebrow="CASE STUDIES"
        headline="Proof, with the numbers defined."
        subhead="We would rather publish three studies you can check than thirty you cannot. Here is the standard every one of ours has to meet before it goes up."
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/case-studies/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="status">
        <Eyebrow on="light">CURRENT STATUS</Eyebrow>
        <SectionHeading id="status" className="mt-4">
          Our first case studies are in progress.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            Bold Clicks is new. Publishing borrowed results from a sister agency, or figures a client has not
            approved, would be the fastest way to lose the only thing that makes a case study worth reading.
          </p>
          <p>
            In the meantime, the audit is the substitute we can actually offer: we look at an account whose numbers
            you already know, and you judge the findings against reality rather than against a slide.
          </p>
        </div>
      </Section>

      <Section tone="white" labelledBy="standard">
        <Eyebrow on="light">THE STANDARD</Eyebrow>
        <SectionHeading id="standard" className="mt-4">
          What will be in every study we publish.
        </SectionHeading>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {standard.map((item) => (
            <div key={item.heading} className="border-t border-sage/40 pt-4">
              <h3 className="text-h3">{item.heading}</h3>
              <p className="mt-2 text-small-lg text-ink/80">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection location="section-case-studies" />
    </>
  );
}
