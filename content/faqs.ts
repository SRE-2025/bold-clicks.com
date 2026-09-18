import type { Faq } from '@/lib/schema';

/**
 * Homepage FAQ - Volume 2 s.30.
 *
 * Visible answers only; no FAQPage schema. Volume 1 s.09 is explicit that FAQ
 * rich results are generally limited to authoritative government and health
 * sites, so marking these up promises a result that will not arrive.
 *
 * Answers still containing an [OWNER] input carry needsOwnerInput and are
 * filtered out of the rendered accordion rather than shown with a placeholder.
 */
export const homepageFaqs: readonly Faq[] = [
  {
    question: 'What’s the minimum ad spend you work with?',
    answer:
      '[OWNER: state the real minimum] We’re honest when a budget is too small to produce reliable data, and we’ll tell you what to do instead.',
    needsOwnerInput: true,
  },
  {
    question: 'Who owns the ad accounts?',
    answer:
      'You do. We work inside accounts you own, and if we ever part ways you keep everything - campaigns, history, data.',
    needsOwnerInput: false,
  },
  {
    question: 'How do you charge?',
    answer:
      '[OWNER: flat monthly management fee / percentage / hybrid]. No long-term contracts; month to month after the initial build period.',
    needsOwnerInput: true,
  },
  {
    question: 'How fast can campaigns launch?',
    answer:
      '[OWNER: typical days from kickoff], and never before conversion tracking is verified.',
    needsOwnerInput: true,
  },
  {
    question: 'Which platforms do you manage?',
    answer:
      'Google Ads (Search, Performance Max, Shopping where relevant), Meta (Facebook and Instagram), Microsoft Ads and YouTube. We don’t do SEO, web design or social management - our sister agency Stoneridge Digital does.',
    needsOwnerInput: false,
  },
  {
    question: 'What will I see in reports?',
    answer:
      'Leads, qualified leads, booked calls, cost per qualified lead, and revenue where your CRM allows - by platform and campaign. Plus what we changed and why.',
    needsOwnerInput: false,
  },
  {
    question: 'Do you work with businesses outside Austin?',
    answer:
      'Yes. We’re based in Austin and work with businesses across Texas and neighboring states, and remotely nationwide.',
    needsOwnerInput: false,
  },
] as const;

/** Only FAQs with a real answer reach the page. */
export const visibleHomepageFaqs = homepageFaqs.filter((f) => !f.needsOwnerInput);
