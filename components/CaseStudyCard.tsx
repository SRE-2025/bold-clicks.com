'use client';

import Link from 'next/link';
import type { CaseStudy } from '@/lib/schema';
import { track } from '@/lib/analytics';

/**
 * CaseStudyCard - Volume 2 s.29.
 *
 * Renders only when permissionOnFile and verifiedAt both exist. Every metric
 * shows its definition and date range alongside the number, because a figure
 * without those is not verifiable and Volume 1 s.06 requires both.
 */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  if (!caseStudy.permissionOnFile || !caseStudy.verifiedAt) return null;

  const { clientProfile, outcome, slug } = caseStudy;
  const name = clientProfile.nameWithPermission ?? `${clientProfile.industry} — ${clientProfile.geography}`;

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-sage/30 bg-white p-6 shadow-card">
      <p className="text-eyebrow uppercase text-forest md:text-eyebrow-lg">{clientProfile.industry}</p>

      <h3 className="mt-3 text-h3 md:text-h3-lg">
        <Link
          href={`/case-studies/${slug}/`}
          onClick={() => track.caseStudyView(slug)}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {name}
        </Link>
      </h3>

      <p className="mt-3 text-small-lg text-ink/80">{caseStudy.startingPoint}</p>

      <dl className="mt-6 space-y-4 border-t border-sage/30 pt-6">
        {outcome.metrics.map((metric) => (
          <div key={metric.factId}>
            <dt className="text-small text-ink/70">{metric.name}</dt>
            <dd className="font-display text-h3 text-black">{metric.value}</dd>
            <dd className="text-small text-ink/70">
              {metric.definition} &middot; {metric.dateRange}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-small text-ink/70">{caseStudy.context}</p>
    </article>
  );
}
