import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Container } from '@/components/primitives';
import { legalNav } from '@/content/nav';
import { site } from '@/content/site';

/**
 * Landing layout - Volume 1 s.04 paid landing-page system, Volume 2 s.30.
 *
 * Logo, no navigation, one conversion action. Minimal exits: the only links are
 * the logo and the legal pages the form's consent text has to reference.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-black py-4">
        <Container>
          <div className="flex items-center justify-between">
            {/* See components/Logo.tsx: the visible wordmark is the accessible
                name; an aria-label here would override it and fail WCAG 2.5.3. */}
            <Link href="/">
              <Logo tone="light" />
            </Link>
            <p className="hidden text-small-lg text-mist sm:block">{site.tagline}</p>
          </div>
        </Container>
      </header>

      <main id="main">{children}</main>

      <footer className="bg-black py-8 text-mist">
        <Container>
          <div className="flex flex-col gap-4 text-small sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. {site.family.line}
            </p>
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </footer>
    </>
  );
}
