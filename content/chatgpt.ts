import type { Service } from '@/lib/schema';

/**
 * Platform facts checked against the linked OpenAI sources on 2026-10-26.
 * This is a planning scope, not evidence of active accounts, special access or results.
 */
export const chatgptService: Service = {
  slug: 'chatgpt-ads',
  route: '/chatgpt-ads/',
  title: 'ChatGPT Advertising Planning',
  h1: 'ChatGPT ads planning, from fit to a launch decision.',
  metaTitle: 'ChatGPT Advertising Strategy & Planning | Bold Clicks',
  metaDescription:
    'Plan ChatGPT advertising with eligibility, creative, landing pages and measurement in view. Explore the scope and discuss your next step with Bold Clicks.',
  eyebrow: 'CHATGPT ADS',
  cardDescription: 'Eligibility, offer, creative and measurement planning for a potential ChatGPT advertising test.',
  intro:
    'Considering paid advertising in ChatGPT? Start by deciding whether the channel fits your offer and how a test would be evaluated. Bold Clicks puts ChatGPT advertising planning first, alongside its existing paid-media services.',
  scopeNote:
    'Campaign management is scoped only after advertiser access, eligibility and implementation requirements are confirmed.',
  sectionHeadings: {
    deliverables: 'What a ChatGPT advertising plan should cover.',
    process: 'From an initial brief to a launch decision.',
    faq: 'Questions about advertising in ChatGPT.',
  },
  forWho: [
    'Businesses evaluating ChatGPT as an additional paid acquisition channel.',
    'Advertisers with a clear offer, a usable landing page and an outcome to measure.',
    'Teams that want eligibility, access and reporting limits resolved before committing to campaign work.',
  ],
  deliverables: [
    { name: 'Eligibility and access review', detail: 'Check the intended advertiser, market and offer against current OpenAI guidance and the account access actually available.' },
    { name: 'Audience and offer brief', detail: 'Describe the customer problem, the buying decision and the useful next step the ad should support.' },
    { name: 'Creative and landing-page plan', detail: 'Align the headline, supporting copy and destination around a specific offer and a clear action.' },
    { name: 'Measurement specification', detail: 'Define the conversion, attribution parameters, implementation work and CRM checks needed to evaluate a test.' },
    { name: 'Test and management scope', detail: 'Agree responsibilities, budget boundaries and review criteria. Confirm the available account features before including them in a campaign scope.' },
  ],
  measurement: [
    'Record the intended business outcome and the conditions for continuing or stopping a test.',
    'Separate traffic-source reporting, platform-attributed events and qualified outcomes recorded by the business.',
    'Validate the available measurement implementation before relying on conversion reports; supported integrations depend on the advertiser setup.',
  ],
  process: [
    { name: 'Brief', whatYouGet: 'Establish the offer, target market, current acquisition channels and commercial objective.' },
    { name: 'Check fit', whatYouGet: 'Review advertiser eligibility, account readiness and the available campaign capabilities.' },
    { name: 'Specify', whatYouGet: 'Document creative, destination, tracking requirements and an agreed test scope.' },
    { name: 'Make the launch decision', whatYouGet: 'Activate only after the advertiser has approved the budget and the required account and implementation checks are complete.' },
    { name: 'Evaluate', whatYouGet: 'Review delivery and outcomes against the original objective, with uncertainty and measurement limits stated.' },
  ],
  faqs: [
    {
      question: 'Can businesses advertise in ChatGPT?',
      answer: 'Yes. OpenAI provides Ads Manager with self-service availability in supported countries, including the United States. Eligibility and account readiness still need to be checked for the advertiser. Use the current availability and setup guides linked below.',
      needsOwnerInput: false,
    },
    {
      question: 'Do ChatGPT ads buy a recommendation in the answer?',
      answer: 'No. OpenAI states that paid ads are clearly labeled and separate from ChatGPT answers. Buying an ad does not give an advertiser control over the answer or an organic recommendation.',
      needsOwnerInput: false,
    },
    {
      question: 'Can you guarantee a specific conversation or top placement?',
      answer: 'No. OpenAI describes context hints as guidance for ad matching, rather than exact-match keywords or a guarantee of delivery in a particular conversation. Placement and business results should not be promised.',
      needsOwnerInput: false,
    },
    {
      question: 'What would ChatGPT advertising cost?',
      answer: 'Treat media spend, agency work and measurement implementation as separate parts of a test budget. The management scope and commercial terms need to be agreed before work starts. We do not publish a universal cost-per-lead or return forecast.',
      needsOwnerInput: false,
    },
    {
      question: 'Are all advertised ChatGPT formats available to every business?',
      answer: 'No. Availability can differ by account and format. OpenAI currently describes Sponsored Agents as a limited alpha for selected advertisers. A plan should include only the features confirmed for that advertiser.',
      needsOwnerInput: false,
    },
  ],
  references: {
    heading: 'Current OpenAI documentation',
    note: 'Platform facts checked October 26, 2026. Recheck availability, policies and account features before activation. These sources describe the platform; they do not establish Bold Clicks account access or campaign results.',
    items: [
      { label: 'Ads Manager availability by country', url: 'https://help.openai.com/en/articles/20001245-ads-manager-availability' },
      { label: 'Ads Manager account setup', url: 'https://help.openai.com/en/articles/20001213-ads-manager-account-setup' },
      { label: 'Ad matching, context hints and reporting', url: 'https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics' },
      { label: 'Answer independence and advertiser privacy', url: 'https://help.openai.com/en/articles/20001047-ads-in-chatgpt' },
      { label: 'Measurement partner integrations', url: 'https://help.openai.com/en/articles/20001416-set-up-measurement-partner-integrations' },
      { label: 'Sponsored Agents availability', url: 'https://help.openai.com/en/articles/20001524-sponsored-agents-in-chatgpt-ads' },
    ],
  },
  proofRefs: [],
  relatedIndustries: [],
  relatedRoutes: ['/services/', '/conversion-tracking/', '/google-ads-management/', '/insights/'],
  firstHand: '[OWNER: verified ChatGPT campaign observation and permission to publish; do not imply prior campaign experience until supplied.]',
  cta: 'Discuss ChatGPT Ads',
  ctaHref: '/contact/',
  finalCta: {
    headline: 'Start with the ChatGPT advertising brief.',
    body: 'Discuss your offer, intended market and measurement requirements. A launch commitment comes after eligibility, account access and the implementation scope are confirmed.',
    label: 'Discuss ChatGPT Ads',
    href: '/contact/',
  },
};
