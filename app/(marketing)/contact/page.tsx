import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookingLink } from '@/components/BookingLink';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { LeadForm } from '@/components/LeadForm';
import { PhoneLink } from '@/components/PhoneLink';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { isPending, site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/** Contact - Volume 1 s.03. Same form and same CRM routing as the audit page. */
export const metadata: Metadata = buildMetadata('/contact/');

export default function ContactPage() {
  const showPhone = !isPending(site.contact.phone);
  const showEmail = !isPending(site.contact.email);
  const showAddress = site.contact.address.isPublic && !isPending(site.contact.address.street);

  return (
    <>
      <JsonLd data={breadcrumbSchema('/contact/')} />

      <Hero
        eyebrow="CONTACT"
        headline="Talk to the person who&rsquo;d run your account."
        subhead="No qualifying call with a salesperson first. Send the form and you will hear from the operator who would actually be in your account."
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/contact/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="contact-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow className="text-forest">GET IN TOUCH</Eyebrow>
            <SectionHeading id="contact-heading" className="mt-4">
              Start with the audit.
            </SectionHeading>
            <div className="prose-bc mt-6">
              <p>
                The fastest way to find out whether we are a fit is to let us look at an account you already know
                the numbers for. It is free, it is written, and it is yours whether or not you hire us.
              </p>
            </div>

            {(showPhone || showEmail || showAddress) && (
              <dl className="mt-8 space-y-4 border-t border-sage/40 pt-6">
                {showPhone && (
                  <div>
                    <dt className="text-small text-ink/70">Phone</dt>
                    <dd className="text-body-lg">
                      <PhoneLink location="contact-page" className="text-forest underline underline-offset-4" />
                    </dd>
                  </div>
                )}
                {showEmail && (
                  <div>
                    <dt className="text-small text-ink/70">Email</dt>
                    <dd className="text-body-lg">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-forest underline underline-offset-4"
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {showAddress && (
                  <div>
                    <dt className="text-small text-ink/70">Office</dt>
                    <dd className="text-body-lg">
                      <address className="not-italic">
                        {site.contact.address.street}
                        <br />
                        {site.contact.address.locality}, {site.contact.address.region}{' '}
                        {site.contact.address.postalCode}
                      </address>
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-8">
              <BookingLink label="Book a call instead" />
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-card md:p-8">
            <h2 className="text-h2">Send us your account details</h2>
            <p className="mt-2 text-small-lg text-ink/70">
              We&rsquo;ll reply within one business hour, 9am&ndash;6pm CT.
            </p>
            <div className="mt-6">
              <LeadForm formId="contact" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
