import { readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { globSync } from 'glob';
import { routes, type RouteEntry } from '../../content/routes';

/**
 * Shared loader for the prerendered HTML the audits run against.
 *
 * The audits deliberately read build output rather than source: a metadata or
 * schema bug that only appears after rendering is exactly the class of bug
 * these checks exist to catch.
 */

const BUILD_DIR = join(process.cwd(), '.next', 'server', 'app');

export interface BuiltPage {
  /** Canonical route path with trailing slash, e.g. "/services/". */
  path: string;
  file: string;
  html: string;
  route: RouteEntry | undefined;
}

/** ".next/server/app/industries/legal.html" -> "/industries/legal/" */
function filePathToRoute(file: string): string {
  const rel = relative(BUILD_DIR, file).split(sep).join('/').replace(/\.html$/, '');
  if (rel === 'index') return '/';
  return `/${rel}/`;
}

export function loadBuiltPages(): BuiltPage[] {
  const files = globSync('**/*.html', { cwd: BUILD_DIR, absolute: true, nodir: true });

  if (files.length === 0) {
    throw new Error('No built HTML found. Run `npm run build` before the audits.');
  }

  return files
    // Next emits _not-found.html; it is asserted separately by the crawl.
    .filter((file) => !file.includes('_not-found'))
    .map((file) => {
      const path = filePathToRoute(file);
      return {
        path,
        file,
        html: readFileSync(file, 'utf8'),
        route: routes.find((r) => r.path === path),
      };
    });
}

export function extractAll(html: string, pattern: RegExp): string[] {
  return [...html.matchAll(pattern)].map((m) => m[1] ?? '').filter(Boolean);
}

export function extractOne(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1] ?? null;
}

/** Strips tags, scripts and styles so text-level checks see readable copy. */
export function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface Failure {
  page: string;
  message: string;
}

export function report(name: string, failures: Failure[], checked: number): void {
  if (failures.length === 0) {
    console.log(`PASS  ${name} (${checked} page${checked === 1 ? '' : 's'})`);
    return;
  }
  console.error(`FAIL  ${name} - ${failures.length} problem${failures.length === 1 ? '' : 's'}`);
  for (const failure of failures) console.error(`  ${failure.page}: ${failure.message}`);
  process.exitCode = 1;
}
