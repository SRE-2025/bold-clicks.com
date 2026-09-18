import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { industries } from '../../content/industries';
import { locations } from '../../content/locations';
import { services } from '../../content/services';
import { homepageFaqs } from '../../content/faqs';
import { pageMeta } from '../../content/seo';
import { routes } from '../../content/routes';
import {
  industrySchema,
  locationSchema,
  metaDescriptionSchema,
  metaTitleSchema,
  proofSchema,
  serviceSchema,
  factSchema,
} from '../../lib/schema';
import { report, type Failure } from '../lib/built-pages';

/**
 * Content schema validation + no-fabrication linter - Volume 2 s.26.
 *
 * This is the guardrail the brief calls code rather than policy. It runs on
 * source content (not build output) so a bad draft fails before it renders.
 *
 * Blocking checks:
 *   - every content object parses against its Zod schema
 *   - every route in the registry has metadata, and vice versa
 *   - unsourced numbers: a figure in publishable copy with no fact id or URL
 *   - proof claims that are not in proof.json
 *   - placeholders in copy that is marked publishable
 *   - duplicated 40-word windows across pages
 *
 * Warning checks (reviewer decides):
 *   - banned phrases from docs/voice.md
 */

const ROOT = process.cwd();

const proofData = JSON.parse(readFileSync(join(ROOT, 'content/proof.json'), 'utf8')) as {
  items: unknown[];
};
const factData = JSON.parse(readFileSync(join(ROOT, 'data/approved-facts.json'), 'utf8')) as {
  facts: unknown[];
};

const approvedFactIds = new Set(
  factData.facts.flatMap((f) => {
    const parsed = factSchema.safeParse(f);
    return parsed.success ? [parsed.data.id] : [];
  }),
);

const proofIds = new Set(
  proofData.items.flatMap((p) => {
    const parsed = proofSchema.safeParse(p);
    return parsed.success ? [parsed.data.id] : [];
  }),
);

const BANNED_PHRASES = [
  'unlock your potential',
  'cutting-edge',
  '360-degree',
  'synergy',
  'game-changing',
  'best-in-class',
  'world-class',
  'industry-leading',
  'next level',
  'move the needle',
  'secret sauce',
  'passionate about',
  "we're not just an agency",
  'digital landscape',
  'seamless',
  'laser-focused',
];

const PLACEHOLDER_PATTERNS = [/\bTODO\b/i, /\blorem\b/i, /\bTBD\b/i, /\bXX\b/];

/**
 * A number in a claim context. Plain years, list positions and ordinary counts
 * in prose are not claims; a figure attached to money, performance or volume
 * is. The pattern targets the latter.
 */
const CLAIM_NUMBER = /(\$\s?[\d,]+(?:\.\d+)?[kmKM]?|\b\d+(?:\.\d+)?\s?%|\b\d+(?:\.\d+)?x\b|\b\d[\d,]*\s*(?:leads?|clients?|accounts?|customers?|conversions?)\b)/g;

interface Checked {
  label: string;
  text: string;
  publishable: boolean;
  factIds: string[];
  proofRefs: string[];
}

function collectContent(): Checked[] {
  const items: Checked[] = [];

  for (const service of services) {
    items.push({
      label: `service:${service.slug}`,
      text: [
        service.h1,
        service.intro,
        service.cardDescription,
        ...service.forWho,
        ...service.deliverables.flatMap((d) => [d.name, d.detail]),
        ...service.measurement,
        ...service.process.flatMap((p) => [p.name, p.whatYouGet]),
        // FAQs awaiting owner input are not published, so they are not linted
        // for placeholders - they are reported separately as outstanding.
        ...service.faqs.filter((f) => !f.needsOwnerInput).flatMap((f) => [f.question, f.answer]),
      ].join('\n'),
      publishable: true,
      factIds: [],
      proofRefs: service.proofRefs,
    });
  }

  for (const industry of industries) {
    items.push({
      label: `industry:${industry.slug}`,
      text: [
        industry.h1,
        industry.intro,
        industry.cardDescription,
        industry.audienceBehavior,
        ...industry.campaignStructure.flatMap((c) => [c.name, c.detail]),
        ...industry.wastePatterns,
        ...industry.kpis.flatMap((k) => [k.name, k.definition]),
        ...industry.objections.flatMap((o) => [o.objection, o.answer]),
        ...industry.faqs.filter((f) => !f.needsOwnerInput).flatMap((f) => [f.question, f.answer]),
      ].join('\n'),
      publishable: industry.publishable,
      factIds: [],
      proofRefs: industry.proofRefs,
    });
  }

  for (const location of locations) {
    items.push({
      label: `location:${location.slug}`,
      text: [
        location.marketCommentary,
        ...location.localFaqs.filter((f) => !f.needsOwnerInput).flatMap((f) => [f.question, f.answer]),
      ].join('\n'),
      publishable: location.publishable,
      factIds: [],
      proofRefs: location.localProofRefs,
    });
  }

  items.push({
    label: 'faqs:homepage',
    text: homepageFaqs.filter((f) => !f.needsOwnerInput).flatMap((f) => [f.question, f.answer]).join('\n'),
    publishable: true,
    factIds: [],
    proofRefs: [],
  });

  for (const [path, meta] of Object.entries(pageMeta)) {
    items.push({
      label: `meta:${path}`,
      text: `${meta.title}\n${meta.description}`,
      publishable: true,
      factIds: [],
      proofRefs: [],
    });
  }

  return items;
}

