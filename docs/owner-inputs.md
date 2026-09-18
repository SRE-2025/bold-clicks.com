# Owner inputs

Everything Claude Code cannot invent. Volume 2 s.35 asks for these in week 1.

Nothing here is guessed anywhere in the build. Where an input is missing the
site either renders nothing for that element (the usual case) or shows a plain
pending note (legal pages only, where silence would be worse). No bracketed
placeholder is visible to a visitor - `npm run crawl:prelaunch` fails if one is.

Status: **all items below are outstanding.**

---

## Blocks launch

These must be resolved before DNS cutover.

| # | Input | Where it lands | What happens without it today |
|---|-------|----------------|-------------------------------|
| 1 | **Approved logo files** — SVG master, PNG on cream, PNG on black, square mark | `public/brand/`, then flip `hasApprovedAsset` in `components/Logo.tsx` | A plain typographic wordmark renders. The logo is **not** generated or redrawn — Volume 1 forbids it. |
| 2 | **Favicon** generated from the approved mark | `app/layout.tsx` `icons` field (currently omitted) | No favicon is declared. Browsers still request `/favicon.ico` unprompted, so every page logs one console 404 and Lighthouse best-practices sits at 96 instead of 100 — above the 95 gate, but this is the reason it is not 100. A generic mark is not substituted: Volume 1 forbids inventing one. |
| 3 | **Legal entity name**, registered address, public phone, public email | `content/site.ts` | Footer, contact and terms omit these entirely. Organization schema omits `legalName` and `contactPoint`. |
| 4 | **Public office address — or confirmation there is none** | `content/site.ts` → `contact.address.isPublic` | Treated as a service-area business. No address is published and `LocalBusiness` schema is not emitted. Volume 2 s.18: never list a virtual office or co-working mailbox. |
| 5 | **Privacy jurisdictions** and consent-banner configuration, reviewed by counsel | `app/(marketing)/privacy/page.tsx` | A pending note is shown. The rest of the policy is accurate to the actual tracking footprint. |
| 6 | **Governing law and venue**, reviewed by counsel | `app/(marketing)/terms/page.tsx` | A pending note is shown. |
| 7 | **GoHighLevel**: location ID, inbound webhook URL, API key, calendar link, custom fields per Volume 2 s.31, pipeline stages incl. Qualified and Closed | `GHL_*` env vars | Leads are captured and logged server-side but do not reach the CRM. The booking button does not render. |
| 8 | **GTM container ID**, GA4 property + stream, Google Ads account and conversion actions | `NEXT_PUBLIC_GTM_CONTAINER_ID`, `GA4_*` | No tags load. `dataLayer` events still fire and are testable. |
| 9 | **Consent management platform** choice | GTM container | Consent Mode v2 defaults are set to denied; no banner exists yet to grant consent. |
| 10 | **Domain registrar / DNS access**, hosting account (Vercel or Cloudflare) | `infra/dns.json` | Cannot deploy. Claude Code never creates accounts. |

## Blocks specific sections

| # | Input | Where it lands | What happens without it today |
|---|-------|----------------|-------------------------------|
| 11 | **Named operators**: names, roles, headshots, 2–3 sentence bios, LinkedIn URLs | `operators` array in `app/(marketing)/about/page.tsx` | The "Who does the work" section does not render. No invented team members. |
| 12 | **First-hand block per service page** (5) — one real account observation each | `firstHand` in `content/services.ts` | `<FirstHand>` renders nothing on all five pages. |
| 13 | **First-hand block per industry page** (4) | `firstHand` in `content/industries.ts` | Same. |
| 14 | **Austin CPC ranges by vertical**, with date range and account count so methodology can be stated | `app/(marketing)/austin-ppc-agency/page.tsx` | The Austin page carries qualitative market structure only. It still passes the doorway test. |
| 15 | **Minimum monthly ad spend** (real figure) | `content/faqs.ts`, service and industry FAQs | Those FAQ entries are filtered out of the accordion. |
| 16 | **Pricing model** — flat fee / percentage / hybrid — and contract terms | `content/faqs.ts` | Filtered out. The services page explains the three models generically instead. |
| 17 | **Typical launch timeline** (days from kickoff) | `content/faqs.ts` | Filtered out. |
| 18 | **Audit turnaround** (business days) | `/free-ad-audit/` subhead | Copy is written to stand without it. |
| 19 | **Spend threshold** for the audit audience | `/free-ad-audit/` "Who it's for" | Copy is written to stand without it. |
| 20 | **Stoneridge relationship** — accurate one-paragraph description | `content/site.ts` → `family.description` | A conservative, accurate fallback paragraph is used. |
| 21 | **Client logos, testimonials, badges, metrics** — all with permission on file | `content/proof.json` | `ProofStrip` renders process proof instead. Never placeholders. |
| 22 | **First case study** — or confirmation none is ready | `content/case-studies/` | The case studies hub publishes the standard each study must meet, and says the first ones are in progress. |
| 23 | **Whether in-person meetings are offered** | `content/locations.ts` Austin FAQ | Filtered out. |
| 24 | **Which additional industries are publishable** — orthodontics, podiatry, ENT/sinus, primary care | `content/industries.ts` → `plannedIndustries` | Those four generate no route and appear nowhere. |

## Needed for the automation layer (Phase 6, not yet built)

| # | Input |
|---|-------|
| 25 | SERP/keyword provider choice + API key (DataForSEO, SerpApi or Semrush) |
| 26 | Uptime provider choice + API key (Checkly, Better Uptime or UptimeRobot) |
| 27 | PageSpeed Insights API key |
| 28 | Google service-account JSON with Search Console and GA4 Data API access |
| 29 | Anthropic API key for the Claude Code GitHub Action |
| 30 | Turnstile (or hCaptcha) site key and secret |
| 31 | Meta pixel/dataset ID; Microsoft Ads UET tag ID |
| 32 | Alert contacts: owner mobile and email; backup contact for escalation |

## Decisions the owner should confirm

| # | Decision | Current default |
|---|----------|-----------------|
| 33 | Font family (two WOFF2 files max, or one variable font at two weights) | System stack. Costs nothing, shifts nothing. |
| 34 | Primary CTA phrase | "Get My Free Ad Audit" |
| 35 | Spend bands on the form | Not running yet / <$2k / $2k–5k / $5k–15k / $15k–50k / $50k+ |
| 36 | Banned-phrase additions | `docs/voice.md` list |
| 37 | 12-month editorial calendar order | As written in Volume 2 s.21 |
| 38 | Publishing cap and benchmark minimum-sample rule | Cap 4 Insights/month; sample rule not yet set |
