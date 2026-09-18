import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/Analytics';
import { ConsentDefaults } from '@/components/ConsentDefaults';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/content/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

/**
 * Root layout.
 *
 * Fonts: Volume 2 s.28 allows two self-hosted WOFF2 files at most. Until the
 * owner approves a family, both roles resolve to the system stack declared in
 * tailwind.config.ts - which costs nothing and shifts nothing. To install:
 * add next/font/local declarations here and set --font-display / --font-body.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Paid Media Agency for Lead Generation | Bold Clicks',
    template: '%s',
  },
  description: site.positioning,
  applicationName: site.name,
  // No icons declared: Volume 1 s.15 requires the favicon to be generated from
  // the approved mark, which has not been supplied. Declaring a path to a file
  // that does not exist would ship a 404 on every page. Add
  // `icons: { icon: '/favicon.svg' }` once /public/brand holds the real asset.
};

export const viewport: Viewport = {
  themeColor: '#0B0D0C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/*
          Consent defaults must run before GTM, and GTM is injected
          afterInteractive - so the first node in <body> is early enough.

          It deliberately does NOT go in an explicit <head>: rendering one in an
          App Router root layout makes React drop Next's injected metadata on
          hydration, which silently stripped <title>, lang, the meta description
          and the canonical from the live DOM.
        */}
        <ConsentDefaults />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
