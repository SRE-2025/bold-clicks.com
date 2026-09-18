import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { isPending, site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * About - Volume 2 s.30 outline.
 *
 * Volume 1 s.14: no stock photos, no invented team members, no "award-winning"
 * without the award in proof.json. The named-operator section is an owner input
 * and does not render until real people with real bios are supplied - inventing
 * a team is the single worst failure available on this page.
 */

export const metadata: Metadata = buildMetadata('/about/');

/** Populated from owner-supplied bios (Volume 2 s.35). Empty until then. */
const operators: { name: string; role: string; bio: string; linkedin?: string }[] = [];

export default function AboutPage() {
  const familyDescriptionReady = !isPending(site.family.description);

  return (
    <>
      <JsonLd data={breadcrumbSchema('/about/')} />

      <Hero
        eyebrow="ABOUT"
        headline="The paid-media arm of the Stoneridge family."
        subhead="Bold Clicks exists because paid media stopped being something an agency can do on the side. It is the only thing we do."
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/about/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="why-ads">
        <Eyebrow on="light">WHY WE ONLY RUN ADS</Eyebrow>
        <SectionHeading id="why-ads" className="mt-4">
          Specialisation is the whole argument.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            A full-service agency has to be adequate at eight things. Paid media punishes adequate. The platforms
            change constantly, the feedback loop between a bid and a booked customer runs through three systems, and
            the difference between a good account and a mediocre one is attention that a generalist cannot give it.
          </p>
          <p>
            So Bold Clicks does one job. We do not sell SEO, web design, social management, email or reputation
            work &mdash; {site.family.sisterAgency} handles those, and we would rather refer you than pretend.
          </p>
        </div>
      </Section>

      {operators.length > 0 ? (
        <Section tone="white" labelledBy="team">
          <Eyebrow on="light">WHO DOES THE WORK</Eyebrow>
          <SectionHeading id="team" className="mt-4">
            The people in your account.
          </SectionHeading>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {operators.map((person) => (
              <div key={person.name} className="border-t border-sage/40 pt-4">
                <h3 className="text-h3">{person.name}</h3>
                <p className="text-small-lg text-forest">{person.role}</p>
                <p className="mt-2 text-small-lg text-ink/80">{person.bio}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="white" labelledBy="how-we-work">
        <Eyebrow on="light">HOW WE WORK WITH CLIENTS</Eyebrow>
        <SectionHeading id="how-we-work" className="mt-4">
          Ownership, access and reporting.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            <strong>You own the accounts.</strong> We work inside ad accounts registered to your business. If the
            relationship ends you keep the campaigns, the conversion history and the data, and there is nothing to
            migrate.
          </p>
          <p>
            <strong>You get direct access.</strong> One accountable operator runs your account and answers your
            email. There is no account-manager layer relaying questions to someone you never meet.
          </p>
          <p>
            <strong>Reporting states what changed and why.</strong> Leads, qualified leads, booked calls and cost
            per qualified lead, by platform and campaign &mdash; plus the specific work done that month. Where your
            CRM records revenue, that goes in too.
          </p>
        </div>
      </Section>

      <Section tone="cream" labelledBy="family">
        <Eyebrow on="light">THE STONERIDGE FAMILY</Eyebrow>
        <SectionHeading id="family" className="mt-4">
          Where Bold Clicks sits.
        </SectionHeading>
        <div className="prose-bc mt-6">
          {familyDescriptionReady ? (
            <p>{site.family.description}</p>
          ) : (
            <p>
              Bold Clicks is the paid-media arm of the Stoneridge family, alongside{' '}
              <a href={site.family.sisterAgencyUrl} rel="noopener">
                {site.family.sisterAgency}
              </a>
              , which handles search, web and content work. Clients of either can be referred to the other where it
              genuinely helps, and neither sells the other&rsquo;s services as its own.
            </p>
          )}
        </div>
      </Section>

      <Section tone="white" labelledBy="where">
        <Eyebrow on="light">WHERE WE ARE</Eyebrow>
        <SectionHeading id="where" className="mt-4">
          Austin, Texas.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            We work from Austin with clients across the metro and Texas, and remotely with businesses in the
            surrounding states. Being here matters for the local accounts: knowing how the Williamson County
            corridor behaves differently from central Austin is not something you pick up from a dashboard.
          </p>
        </div>
      </Section>

      <CTASection location="section-about" />
    </>
  );
}
