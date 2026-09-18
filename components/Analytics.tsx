'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/**
 * Tag layer - Volume 2 s.32.
 *
 * Consent Mode v2 defaults are set by <ConsentDefaults /> in the document head,
 * which runs before this loads GTM. That ordering is the whole point: the
 * weekly consent test asserts no advertising or analytics cookie exists before
 * the visitor consents.
 *
 * The container itself is configured in GTM and exported to
 * infra/gtm-container.json; the daily job diffs live against the repo copy.
 */
export function Analytics() {
  const containerId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

  // First-touch and last-touch capture runs regardless of tag consent: it is
  // strictly necessary first-party data the site needs to route its own leads,
  // and it is disclosed in the privacy policy.
  useEffect(() => {
    captureAttribution();
  }, []);

  if (!containerId) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${containerId}');
        `}
      </Script>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
