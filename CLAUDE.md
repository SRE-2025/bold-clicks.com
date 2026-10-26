# Bold Clicks - CLAUDE.md

## Current owner direction — October 26, 2026

- Resume ChatGPT-first SEO implementation; national ChatGPT ads agency intent
  takes priority over the older Austin-first acquisition order below.
- Preserve the existing design, approved logo, palette and existing paid-media pages.
- Do not claim active ChatGPT account access, operator experience, campaign results,
  special relationships or restricted-format availability without evidence.
- Prepare changes for review only. Do not deploy, merge into `main`, or push a
  branch that could trigger an unapproved Amplify deployment.
- Supporting Insights remain drafts until real first-hand evidence and a named
  reviewer exist. Do not weaken those gates to publish AI-written material.
- Do not use the shared desktop browser without first notifying the owner;
  other chats may be actively using it.

Implementation status and remaining inputs:
`docs/chatgpt-seo-implementation-2026-10-26.md`.

## What this is
Marketing site for Bold Clicks, an ads-only paid-media agency in Austin, TX (Stoneridge family).
Primary conversion: free ad audit. Ranking strategy: Austin -> Texas -> surrounding states -> national.
Two governing documents live in /docs/brief/: Volume 1 (brand, sitemap, templates, launch checklist)
and Volume 2 (ranking, content, automation). Volume 1 wins on brand/no-fabrication; Volume 2 wins on
SEO/automation/implementation.

## Non-negotiables
- Use the approved logo assets in /public/brand exactly. Never redraw, recolor, or generate a logo.
- Never invent numbers, clients, testimonials, badges, awards, addresses, or prices. Use [OWNER]
  placeholders in content files; the linter blocks placeholders from publishing.
- Ads only. Do not describe Bold Clicks as SEO, web design, social, email, or automation agency.
- Static/server-rendered HTML for all primary copy. No copy behind clicks or client-side fetches.
- One location page per real market; never templated city pages. Run the doorway test (Volume 2 s.18).
- Automation drafts and proposes via PRs. It never publishes or changes tracking without a merge.

## Commands
pnpm dev | pnpm build | pnpm lint | pnpm typecheck | pnpm test (unit) | pnpm e2e (Playwright)
pnpm lint:content (schemas + no-fabrication) | pnpm audit:meta | pnpm audit:schema | pnpm audit:links
pnpm lhci | pnpm crawl:prelaunch | pnpm job <name> (runs an automation job locally with .env.local)

`npm run <script>` works identically if pnpm is not enabled - see docs/decisions.md.

## Working rules
- Read /docs/voice.md before writing any copy. Every Insight needs a <FirstHand> block.
- Content lives in /content. Do not hard-code copy in components.
- Add every new route to /content/routes.ts (sitemap, robots, canonical, breadcrumbs derive from it).
- Add every new event to /lib/analytics.ts and to docs/tracking-plan.md in the same PR.
- Any change to tracking, consent, redirects, or robots requires a PR labeled 'tracking' or 'seo-critical'
  and a note in docs/decisions.md.
- Prefer small PRs with a preview link and a one-paragraph 'why' for the owner's digest.
- When a required input is missing, do not guess: write the placeholder, add it to
  docs/owner-inputs.md, and continue.

## Definition of done (any task)
Build passes; all CI checks green; content schemas valid; no placeholders in publishable files;
metadata unique; a11y and Lighthouse budgets met; e2e green; docs updated; PR description written
for a non-technical reader.
