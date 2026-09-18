import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PendingNote } from '@/components/PendingNote';
import { Container, Eyebrow, Section } from '@/components/primitives';
import { isPending, site } from '@/content/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

/**
 * Terms of use - Volume 1 s.12.
 *
 * Covers the website only. Client engagements are governed by a separate
 * services agreement, and conflating the two here would be actively misleading.
 *
 * NOT LEGAL ADVICE: the owner should have counsel review before launch, and the
 * legal entity name and governing-law clause are owner inputs.
 */

export const metadata: Metadata = buildMetadata('/terms/');

export default function TermsPage() {
  const showLegalName = !isPending(site.legalName);

  return (
    <>
      <JsonLd data={breadcrumbSchema('/terms/')} />

      <div className="bg-cream">
        <Container>
          <Breadcrumbs path="/terms/" />
        </Container>
      </div>

      <Section tone="cream">
        <Eyebrow className="text-forest">LEGAL</Eyebrow>
        <h1 className="mt-4 text-h1 md:text-h1-lg">Terms of use</h1>

        <div className="prose-bc mt-8">
          <h2 className="text-h2">Scope</h2>
          <p>
            These terms apply to your use of bold-clicks.com. They do not govern any engagement to manage
            advertising accounts &mdash; that is covered by a separate written services agreement, and where the two
            differ, the services agreement controls.
          </p>

          <h2 className="text-h2">Who we are</h2>
          {showLegalName ? (
            <p>
              This site is operated by {site.legalName}, trading as {site.name}, based in Austin, Texas.
            </p>
          ) : (
            <>
              <p>This site is operated by {site.name}, based in Austin, Texas.</p>
              <PendingNote>
                The registered legal entity name is being added to this section before launch.
              </PendingNote>
            </>
          )}

          <h2 className="text-h2">The content here is general</h2>
          <p>
            Articles, frameworks, checklists and calculators on this site are published to be useful, not to be
            advice about your specific account. Advertising platforms change frequently; what was accurate when a
            page was written may not be accurate when you read it. We state review dates and update content when it
            materially changes, and we do not backdate them.
          </p>

          <h2 className="text-h2">No guaranteed results</h2>
          <p>
            Nothing on this site is a promise of a particular ranking, cost per lead, return on ad spend, or volume
            of customers. Where we publish figures they describe a stated account, over a stated date range, with
            the metric defined &mdash; they are not a forecast for yours.
          </p>

          <h2 className="text-h2">The free audit</h2>
          <p>
            The audit is offered at no cost and with no obligation. It requires read-only access to the accounts
            being reviewed, and we do not make changes to your accounts during an audit. We may decline to audit an
            account where there is a conflict or where there is not enough data to say anything useful.
          </p>

          <h2 className="text-h2">Your material</h2>
          <p>
            Anything you send us through this site remains yours. We use it to prepare a response and to contact
            you, as described in the{' '}
            <a href="/privacy/">privacy policy</a>. We do not publish client information, screenshots or results
            without written permission.
          </p>

          <h2 className="text-h2">Our material</h2>
          <p>
            The content and design of this site belong to us. You are welcome to quote or reference it with
            attribution and a link; republishing it wholesale is not permitted.
          </p>

          <h2 className="text-h2">Third-party links</h2>
          <p>
            We link to platform documentation and other external sources where it helps. We do not control those
            sites and are not responsible for their content.
          </p>

          <h2 className="text-h2">Governing law</h2>
          <PendingNote>
            The governing law and venue for these terms are being confirmed with counsel before launch.
          </PendingNote>

          <h2 className="text-h2">Changes</h2>
          <p>
            We may update these terms. Material changes are reflected in the review date on this page, and we do not
            change the date without changing the content.
          </p>
        </div>
      </Section>
    </>
  );
}
