import { z } from 'zod';

/**
 * Content schemas - Volume 2 s.28.
 *
 * These are the build-time contract for everything in /content. Broken content
 * fails `pnpm lint:content` and therefore CI, rather than reaching production.
 */

/** Title 45-65 chars, description 120-160 chars (Volume 2 s.26 metadata rule). */
export const metaTitleSchema = z
  .string()
  .min(45, 'Title tag is under 45 characters')
  .max(65, 'Title tag is over 65 characters');

export const metaDescriptionSchema = z
  .string()
  .min(120, 'Meta description is under 120 characters')
  .max(160, 'Meta description is over 160 characters');

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase words separated by single hyphens');

/**
 * A number that may appear in published copy. Every one traces to an
 * owner-approved fact or a public source with a URL (Volume 2 s.26 rule 3).
 */
export const factSchema = z.object({
  id: z.string().regex(/^fact_[a-z0-9_]+$/),
  statement: z.string().min(1),
  value: z.union([z.number(), z.string()]),
  unit: z.string(),
  dateRange: z.string().min(1),
  source: z.enum(['accounts', 'public']),
  sourceUrl: z.string().url().optional(),
  approvedBy: z.string().min(1),
  approvedAt: z.string().datetime(),
});

/**
 * Anything the site claims about itself: logos, testimonials, badges, metrics.
 * `permissionOnFile` gates rendering - ProofStrip and CaseStudyCard render
 * nothing rather than a placeholder (Volume 2 s.29 component rules).
 */
export const proofSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['logo', 'testimonial', 'badge', 'metric']),
  label: z.string().min(1),
  value: z.string().optional(),
  attribution: z.string().optional(),
  assetPath: z.string().optional(),
  source: z.string().min(1),
  permissionOnFile: z.boolean(),
  /** Partner badges expire. The monthly badge monitor reads this. */
  expiresAt: z.string().datetime().optional(),
  factId: z.string().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  /** True while the answer still contains an [OWNER] input. Hidden from the page. */
  needsOwnerInput: z.boolean().default(false),
});

export const processStepSchema = z.object({
  name: z.string().min(1),
  whatYouGet: z.string().min(1),
});

/** Volume 1 s.05 service page template. */
export const serviceSchema = z.object({
  slug: slugSchema,
  route: z.string().startsWith('/'),
  title: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: metaTitleSchema,
  metaDescription: metaDescriptionSchema,
  eyebrow: z.string().min(1),
  intro: z.string().min(1),
  /** Short card description used on the homepage and services hub. */
  cardDescription: z.string().min(1),
  forWho: z.array(z.string().min(1)).min(1),
  deliverables: z.array(z.object({ name: z.string(), detail: z.string() })).min(3),
  measurement: z.array(z.string().min(1)).min(1),
  process: z.array(processStepSchema).min(1),
  faqs: z.array(faqSchema).min(3),
  proofRefs: z.array(z.string()),
  relatedIndustries: z.array(slugSchema),
  relatedRoutes: z.array(z.string().startsWith('/')),
  /**
   * One real account observation. Required on every service page by Volume 2
   * s.35; until the owner supplies it the field holds an [OWNER] marker and the
   * component renders nothing.
   */
  firstHand: z.string(),
  cta: z.string().min(1),
});

/** Volume 1 s.06 / Volume 2 s.28 industry page. */
export const industrySchema = z.object({
  slug: slugSchema,
  route: z.string().startsWith('/'),
  title: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: metaTitleSchema,
  metaDescription: metaDescriptionSchema,
  eyebrow: z.string().min(1),
  intro: z.string().min(1),
  cardDescription: z.string().min(1),
  audienceBehavior: z.string().min(1),
  campaignStructure: z.array(z.object({ name: z.string(), detail: z.string() })).min(2),
  wastePatterns: z.array(z.string().min(1)).min(2),
  kpis: z.array(z.object({ name: z.string(), definition: z.string() })).min(2),
  objections: z.array(z.object({ objection: z.string(), answer: z.string() })).min(1),
  faqs: z.array(faqSchema).min(3),
  proofRefs: z.array(z.string()),
  relatedRoutes: z.array(z.string().startsWith('/')),
  firstHand: z.string(),
  /** False keeps the page out of routes, nav, IndustryGrid and the sitemap. */
  publishable: z.boolean(),
});

/** Volume 1 s.06 case study template. */
export const caseStudySchema = z.object({
  slug: slugSchema,
  clientProfile: z.object({
    industry: z.string().min(1),
    geography: z.string().min(1),
    model: z.string().min(1),
    nameWithPermission: z.string().optional(),
  }),
  startingPoint: z.string().min(1),
  objective: z.string().min(1),
  changes: z.array(z.string().min(1)).min(1),
  outcome: z.object({
    metrics: z
      .array(
        z.object({
          name: z.string().min(1),
          value: z.string().min(1),
          /** A number without a definition is unreadable and unverifiable. */
          definition: z.string().min(1),
          dateRange: z.string().min(1),
          factId: z.string().min(1),
        }),
      )
      .min(1),
  }),
  context: z.string().min(1),
  permissionOnFile: z.literal(true),
  verifiedBy: z.string().min(1),
  verifiedAt: z.string().datetime(),
});

/** Volume 2 s.28 Insight frontmatter. */
export const insightSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  metaTitle: metaTitleSchema,
  metaDescription: metaDescriptionSchema,
  author: z.string().min(1),
  /** Volume 2 s.26 rule 1: no AI-drafted content publishes without a named reviewer. */
  reviewedBy: z.string().min(1),
  reviewedAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  /** Only a material update may move updatedAt / dateModified (Volume 2 s.22). */
  materialUpdate: z.boolean().default(false),
  targetQuery: z.string().min(1),
  supportsRoute: z.string().startsWith('/'),
  factIds: z.array(z.string()),
});

/** Volume 2 s.18 location page. */
export const locationSchema = z.object({
  slug: slugSchema,
  metro: z.string().min(1),
  marketCommentary: z.string().min(1),
  localProofRefs: z.array(z.string()),
  localFaqs: z.array(faqSchema).min(3),
  serviceRadius: z.array(z.string().min(1)).min(1),
  publishable: z.boolean(),
});

export type Fact = z.infer<typeof factSchema>;
export type Proof = z.infer<typeof proofSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Industry = z.infer<typeof industrySchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type Insight = z.infer<typeof insightSchema>;
export type Location = z.infer<typeof locationSchema>;
