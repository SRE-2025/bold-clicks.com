# Decisions log

Volume 2 s.36: any change to tracking, consent, redirects or robots requires a
note here. Anything else worth explaining to the next developer goes here too.

Newest first.

---

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

## 2026-09-18 — Logo is a typographic wordmark until the approved asset arrives

Volume 1 forbids redrawing or generating a logo, and none was supplied. The
site ships a plain text wordmark. `components/Logo.tsx` has a single flag to
switch to the real asset once it is in `public/brand/`.

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
