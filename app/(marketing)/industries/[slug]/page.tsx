import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { BulletList, DeliverablesList, FirstHand } from '@/components/content-blocks';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { getIndustry, publishableIndustries } from '@/content/industries';
import { getRoute } from '@/content/routes';
import { site } from '@/content/site';
import { breadcrumbSchema, buildContentMetadata, serviceSchema } from '@/lib/seo';

/**
 * Industry page template - Volume 1 s.06, Volume 2 s.28.
 *
 * Only publishable industries generate a route, so a vertical the team cannot
 * speak to is not reachable at all rather than reachable and thin.
 *
 * The required sections (audience behaviour, campaign structure, waste
 * patterns, KPIs, objections, proof, FAQs) all come from content; the template
 * holds no vertical copy, which is what stops these pages becoming a spun set.
 */

export function generateStaticParams() {
  return publishableIndustries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildContentMetadata(industry.route, industry);
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const related = industry.relatedRoutes
    .map((path) => getRoute(path))
    .filter((r): r is NonNullable<typeof r> => Boolean(r) && r!.live);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Paid media for ${industry.title.toLowerCase()}`,
          description: industry.metaDescription,
          path: industry.route,
          audienceType: industry.title,
        })}
      />
      <JsonLd data={breadcrumbSchema(industry.route)} />

      <Hero
        eyebrow={industry.eyebrow}
        headline={industry.h1}
        subhead={industry.intro}
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path={industry.route} />
        </Container>
      </div>

      <Section tone="cream" labelledBy="audience">
        <Eyebrow on="light">HOW BUYERS BEHAVE</Eyebrow>
        <SectionHeading id="audience" className="mt-4">
          What search looks like in this vertical.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>{industry.audienceBehavior}</p>
        </div>
        <FirstHand>{industry.firstHand}</FirstHand>
      </Section>

      <Section tone="white" labelledBy="structure">
        <Eyebrow on="light">CAMPAIGN STRUCTURE</Eyebrow>
        <SectionHeading id="structure" className="mt-4">
          How we build the account.
        </SectionHeading>
        <DeliverablesList items={industry.campaignStructure} />
      </Section>

      <Section tone="cream" labelledBy="waste">
        <Eyebrow on="light">WASTE PATTERNS</Eyebrow>
        <SectionHeading id="waste" className="mt-4">
          Where the money goes in accounts we audit.
        </SectionHeading>
        <BulletList items={industry.wastePatterns} />
      </Section>

      <Section tone="white" labelledBy="kpis">
        <Eyebrow on="light">WHAT WE REPORT</Eyebrow>
        <SectionHeading id="kpis" className="mt-4">
          The numbers that decide whether this worked.
        </SectionHeading>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {industry.kpis.map((kpi) => (
            <div key={kpi.name} className="border-t border-sage/40 pt-4">
              <dt className="text-h3 text-black">{kpi.name}</dt>
              <dd className="mt-2 text-small-lg text-ink/80">{kpi.definition}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="black" labelledBy="objections">
        <Eyebrow>WHAT WE HEAR</Eyebrow>
        <SectionHeading id="objections" tone="light" className="mt-4">
          The objections, answered.
        </SectionHeading>
        <div className="mt-8 space-y-8">
          {industry.objections.map((item) => (
            <div key={item.objection} className="max-w-measure border-l-2 border-gold pl-6">
              <p className="text-h3 text-cream">&ldquo;{item.objection}&rdquo;</p>
              <p className="mt-3 text-body text-mist md:text-body-lg">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" labelledBy="faq">
        <Eyebrow on="light">FAQ</Eyebrow>
        <SectionHeading id="faq" className="mt-4">
          Questions from {industry.title.toLowerCase()} businesses.
        </SectionHeading>
        <FAQAccordion faqs={industry.faqs} />
      </Section>

      {related.length > 0 && (
        <Section tone="white" labelledBy="related">
          <SectionHeading id="related">Related reading</SectionHeading>
          <ul className="mt-6 space-y-3">
            {related.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="text-body-lg text-forest underline underline-offset-4 hover:text-black"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection location={`section-industry-${industry.slug}`} />
    </>
  );
}
