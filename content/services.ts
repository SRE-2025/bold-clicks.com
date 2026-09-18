import type { Service } from '@/lib/schema';

/**
 * Platform and measurement pages - Volume 1 s.05 template, Volume 2 s.20
 * keyword map (one primary term per page, supporting terms in H2s and FAQs).
 *
 * Geographic modifiers deliberately stay off these titles: chasing "austin"
 * here would cannibalise /austin-ppc-agency/ (Volume 2 s.20 assignment rules).
 *
 * `firstHand` is an owner input on every page. Until it arrives the FirstHand
 * component renders nothing and the page is listed in docs/owner-inputs.md.
 */

const OWNER_FIRST_HAND = '[OWNER: one real account observation for this service - what we found, what we changed, what happened. Bullet points are enough.]';

export const services: readonly Service[] = [
  {
    slug: 'google-ads-management',
    route: '/google-ads-management/',
    title: 'Google Ads Management',
    h1: 'Google Ads management that’s measured in qualified leads, not clicks.',
    metaTitle: 'Google Ads Management for Lead Generation | Bold Clicks',
    metaDescription:
      'Search, Performance Max and Shopping campaigns managed for qualified leads and booked calls. You own the account. We own the tracking and the reporting.',
    eyebrow: 'GOOGLE ADS',
    cardDescription: 'Search and Performance Max built around your highest-value services.',
    intro:
      'For lead-driven businesses already spending on search, or ready to start. We manage Search, Performance Max and Shopping campaigns, own the conversion tracking behind them, and report on what booked and what closed.',
    forWho: [
      'Businesses where a single new customer is worth hundreds or thousands of dollars.',
      'Accounts where leads are arriving but nobody can say which ones were real.',
      'Owners who want direct access to the operator managing the account, not an account-manager layer.',
    ],
    deliverables: [
      { name: 'Account audit and rebuild plan', detail: 'Structure, tracking, search terms, budgets and landing pages reviewed before anything changes.' },
      { name: 'Campaign structure', detail: 'Campaigns organised around your highest-value services and geographies, not around what the previous agency left behind.' },
      { name: 'Keyword and negative control', detail: 'Search-term review on a fixed cadence, with negatives added as patterns appear rather than at quarterly review.' },
      { name: 'Ad copy and assets', detail: 'Written against the offer and the landing page so the promise matches end to end.' },
      { name: 'Bidding and budget allocation', detail: 'Bid strategy chosen for the conversion volume the account actually has, not the one the interface suggests.' },
      { name: 'Performance Max governance', detail: 'Asset groups, brand exclusions, and search-theme control so PMax cannot quietly absorb brand traffic.' },
      { name: 'Landing-page alignment', detail: 'Message match between keyword, ad and page, with fixes ranked by impact.' },
      { name: 'Reporting', detail: 'Leads, qualified leads, booked calls and cost per qualified lead by campaign - plus what we changed and why.' },
    ],
    measurement: [
      'Form submissions and calls tracked as separate conversion actions, with a qualifying call duration rather than every dial.',
      'Enhanced conversions for leads, so hashed contact data reconnects a closed customer to the click that produced them.',
      'Qualified and closed outcomes pushed back from the CRM into Google Ads, so bidding optimises toward customers rather than form fills.',
    ],
    process: [
      { name: 'Audit', whatYouGet: 'A written review of structure, tracking, search terms and landing pages, with the leaks ranked.' },
      { name: 'Build or rebuild', whatYouGet: 'Campaigns, conversion tracking, negatives and creative set up correctly before spend moves.' },
      { name: 'Launch', whatYouGet: 'Campaigns live with tracking verified first - never the other way round.' },
      { name: 'Optimize', whatYouGet: 'Weekly search-term, bid, creative and budget work tied to lead-quality feedback from your CRM.' },
      { name: 'Scale', whatYouGet: 'Budget and platforms added deliberately once cost per qualified lead is proven.' },
    ],
    faqs: [
      {
        question: 'Who owns the Google Ads account?',
        answer:
          'You do. We work inside an account you own. If we part ways you keep the campaigns, the history and the conversion data - there is nothing to migrate and nothing held hostage.',
        needsOwnerInput: false,
      },
      {
        question: 'What happens to my existing campaigns?',
        answer:
          'Nothing, until the audit is done. We do not pause or rebuild an account we have not read. Where existing campaigns are producing qualified leads we keep them and fix the tracking around them first.',
        needsOwnerInput: false,
      },
      {
        question: 'Is Performance Max risky?',
        answer:
          'It is risky when it runs unsupervised. PMax will happily spend on brand searches and low-intent placements and report them as wins. We run it with brand exclusions, controlled asset groups and search-term visibility, and we compare it against Search on qualified leads rather than raw conversions.',
        needsOwnerInput: false,
      },
      {
        question: 'How long until results?',
        answer:
          'Tracking is correct in week one. Meaningful bidding data needs enough conversions to learn from, which depends on your budget and lead volume - we tell you what that looks like for your account during the audit rather than quoting a generic timeline.',
        needsOwnerInput: false,
      },
      {
        question: 'What is the minimum budget?',
        answer: '[OWNER: state the real minimum monthly ad spend] Below that, an account usually cannot generate enough data to optimise honestly, and we will say so.',
        needsOwnerInput: true,
      },
      {
        question: 'Do you manage Local Services Ads too?',
        answer:
          'Where they fit. For home-services businesses, Local Services Ads and Search often compete for the same budget, and the right split depends on your service area and booking capacity. We cover this on the home services page.',
        needsOwnerInput: false,
      },
    ],
    proofRefs: [],
    relatedIndustries: ['home-services', 'legal', 'med-spa', 'dental'],
    relatedRoutes: ['/conversion-tracking/', '/industries/home-services/', '/industries/legal/', '/austin-ppc-agency/'],
    firstHand: OWNER_FIRST_HAND,
    cta: 'Get My Free Ad Audit',
  },

  {
    slug: 'meta-ads-management',
    route: '/meta-ads-management/',
    title: 'Meta Ads Management',
    h1: 'Meta Ads built to produce leads, not likes.',
    metaTitle: 'Meta Ads Management – Facebook & Instagram | Bold Clicks',
    metaDescription:
      'Facebook and Instagram advertising managed around creative testing, audience quality and lead follow-up - with CRM feedback so you know which leads closed.',
    eyebrow: 'META ADS',
    cardDescription: 'Creative testing and audiences that produce leads, not likes.',
    intro:
      'Paid social works differently from search: nobody on Instagram was looking for you. That makes creative, offer and follow-up speed the levers that matter, and it makes lead quality the number worth watching.',
    forWho: [
      'Businesses with an offer strong enough to interrupt someone who was not searching.',
      'Practices and services where demand can be created rather than only captured.',
      'Accounts generating cheap leads that never book, where the problem is qualification rather than volume.',
    ],
    deliverables: [
      { name: 'Prospecting and remarketing structure', detail: 'Separate budgets and separate expectations, so cheap remarketing conversions do not flatter cold performance.' },
      { name: 'Creative testing system', detail: 'A running queue of concepts with a fixed cadence, so testing continues when performance is good rather than starting when it dips.' },
      { name: 'Audience strategy', detail: 'Broad-plus-signal targeting where the algorithm has data to work with, tighter targeting where it does not.' },
      { name: 'Offer and funnel fit', detail: 'Matching the ask to the temperature of the audience - a consultation is a bigger ask than a guide.' },
      { name: 'Lead forms vs website conversion', detail: 'Instant forms convert higher and qualify worse. We test both and decide on booked calls, not lead count.' },
      { name: 'Pixel and Conversions API', detail: 'Server-side events deduplicated against the browser pixel so reporting is not double-counting.' },
      { name: 'Frequency and fatigue monitoring', detail: 'Creative rotation driven by frequency and cost-per-result decay rather than a calendar.' },
      { name: 'Lead quality feedback', detail: 'CRM outcomes pushed back so Meta optimises toward people who booked, not people who filled in a form.' },
    ],
    measurement: [
      'Lead events deduplicated between the pixel and the Conversions API using the lead ID.',
      'Qualified-lead outcomes from the CRM sent back through CAPI so optimisation reflects who actually booked.',
      'Cost per qualified lead reported alongside cost per lead, because the gap between them is the whole story on paid social.',
    ],
    process: [
      { name: 'Audit', whatYouGet: 'A review of account structure, creative history, pixel and CAPI setup, and where lead quality is leaking.' },
      { name: 'Build or rebuild', whatYouGet: 'Campaign structure, event setup, audiences and the first creative test matrix.' },
      { name: 'Launch', whatYouGet: 'Live with event deduplication verified and lead routing tested end to end.' },
      { name: 'Optimize', whatYouGet: 'Weekly creative review, audience and placement work, and follow-up speed feedback to your intake team.' },
      { name: 'Scale', whatYouGet: 'Budget increases paced to creative supply, because scaling past your creative volume is how accounts break.' },
    ],
    faqs: [
      {
        question: 'Why are my Facebook leads low quality?',
        answer:
          'Usually one of three things: an instant form with no qualifying question, an offer that attracts everyone, or optimisation pointed at leads rather than at the people who book. The fix is rarely more targeting - it is a harder ask and better feedback into the platform.',
        needsOwnerInput: false,
      },
      {
        question: 'Do we need new creative, or can we use what we have?',
        answer:
          'We start with what exists, because it tells us what your audience has already ignored. Beyond that, paid social consumes creative faster than most businesses expect, and a testing queue matters more than any single winning ad.',
        needsOwnerInput: false,
      },
      {
        question: 'Instant forms or send traffic to the website?',
        answer:
          'Instant forms convert at a higher rate and qualify at a lower one. Landing pages do the reverse. We test both against booked calls rather than lead count, and the answer differs by industry.',
        needsOwnerInput: false,
      },
      {
        question: 'Do you handle organic social too?',
        answer:
          'No. Bold Clicks runs ads only. Our sister agency Stoneridge Digital handles organic social, SEO and web design.',
        needsOwnerInput: false,
      },
    ],
    proofRefs: [],
    relatedIndustries: ['med-spa', 'home-services', 'dental'],
    relatedRoutes: ['/conversion-tracking/', '/industries/med-spa/', '/google-ads-management/'],
    firstHand: OWNER_FIRST_HAND,
    cta: 'Get My Free Ad Audit',
  },

  {
    slug: 'microsoft-ads-management',
    route: '/microsoft-ads-management/',
    title: 'Microsoft Ads Management',
    h1: 'Cheaper clicks from an audience most agencies ignore.',
    metaTitle: 'Microsoft Ads Management – Bing Paid Search | Bold Clicks',
    metaDescription:
      'Microsoft Advertising managed as a complement to Google, not a copy of it. Lower competition, older and higher-income audiences, and the same tracking standard.',
    eyebrow: 'MICROSOFT ADS',
    cardDescription: 'Cheaper clicks from an audience most agencies ignore.',
    intro:
      'Microsoft Ads is smaller than Google and that is the point: less competition, a measurably different audience, and click costs that often make marginal budget go further. It is not a replacement for Google search - it is the platform that gets skipped.',
    forWho: [
      'Businesses already at or near the top of their Google budget who want incremental volume.',
      'Services whose buyers skew older, or who reach the web through work devices.',
      'Accounts where Google CPCs have made cost per qualified lead uncomfortable.',
    ],
    deliverables: [
      { name: 'Import, then correct', detail: 'We import from Google as a starting point and then fix what does not translate - match types, audiences and bid strategies behave differently.' },
      { name: 'Platform-specific structure', detail: 'Campaigns rebuilt for Microsoft’s volume rather than left as a Google clone that never learns.' },
      { name: 'Audience network control', detail: 'The audience network can consume budget quietly. We control placements and measure it separately from search.' },
      { name: 'Conversion tracking (UET)', detail: 'UET tag, conversion goals and offline conversion imports set up to the same standard as Google.' },
      { name: 'Reporting', detail: 'Reported next to Google so you can see incremental cost per qualified lead, not a separate silo.' },
    ],
    measurement: [
      'UET tag verified in the same consent framework as every other tag on the site.',
      'Offline conversion imports from the CRM so Microsoft sees qualified and closed outcomes.',
      'Incrementality judged on cost per qualified lead against Google, not on raw conversion counts.',
    ],
    process: [
      { name: 'Audit', whatYouGet: 'A view of whether Microsoft is worth your time at your current spend, honestly answered.' },
      { name: 'Build or rebuild', whatYouGet: 'Import, correction, UET setup and audience-network control.' },
      { name: 'Launch', whatYouGet: 'Live with conversion tracking verified and a defined test budget.' },
      { name: 'Optimize', whatYouGet: 'Search-term work and bid management at a cadence matched to the lower volume.' },
      { name: 'Scale', whatYouGet: 'Budget shifted only where incremental cost per qualified lead beats the alternative.' },
    ],
    faqs: [
      {
        question: 'Is Microsoft Ads worth it for a local business?',
        answer:
          'Sometimes. The volume is a fraction of Google, so for a small budget it can dilute rather than add. It earns its place when Google is already saturated at your target cost per lead, or when your buyers skew toward the audiences Microsoft over-indexes on.',
        needsOwnerInput: false,
      },
      {
        question: 'Can you just import our Google campaigns?',
        answer:
          'We import as a starting point, then correct. An unmodified import usually underperforms: match-type behaviour, audience availability and smart bidding all work differently with less data.',
        needsOwnerInput: false,
      },
      {
        question: 'What budget does a Microsoft test need?',
        answer:
          '[OWNER: state the real test-budget guidance] What matters is enough conversion volume to judge the test rather than a fixed dollar figure, and we will tell you if your volume cannot support one.',
        needsOwnerInput: true,
      },
    ],
    proofRefs: [],
    relatedIndustries: ['legal', 'home-services'],
    relatedRoutes: ['/google-ads-management/', '/conversion-tracking/'],
    firstHand: OWNER_FIRST_HAND,
    cta: 'Get My Free Ad Audit',
  },

  {
    slug: 'youtube-ads-management',
    route: '/youtube-ads-management/',
    title: 'YouTube Ads Management',
    h1: 'Video that fills the funnel and gets measured like everything else.',
    metaTitle: 'YouTube Ads Management for Lead Generation | Bold Clicks',
    metaDescription:
      'YouTube advertising managed with a clear funnel role, honest attribution and the same conversion standard as search - not a brand-awareness line item.',
    eyebrow: 'YOUTUBE ADS',
    cardDescription: 'Video that fills the top of the funnel and gets measured like everything else.',
    intro:
      'YouTube is where demand gets created rather than captured, which makes it the easiest platform to waste money on and the hardest to measure honestly. We run it with a defined funnel role and a measurement plan agreed before launch.',
    forWho: [
      'Businesses with an offer that needs explaining before someone will act on it.',
      'Advertisers whose search campaigns are capped by demand rather than by budget.',
      'Teams willing to produce or repurpose video at a workable cadence.',
    ],
    deliverables: [
      { name: 'Funnel role definition', detail: 'What this campaign is for, what it is measured on, and what it is explicitly not responsible for - agreed before spend.' },
      { name: 'Audience strategy', detail: 'Custom segments built from search behaviour and site activity rather than broad interest categories.' },
      { name: 'Creative direction', detail: 'Hook, proof and ask structured for the first five seconds, working with the footage you can realistically produce.' },
      { name: 'Placement and exclusion control', detail: 'Content and placement exclusions applied at setup, reviewed monthly.' },
      { name: 'Measurement plan', detail: 'View-through and brand-search lift reported separately from last-click conversions, with the limits stated.' },
    ],
    measurement: [
      'Last-click conversions reported without view-through, and view-through reported separately with its assumptions stated.',
      'Branded search volume tracked in Search Console as a lift signal, since it is the cleanest available proxy.',
      'Qualified-lead outcomes from the CRM used to judge whether the traffic was worth creating.',
    ],
    process: [
      { name: 'Audit', whatYouGet: 'An honest read on whether video fits your funnel and your creative capacity right now.' },
      { name: 'Build or rebuild', whatYouGet: 'Audience segments, exclusions, campaign structure and the measurement plan.' },
      { name: 'Launch', whatYouGet: 'Live with tracking verified and a defined test window.' },
      { name: 'Optimize', whatYouGet: 'Creative and placement work, with results read against the agreed funnel role.' },
      { name: 'Scale', whatYouGet: 'More budget only when the downstream effect on qualified leads is visible.' },
    ],
    faqs: [
      {
        question: 'Can you prove YouTube produced a lead?',
        answer:
          'Not with the certainty search offers, and we will not pretend otherwise. We report last-click conversions honestly, report view-through separately with its assumptions stated, and watch branded search as a lift signal.',
        needsOwnerInput: false,
      },
      {
        question: 'Do we need to produce new video?',
        answer:
          'Usually some. Existing footage, testimonials and screen recordings go further than most people expect, but a campaign with one asset stalls quickly.',
        needsOwnerInput: false,
      },
      {
        question: 'When is YouTube a bad idea?',
        answer:
          'When search is still under-funded. If there is unmet demand in your search campaigns, that budget produces cheaper qualified leads than video will, and we will say so rather than sell you a channel.',
        needsOwnerInput: false,
      },
    ],
    proofRefs: [],
    relatedIndustries: ['med-spa', 'legal'],
    relatedRoutes: ['/google-ads-management/', '/conversion-tracking/'],
    firstHand: OWNER_FIRST_HAND,
    cta: 'Get My Free Ad Audit',
  },

  {
    slug: 'conversion-tracking',
    route: '/conversion-tracking/',
    title: 'Conversion Tracking & Attribution',
    h1: 'A lead is not the finish line.',
    metaTitle: 'PPC Conversion Tracking & Attribution Setup | Bold Clicks',
    metaDescription:
      'Calls, forms, booked appointments and closed customers wired back to the campaign that produced them - so bidding optimises toward revenue, not form fills.',
    eyebrow: 'MEASUREMENT',
    cardDescription: 'Calls, forms, CRM outcomes and offline conversions wired back to the platforms.',
    intro:
      'Most accounts we audit are optimising toward the wrong thing. Every dial counts as a lead, the CRM never sends anything back, and the platform confidently bids toward whoever fills in forms. Fixing measurement usually changes performance more than fixing campaigns.',
    forWho: [
      'Accounts where the conversion count looks healthy and the sales team disagrees.',
      'Businesses with a CRM that knows which leads closed, and ad platforms that do not.',
      'Anyone about to spend more money on top of tracking nobody has verified.',
    ],
    deliverables: [
      { name: 'Tracking audit', detail: 'Every conversion action reviewed for what it actually counts - duplicates, page views counted as leads, and calls of any length counted equally.' },
      { name: 'Event and tag plan', detail: 'A documented data layer: which event fires, on what condition, with which parameters, to which destination.' },
      { name: 'Call tracking', detail: 'Calls counted over a qualifying duration or tagged outcome, not every dial. Dynamic number insertion only where a vendor is genuinely needed.' },
      { name: 'CRM integration', detail: 'Leads arriving in GoHighLevel with first-touch and last-touch source, UTMs and click IDs intact.' },
      { name: 'Offline conversion feedback', detail: 'Qualified and closed outcomes uploaded back to Google Ads and Meta so bidding optimises toward customers.' },
      { name: 'Consent implementation', detail: 'Consent Mode v2 configured to your real jurisdictions and tag footprint, tested with consent denied.' },
      { name: 'Ongoing verification', detail: 'Automated checks that events still fire and the tag container has not drifted - because tracking breaks silently.' },
    ],
    measurement: [
      'Every CTA and form has a defined event name, trigger condition and destination. Ambiguous attribution means the work is not done.',
      'Synthetic form submissions run on a schedule and verify the lead reaches the CRM with its source data intact.',
      'Tag container changes are diffed against the repository, so an undocumented edit is caught rather than discovered later.',
    ],
    process: [
      { name: 'Audit', whatYouGet: 'A written account of what your tracking currently counts, and what that has been costing you.' },
      { name: 'Build or rebuild', whatYouGet: 'Tag plan, event implementation, CRM field mapping and consent configuration.' },
      { name: 'Launch', whatYouGet: 'Verified in debug mode, end to end, before any budget decision rests on it.' },
      { name: 'Optimize', whatYouGet: 'Offline conversion feedback running, with lead-to-qualified and qualified-to-closed rates reported by campaign.' },
      { name: 'Scale', whatYouGet: 'Monitoring that alerts when events stop firing, rather than a quarterly discovery.' },
    ],
    faqs: [
      {
        question: 'Why are my Google Ads leads low quality?',
        answer:
          'The common causes are a conversion action that counts things that are not leads, search terms nobody has reviewed, and a landing page promising something the intake team cannot deliver. Tracking is where we look first, because it is what the bidding is learning from.',
        needsOwnerInput: false,
      },
      {
        question: 'What are enhanced conversions for leads?',
        answer:
          'A way to send hashed contact details from a closed deal back to Google, so a customer who converted offline is reconnected to the click that produced them. It is the practical route to bidding on revenue rather than on form fills.',
        needsOwnerInput: false,
      },
      {
        question: 'Do we need a call tracking vendor?',
        answer:
          'Not always. If you use GoHighLevel numbers, much of this is already available. A dedicated vendor earns its cost when you need dynamic number insertion across many sources or detailed call scoring.',
        needsOwnerInput: false,
      },
      {
        question: 'Will consent requirements break our tracking?',
        answer:
          'They change it rather than break it. Consent Mode v2 lets modelling fill some of the gap, and where consent is denied for advertising data we skip the upload and record why rather than sending it anyway.',
        needsOwnerInput: false,
      },
    ],
    proofRefs: [],
    relatedIndustries: ['home-services', 'legal', 'dental'],
    relatedRoutes: ['/google-ads-management/', '/meta-ads-management/', '/services/'],
    firstHand: OWNER_FIRST_HAND,
    cta: 'Get My Free Ad Audit',
  },
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Used by the route files. Throws at build time rather than rendering a blank
 * page, so a slug typo fails `next build` instead of shipping.
 */
export function requireService(slug: string): Service {
  const service = getService(slug);
  if (!service) throw new Error(`Missing service content for "${slug}"`);
  return service;
}
