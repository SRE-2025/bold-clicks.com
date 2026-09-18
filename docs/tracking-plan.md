# Tracking plan

Volume 1 s.11, Volume 2 s.32 and appendix B.

**Rule (CLAUDE.md):** a new event is added to `lib/analytics.ts` *and* this file
in the same PR. Any change here requires the `tracking` label and a note in
`docs/decisions.md`.

## Events

| Event | Fires when | Parameters | Source |
|-------|-----------|------------|--------|
| `cta_click` | Any CTA is clicked | `cta_location` (hero / header / sticky / footer / section-*), `cta_text` | `components/CtaButton.tsx`, `Header`, `StickyMobileCTA` |
| `form_start` | First focus on any field in a lead form | `form_id` | `components/LeadForm.tsx` |
| `generate_lead` | **After** the server accepts a submission — never on page view | `form_id`, `lead_id`, `need`, `spend_band`, `value` (0), `currency` (USD) | `components/LeadForm.tsx` |
| `phone_click` | A `tel:` link is clicked | `phone_location` | `components/PhoneLink.tsx` |
| `calendar_open` | Booking link is clicked | `provider` (ghl / calendly) | `components/BookingLink.tsx` |
| `appointment_booked` | Booking callback or thank-you parameter | `lead_id` | Not yet wired — needs the GHL calendar callback (owner input 7) |
| `case_study_view` | A case study card or page is opened | `case_study` | `components/CaseStudyCard.tsx` |
| `pricing_or_qualifier_interaction` | Spend-band select changes, or calculator input | `tool` (calculator / spend_band), `value_bucket` | `components/LeadForm.tsx` |

`generate_lead` firing on the thank-you page render would double-count on
refresh and on a shared URL. It fires from the form, once, after a `200` from
`/api/lead`. The E2E suite asserts exactly one.

## GA4 key events and platform mapping

| GA4 event | Key event | Google Ads conversion | Meta / Microsoft |
|-----------|-----------|----------------------|------------------|
| `generate_lead` | Yes | Lead (primary) | Lead / Lead goal |
| `appointment_booked` | Yes | Booked appointment (secondary) | Schedule |
| `phone_click` | Yes | Phone click (secondary, low value) | Contact |
| `qualify_lead` (from CRM) | Yes | Qualified lead (offline upload) | CAPI custom |
| `close_convert_lead` (from CRM) | Yes | Closed customer (offline upload, with value) | CAPI Purchase/custom |
| `cta_click`, `form_start`, `calendar_open`, `case_study_view`, `pricing_or_qualifier_interaction` | No | — | — |

Optimise to Lead initially. Move to Qualified lead once offline conversion
upload has enough volume to bid on.

## Consent

Consent Mode v2 defaults are set in `components/ConsentDefaults.tsx`, as an
inline script in the document head so it runs before GTM loads.

| Signal | Default |
|--------|---------|
| `ad_storage` | denied |
| `ad_user_data` | denied |
| `ad_personalization` | denied |
| `analytics_storage` | denied |
| `functionality_storage` | granted |
| `security_storage` | granted |

`ads_data_redaction` on, `url_passthrough` on, `wait_for_update` 500ms.

The first-party attribution cookie (`bc_first_touch`) is strictly necessary: it
is what routes a lead to the right source in the CRM, it is disclosed in the
privacy policy, and it carries no advertising identifier of its own beyond the
click IDs the visitor arrived with.

`tests/e2e/seo-and-consent.spec.ts` asserts that no `_ga`, `_gid`, `_gcl_au`,
`_fbp`, `_uetsid` or `_uetvid` cookie exists before consent.

## Attribution payload

Captured by `lib/attribution.ts`, validated server-side in `app/api/lead/route.ts`.

- **First touch** — first-party cookie, 365 days. Written once, on the first
  arrival carrying a campaign parameter, click ID or referrer.
- **Last touch** — `sessionStorage`, current session.
- Both carry: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
  `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `landing_page`,
  `referrer`, `timestamp`.
- Also attached: `ga_client_id` (read from the `_ga` cookie), `device`,
  `page_url`, server-generated `lead_id`, and a `geo_hint` from request headers.

## Offline conversion loop

Not yet built — Phase 5/6. Planned per Volume 2 s.32:

1. GHL pipeline stage change (Qualified, Closed) fires a webhook with
   `lead_id`, click IDs, hashed email/phone, stage, timestamp, deal value.
2. Automation writes to `data/offline-conversions/` (gitignored, private) and
   uploads to Google Ads via enhanced conversions for leads, and to Meta CAPI.
3. Monthly report shows lead → qualified → closed by campaign.
4. Where `ad_user_data` consent was not granted, the upload is skipped and the
   reason recorded.

## Verification

- **Per PR:** Playwright asserts each event fires once with the right
  parameters on the right page.
- **Daily:** GTM container export diffed against `infra/gtm-container.json`;
  container drift without a matching PR is an S2 alert.
- **Daily:** zero key events in 24h on a page with traffic is an S1 alert.
- **Every 6 hours:** synthetic form submission verified through to GHL.
- **Weekly:** consent test with consent denied.
