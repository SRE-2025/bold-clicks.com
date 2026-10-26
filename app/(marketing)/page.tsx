import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Hero } from '@/components/Hero';
import { ProofStrip } from '@/components/ProofStrip';
import { ServiceGrid, IndustryGrid } from '@/components/cards';
import { BulletList, MeasurementBlock, ProcessSteps } from '@/components/content-blocks';
import { Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { homepageFaqs } from '@/content/faqs';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

/**
 * Homepage - Volume 1 s.04 blueprint, Volume 2 s.30 copy.
 *
 * Section order follows the blueprint exactly: hero, proof, problem, what we
 * manage, why, how it works, case studies, industries, measurement, FAQ, CTA.
 * The exact owner-supplied logo appears beside the desktop hero. No slider or modal.
 */

export const metadata: Metadata = buildMetadata('/');

export default function HomePage() {
  return (
    <>
      <Hero
        size="home"
        eyebrow={home.eyebrow}
        headline={site.tagline}
        subhead={home.subhead}
        primaryCta={site.primaryCta}
        secondaryCta={site.secondaryCta}
        proofLine={home.proofLine}
      />

      <ProofStrip />

      {/* 3. The problem */}
      <Section tone="cream" labelledBy="problem-heading">
        <Eyebrow on="light">THE PROBLEM</Eyebrow>
        <SectionHeading id="problem-heading" className="mt-4">
          {home.problemHeading}
        </SectionHeading>
        <div className="prose-bc mt-6 text-body md:text-body-lg">
          <p>{home.problemBody}</p>
        </div>
      </Section>

      {/* 4. What we manage */}
      <Section tone="white" labelledBy="services-heading">
        <Eyebrow on="light">WHAT WE MANAGE</Eyebrow>
        <SectionHeading id="services-heading" className="mt-4">
          {home.servicesHeading}
        </SectionHeading>
        <div className="mt-8">
          <ServiceGrid />
        </div>
      </Section>

      {/* 5. Why Bold Clicks */}
      <Section tone="cream" labelledBy="why-heading">
        <Eyebrow on="light">WHY BOLD CLICKS</Eyebrow>
        <SectionHeading id="why-heading" className="mt-4">
          {home.whyHeading}
        </SectionHeading>
        <BulletList items={home.why} />
      </Section>

      {/* 6. How it works */}
      <Section tone="black" labelledBy="process-heading">
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <SectionHeading id="process-heading" tone="light" className="mt-4">
          {home.processHeading}
        </SectionHeading>
        <ProcessSteps steps={home.process} tone="dark" />
      </Section>

      {/*
        7. Case studies. There are no verified case studies yet, so rather than
        an empty section or invented cards, the section states the standard the
        proof will be held to. Volume 1 s.04: credible process proof, never
        filler. CaseStudyCard renders here once content/case-studies has an
        entry with permissionOnFile and verifiedAt.
      */}
      <Section tone="white" labelledBy="proof-heading">
        <Eyebrow on="light">CASE STUDIES</Eyebrow>
        <SectionHeading id="proof-heading" className="mt-4">
          Proof, with the numbers defined.
        </SectionHeading>
        <div className="prose-bc mt-6 text-body md:text-body-lg">
          <p>
            We publish a case study only when the client has approved it and the figures can be defined: what the
            metric means, over what date range, and what else changed at the same time. No blended percentages
            without a denominator, and no results borrowed from a sister agency.
          </p>
          <p>{home.proofStatus}</p>
        </div>
      </Section>

      {/* 8. Industries */}
      <Section tone="cream" labelledBy="industries-heading">
        <Eyebrow on="light">INDUSTRIES</Eyebrow>
        <SectionHeading id="industries-heading" className="mt-4">
          {home.industriesHeading}
        </SectionHeading>
        <p className="mt-6 max-w-measure text-body text-ink/80">{home.industriesNote}</p>
        <div className="mt-8">
          <IndustryGrid />
        </div>
      </Section>

      {/* 9. Measurement */}
      <Section tone="white" labelledBy="measurement-heading">
        <Eyebrow on="light">MEASUREMENT</Eyebrow>
        <SectionHeading id="measurement-heading" className="mt-4">
          {home.measurementHeading}
        </SectionHeading>
        <div className="prose-bc mt-6 text-body md:text-body-lg">
          <p>{home.measurementBody}</p>
        </div>
        <MeasurementBlock />
      </Section>

      {/* 10. FAQ */}
      <Section tone="cream" labelledBy="faq-heading">
        <Eyebrow on="light">FAQ</Eyebrow>
        <SectionHeading id="faq-heading" className="mt-4">
          Straight answers.
        </SectionHeading>
        <FAQAccordion faqs={homepageFaqs} />
      </Section>

      {/* 11. Final CTA */}
      <CTASection
        eyebrow={home.eyebrow}
        headline={home.finalCta.headline}
        body={home.finalCta.body}
        ctaLabel={home.finalCta.label}
        ctaHref={home.finalCta.href}
      />
    </>
  );
}
