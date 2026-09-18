import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

/**
 * Local escape hatch: run the E2E suite against an installed Chrome or Edge
 * instead of Playwright's bundled Chromium.
 *
 *   npx playwright test -c playwright.local.config.ts
 *
 * Useful when `npx playwright install` cannot complete - on some Windows
 * machines the Chromium extraction stalls under antivirus scanning. CI always
 * uses playwright.config.ts with the bundled browser, which is the version the
 * results should be trusted from; this is for getting a local signal quickly.
 */
export default defineConfig({
  ...base,
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1280, height: 900 } } },
  ],
});
