# Bold Clicks

Marketing site for Bold Clicks, an ads-only paid-media agency in Austin, TX
(Stoneridge family). Primary conversion: the free ad audit.

Built to the two briefs in [`docs/brief/`](docs/brief) — Volume 1 (brand,
sitemap, templates, launch checklist) and Volume 2 (ranking, content,
automation). Volume 1 wins on brand and no-fabrication rules; Volume 2 wins on
SEO, automation and implementation detail.

Operating instructions for the build agent are in [`CLAUDE.md`](CLAUDE.md).

## Status

| Phase | Scope | State |
|-------|-------|-------|
| 1 | Foundation: repo, tokens, components, schemas, route registry, CI | Done |
| 2 | Conversion core: homepage, free audit, lead handler, attribution, events | Done |
| 3 | Services hub and five platform pages | Done |
| 4 | Austin page, industries, About, Contact, legal | Done |
| 5 | Measurement: GTM container export, Ads conversions, offline loop | Not started |
| 6 | Automation: collectors, analysers, digest, alerting, runbooks | Not started |
| 7 | Content: Insight and case-study templates, calculator, month-1 drafts | Not started |
| 8 | Launch: AWS hosting, DNS cutover, hand-off report | Partial |

Every outstanding owner input is listed in [`docs/owner-inputs.md`](docs/owner-inputs.md).
Nothing is invented anywhere: missing inputs render as nothing, or as a plain
pending note on the legal pages.

## Setup

Node 20.9+ required.

```bash
npm install
npm run dev
```

The project pins pnpm in `packageManager`; `corepack enable` provides it, and
every script name is identical under either tool.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint:content` | Content schemas + the no-fabrication linter |
| `npm run audit:meta` | Title/description/H1/canonical/OG uniqueness and length |
| `npm run audit:schema` | JSON-LD validation, including banned types |
| `npm run audit:links` | Internal links and orphan routes |
| `npm run audit:doorway` | Volume 2 s.18 doorway-page rejection test |
| `npm run crawl:prelaunch` | Pre-launch crawl (Volume 2 s.33) |
| `npm run e2e` | Playwright: conversion path, a11y, consent, SEO |
| `npm run lhci` | Lighthouse budgets |

The audits read build output, so run `npm run build` first.

### Running the E2E suite locally on Windows

`npx playwright install` may stall partway through extracting Chromium — it
writes `chrome.dll` and then stops, usually antivirus scanning the archive. If
that happens, kill the install, delete
`%LOCALAPPDATA%\ms-playwright\__dirlock` and the partial `chromium-*` folder,
and run against an installed Chrome or Edge instead:

```bash
npx playwright test -c playwright.local.config.ts
```

Same specs, same assertions, system browser. CI always uses
`playwright.config.ts` with the bundled browser, and that is the run to trust.

## How this repo is organised

```
app/
  (marketing)/   header + footer + sticky CTA
  (landing)/     logo only, one conversion action — free audit, thank-you
  api/lead/      form handler -> GoHighLevel
  sitemap.ts     generated from the route registry
  robots.ts      staging blocks everything
components/      no copy lives here
content/         all copy and typed content objects
  routes.ts      the canonical route registry — the source of truth
lib/             seo, analytics, attribution, Zod schemas
automation/
  audit/         the CI gates
  lint/          the no-fabrication linter
