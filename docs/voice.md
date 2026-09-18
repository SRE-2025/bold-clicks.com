# Voice

Volume 1 s.02, extended with the banned-phrase list the linter enforces.

## The test

> If the copy could be pasted onto 100 other agencies and still work, rewrite it.

Apply it to every paragraph, not every page. A page can pass overall and still
contain three sentences that would fit any agency's site.

## How we write

- Short, confident, specific sentences. Plain English. Operator to operator.
- Use the words buyers use: ad spend, qualified leads, booked calls, CAC, cost
  per lead, revenue, ROAS, tracking, landing pages, wasted spend.
- Say the uncomfortable thing when it is true. "We will tell you if your budget
  is too small" is more persuasive than a claim, because it costs us something.
- Prefer a concrete mechanism to an adjective. Not "sophisticated tracking" -
  "calls counted over a qualifying duration rather than every dial."
- Answer the question first, then support it. This is also how the content ranks
  (Volume 1 s.09) and how it reads well.
- Name the trade-off. Every real recommendation has one; copy that hides it
  reads as sales material.

## What we never write

- Guaranteed ROAS, guaranteed growth, guaranteed rankings, guaranteed anything.
- A number without a fact id or a cited source.
- A claim about certifications, partner status, clients, or awards that is not
  in `content/proof.json`.
- Anything that describes Bold Clicks as an SEO, web design, social, email,
  reputation or automation agency. Ads only.
- Competitor names in a disparaging comparison.

## Banned phrases

The linter warns on these; a reviewer decides. The point is not that the words
are forbidden - it is that each one is usually standing in for a specific claim
the writer did not make.

- unlock your potential
- cutting-edge
- 360-degree
- results-driven (unless immediately followed by the result)
- synergy
- game-changing
- best-in-class
- world-class
- industry-leading
- take it to the next level
- move the needle
- secret sauce
- data-driven (unless the data is named)
- passionate about
- we're not just an agency
- in today's digital landscape
- seamless
- laser-focused
- ROI-obsessed
- leverage (as a verb, where "use" works)

## Em dashes and typography

Use a real em dash (—) with spaces around it, or restructure the sentence.
Avoid stacking more than one per paragraph.

## First-hand blocks

Every Insight needs a `<FirstHand>` block with something only Bold Clicks could
write: an observation, a screenshot, a number, or a mistake. Volume 2 s.26 calls
this "the single most important ranking control in this document," and the
linter blocks an Insight without one.

Bullet points from the operator are enough. The drafting step writes around
them; it never invents them.

## Reviewer checklist

- [ ] Would this paragraph survive the voice test?
- [ ] Does every number trace to a fact id or a cited URL?
- [ ] Does every claim about the business trace to proof.json?
- [ ] Is there at least one thing here a competitor could not have written?
- [ ] Is the trade-off stated where there is one?
- [ ] Named reviewer recorded in the frontmatter?
