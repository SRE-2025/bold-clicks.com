import Link from 'next/link';
import { footerNav, legalNav } from '@/content/nav';
import { isPending, site } from '@/content/site';
import { Logo } from './Logo';
import { Container } from './primitives';
import { PhoneLink } from './PhoneLink';

/**
 * Footer - Volume 1 s.12, Volume 2 s.29.
 *
 * Real details only. Every business detail is an owner input; each one renders
 * only once supplied, so the footer never shows a bracketed placeholder to a
 * visitor. The Stoneridge family line is always present (Volume 1 s.01).
 */
export function Footer() {
  const year = new Date().getFullYear();
  const showPhone = !isPending(site.contact.phone);
  const showEmail = !isPending(site.contact.email);
  const showAddress = site.contact.address.isPublic && !isPending(site.contact.address.street);
  const showLegalName = !isPending(site.legalName);
  const socials = Object.entries(site.profiles).filter(([, url]) => !isPending(url));

  return (
    <footer className="bg-black py-16 text-mist md:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="max-w-measure text-small-lg">{site.family.line}</p>
            {showAddress && (
              <address className="not-italic text-small-lg">
                {site.contact.address.street}
                <br />
                {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}
              </address>
            )}
            <ul className="space-y-2 text-small-lg">
              {showPhone && (
                <li>
                  <PhoneLink location="footer" className="hover:text-cream" />
                </li>
              )}
              {showEmail && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
                    {site.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-eyebrow uppercase text-gold md:text-eyebrow-lg">{group.heading}</h2>
              <ul className="mt-4 space-y-3 text-small-lg">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-cream">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-sage/30 pt-8 text-small md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {showLegalName ? site.legalName : site.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            {socials.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="me noopener" className="capitalize hover:text-cream">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
