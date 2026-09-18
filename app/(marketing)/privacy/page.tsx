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
 * NOT LEGAL ADVICE: this is a factual description of the site's data handling,
 * written to be accurate. The owner should have counsel review it before launch,
 * particularly the jurisdictions section.
 */

export const metadata: Metadata = buildMetadata('/privacy/');

const vendors = [
  { name: 'Google Analytics 4', purpose: 'Site analytics', data: 'Pseudonymous usage data, client ID', consent: 'analytics_storage' },
  { name: 'Google Ads', purpose: 'Advertising measurement and remarketing', data: 'Click identifiers, hashed contact data for enhanced conversions', consent: 'ad_storage, ad_user_data' },
  { name: 'Google Tag Manager', purpose: 'Tag delivery', data: 'No data collected by the container itself', consent: 'n/a' },
  { name: 'Meta', purpose: 'Advertising measurement', data: 'Click identifiers, pseudonymous event data', consent: 'ad_storage' },
  { name: 'Microsoft Advertising', purpose: 'Advertising measurement', data: 'Click identifiers, pseudonymous event data', consent: 'ad_storage' },
  { name: 'GoHighLevel', purpose: 'CRM for enquiries', data: 'Name, email, phone, company, enquiry details, source data', consent: 'Given by submitting the form' },
  { name: 'Cloudflare Turnstile', purpose: 'Spam prevention on forms', data: 'Device and behavioural signals used to score risk', consent: 'Strictly necessary' },
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
            <strong>Analytics data:</strong> pseudonymous usage data about pages viewed and actions taken, collected
            only where you have consented to analytics storage.
          </p>

          <h2 className="text-h2">Consent</h2>
          <p>
            Advertising and analytics storage are denied by default until you consent. Strictly necessary
            functionality &mdash; including the first-party attribution cookie the site needs to route your enquiry
            correctly &mdash; operates without consent, as it is required to deliver the service you asked for.
          </p>
          <p>
            Where you do not consent to advertising data being used, we do not upload your details to advertising
            platforms, and we record that the upload was skipped and why.
          </p>

          <h2 className="text-h2">Who receives your data</h2>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-small-lg">
            <caption className="sr-only">Vendors that receive data from this website</caption>
            <thead>
              <tr className="border-b border-sage text-left">
                <th scope="col" className="py-3 pr-4 font-semibold">Vendor</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Purpose</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Data</th>
                <th scope="col" className="py-3 font-semibold">Consent signal</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.name} className="border-b border-sage/40 align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-semibold">{vendor.name}</th>
                  <td className="py-3 pr-4">{vendor.purpose}</td>
                  <td className="py-3 pr-4">{vendor.data}</td>
                  <td className="py-3">{vendor.consent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose-bc mt-8">
          <h2 className="text-h2">How long we keep it</h2>
          <p>
            Enquiry records are retained in our CRM for as long as we have a business relationship or a reasonable
            prospect of one. Server-side submission logs are retained in redacted form for 30 days so that a lost
            enquiry can be recovered. The first-touch attribution cookie expires after 365 days.
          </p>

          <h2 className="text-h2">Your choices</h2>
          <p>
            You can withdraw consent at any time through the consent controls on this site, clear cookies in your
            browser, and ask us to delete the enquiry data we hold about you.
          </p>

          <h2 className="text-h2">Jurisdictions</h2>
          <p>
            Bold Clicks operates from Texas and serves businesses in the United States. Consent controls on this
            site apply to all visitors regardless of location.
          </p>
          <PendingNote>
            The specific privacy regimes named in this section, and the matching consent-banner configuration, are
            being finalised with counsel before launch.
          </PendingNote>

          <h2 className="text-h2">Contact</h2>
          {showEmail ? (
            <p>
              Privacy questions and data requests:{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ) : (
            <PendingNote>
              A published contact address for privacy requests is being added before launch.
            </PendingNote>
          )}
        </div>
      </Section>
    </>
  );
}
