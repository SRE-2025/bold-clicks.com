# Decisions log

Volume 2 s.36: any change to tracking, consent, redirects or robots requires a
note here. Anything else worth explaining to the next developer goes here too.

Newest first.

---

## 2026-11-02 — Test inline CSS against the mobile LCP gate

The November 2 release passed build, content, accessibility and end-to-end
checks. Its homepage Lighthouse LCP was 2,063 ms against the 2,000 ms lab
budget; the other audited routes passed. The report identified the 6 KB
stylesheet as a render-blocking request with about 110 ms potential savings.
Next.js `experimental.inlineCss` is being tested on a review branch to remove
that request from the first paint. It duplicates CSS in the initial HTML and
does not share a cached stylesheet across first-page visits, so the setting
stays only if CI's full Lighthouse and browser checks pass.

---

## 2026-10-26 — ChatGPT-first SEO prepared without deployment

The owner explicitly requested resuming the unfinished ChatGPT-first work,
preserving the design and making no unverified advertising claims. The
repository and connected GitHub default branch were still at the September
launch commit `ce514f6`; only `main` was returned by the branch inventory.

The review branch changes homepage positioning, metadata, navigation, the
services and Insights hubs, and the About intro. The existing visual tokens,
approved logo, CSS, layouts, paid-media routes and free-audit CTA are preserved.
The `/chatgpt-ads/` page reuses the service template, with optional content
headings so it does not inherit a claim about the first thirty days of
campaign management. Planning and activation readiness are stated separately.

OpenAI sources were checked on October 26. Platform facts carry visible source
links. No campaign experience, outcome, fee, endorsement, privileged access,
Grok placement or Gemini-app placement is invented. Organization schema adds
only ChatGPT advertising planning, matching the visible scope.

The enquiry select adds `chatgpt_ads` through its existing shared option list;
the current form and server use that same list. No analytics event, tag,
consent behavior, webhook, credential, redirect or robots rule is changed.
The owner must confirm the receiving CRM mapping before promotion.

Three supporting MDX files are deliberately stored in `content/drafts/`.
They are not imported, routed or listed in the sitemap. Each is explicitly a
draft, has `publishable: false`, and retains missing-author, reviewer and
first-hand-evidence markers. The publishing gates stay in force.

No remote branch is pushed while Amplify auto-branch/preview behavior remains
unverified. Pushing `main` is known to deploy. Work is verified and committed
locally for review; deployment requires the owner's explicit authorization.

See `docs/chatgpt-seo-implementation-2026-10-26.md` for evidence, checks and
remaining actions.

## 2026-09-18 — Consent defaults live at the top of `<body>`, not in `<head>`

Rendering an explicit `<head>` in the App Router root layout made React drop
Next's injected metadata during hydration. The served HTML was correct — so the
build-output audits all passed — but in the live DOM `<title>`, `lang`, the meta
description and the canonical were all gone after hydration. Lighthouse caught
it as a missing title on the service pages.

The consent script is now the first node in `<body>`, which still runs before
GTM (injected `afterInteractive`) and leaves Next's metadata alone.

Worth remembering: the metadata audits read build output, so they cannot see a
post-hydration regression. Lighthouse is the check that covers that gap.

**Label:** tracking, seo-critical.

## 2026-09-18 — Logo link has no aria-label

The visible wordmark reads "Bold.Clicks"; an `aria-label` of "Bold Clicks -
home" replaced it with a name that does not contain the visible text, which is a
WCAG 2.5.3 label-in-name failure. The visible text is now the accessible name.
When the approved asset lands, the image's alt text supplies it instead.

## 2026-09-18 — Lead rate limit is best-effort, and set to 10/min

Found by the E2E suite returning 429 mid-run. Two problems with the original
5/min: it is tight enough to turn away real enquiries from a shared office or
clinic NAT, and it made the parallel test run non-deterministic.

Now 10 per minute per IP, overridable with `LEAD_RATE_LIMIT_MAX` (the Playwright
web server sets it high so functional tests are deterministic; the limiter
itself is covered by `tests/unit/rate-limit.test.ts`).

It remains **best-effort**. On serverless hosting the counter lives in one
instance's memory, so the real limit across a fleet is a multiple of this and
resets on cold start. The honeypot and Turnstile do the actual spam work. A hard
limit would need shared state (hosting KV or Redis); that is a deliberate
non-goal for launch rather than an oversight.

## 2026-09-18 — Lead form posts to `/api/lead/`, with the trailing slash

`trailingSlash: true` makes `/api/lead` return a 308, and the browser's
re-POST after that redirect did not carry through — the form silently failed in
production while the E2E test passed, because the test waited on the *request*
rather than the response. Both are fixed: the client calls the canonical path,
and the test asserts a 200.