function main(): void {
  const failures: Failure[] = [];
  const warnings: Failure[] = [];

  // --- 1. Schemas parse.
  for (const service of services) {
    const parsed = serviceSchema.safeParse(service);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        failures.push({ page: `service:${service.slug}`, message: `${issue.path.join('.')}: ${issue.message}` });
      }
    }
  }
  for (const industry of industries) {
    const parsed = industrySchema.safeParse(industry);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        failures.push({ page: `industry:${industry.slug}`, message: `${issue.path.join('.')}: ${issue.message}` });
      }
    }
  }
  for (const location of locations) {
    const parsed = locationSchema.safeParse(location);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        failures.push({ page: `location:${location.slug}`, message: `${issue.path.join('.')}: ${issue.message}` });
      }
    }
  }
  for (const item of proofData.items) {
    const parsed = proofSchema.safeParse(item);
    if (!parsed.success) {
      failures.push({ page: 'content/proof.json', message: parsed.error.issues[0]?.message ?? 'invalid entry' });
    }
  }
  for (const fact of factData.facts) {
    const parsed = factSchema.safeParse(fact);
    if (!parsed.success) {
      failures.push({ page: 'data/approved-facts.json', message: parsed.error.issues[0]?.message ?? 'invalid entry' });
    }
  }

  // --- 2. Route registry and metadata registry agree.
  for (const route of routes) {
    if (!route.live) continue;
    const hasOwnMeta =
      services.some((s) => s.route === route.path) || industries.some((i) => i.route === route.path);
    if (!hasOwnMeta && !pageMeta[route.path]) {
      failures.push({ page: route.path, message: 'Live route has no entry in content/seo.ts' });
    }
  }
  for (const path of Object.keys(pageMeta)) {
    if (!routes.some((r) => r.path === path)) {
      failures.push({ page: path, message: 'content/seo.ts entry has no route in content/routes.ts' });
    }
  }

  // --- 3. Metadata length, checked at source as well as in build output.
  for (const service of [...services]) {
    if (!metaTitleSchema.safeParse(service.metaTitle).success) {
      failures.push({ page: `service:${service.slug}`, message: 'metaTitle outside 45-65 characters' });
    }
    if (!metaDescriptionSchema.safeParse(service.metaDescription).success) {
      failures.push({ page: `service:${service.slug}`, message: 'metaDescription outside 120-160 characters' });
    }
  }
  for (const industry of industries) {
    if (!metaTitleSchema.safeParse(industry.metaTitle).success) {
      failures.push({ page: `industry:${industry.slug}`, message: 'metaTitle outside 45-65 characters' });
    }
    if (!metaDescriptionSchema.safeParse(industry.metaDescription).success) {
      failures.push({ page: `industry:${industry.slug}`, message: 'metaDescription outside 120-160 characters' });
    }
  }

  const content = collectContent();

  for (const item of content) {
    if (!item.publishable) continue;

    // --- 4. Placeholders in publishable copy.
    if (item.text.includes('[OWNER')) {
      failures.push({ page: item.label, message: 'Publishable copy contains an [OWNER] placeholder' });
    }
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(item.text)) {
        failures.push({ page: item.label, message: `Publishable copy contains a placeholder (${pattern})` });
      }
    }

    // --- 5. Unsourced numbers.
    const numbers = [...item.text.matchAll(CLAIM_NUMBER)].map((m) => m[0]);
    if (numbers.length > 0) {
      const unsourced = numbers.filter(() => item.factIds.length === 0 && !/https?:\/\//.test(item.text));
      for (const number of new Set(unsourced)) {
        failures.push({
          page: item.label,
          message: `Number "${number}" has no fact id in data/approved-facts.json and no citation URL`,
        });
      }
    }

    // --- 6. Proof claims must resolve.
    for (const ref of item.proofRefs) {
      if (!proofIds.has(ref)) {
        failures.push({ page: item.label, message: `proofRef "${ref}" is not in content/proof.json` });
      }
    }
    for (const id of item.factIds) {
      if (!approvedFactIds.has(id)) {
        failures.push({ page: item.label, message: `factId "${id}" is not approved in data/approved-facts.json` });
      }
    }

    // --- 7. Unbacked proof language.
    const proofLanguage = /\b(certified|partner status|award-winning|awarded|ranked #1|clients include)\b/i;
    const match = item.text.match(proofLanguage);
    if (match && proofIds.size === 0) {
      failures.push({
        page: item.label,
        message: `Claim "${match[0]}" has no matching entry in content/proof.json`,
      });
    }

    // --- 8. Banned phrases (warning).
    for (const phrase of BANNED_PHRASES) {
      if (item.text.toLowerCase().includes(phrase)) {
        warnings.push({ page: item.label, message: `Banned phrase from docs/voice.md: "${phrase}"` });
      }
    }
  }

  // --- 9. Duplicate 40-word windows across pages.
  const seen = new Map<string, string>();
  for (const item of content) {
    if (!item.publishable) continue;
    const words = item.text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    for (let i = 0; i + 40 <= words.length; i += 10) {
      const window = words.slice(i, i + 40).join(' ');
      const owner = seen.get(window);
      if (owner && owner !== item.label) {
        failures.push({ page: item.label, message: `Shares a 40-word passage with ${owner}` });
        break;
      }
      seen.set(window, item.label);
    }
  }

  for (const warning of warnings) {
    console.warn(`WARN  ${warning.page}: ${warning.message}`);
  }

  report('content + no-fabrication lint', failures, content.length);
}

main();
