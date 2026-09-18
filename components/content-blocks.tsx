import type { ReactNode } from 'react';
import { isPending } from '@/content/site';
import { Eyebrow, GoldRule, cx } from './primitives';

/**
 * Shared content blocks: process steps, first-hand evidence, deliverables,
 * and the measurement diagram. Volume 2 s.29 component specs.
 */

export function ProcessSteps({
  steps,
  tone = 'light',
}: {
  steps: readonly { name: string; whatYouGet: string }[];
  tone?: 'light' | 'dark';
}) {
  return (
    <ol className="mt-8 grid gap-6 md:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.name} className="flex flex-col">
          <span
            className={cx(
              'font-display text-h3 md:text-h3-lg',
              tone === 'dark' ? 'text-gold' : 'text-forest',
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <GoldRule className="my-3 w-8" />
          <h3 className={cx('text-h3', tone === 'dark' && 'text-cream')}>{step.name}</h3>
          <p className={cx('mt-2 text-small-lg', tone === 'dark' ? 'text-mist' : 'text-ink/80')}>
            {step.whatYouGet}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * FirstHand - Volume 2 s.26 rule 2 and s.29.
 *
 * A visually distinct block labelled "From our accounts". Renders nothing while
 * the content is still an [OWNER] placeholder, which is what keeps an
 * unfinished page honest rather than filled with brackets. The no-fabrication
 * linter separately blocks publishing an Insight that has no FirstHand content.
 */
export function FirstHand({ children, label = 'From our accounts' }: { children: string; label?: string }) {
  if (isPending(children)) return null;

  return (
    <aside className="my-8 rounded-card border-l-2 border-gold bg-white p-6 shadow-card">
      <Eyebrow on="light">{label}</Eyebrow>
      <div className="prose-bc mt-3 text-ink">
        <p>{children}</p>
      </div>
    </aside>
  );
}

export function DeliverablesList({
  items,
}: {
  items: readonly { name: string; detail: string }[];
}) {
  return (
    <dl className="mt-8 grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.name} className="border-t border-sage/40 pt-4">
          <dt className="text-h3 text-black">{item.name}</dt>
          <dd className="mt-2 text-small-lg text-ink/80">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx('mt-6 max-w-measure space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-6 text-body md:text-body-lg">
          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * MeasurementBlock - Volume 2 s.29.
 *
 * Inline SVG with an accessible description. The diagram is the one visual on
 * the homepage, and it is the site demonstrating its own argument: lead is not
 * the finish line.
 */
export function MeasurementBlock() {
  const stages = ['Click', 'Lead', 'Qualified', 'Booked', 'Closed'];

  return (
    <figure className="mt-8">
      <svg
        viewBox="0 0 900 150"
        role="img"
        aria-labelledby="measurement-title measurement-desc"
        className="w-full"
      >
        <title id="measurement-title">How Bold Clicks measures a campaign</title>
        <desc id="measurement-desc">
          Five stages run left to right: click, lead, qualified, booked and closed. Tracking runs underneath all
          five, and the qualified, booked and closed outcomes are sent back to the ad platforms so bidding
          optimises toward customers rather than form fills.
        </desc>

        {stages.map((stage, index) => {
          const x = 20 + index * 176;
          return (
            <g key={stage}>
              <rect x={x} y={20} width={150} height={48} rx={6} fill="#0B0D0C" />
              <text x={x + 75} y={50} textAnchor="middle" fill="#F3F2E7" fontSize="16" fontWeight="600">
                {stage}
              </text>
              {index < stages.length - 1 && (
                <path
                  d={`M${x + 154} 44 L${x + 172} 44`}
                  stroke="#C6A15B"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#C6A15B" />
          </marker>
        </defs>

        <rect x={20} y={92} width={854} height={40} rx={6} fill="#2F4428" />
        <text x={447} y={117} textAnchor="middle" fill="#F3F2E7" fontSize="15">
          Tracking layer: calls, forms, CRM outcomes and offline conversions sent back to Google and Meta
        </text>
      </svg>
    </figure>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('prose-bc', className)}>{children}</div>;
}
