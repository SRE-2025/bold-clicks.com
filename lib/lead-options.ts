/**
 * Lead form option sets - Volume 2 s.31.
 *
 * Shared by the client form and the server-side validator so the two cannot
 * drift, and by the GoHighLevel field mapping. Spend bands are marked
 * [OWNER may adjust] in the brief; changing them here changes both ends.
 */

export const NEED_OPTIONS = [
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'meta_ads', label: 'Meta Ads (Facebook & Instagram)' },
  { value: 'microsoft_ads', label: 'Microsoft Ads' },
  { value: 'youtube_ads', label: 'YouTube Ads' },
  { value: 'tracking', label: 'Tracking & attribution' },
  { value: 'not_sure', label: 'Not sure — audit everything' },
] as const;

export const SPEND_BANDS = [
  { value: 'not_running', label: 'Not running ads yet' },
  { value: 'under_2k', label: 'Under $2k / month' },
  { value: '2k_5k', label: '$2k – $5k / month' },
  { value: '5k_15k', label: '$5k – $15k / month' },
  { value: '15k_50k', label: '$15k – $50k / month' },
  { value: '50k_plus', label: '$50k+ / month' },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: 'dental', label: 'Dental' },
  { value: 'orthodontics', label: 'Orthodontics' },
  { value: 'med_spa', label: 'Med spa' },
  { value: 'healthcare_other', label: 'Healthcare (other)' },
  { value: 'legal', label: 'Legal' },
  { value: 'home_services', label: 'Home services' },
  { value: 'other', label: 'Other' },
] as const;

export const NEED_VALUES = NEED_OPTIONS.map((o) => o.value);
export const SPEND_VALUES = SPEND_BANDS.map((o) => o.value);
export const INDUSTRY_VALUES = INDUSTRY_OPTIONS.map((o) => o.value);

/**
 * Routing rules - Volume 2 s.31. A lead is flagged 'priority' when the spend
 * band or the industry says the deal is large enough to warrant an extra SMS.
 */
export const PRIORITY_SPEND_BANDS = ['15k_50k', '50k_plus'];
export const PRIORITY_INDUSTRIES = ['legal', 'med_spa'];

export function isPriorityLead(spendBand: string, industry: string): boolean {
  return PRIORITY_SPEND_BANDS.includes(spendBand) || PRIORITY_INDUSTRIES.includes(industry);
}
