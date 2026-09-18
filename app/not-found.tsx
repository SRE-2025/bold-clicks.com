import Link from 'next/link';
import { Container } from '@/components/primitives';
import { CtaButton } from '@/components/CtaButton';
import { site } from '@/content/site';

/**
 * 404. Returns a real 404 status (Next.js does this for not-found), which the
 * pre-launch crawl asserts - a soft 404 returning 200 is a listed failure.
 */
export default function NotFound() {
  return (
    <main id="main" className="bg-black py-24">
      <Container>
        <div className="max-w-measure">
          <p className="text-eyebrow uppercase text-gold md:text-eyebrow-lg">404</p>
          <h1 className="mt-4 text-h1 text-cream md:text-h1-lg">That page isn&rsquo;t here.</h1>
          <p className="mt-6 text-body text-mist md:text-body-lg">
            The link may be out of date, or the page may have moved. The quickest routes back:
          </p>
          <ul className="mt-6 space-y-3 text-body-lg">
            <li>
              <Link href="/services/" className="text-gold underline underline-offset-4 hover:text-cream">
                What we manage
              </Link>
            </li>
            <li>
              <Link href="/industries/" className="text-gold underline underline-offset-4 hover:text-cream">
                Industries we work in
              </Link>
            </li>
            <li>
              <Link href="/austin-ppc-agency/" className="text-gold underline underline-offset-4 hover:text-cream">
                Paid media in Austin
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <CtaButton
              href={site.primaryCta.href}
              label={site.primaryCta.label}
              location="section-404"
              variant="onDark"
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