**Label:** seo-critical (the trailing-slash policy is what caused it).

## 2026-09-18 — `Eyebrow` takes a tone prop instead of a className override

axe found gold eyebrow text on cream at 2.15:1, against a 4.5:1 requirement —
and Volume 2 s.29 already says gold on cream fails for text. The cause was a
hard-coded `text-gold` with call sites passing `className="text-forest"`: both
classes land on the element and the winner depends on stylesheet order, not
attribute order. The colour is now a prop, so the two cannot both be applied.

Muted body text also moved from `text-ink/60` (4.23:1 on cream) to
`text-ink/70` (5.83:1).

## 2026-09-18 — Third-party script inventory

Required by the pre-launch crawl (Volume 2 s.33).

| Script | Purpose | Load strategy |
|--------|---------|---------------|
| Consent Mode v2 defaults | Deny advertising/analytics storage before any tag loads | Inline in `<head>`, blocking by design (~500 bytes) |
| Google Tag Manager | Tag delivery | `next/script` `afterInteractive` |
| Cloudflare Turnstile | Form spam scoring | Not yet added; will load on the audit and contact pages only, on form interaction |
| GoHighLevel calendar | Booking | On interaction, via `BookingLink` — never on page load |

Everything else is first-party. There is no chat widget, heatmap or A/B tool,
and adding one requires a PR and an entry here (Volume 1 s.14).

## 2026-09-18 — Consent defaults moved out of `next/script`

`next/script` with `beforeInteractive` is unsupported outside the document in
the App Router, and ESLint flags it. Consent Mode defaults must run before GTM,
so they are now a plain inline `<script>` rendered by a server component in the
document head (`components/ConsentDefaults.tsx`). Guaranteed ordering, no
client-component dependency, and lint-clean.

**Label:** tracking.

## 2026-09-18 — npm rather than pnpm for local verification

Volume 2 s.36 specifies `pnpm` commands in CLAUDE.md, and those are preserved
verbatim. pnpm was not installed on the build machine, so the work was verified
with npm. Script names are identical, so `pnpm <script>` and `npm run <script>`
behave the same. `packageManager` is pinned to pnpm in `package.json`;
`corepack enable` provides it.

## 2026-09-18 — `trailingSlash: true`

The route registry, canonicals, sitemap and internal links all use trailing
slashes. Picking one form and enforcing it everywhere is what keeps the
redirect audit meaningful; the choice itself is arbitrary.

## 2026-09-18 — No `lastModified` in sitemap.xml

Volume 2 s.22 forbids fake freshness, and a build timestamp on every URL is
exactly that. `lastModified` is added per-URL once content carries a real
material-update date.

**Label:** seo-critical.

## 2026-09-18 — No FAQPage schema anywhere

Volume 1 s.09: FAQ rich results are generally limited to authoritative
government and health sites. Visible FAQs are kept for users; the markup is not
emitted, and `npm run audit:schema` fails if it ever appears.

**Label:** seo-critical.

## 2026-09-22 — Use the owner-supplied logo and its palette

The owner provided a shared ChatGPT image showing the mountain/cursor mark and
"BOLD CLICKS" wordmark on a light background. The original PNG is stored in
`public/brand/` and rendered unchanged. CSS clips only the empty outer margin
in compact header placements. On dark sections, the original light background
remains visible. The site palette now uses the image's forest green, sage and
cream instead of black and gold. The vector master and a reversed variant were
not supplied.

## 2026-09-18 — Interim typographic wordmark

Volume 1 forbids redrawing or generating a logo, and none was supplied. The
site originally shipped a plain text wordmark. This was superseded when the
owner supplied the image on September 22.

## 2026-09-18 — Four industry pages, not eight

Volume 2 s.20 maps eight verticals. Volume 1 s.06 says not to publish a vertical
page the team cannot say something distinct about. Home services, legal, med spa
and dental are published; orthodontics, podiatry, ENT/sinus and primary care are
listed in `plannedIndustries` and generate no route, no nav entry and no
sitemap entry until the owner confirms real expertise.

## 2026-09-18 — One location page

Austin only. `/texas-ppc-agency/` unlocks at Tier 2 (Volume 2 s.00); metro
pages require a verified client in that metro. `npm run audit:doorway` enforces
the Volume 2 s.18 rejection test in CI.

**Label:** seo-critical.

## 2026-09-18 — Pending notes on legal pages only

Most missing owner inputs render as nothing. The privacy and terms pages are the
exception: the privacy policy is linked from the form's consent checkbox and has
to exist, so an unfinished section says so in plain language rather than
vanishing and implying the question was settled. `components/PendingNote.tsx` is
the only sanctioned way to show a gap to a visitor, and the pre-launch crawl
fails on any `[OWNER` string in rendered text.
