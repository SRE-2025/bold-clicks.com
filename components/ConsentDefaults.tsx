/**
 * Consent Mode v2 defaults - Volume 2 s.32.
 *
 * This is a plain inline script in the document head rather than next/script,
 * for one reason: the defaults must be set before GTM loads, and an inline
 * script rendered by a server component is guaranteed to execute first.
 * next/script's beforeInteractive strategy is both unsupported outside the
 * document in the App Router and unnecessary here.
 *
 * Everything is denied until the visitor consents. The weekly consent test
 * asserts no _ga, _gcl, _fbp or _uetsid cookie exists before interaction, so
 * this ordering is verified rather than assumed.
 */
const CONSENT_DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
`.trim();

export function ConsentDefaults() {
  return <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />;
}
