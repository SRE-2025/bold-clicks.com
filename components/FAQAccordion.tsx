import type { Faq } from '@/lib/schema';

/**
 * FAQAccordion - Volume 2 s.29.
 *
 * Native details/summary: answers are in the HTML regardless of open state, so
 * they are crawlable and readable without JavaScript (Volume 1 s.08 forbids
 * hiding SEO copy behind an interaction). No FAQPage schema - Volume 1 s.09 is
 * explicit that FAQ rich results are limited to government and health sites.
 *
 * FAQs still awaiting owner input are filtered out rather than rendered with a
 * bracketed placeholder.
 */
export function FAQAccordion({ faqs, headingLevel = 3 }: { faqs: readonly Faq[]; headingLevel?: 2 | 3 }) {
  const visible = faqs.filter((faq) => !faq.needsOwnerInput);
  if (visible.length === 0) return null;

  const Heading = (headingLevel === 2 ? 'h2' : 'h3') as 'h2' | 'h3';

  return (
    <div className="mt-8 max-w-measure divide-y divide-sage/40 border-y border-sage/40">
      {visible.map((faq, index) => (
        <details key={faq.question} className="group py-4" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
            <Heading className="text-h3 text-black">{faq.question}</Heading>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-forest transition duration-200 group-open:rotate-45"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 4v12M4 10h12" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-body text-ink/85 md:text-body-lg">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
