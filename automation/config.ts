/**
 * Automation thresholds - Volume 2 s.24, shipped as defaults per s.25.
 *
 * One file so sensitivity can be tuned without touching job logic. The jobs
 * themselves are Phase 6 and are not built yet; this exists now because the
 * thresholds are a decision from the brief, not an implementation detail, and
 * writing them down is what makes the Phase 6 work mechanical.
 *
 * Severity: S1 = immediate SMS + email. S2 = same-day email. S3 = weekly digest.
 */

export const TIMEZONE = 'America/Chicago';

export const severity = { S1: 'S1', S2: 'S2', S3: 'S3' } as const;
export type Severity = (typeof severity)[keyof typeof severity];

export const monitors = {
  uptime: {
    urls: ['/', '/free-ad-audit/', '/google-ads-management/'],
    everyMinutes: 1,
    failAfterConsecutiveChecks: 2,
    maxResponseMs: 5000,
    severity: severity.S1,
  },
  ssl: { checkDaily: true, warnDaysBeforeExpiry: 14, severity: severity.S1 },
  formSynthetic: { everyHours: 6, testEmail: 'test+synthetic@bold-clicks.com', severity: severity.S1 },
  coreWebVitals: {
    // Field data at p75 must stay inside Google's "good" band.
    lcpMs: 2500,
    inpMs: 200,
    cls: 0.1,
    daysOutsideGoodBeforeAlert: 7,
    psiMobileMinScore: 85,
    severity: severity.S2,
  },
  indexing: { daysUnindexedBeforeAlert: 14, severity: severity.S2 },
  /** A production noindex is revenue-ending, so it is the loudest check here. */
  robotsDrift: { checkDaily: true, severity: severity.S1 },
  rankings: { clusterDropPlaces: 3, sustainedWeeks: 2, severity: severity.S3 },
  brokenLinks: { internalTolerance: 0, externalTolerance: 3, severity: severity.S3 },
  redirects: { maxHops: 1, requireStatus: 301, severity: severity.S3 },
  notFoundSpike: { uniquePathsPerDay: 50, multiplier: 3, severity: severity.S2 },
  trackingIntegrity: { zeroEventsHours: 24, severity: severity.S1, containerDriftSeverity: severity.S2 },
  consent: { checkWeekly: true, severity: severity.S2 },
  citationDrift: { checkQuarterly: true, severity: severity.S3 },
  partnerBadges: { warnDaysBeforeExpiry: 30, severity: severity.S3 },
  domain: { warnDaysBeforeExpiry: 60, smsDaysBeforeExpiry: 30, severity: severity.S2 },
  gbp: { weekOverWeekDropPercent: 40, severity: severity.S3, suspensionSeverity: severity.S1 },
} as const;

/** Content decay triggers - Volume 2 s.22. */
export const decay = {
  /** Pages below this impression count in the window are too noisy to judge. */
  minImpressions: 50,
  windowWeeks: 8,
  comparisonWeeks: 8,
  triggers: {
    homepage: { clicksDropPercent: 20, ctrDropPercent: 25 },
    servicePage: { positionDropPlaces: 3, sustainedWeeks: 4 },
    industryPage: { impressionsUpWithFlatClicks: true },
    locationPage: { competitorEntersTop3: true },
    insight: { clicksDropPercent: 30, overWeeks: 12, staleAfterMonths: 18 },
  },
} as const;

/** AI content guardrails - Volume 2 s.26. */
export const contentGuardrails = {
  /** Exceeding the cap needs an owner override, which is logged. */
  insightsPerMonthCap: 4,
  /** Minimum sample for a published benchmark. [OWNER] may raise this. */
  benchmarkMinAccounts: 10,
  benchmarkMinDaysPerSegment: 90,
  /** A lastmod change under this diff needs a `material-update` commit tag. */
  materialUpdateMinDiffPercent: 5,
  duplicateWindowWords: 40,
  duplicateBlockPercent: 30,
} as const;

/** Alert suppression - Volume 2 s.24: duplicates for the same condition. */
export const alerting = {
  suppressDuplicateHours: 24,
  digestDay: 'Monday',
  digestHour: 7,
} as const;
