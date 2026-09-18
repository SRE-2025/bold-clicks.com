import type { Industry } from '@/lib/schema';

/**
 * Industry pages - Volume 1 s.06, Volume 2 s.20 cluster 4.
 *
 * Volume 1: "If Bold Clicks cannot say something distinct and useful, do not
 * publish the page yet." Four verticals are published at launch. Orthodontics,
 * podiatry, ENT/sinus and primary care are planned (see `plannedIndustries`)
 * and stay out of routes, nav, the sitemap and IndustryGrid until the owner
 * confirms real expertise and supplies a first-hand block.
 */

const OWNER_FIRST_HAND = '[OWNER: one real observation from an account in this vertical - a waste pattern, a lead-quality problem, or a structural change and its effect.]';

export const industries: readonly Industry[] = [
  {
    slug: 'home-services',
    route: '/industries/home-services/',
    title: 'Home Services',
    h1: 'Paid media for home-services businesses.',
    metaTitle: 'Home Services PPC – HVAC, Roofing, Plumbing | Bold Clicks',
    metaDescription:
      'Google and Meta Ads for HVAC, roofing and plumbing businesses: urgency-led bidding, service-radius control, call quality and Local Services Ads strategy.',
    eyebrow: 'HOME SERVICES',
    cardDescription: 'HVAC, roofing, plumbing and restoration - where demand spikes and the phone is the conversion.',
    intro:
      'Home services is the vertical where paid media behaves least like the textbook. Demand arrives in spikes you did not schedule, the conversion is a phone call rather than a form, and the difference between a good month and a bad one is often whether anyone answered.',
    audienceBehavior:
      'Intent is usually urgent and local: a failed system, a leak, or storm damage. The searcher will call two or three businesses and book whoever answers first, which makes ad position and call handling matter more than persuasion. Demand is also seasonal and weather-driven, so a bid strategy tuned on last month’s data is frequently tuned on the wrong month.',
    campaignStructure: [
      { name: 'Emergency vs planned separation', detail: 'Emergency intent and planned-replacement intent want different bids, different ad copy and different hours. Merging them hides both.' },
      { name: 'Service-line campaigns', detail: 'Structured around the jobs worth the most money, not around the alphabet of services on the website.' },
      { name: 'Radius and drive-time control', detail: 'Targeting built on how far a truck will actually go, including suburbs where the competitive picture is different from the city centre.' },
      { name: 'Dayparting against capacity', detail: 'Spend paced to when calls get answered. Paying for after-hours clicks that reach voicemail is the most common avoidable waste in this vertical.' },
      { name: 'Local Services Ads alongside Search', detail: 'LSAs and Search compete for the same budget. The split depends on service area, licensing and booking capacity, and it is a decision rather than a default.' },
    ],
    wastePatterns: [
      'Generic repair terms with no service or brand qualifier, collecting DIY traffic that never converts.',
      'Job-seeker and training queries absorbing budget on broad match.',
      'Parts, manual and price-only searches that want information rather than a technician.',
      'After-hours spend on campaigns whose landing page only offers a form.',
      'Every call counted as a conversion, including thirty-second wrong numbers, which teaches bidding to buy more of them.',
    ],
    kpis: [
      { name: 'Cost per booked job', definition: 'Ad spend divided by jobs actually scheduled in the CRM, for a stated platform and date range.' },
      { name: 'Call answer rate', definition: 'Share of tracked calls answered by a person, measured because it caps everything downstream.' },
      { name: 'Qualified call rate', definition: 'Share of tracked calls over the qualifying duration that were in-area and in-service.' },
      { name: 'Cost per qualified lead by service line', definition: 'Reported per service line, because a roof replacement and a filter change cannot share a target.' },
    ],
    objections: [
      {
        objection: 'We already get plenty of calls.',
        answer: 'The question is what they cost and how many turn into booked jobs. Most accounts we audit cannot answer the second part, which means the platform cannot either.',
      },
      {
        objection: 'Our busy season pays for the slow season, so we leave budget flat.',
        answer: 'Flat budget through a demand spike means capping revenue at the moment it is cheapest to earn. Budgets should move with the demand curve, and that requires watching it.',
      },
    ],
    faqs: [
      {
        question: 'Should we run Local Services Ads or Google Ads?',
        answer:
          'Usually both, in a deliberate split. LSAs sit above search results and charge per lead, which suits high-volume common jobs. Search gives control over which service lines you buy and lets you compete on higher-value work. The right balance depends on your service area and how much booking capacity you have.',
        needsOwnerInput: false,
      },
      {
        question: 'How do you handle storm-season spikes?',
        answer:
          'By treating them as a bidding and budget problem rather than a surprise. Demand rises faster than the platform’s learning, so budget caps and conservative bid strategies quietly throttle exactly the week you wanted to win.',
        needsOwnerInput: false,
      },
      {
        question: 'We do not have a CRM. Can you still track booked jobs?',
        answer:
          'Partly. Call tracking gets us to qualified calls. Getting to booked jobs and revenue needs somewhere those outcomes are recorded - which is the point at which reporting stops being about leads.',
        needsOwnerInput: false,
      },
      {
        question: 'What does this cost?',
        answer: '[OWNER: pricing model and minimum ad spend for this vertical]',
        needsOwnerInput: true,
      },
    ],
    proofRefs: [],
    relatedRoutes: ['/google-ads-management/', '/conversion-tracking/', '/austin-ppc-agency/'],
    firstHand: OWNER_FIRST_HAND,
    publishable: true,
  },

  {
    slug: 'legal',
    route: '/industries/legal/',
    title: 'Legal',
    h1: 'Paid media for law firms.',
    metaTitle: 'Legal PPC – Google Ads for Law Firms | Bold Clicks',
    metaDescription:
      'Google Ads for law firms where clicks are expensive and intake decides everything: case-type economics, qualification, call tracking and signed-case reporting.',
    eyebrow: 'LEGAL',
    cardDescription: 'High click costs, high case values, and intake that decides whether any of it worked.',
    intro:
      'Legal is the vertical where a single click can cost more than a month of ads in another industry, and where the gap between a lead and a signed case is widest. That combination means qualification and intake are not downstream concerns - they are the campaign.',
    audienceBehavior:
      'Searchers are often in distress and comparing several firms in one session, so response speed matters as much as message. Intent varies enormously within a practice area: someone researching a process and someone who was injured this morning look similar in a keyword report and behave nothing alike. Advertising is also constrained by platform policy and state bar rules, which limits what an ad may claim.',
    campaignStructure: [
      { name: 'Campaigns by case type, not practice area', detail: 'Case types inside one practice area differ by an order of magnitude in value. Sharing a budget between them means subsidising the cheap ones.' },
      { name: 'Intent tiering', detail: 'Immediate-need terms, comparison terms and research terms separated so bids reflect what each is worth.' },
      { name: 'Geographic control at county level', detail: 'Jurisdiction matters, and metro-wide targeting buys clicks the firm cannot act on.' },
      { name: 'Exclusion of competitor and directory noise', detail: 'Directory, job-board and legal-information traffic excluded deliberately rather than discovered later.' },
    ],
    wastePatterns: [
      'Free-consultation terms attracting people looking for free advice rather than representation.',
      'Case types the firm does not take, bought because they sit inside the same practice area.',
      'Law-student, job and salary queries on broad match.',
      'Out-of-jurisdiction clicks from metro-wide radius targeting.',
      'Every form counted as a conversion when a large share are unqualified or duplicates.',
    ],
    kpis: [
      { name: 'Cost per signed case', definition: 'Ad spend divided by cases signed, for a stated case type and date range.' },
      { name: 'Lead-to-consultation rate', definition: 'Share of leads that reach a scheduled consultation, tracked in the CRM.' },
      { name: 'Qualified call rate', definition: 'Share of tracked calls over the qualifying duration that matched a case type the firm takes.' },
      { name: 'Cost per qualified lead by case type', definition: 'Reported per case type, since blending them hides which campaigns actually work.' },
    ],
    objections: [
      {
        objection: 'Our cost per click is already too high to make this work.',
        answer: 'High click costs are survivable when case values are high and qualification is tight. What is not survivable is paying those prices for traffic that was never going to sign.',
      },
      {
        objection: 'We tried PPC and got nothing but tyre-kickers.',
        answer: 'That is usually a qualification and intake problem rather than a targeting one. If the platform is optimising toward form fills, it will find you people who fill in forms.',
      },
    ],
    faqs: [
      {
        question: 'How do you keep unqualified leads down?',
        answer:
          'Case-type separation, honest ad copy that states what the firm takes, qualifying questions on the form, and feeding signed-case outcomes back to the platform so bidding learns which clicks produced clients.',
        needsOwnerInput: false,
      },
      {
        question: 'Can you guarantee a number of cases?',
        answer:
          'No. Anyone who does is guessing or misleading you. We can show cost per qualified lead by case type and how it has moved, which is the number a decision can actually rest on.',
        needsOwnerInput: false,
      },
      {
        question: 'How do advertising rules affect the ads?',
        answer:
          'Platform policy and state bar advertising rules both constrain claims, disclaimers and some targeting. We write to those constraints rather than around them - a disapproved ad or a bar complaint costs more than the click ever saved.',
        needsOwnerInput: false,
      },
      {
        question: 'What is the minimum spend for a legal account?',
        answer: '[OWNER: minimum monthly ad spend for legal accounts, given typical CPCs]',
        needsOwnerInput: true,
      },
    ],
    proofRefs: [],
    relatedRoutes: ['/google-ads-management/', '/conversion-tracking/', '/austin-ppc-agency/'],
    firstHand: OWNER_FIRST_HAND,
    publishable: true,
  },

  {
    slug: 'med-spa',
    route: '/industries/med-spa/',
    title: 'Med Spa',
    h1: 'Paid media for med spas and aesthetics practices.',
    metaTitle: 'Med Spa PPC – Google & Meta Ads for Aesthetics | Bold Clicks',
    metaDescription:
      'Paid media for med spas in saturated markets: creative velocity, offer design that does not train discount shoppers, and treatment-level lead economics.',
    eyebrow: 'MED SPA',
    cardDescription: 'Saturated markets, fast creative fatigue, and offers that decide who books.',
    intro:
      'Med spa advertising is a creative and offer problem far more than a targeting one. In most metros the same treatments are being advertised to the same audience by a dozen practices, so what differentiates is the offer, the speed of follow-up, and how quickly new creative arrives.',
    audienceBehavior:
      'Demand is discretionary and largely created rather than captured, which pushes budget toward paid social and makes creative the main variable. Buyers compare on price when nothing else is offered to compare on, and they book with whoever responds first - follow-up measured in minutes materially changes booking rates. Treatment values differ enormously, so a blended cost per lead is close to meaningless.',
    campaignStructure: [
      { name: 'Treatment-level campaigns', detail: 'Injectables, body contouring and laser have different values and different buyers. A blended target hides which one is paying for the others.' },
      { name: 'Search for capture, social for creation', detail: 'Search takes people already looking for a treatment; social creates the interest. They get different budgets and different success measures.' },
      { name: 'Creative testing queue', detail: 'A running queue with a fixed cadence, because in this vertical creative fatigues in weeks rather than quarters.' },
      { name: 'Offer architecture', detail: 'Offers designed to attract a first treatment without training the market to wait for a discount.' },
    ],
    wastePatterns: [
      'One blended cost-per-lead target across treatments worth very different amounts.',
      'Discount-led creative that fills the calendar with single-visit shoppers.',
      'Creative left running past the point where frequency has climbed and cost per result has drifted.',
      'Lead forms with no qualifying question, producing volume that intake cannot convert.',
      'At-home, DIY and price-comparison searches absorbing search budget.',
    ],
    kpis: [
      { name: 'Cost per booked consultation', definition: 'Ad spend divided by consultations actually scheduled, per treatment category and date range.' },
      { name: 'Consultation-to-treatment rate', definition: 'Share of consultations that convert to a paid treatment, recorded in the CRM.' },
      { name: 'Creative fatigue signal', definition: 'Frequency alongside cost-per-result trend for each active concept.' },
      { name: 'Speed to first contact', definition: 'Median time from lead submission to first human contact attempt.' },
    ],
    objections: [
      {
        objection: 'Our leads are cheap but they never book.',
        answer: 'Cheap leads in this vertical usually mean the ask was too easy or the offer attracted price shoppers. The fix is a harder ask and feeding booking outcomes back to the platform.',
      },
      {
        objection: 'We do not have time to produce new creative constantly.',
        answer: 'Then the plan has to match that capacity. We pace budget to creative supply rather than scaling into fatigue, and repurposing existing footage goes further than most practices expect.',
      },
    ],
    faqs: [
      {
        question: 'Google or Meta for a med spa?',
        answer:
          'Usually both, doing different jobs. Search captures people already looking for a treatment and converts at a higher rate on a smaller pool. Social creates demand and scales further, at lower lead quality unless the offer and follow-up are tight.',
        needsOwnerInput: false,
      },
      {
        question: 'Do discount offers work?',
        answer:
          'They work for volume and can work badly for retention, because a discount-led first visit attracts people shopping for discounts. Where they earn their place, it is usually as an introduction to a treatment with a clear next step, not as a standing price position.',
        needsOwnerInput: false,
      },
      {
        question: 'How fast do we need to follow up?',
        answer:
          'Faster than feels necessary. This is a comparison-shopping vertical, and the practice that responds first is frequently the one that books, which makes intake speed part of the campaign rather than an operational detail.',
        needsOwnerInput: false,
      },
      {
        question: 'What should we budget?',
        answer: '[OWNER: minimum monthly ad spend and typical starting budget for med spa accounts]',
        needsOwnerInput: true,
      },
    ],
    proofRefs: [],
    relatedRoutes: ['/meta-ads-management/', '/google-ads-management/', '/conversion-tracking/'],
    firstHand: OWNER_FIRST_HAND,
    publishable: true,
  },

  {
    slug: 'dental',
    route: '/industries/dental/',
    title: 'Dental',
    h1: 'Paid media for dental practices.',
    metaTitle: 'Dental PPC – Google Ads for Dental Practices | Bold Clicks',
    metaDescription:
      'Google Ads for dental practices: emergency versus elective intent, procedure-level economics, insurance filtering and booked-appointment reporting.',
    eyebrow: 'DENTAL',
    cardDescription: 'Emergency and elective intent behave differently - and most accounts treat them the same.',
    intro:
      'Dental accounts usually contain two businesses wearing one budget. Emergency searches convert immediately, cheaply and at modest value. Elective and high-value procedures take longer, cost more per click, and need a different page and a different measure of success.',
    audienceBehavior:
      'Emergency intent is immediate and local, and the practice that answers the phone wins it. Elective intent - implants, cosmetic work, orthodontic consultations - involves research, price comparison and often a delay of weeks between click and booking, which means last-click reporting understates it. Insurance questions arrive early and filter hard: a practice out of network loses a share of otherwise-qualified demand.',
    campaignStructure: [
      { name: 'Emergency and elective separated', detail: 'Different bids, different hours, different landing pages, and different definitions of success.' },
      { name: 'Procedure-level campaigns for high-value work', detail: 'Implants and cosmetic procedures justify their own budgets; routine hygiene does not need one.' },
      { name: 'Suburban radius strategy', detail: 'Around Austin, the Round Rock and Cedar Park suburban corridors compete differently from the urban core and often price differently too.' },
      { name: 'Insurance qualification in copy', detail: 'Stating network status in the ad and on the page reduces paid clicks from people who will disqualify themselves at the phone call.' },
    ],
    wastePatterns: [
      '"Dentist near me" bid at one price for every procedure and every hour of the day.',
      'Emergency campaigns running after hours to a landing page with only a form.',
      'Elective procedure clicks judged on last-click conversions and cut before the booking arrives.',
      'Dental school, career and insurance-provider searches on broad match.',
      'Appointment-request forms counted as booked appointments in the conversion column.',
    ],
    kpis: [
      { name: 'Cost per booked appointment', definition: 'Ad spend divided by appointments confirmed in the practice management system, per procedure group and date range.' },
      { name: 'New patient value by procedure group', definition: 'Average first-visit and first-year value, used to set separate cost targets.' },
      { name: 'Emergency call answer rate', definition: 'Share of tracked emergency calls answered by a person during advertised hours.' },
      { name: 'Elective consultation rate', definition: 'Share of elective-procedure leads that reach a consultation, measured over a window long enough to be honest.' },
    ],
    objections: [
      {
        objection: 'Our cost per lead looks fine.',
        answer: 'A blended figure across emergency and elective almost always looks fine, because cheap emergency leads average out expensive elective ones. Split them and the picture usually changes.',
      },
      {
        objection: 'We tried implants campaigns and they did not work.',
        answer: 'Frequently they were judged too early on last-click data. Elective procedures have a consideration delay, and a campaign cut at thirty days is cut before its own results arrive.',
      },
    ],
    faqs: [
      {
        question: 'Should emergency and cosmetic campaigns share a budget?',
        answer:
          'No. They have different urgency, different click costs, different consideration periods and different patient values. Sharing a budget means the campaign that converts fastest quietly takes the money from the one worth more.',
        needsOwnerInput: false,
      },
      {
        question: 'How do you handle insurance questions?',
        answer:
          'By answering them in the ad and above the fold. Stating network status costs some clicks and saves the front desk from calls that were never going to book.',
        needsOwnerInput: false,
      },
      {
        question: 'Can you track appointments rather than form fills?',
        answer:
          'Where your practice management system or CRM records them, yes - that is the number worth optimising toward. Without it we can get to qualified calls and forms, and we will be clear about the difference.',
        needsOwnerInput: false,
      },
      {
        question: 'Do you work with orthodontic practices?',
        answer: '[OWNER: confirm whether orthodontics is publishable at launch; the vertical has its own page planned]',
        needsOwnerInput: true,
      },
    ],
    proofRefs: [],
    relatedRoutes: ['/google-ads-management/', '/conversion-tracking/', '/austin-ppc-agency/'],
    firstHand: OWNER_FIRST_HAND,
    publishable: true,
  },
] as const;

/**
 * Verticals in the Volume 2 s.20 keyword map that are deliberately not built.
 * Listed here so the gap is visible in review; tracked in docs/owner-inputs.md.
 */
export const plannedIndustries = [
  { slug: 'orthodontics', blockedOn: 'Owner confirmation of real orthodontic account experience and a first-hand block.' },
  { slug: 'podiatry', blockedOn: 'Owner confirmation of podiatry experience; P3 priority in the keyword map.' },
  { slug: 'ent-sinus', blockedOn: 'Owner confirmation of ENT/sinus experience; P3 priority.' },
  { slug: 'primary-care', blockedOn: 'Owner confirmation of primary-care experience; P3 priority.' },
] as const;

export const publishableIndustries = industries.filter((i) => i.publishable);

export function getIndustry(slug: string): Industry | undefined {
  return publishableIndustries.find((i) => i.slug === slug);
}
