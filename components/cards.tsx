import Link from 'next/link';
import { publishableIndustries } from '@/content/industries';
import { services } from '@/content/services';
import { cx } from './primitives';

/**
 * Card components - Volume 2 s.29.
 *
 * Whole card clickable with a single accessible link (the stretched-link
 * pattern), so screen readers hear one link per card rather than three.
 */

function Card({
  href,
  eyebrow,
  title,
  description,
  className,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'group relative rounded-card border border-sage/30 bg-white p-6 shadow-card transition duration-200 ease-out hover:-translate-y-px',
        className,
      )}
    >
      {eyebrow && <p className="text-eyebrow uppercase text-forest md:text-eyebrow-lg">{eyebrow}</p>}
      <h3 className="mt-3 text-h3 md:text-h3-lg">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className="mt-3 text-small-lg text-ink/80">{description}</p>
      <span aria-hidden="true" className="mt-4 inline-block text-small-lg text-forest group-hover:text-black">
        Read more &rarr;
      </span>
    </div>
  );
}

export function ServiceCard({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return (
    <Card
      href={service.route}
      eyebrow={service.eyebrow}
      title={service.title}
      description={service.cardDescription}
    />
  );
}

export function ServiceGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Card
            href={service.route}
            eyebrow={service.eyebrow}
            title={service.title}
            description={service.cardDescription}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}

/** Only publishable industries appear anywhere (Volume 2 s.29). */
export function IndustryGrid() {
  if (publishableIndustries.length === 0) return null;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {publishableIndustries.map((industry) => (
        <li key={industry.slug}>
          <Card
            href={industry.route}
            title={industry.title}
            description={industry.cardDescription}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}
