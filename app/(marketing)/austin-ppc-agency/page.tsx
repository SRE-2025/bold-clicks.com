import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { PhoneLink } from '@/components/PhoneLink';
import { IndustryGrid } from '@/components/cards';
import { FirstHand } from '@/components/content-blocks';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/primitives';
import { getLocation } from '@/content/locations';
import { isPending, site } from '@/content/site';
import { breadcrumbSchema, buildMetadata, serviceSchema } from '@/lib/seo';

/**
 * Austin page - Volume 2 s.18 and s.30.
 *
 * The only location page at launch. Volume 2 requires it to contain
 * Austin-specific market commentary, a service radius, local proof or account
 * lessons, local FAQs, and internal links to every service page - and to pass
 * the doorway test (`pnpm audit:doorway`), which fails any location page
 * sharing more than 60% of its body with another one.
 *
 * Schema: LocalBusiness only with a real public address (Volume 2 appendix B).
 * Until the owner confirms a staffed office, this is a Service node with
 * areaServed, which is true rather than convenient.
 */

export const metadata: Metadata = buildMetadata('/austin-ppc-agency/');

/**
 * Austin-specific observations. Volume 2 s.18 wants CPC ranges by vertical from
 * Bold Clicks' own accounts; until those are approved facts, the page carries
 * qualitative market structure - which is defensible and still could not be
 * written about another metro.
 */
const austinMarketNotes = [
  {
    heading: 'The metro is three markets wearing one name',
    body: 'Central Austin, the Williamson County corridor through Round Rock, Cedar Park and Georgetown, and the Hays County side down through Kyle, Buda and San Marcos have different competitive density and different drive-time economics. A single radius around downtown overpays in the middle and misses the edges.',
  },
  {
    heading: 'Storm season moves demand more than the calendar does',
    body: 'For roofing, restoration and HVAC, the demand curve here is driven by weather events rather than months. Budgets and bid strategies set on a rolling average are set for a week that never happens, and campaign learning lags the spike by exactly the period when leads are cheapest.',
  },
  {
    heading: 'The suburbs compete differently from the core',
    body: 'Dental, orthodontic and med-spa competition in the northern suburbs behaves differently from central Austin: more practices per square mile chasing a similar household profile, and a search radius that overlaps heavily between them. Service-area strategy matters more here than ad copy.',
  },
  {
    heading: 'Event weeks are mostly noise for local service advertisers',
    body: 'SXSW, ACL and F1 weekend change traffic patterns and hotel prices, and for most local service businesses they change very little about paid search demand. They are worth planning around for capacity, not for bidding.',
  },
];

