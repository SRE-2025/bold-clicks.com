import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { CTASection } from './CTASection';
import { FAQAccordion } from './FAQAccordion';
import { Hero } from './Hero';
import { JsonLd } from './JsonLd';
import { BulletList, DeliverablesList, FirstHand, ProcessSteps } from './content-blocks';
import { Container, Eyebrow, Section, SectionHeading } from './primitives';
import { getRoute } from '@/content/routes';
import { site } from '@/content/site';
import type { Service } from '@/lib/schema';
import { breadcrumbSchema, serviceSchema } from '@/lib/seo';

/**
 * Service page template - Volume 1 s.05.
 *
 * Every section the template requires is present and in order: above the fold,
 * deliverables, measurement, process, proof, FAQ, CTA, internal links. Each of
 * the five platform pages supplies its own content; none of the copy lives
 * here, so a page cannot quietly become a clone of its neighbour.
 */
export function ServicePageTemplate({ service }: { service: Service }) {
  const related = service.relatedRoutes
    .map((path) => getRoute(path))
    .filter((r): r is NonNullable<typeof r> => Boolean(r) && r!.live);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          path: service.route,
        })}
      />
      <JsonLd data={breadcrumbSchema(service.route)} />

      <Hero
        eyebrow={service.eyebrow}
        headline={service.h1}
        subhead={service.intro}
        primaryCta={{ label: service.cta, href: site.primaryCta.href }}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path={service.route} />
        </Container>
      </div>

      <Section tone="cream" labelledBy="for-who">
        <Eyebrow on="light">WHO IT&rsquo;S FOR</Eyebrow>
        <SectionHeading id="for-who" className="mt-4">
          This page is written for a specific situation.
        </SectionHeading>
        <BulletList items={service.forWho} />
      </Section>

      <Section tone="white" labelledBy="deliverables">
        <Eyebrow on="light">WHAT&rsquo;S INCLUDED</Eyebrow>
        <SectionHeading id="deliverables" className="mt-4">
          What we actually do.
        </SectionHeading>
        <DeliverablesList items={service.deliverables} />
      </Section>

      <Section tone="cream" labelledBy="measurement">
        <Eyebrow on="light">MEASUREMENT</Eyebrow>
        <SectionHeading id="measurement" className="mt-4">
          How this gets measured.
        </SectionHeading>
        <BulletList items={service.measurement} />
        <FirstHand>{service.firstHand}</FirstHand>
      </Section>

      <Section tone="black" labelledBy="process">
        <Eyebrow>PROCESS</Eyebrow>
        <SectionHeading id="process" tone="light" className="mt-4">
          What the first 30 days look like.
        </SectionHeading>
        <ProcessSteps steps={service.process} tone="dark" />
      </Section>

      <Section tone="white" labelledBy="faq">
        <Eyebrow on="light">FAQ</Eyebrow>
        <SectionHeading id="faq" className="mt-4">
          Questions we get asked on sales calls.
        </SectionHeading>
        <FAQAccordion faqs={service.faqs} />
      </Section>

      {related.length > 0 && (
        <Section tone="cream" labelledBy="related">
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

      <CTASection location={`section-${service.slug}`} />
    </>
  );
}
