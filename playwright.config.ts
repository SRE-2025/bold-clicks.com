import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright - Volume 2 s.33 E2E checks and s.24 synthetic monitoring.
 *
 * Mobile first, because Google indexes the mobile version. The desktop project
 * exists to catch layout-only regressions, not to duplicate coverage.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],

  // Skipped when E2E_BASE_URL points at a deployed environment, which is how
  // the every-6-hours synthetic form test runs against production.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run start',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