export default function AustinPage() {
  const location = getLocation('austin-ppc-agency');
  if (!location) notFound();

  const showAddress = site.contact.address.isPublic && !isPending(site.contact.address.street);
  const showGbp = !isPending(site.contact.gbpUrl);
  const showPhone = !isPending(site.contact.phone);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Paid media management in Austin, Texas',
          description:
            'Google, Meta, Microsoft and YouTube advertising managed for businesses across the Austin metro.',
          path: '/austin-ppc-agency/',
        })}
      />
      <JsonLd data={breadcrumbSchema('/austin-ppc-agency/')} />

      <Hero
        eyebrow="AUSTIN, TEXAS"
        headline="Austin&rsquo;s paid-media specialists."
        subhead={`Bold Clicks is an Austin-based agency that does one thing: run ads that produce qualified leads for local businesses. We work with clients across the metro — ${location.serviceRadius.slice(1, 8).join(', ')} — and across Texas.`}
        primaryCta={site.primaryCta}
      />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/austin-ppc-agency/" />
        </Container>
      </div>

      <Section tone="cream" labelledBy="market">
        <Eyebrow className="text-forest">THE AUSTIN MARKET</Eyebrow>
        <SectionHeading id="market" className="mt-4">
          What advertising in Austin actually looks like.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>{location.marketCommentary}</p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {austinMarketNotes.map((note) => (
            <div key={note.heading} className="border-t border-sage/40 pt-4">
              <h3 className="text-h3">{note.heading}</h3>
              <p className="mt-2 text-small-lg text-ink/80">{note.body}</p>
            </div>
          ))}
        </div>

        {/*
          Volume 2 s.18 wants CPC ranges by vertical from Bold Clicks' own
          accounts, with methodology disclosed. That is an approved-fact input;
          the block renders once it exists.
        */}
        <FirstHand label="From our Austin accounts">
          {'[OWNER: Austin CPC ranges and competitive observations by vertical, with date range and account count, so the methodology can be stated.]'}
        </FirstHand>
      </Section>

      <Section tone="white" labelledBy="industries">
        <Eyebrow className="text-forest">INDUSTRIES WE SERVE IN AUSTIN</Eyebrow>
        <SectionHeading id="industries" className="mt-4">
          Where a lead here is worth real money.
        </SectionHeading>
        <div className="mt-8">
          <IndustryGrid />
        </div>
      </Section>

      {/*
        Volume 2 s.18: "if none yet, render 'Austin account lessons' from
        approved first-hand facts instead - never an empty section, never fake
        cards." There are no verified Austin case studies, so this section
        states the standard rather than showing placeholder cards.
      */}
      <Section tone="cream" labelledBy="austin-proof">
        <Eyebrow className="text-forest">AUSTIN PROOF</Eyebrow>
        <SectionHeading id="austin-proof" className="mt-4">
          Austin account lessons.
        </SectionHeading>
        <div className="prose-bc mt-6">
          <p>
            We publish Austin case studies when an Austin client has approved the figures and we can define each
            one: what the metric means, over what date range, and what else changed at the same time.
          </p>
          <p>
            Until then, the useful thing we can offer a local business is the audit itself &mdash; run against an
            account whose numbers you already know, so the findings are checkable rather than claimed.
          </p>
        </div>
      </Section>

      <Section tone="white" labelledBy="services-links">
        <Eyebrow className="text-forest">WHAT WE MANAGE</Eyebrow>
        <SectionHeading id="services-links" className="mt-4">
          Every platform, from Austin.
        </SectionHeading>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            { href: '/google-ads-management/', label: 'Google Ads management' },
            { href: '/meta-ads-management/', label: 'Meta Ads management' },
            { href: '/microsoft-ads-management/', label: 'Microsoft Ads management' },
            { href: '/youtube-ads-management/', label: 'YouTube Ads management' },
            { href: '/conversion-tracking/', label: 'Conversion tracking and attribution' },
            { href: '/services/', label: 'All paid media services' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-body-lg text-forest underline underline-offset-4 hover:text-black"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" labelledBy="service-area">
        <Eyebrow className="text-forest">SERVICE AREA</Eyebrow>
        <SectionHeading id="service-area" className="mt-4">
          Where our Austin clients are.
        </SectionHeading>
        <p className="mt-6 max-w-measure text-body md:text-body-lg">
          {location.serviceRadius.join(' · ')}
        </p>

        {(showAddress || showPhone || showGbp) && (
          <div className="mt-8 space-y-3 border-t border-sage/40 pt-6 text-body-lg">
            {showAddress && (
              <address className="not-italic">
                {site.contact.address.street}
                <br />
                {site.contact.address.locality}, {site.contact.address.region}{' '}
                {site.contact.address.postalCode}
              </address>
            )}
            {showPhone && <PhoneLink location="austin-page" className="text-forest underline underline-offset-4" />}
            {showGbp && (
              <p>
                <a
                  href={site.contact.gbpUrl}
                  rel="noopener"
                  className="text-forest underline underline-offset-4 hover:text-black"
                >
                  Find us on Google
                </a>
              </p>
            )}
          </div>
        )}
      </Section>

      <Section tone="white" labelledBy="local-faq">
        <Eyebrow className="text-forest">LOCAL FAQ</Eyebrow>
        <SectionHeading id="local-faq" className="mt-4">
          Questions from Austin businesses.
        </SectionHeading>
        <FAQAccordion faqs={location.localFaqs} />
      </Section>

      <CTASection location="section-austin" />
    </>
  );
}
