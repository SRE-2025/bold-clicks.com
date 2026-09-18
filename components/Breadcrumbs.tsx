import Link from 'next/link';
import { breadcrumbTrail, getRoute } from '@/content/routes';

/**
 * Breadcrumbs - Volume 1 s.08, Volume 2 s.29.
 * Generated from content/routes.ts, the same source the BreadcrumbList JSON-LD
 * uses, so the visible trail and the markup cannot drift apart.
 */
export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  const self = getRoute(path);
  if (!self || trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-small text-ink/70">
        {trail.map((entry) => (
          <li key={entry.path} className="flex items-center gap-2">
            <Link href={entry.path} className="hover:text-black hover:underline">
              {entry.label}
            </Link>
            <span aria-hidden="true" className="text-sage">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="text-ink">
          {self.label}
        </li>
      </ol>
    </nav>
  );
}
