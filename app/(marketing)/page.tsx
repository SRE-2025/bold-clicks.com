import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Hero } from '@/components/Hero';
import { ProofStrip } from '@/components/ProofStrip';
import { ServiceGrid, IndustryGrid } from '@/components/cards';
import { BulletList, MeasurementBlock, ProcessSteps } from '@/components/content-blocks';
import { Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { homepageFaqs } from '@/content/faqs';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

/**
 * Homepage - Volume 1 s.04 blueprint, Volume 2 s.30 copy.
 *
 * Section order follows the blueprint exactly: hero, proof, problem, what we
 * manage, why, how it works, case studies, industries, measurement, FAQ, CTA.
 * No hero image, no slider, no modal. The H1 is the LCP element.
 */

export const metadata: Metadata = buildMetadata('/');

/**
 * Volume 2 s.30 offers two hero proof lines: a quantified one
 * ("Managing $X/month across Y accounts") and a pre-proof fallback. The
 * quantified version needs an approved fact id, so the fallback stands until
 * the owner supplies one - stated as capability, not as a measurement.
 */
const HERO_PROOF_FACT_ID: string | null = null;
const proofLine = HERO_PROOF_FACT_ID
  ? null
  : 'Specialists in paid media for healthcare, legal and home-services businesses across Texas.';

const processSteps = [
  {
    name: 'Audit',
    whatYouGet: 'We review your accounts, tracking and landing pages and show you exactly where spend is leaking.',
  },
  {
    name: 'Build or rebuild',
    whatYouGet: 'Campaign structure, conversion tracking, negatives, creative and landing pages set up right.',
  },
  {
    name: 'Launch',
    whatYouGet: 'Live with tracking verified before the first dollar is spent.',
  },
  {
    name: 'Optimize',
    whatYouGet: 'Weekly search-term, bid, creative and budget work tied to lead-quality feedback from your CRM.',
  },
  {
    name: 'Scale',
    whatYouGet: 'When cost per qualified lead is proven, we add budget and platforms deliberately.',
  },
];

const whyBoldClicks = [
  'Ads are the only thing we do, so we get very good at them.',
  'You own your ad accounts and your data — always.',
  'Every call, form and booked meeting is tracked to its source.',
  'We report on qualified leads and revenue, not impressions.',
  'One accountable operator, direct access, no account-manager layer.',
];

export default function HomePage() {
  return (
    <>
      <Hero
        size="home"
        eyebrow="PAID MEDIA, BUILT TO PERFORM"
        headline={site.tagline}
        subhead={
          'Google, Meta, Microsoft and YouTube campaigns built around qualified leads, booked calls and revenue — with tracking that shows what actually worked.'
        }
        primaryCta={site.primaryCta}
        secondaryCta={site.secondaryCta}
        proofLine={proofLine}
      />

      <ProofStrip />

      {/* 3. The problem */}
      <Section tone="cream" labelledBy="problem-heading">
        <Eyebrow on="light">THE PROBLEM</Eyebrow>
        <SectionHeading id="problem-heading" className="mt-4">
          Most ad accounts leak money in the same five places.
        </SectionHeading>
        <div className="prose-bc mt-6 text-body md:text-body-lg">
          <p>
            Search terms nobody reviews. Conversions that count every dial as a lead. Landing pages that don&rsquo;t
            match the ad. Budgets spread across campaigns that never had a chance. Reports that stop at clicks. We fix
            those first, because that&rsquo;s where the money is.
          </p>
        </div>
      </Section>

      {/* 4. What we manage */}
      <Section tone="white" labelledBy="services-heading">
        <Eyebrow on="light">WHAT WE MANAGE</Eyebrow>
        <SectionHeading id="services-heading" className="mt-4">
          Four platforms. One job: leads that close.
        </SectionHeading>
        <div className="mt-8">
          <ServiceGrid />
        </div>
      </Section>

      {/* 5. Why Bold Clicks */}
      <Section tone="cream" labelledBy="why-heading">
        <Eyebrow on="light">WHY BOLD CLICKS</Eyebrow>
        <SectionHeading id="why-heading" className="mt-4">
          Specialists, not generalists.
        </SectionHeading>
        <BulletList items={whyBoldClicks} />
      </Section>

      {/* 6. How it works */}
      <Section tone="black" labelledBy="process-heading">
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <SectionHeading id="process-heading" tone="light" className="mt-4">
          Audit. Build. Launch. Optimize. Scale.
        </SectionHeading>
        <ProcessSteps steps={processSteps} tone="dark" />
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
          <p>
            Our first case studies are in progress. Until they are verified, the fastest way to judge how we work is
            to let us audit an account you already know the numbers for.
          </p>
        </div>
      </Section>

      {/* 8. Industries */}
      <Section tone="cream" labelledBy="industries-heading">
        <Eyebrow on="light">INDUSTRIES</Eyebrow>
        <SectionHeading id="industries-heading" className="mt-4">
          Built for businesses where a lead is worth real money.
        </SectionHeading>
        <div className="mt-8">
          <IndustryGrid />
        </div>
      </Section>

      {/* 9. Measurement */}
      <Section tone="white" labelledBy="measurement-heading">
        <Eyebrow on="light">MEASUREMENT</Eyebrow>
        <SectionHeading id="measurement-heading" className="mt-4">
          A lead is not the finish line.
        </SectionHeading>
        <div className="prose-bc mt-6 text-body md:text-body-lg">
          <p>
            We track the click, the call, the form, the booked appointment and &mdash; where your CRM allows &mdash;
            the closed customer. Then we send that back to Google and Meta so the algorithms optimize for people who
            actually buy.
          </p>
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
      <CTASection />
    </>
  );
}
