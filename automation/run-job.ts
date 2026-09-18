/**
 * Local job runner - Volume 2 s.25.
 *
 * The scheduled jobs are Phase 6 and are not built yet. This entry point exists
 * so `npm run job <name>` gives a straight answer about what is and is not
 * wired up, rather than failing with a module-not-found error that reads like a
 * bug. Volume 2 s.23: "Fail loudly, degrade gracefully."
 */

const JOBS = [
  { name: 'nightly-collect', schedule: 'Daily 02:00', gate: 'none (data only)', built: false },
  { name: 'daily-integrity', schedule: 'Daily 06:00', gate: 'none (alerts only)', built: false },
  { name: 'form-synthetic', schedule: 'Every 6 hours', gate: 'none', built: 'partial' },
  { name: 'weekly-seo-analysis', schedule: 'Monday 04:00', gate: 'PRs require merge', built: false },
  { name: 'weekly-digest', schedule: 'Monday 07:00', gate: 'none (read only)', built: false },
  { name: 'content-draft', schedule: '1st and 15th, 05:00', gate: 'PR merge = publish', built: false },
  { name: 'platform-update-watch', schedule: 'Every 4 hours', gate: 'PR merge', built: false },
  { name: 'case-study-trigger', schedule: 'Daily 05:30', gate: 'PR merge + permission', built: false },
  { name: 'gbp-post-draft', schedule: 'Thursday 05:00', gate: 'approval', built: false },
  { name: 'monthly-competitive', schedule: '1st, 03:00', gate: 'none', built: false },
  { name: 'monthly-report', schedule: '1st, 07:00', gate: 'none', built: false },
  { name: 'monthly-keyword-refresh', schedule: '1st, 03:30', gate: 'PR merge', built: false },
  { name: 'quarterly-citations', schedule: 'Jan/Apr/Jul/Oct 1st', gate: 'owner decisions', built: false },
  { name: 'quarterly-benchmark', schedule: 'Jan/Apr/Jul/Oct 5th', gate: 'PR + owner confirms', built: false },
  { name: 'backup-export', schedule: '1st, 01:00', gate: 'none', built: false },
] as const;

const requested = process.argv[2];

console.log('Bold Clicks automation jobs (Volume 2 s.25)\n');
console.log('The automation layer is Phase 6 and has not been built.');
console.log('Thresholds are already set in automation/config.ts.\n');

if (requested) {
  const job = JOBS.find((j) => j.name === requested);
  if (!job) {
    console.error(`No job named "${requested}". Known jobs:\n`);
  } else {
    console.log(`${job.name}`);
    console.log(`  schedule: ${job.schedule}`);
    console.log(`  gate:     ${job.gate}`);
    console.log(
      `  status:   ${job.built === 'partial' ? 'partial - the Playwright spec exists in tests/e2e, the scheduled wrapper does not' : 'not built'}`,
    );
    process.exit(0);
  }
}

console.log('name                      schedule                gate');
console.log('-'.repeat(78));
for (const job of JOBS) {
  console.log(`${job.name.padEnd(25)} ${job.schedule.padEnd(23)} ${job.gate}`);
}
console.log('\nWhat *is* built and runnable today:');
console.log('  npm run lint:content      no-fabrication linter (s.26)');
console.log('  npm run audit:meta        metadata uniqueness and length');
console.log('  npm run audit:schema      JSON-LD validation');
console.log('  npm run audit:links       internal links and orphans');
console.log('  npm run audit:doorway     doorway-page rejection test (s.18)');
console.log('  npm run crawl:prelaunch   pre-launch crawl (s.33)');
console.log('  npm run e2e               conversion path, a11y, consent, SEO');

process.exit(requested ? 1 : 0);
