import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Read rather than `import ... with { type: 'json' }`: import attributes are
// version-sensitive across Node releases, and a config that only fails on the
// CI runner is the worst place to discover that.
const readJson = (path) => JSON.parse(readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'));

const headers = readJson('./infra/headers.json');
const redirects = readJson('./infra/redirects.json');

/**
 * Staging and preview deployments set NOINDEX=true. The daily-integrity job
 * (Volume 2 s.25) fails if NOINDEX is ever true on production.
 */
const noindex = process.env.NOINDEX === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const base = [
      {
        source: '/:path*',
        headers: headers.global.map(({ key, value }) => ({ key, value })),
      },
    ];
    if (noindex) {
      base.push({
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      });
    }
    return base;
  },
  async redirects() {
    return redirects.rules.map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.statusCode === 301,
    }));
  },
};

export default nextConfig;
