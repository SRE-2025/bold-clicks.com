/**
 * Data layer - Volume 1 s.11 events, Volume 2 s.32 schema.
 *
 * Every event the site fires is declared here and in docs/tracking-plan.md.
 * Volume 2 s.36: a new event must be added to both in the same PR. GTM tags
 * key off these names; changing one is a 'tracking'-labelled change.
 */

export type CtaLocation = 'hero' | 'header' | 'sticky' | 'footer' | `section-${string}`;

export type AnalyticsEvent =
  | { event: 'cta_click'; cta_location: CtaLocation; cta_text: string }
  | { event: 'form_start'; form_id: string }
  | {
      event: 'generate_lead';
      form_id: string;
      lead_id: string;
      need: string;
      spend_band: string;
      value: number;
      currency: 'USD';
    }
  | { event: 'phone_click'; phone_location: string }
  | { event: 'calendar_open'; provider: 'ghl' | 'calendly' }
  | { event: 'appointment_booked'; lead_id: string }
  | { event: 'case_study_view'; case_study: string }
  | { event: 'pricing_or_qualifier_interaction'; tool: 'calculator' | 'spend_band'; value_bucket: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes to the GTM data layer. Safe during SSR and before GTM loads - the
 * array is created if it does not exist yet, and GTM replays it on init.
 */
export function push(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export const track = {
  ctaClick: (cta_location: CtaLocation, cta_text: string) =>
    push({ event: 'cta_click', cta_location, cta_text }),

  formStart: (form_id: string) => push({ event: 'form_start', form_id }),

  /**
   * Fires exactly once, after a real submission is accepted server-side.
   * Volume 1 s.10: the thank-you state must not fire this on page view alone.
   */
  generateLead: (input: { form_id: string; lead_id: string; need: string; spend_band: string }) =>
    push({ event: 'generate_lead', ...input, value: 0, currency: 'USD' }),

  phoneClick: (phone_location: string) => push({ event: 'phone_click', phone_location }),

  calendarOpen: (provider: 'ghl' | 'calendly') => push({ event: 'calendar_open', provider }),

  appointmentBooked: (lead_id: string) => push({ event: 'appointment_booked', lead_id }),

  caseStudyView: (case_study: string) => push({ event: 'case_study_view', case_study }),

  qualifierInteraction: (tool: 'calculator' | 'spend_band', value_bucket: string) =>
    push({ event: 'pricing_or_qualifier_interaction', tool, value_bucket }),
};

/**
 * GA4 key events (Volume 2 appendix B). Listed here so the tracking-plan doc
 * and the daily zero-events monitor read from one source.
 */
export const KEY_EVENTS = ['generate_lead', 'appointment_booked', 'phone_click'] as const;

/** Events the daily-integrity job expects to see in the last 24h on a page with traffic. */
export const MONITORED_EVENTS = ['cta_click', 'form_start', 'generate_lead', 'phone_click'] as const;
