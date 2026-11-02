import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PendingNote } from '@/components/PendingNote';
import { JsonLd } from '@/components/JsonLd';
import { Container, Eyebrow, Section } from '@/components/primitives';
import { isPending, site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Privacy policy - Volume 1 s.12, Volume 2 s.22.
 *
 * The vendor list below must match the actual tracking footprint. The annual
 * review and the "any new tag, cookie or vendor added" trigger both open a
 * refresh task against this page, and adding a tag without updating this list
 * is a consent violation rather than a documentation lapse.
 *
 * The owner and counsel still need to review the retention and jurisdiction
 * sections. Keep vendor claims tied to integrations that actually operate.
 */

export const metadata: Metadata = buildMetadata('/privacy/');

const vendors = [
  { name: 'AWS Amplify', purpose: 'Website hosting and operation', data: 'Page requests and operational logs', when: 'Necessary to serve the site' },
  { name: 'GoHighLevel', purpose: 'CRM for accepted enquiries', data: 'Name, email, phone, company, enquiry details and source data', when: 'Only after the form confirms delivery' },
];

export default function PrivacyPage() {
  const showEmail = !isPending(site.contact.email);

  return (
    <>
      <JsonLd data={breadcrumbSchema('/privacy/')} />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/privacy/" />
        </Container>
      </div>

      <Section tone="cream">
        <Eyebrow on="light">LEGAL</Eyebrow>
        <h1 className="mt-4 text-h1 md:text-h1-lg">Privacy policy</h1>

        <div className="prose-bc mt-8">
          <h2 className="text-h2">What this covers</h2>
          <p>
            This policy describes what data bold-clicks.com collects, why, who it is shared with, and what you can
            do about it. It covers this website. It does not cover the ad accounts we manage on behalf of clients,
            which are governed by the relevant services agreement.
          </p>

          <h2 className="text-h2">What we collect</h2>
          <p>
            <strong>When you submit a form:</strong> your name, business email, company or website, what you need
            help with, and optionally your phone number, industry and approximate monthly ad spend. We also attach
            the marketing source data described below so we know where the enquiry came from.
          </p>
          <p>
            <strong>Marketing source data:</strong> campaign parameters in the URL you arrived on (utm_source,
            utm_medium, utm_campaign, utm_content, utm_term), advertising click identifiers (gclid, gbraid, wbraid,
            fbclid, msclkid), the page you landed on, and the referring site. First-touch values are stored in a
            first-party cookie for 365 days; last-touch values are stored for the current browser session only.
          </p>
          <p>
            <strong>Analytics data:</strong> optional analytics and advertising tags are not active on this site yet.
            If they are added, this policy and the consent controls will be updated before they load.
          </p>

          <h2 className="text-h2">Consent</h2>
          <p>
            Advertising and analytics storage are denied by default. No optional analytics or advertising tags
            currently load. The first-party attribution cookie records how you reached the site so that an enquiry
            can be attributed if delivery succeeds.
          </p>
          <p>
            We do not currently upload form details to advertising platforms.
          </p>

          <h2 className="text-h2">Who receives your data</h2>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-small-lg">
            <caption className="sr-only">Hosting and enquiry systems</caption>
            <thead>
              <tr className="border-b border-sage text-left">
                <th scope="col" className="py-3 pr-4 font-semibold">Vendor</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Purpose</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Data</th>
                <th scope="col" className="py-3 font-semibold">When</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.name} className="border-b border-sage/40 align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-semibold">{vendor.name}</th>
                  <td className="py-3 pr-4">{vendor.purpose}</td>
                  <td className="py-3 pr-4">{vendor.data}</td>
                  <td className="py-3">{vendor.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-bc mt-8">
          <h2 className="text-h2">How long we keep it</h2>
          <p>
            A form submission reaches our CRM only when the form confirms delivery. If delivery fails, the form
            reports an error and we cannot recover your contact details from the redacted server logs. The
            first-touch attribution cookie expires after 365 days.
          </p>
          <PendingNote>
            The retention period for successfully delivered enquiries and operational logs is under review.
          </PendingNote>

          <h2 className="text-h2">Your choices</h2>
          <p>
            You can clear site cookies in your browser and ask us to delete enquiry data we hold about you. A public
            contact address for privacy requests is being added below.
          </p>

          <h2 className="text-h2">Jurisdictions</h2>
          <p>
            Bold Clicks operates from Texas and serves businesses in the United States.
          </p>
          <PendingNote>
            The applicable privacy regimes and consent controls are being reviewed with counsel.
          </PendingNote>

          <h2 className="text-h2">Contact</h2>
          {showEmail ? (
            <p>
              Privacy questions and data requests:{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ) : (
            <PendingNote>
              A published contact address for privacy requests is being added.
            </PendingNote>
          )}
        </div>
      </Section>
    </>
  );
}