infra/           headers, redirects, expected DNS state
docs/            briefs, voice, owner inputs, decisions, tracking plan
tests/e2e/       Playwright
```

**`content/routes.ts` is the spine.** Sitemap, robots, canonicals, breadcrumbs,
the link audit and the pre-launch crawl all derive from it. A page that is not
registered there fails the metadata audit; a registered route that does not
build fails the crawl. Add every new route to it in the same PR.

## Environment variables

Public values go in the AWS Amplify environment. Runtime secrets such as the
GoHighLevel webhook also belong in Amplify; automation secrets go in GitHub
Actions. Nothing is committed.

| Name | Used by | Where it lives | Required now |
|------|---------|----------------|--------------|
| `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, schema | Hosting env, per environment | Yes for deploy |
| `NOINDEX` | robots.txt, robots meta, headers | Hosting env — **`true` on staging and previews, `false` on production** | Yes |
| `GHL_WEBHOOK_URL` | Lead route handler | Hosting env | Yes for live leads |
| `GHL_API_KEY`, `GHL_LOCATION_ID` | Case-study trigger, digest sender | Actions secrets | Phase 6 |
| `NEXT_PUBLIC_GTM_CONTAINER_ID` | Tag layer | Hosting env | Yes for tracking |
| `GA4_MEASUREMENT_ID`, `GA4_PROPERTY_ID`, `GA4_API_SECRET` | Analytics, synthetic test | Hosting env / Actions secrets | Phase 5 |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Search Console, GA4 Data API | Actions secret, base64 | Phase 6 |
| `PSI_API_KEY` | Vitals collector | Actions secret | Phase 6 |
| `SERP_PROVIDER`, `SERP_API_KEY` | Competitive and rank collectors | Actions secrets | Phase 6 |
| `UPTIME_PROVIDER`, `UPTIME_API_KEY` | Uptime summary | Actions secrets | Phase 6 |
| `TURNSTILE_SECRET` | Lead route spam check | Hosting env | Recommended |
| `ANTHROPIC_API_KEY` | Claude Code GitHub Action | Actions secret | Phase 6 |

**Rotating a secret:** change it at the provider, update the relevant Amplify
environment variable or GitHub Actions secret, and redeploy. The lead handler
reads `GHL_WEBHOOK_URL` from the server environment at request time.

**The one that will bite you:** `NOINDEX` must be `false` in production. A
staging value leaking into production deindexes the site. The daily-integrity
job (Phase 6) fails loudly on this, and until that exists it is a manual check
in the DNS cutover procedure.

## CI

Checks run in `.github/workflows/ci.yml`. Pushing to `main` publishes to AWS
Amplify after its build succeeds; check CI separately before treating a change
as fully verified.

- Lint, typecheck, content schemas, no-fabrication linter
- Build, then metadata / structured data / link / doorway / pre-launch audits
- Playwright: conversion path, axe (zero serious or critical), consent denied,
  noindex on thank-you, real 404
- Lighthouse: performance ≥ 90, a11y ≥ 95, best practices ≥ 95, SEO = 100

## Deploying

AWS Amplify app `dbxhe6dmcsatw` in `us-east-1` builds the GitHub `main` branch
with [`amplify.yml`](amplify.yml). The temporary host is
`https://main.dbxhe6dmcsatw.amplifyapp.com`. GoDaddy holds the DNS zone:
`www.bold-clicks.com` is a CNAME to Amplify, and the apex has a permanent
HTTPS forward to `https://www.bold-clicks.com`. The Google Workspace mail
records remain at GoDaddy. Amplify uses a managed HTTPS certificate.

`NEXT_PUBLIC_SITE_URL` is `https://www.bold-clicks.com`. `NOINDEX` is `false`
for the public deployment; verify the resulting robots.txt and headers after
each launch. `GHL_WEBHOOK_URL` is still an owner input. Until it is configured,
the audit form returns an error and does not claim an enquiry was received.
Privacy and terms still require owner details and counsel review. The DNS
cutover procedure is described in Volume 2 s.34.

## Rules that are not negotiable

From Volume 1 and `CLAUDE.md`:

- Use the approved logo exactly as supplied. Never redraw, recolour or generate one.
- Never invent numbers, clients, testimonials, badges, awards, addresses or prices.
- Ads only. Bold Clicks is not an SEO, web design, social, email or automation agency.
- Static or server-rendered HTML for all primary copy.
- One location page per real market. Never templated city pages.
- Automation proposes via PRs. It never publishes or changes tracking without a merge.
