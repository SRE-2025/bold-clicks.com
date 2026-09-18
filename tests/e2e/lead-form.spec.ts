import { expect, test, type Page } from '@playwright/test';

/**
 * Lead form E2E - Volume 2 s.33.
 *
 * Covers the conversion path end to end: form submit -> thank-you ->
 * generate_lead fired exactly once with the right parameters.
 *
 * The same file is the basis for the every-6-hours synthetic monitor (Volume 2
 * s.24), which runs it against production with a flagged test address and adds
 * the GoHighLevel API assertion.
 */

const TEST_EMAIL = 'test+synthetic@bold-clicks.com';

/** Captures dataLayer pushes so events can be asserted, not assumed. */
async function captureDataLayer(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __events: unknown[] }).__events = [];
    const original: unknown[] = [];
    Object.defineProperty(window, 'dataLayer', {
      configurable: true,
      get: () => original,
      set: (value: unknown[]) => value,
    });
    const push = Array.prototype.push;
    (original as unknown as { push: typeof push }).push = function (...args: unknown[]) {
      (window as unknown as { __events: unknown[] }).__events.push(...args);
      return push.apply(this, args);
    };
  });
}

async function readEvents(page: Page): Promise<Record<string, unknown>[]> {
  return page.evaluate(() => (window as unknown as { __events: Record<string, unknown>[] }).__events ?? []);
}

test.describe('free ad audit form', () => {
  test.beforeEach(async ({ page }) => {
    await captureDataLayer(page);
  });

  test('submits and reaches the thank-you state', async ({ page }) => {
    await page.goto('/free-ad-audit/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('ad spend is leaking');

    await page.getByLabel('Full name').fill('Synthetic Test');
    await page.getByLabel('Business email').fill(TEST_EMAIL);
    await page.getByLabel('Company or website').fill('Bold Clicks Synthetic Check');
    await page.getByLabel('What do you need help with?').selectOption('google_ads');
    await page.getByLabel(/Monthly ad spend/).selectOption('5k_15k');
    await page.getByLabel(/I agree to the/).check();

    await page.getByRole('button', { name: 'Get My Free Ad Audit' }).click();

    await expect(page).toHaveURL(/\/thank-you\//);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Got it');
  });

  test('fires generate_lead exactly once with the right parameters', async ({ page }) => {
    await page.goto('/free-ad-audit/');

    await page.getByLabel('Full name').fill('Synthetic Test');
    await page.getByLabel('Business email').fill(TEST_EMAIL);
    await page.getByLabel('Company or website').fill('Bold Clicks Synthetic Check');
    await page.getByLabel('What do you need help with?').selectOption('google_ads');
    await page.getByLabel(/I agree to the/).check();
    await page.getByRole('button', { name: 'Get My Free Ad Audit' }).click();

    await expect(page).toHaveURL(/\/thank-you\//);

    const events = await readEvents(page);
    const leads = events.filter((e) => e.event === 'generate_lead');

    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({
      event: 'generate_lead',
      form_id: 'free-ad-audit',
      need: 'google_ads',
      currency: 'USD',
    });
    expect(String(leads[0]?.lead_id)).toMatch(/^bc_/);
  });

  test('fires form_start once, on first interaction rather than on load', async ({ page }) => {
    await page.goto('/free-ad-audit/');

    expect((await readEvents(page)).filter((e) => e.event === 'form_start')).toHaveLength(0);

    await page.getByLabel('Full name').click();
    await page.getByLabel('Business email').click();

    expect((await readEvents(page)).filter((e) => e.event === 'form_start')).toHaveLength(1);
  });

  test('blocks submission with an accessible error summary', async ({ page }) => {
    await page.goto('/free-ad-audit/');
    await page.getByRole('button', { name: 'Get My Free Ad Audit' }).click();

    await expect(page).not.toHaveURL(/\/thank-you\//);
    // Scoped to the form: Next renders its own route announcer with role=alert,
    // so an unscoped getByRole('alert') matches two elements.
    const alert = page.locator('form').getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Please fix');
  });

  test('carries UTM and gclid through to the submission', async ({ page }) => {
    await page.goto('/free-ad-audit/?utm_source=google&utm_medium=cpc&utm_campaign=austin-ppc&gclid=TEST123');

    // Waits on the response, not just the request. An earlier version waited on
    // the request alone and passed while the POST was 308-redirecting and the
    // submission was actually failing.
    const responsePromise = page.waitForResponse((res) => res.url().includes('/api/lead'));
    const requestPromise = page.waitForRequest((req) => req.url().includes('/api/lead'));

    await page.getByLabel('Full name').fill('Synthetic Test');
    await page.getByLabel('Business email').fill(TEST_EMAIL);
    await page.getByLabel('Company or website').fill('Bold Clicks Synthetic Check');
    await page.getByLabel('What do you need help with?').selectOption('not_sure');
    await page.getByLabel(/I agree to the/).check();
    await page.getByRole('button', { name: 'Get My Free Ad Audit' }).click();

    const response = await responsePromise;
    expect(response.status(), 'the lead POST must succeed, not redirect').toBe(200);

    const body = JSON.parse((await requestPromise).postData() ?? '{}');
    expect(body.first_touch?.source).toBe('google');
    expect(body.first_touch?.medium).toBe('cpc');
    expect(body.first_touch?.campaign).toBe('austin-ppc');
    expect(body.first_touch?.gclid).toBe('TEST123');
  });
});
