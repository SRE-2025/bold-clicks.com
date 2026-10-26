/** ChatGPT-first hub copy; full articles remain drafts until evidence and review exist. */
export const servicesHub = {
  headline: 'ChatGPT advertising planning. Paid-media services.',
  intro:
    'Start with a ChatGPT advertising plan, or review an existing Google, Meta, Microsoft or YouTube account. The right scope depends on eligibility, the offer and how the outcome will be measured.',
  scope:
    'The ChatGPT page explains the planning scope and the checks needed before a launch decision. Existing platform pages describe the wider paid-media services. A platform announcement alone does not establish access for an individual advertiser.',
  measurement:
    'The business question is consistent: what happened after the click? Implementation depends on the platform and the advertiser setup. For a new ChatGPT test, confirm which events and integrations are supported before making a reporting or optimization commitment.',
} as const;

export const insightsHub = {
  headline: 'ChatGPT advertising questions, researched carefully.',
  intro:
    'ChatGPT setup, costs and measurement are the first editorial priorities, alongside practical paid-media guides. Articles stay in draft until first-hand evidence and a named review are complete.',
  upcoming: [
    { title: 'How to advertise on ChatGPT: eligibility, setup and a test brief', supports: 'ChatGPT advertising planning' },
    { title: 'ChatGPT advertising costs: media budget, agency scope and measurement', supports: 'ChatGPT advertising planning' },
    { title: 'How to measure a ChatGPT ads test: traffic, conversions and qualified leads', supports: 'Conversion tracking' },
    { title: 'The Google Ads account audit checklist we actually use', supports: 'Free ad audit' },
    { title: 'What PPC management costs: pricing models and what changes the price', supports: 'Services' },
    { title: 'How we track qualified leads: GoHighLevel and offline conversions', supports: 'Conversion tracking' },
  ],
} as const;
