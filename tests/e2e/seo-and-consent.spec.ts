import { expect, test } from '@playwright/test';

/**
 * SEO and consent behaviour - Volume 2 s.24, s.32, s.33.
 *
 * The consent test is the one that matters most for policy exposure: with
 * consent denied, no advertising or analytics cookie may be set before
 * interaction.
 */

test('no advertising or analytics cookies are set before consent', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const cookies = await context.cookies();
  const forbidden = cookies.filter((c) =>
    ['_ga', '_gid', '_gcl_au', '_fbp', '_uetsid', '_uetvid'].some((name) => c.name.startsWith(name)),
  );

  expect(
    forbidden.map((c) => c.name),
    'advertising/analytics cookies were set before consent was granted',
  ).toEqual([]);
});

test('the first-party attribution cookie is strictly necessary and is allowed', async ({ page, context }) => {
  await page.goto('/?utm_source=google&utm_medium=cpc&utm_campaign=test');
  await page.waitForLoadState('networkidle');

  const cookies = await context.cookies();
  const firstTouch = cookies.find((c) => c.name === 'bc_first_touch');

  expect(firstTouch).toBeDefined();
  expect(firstTouch?.sameSite).toBe('Lax');
});

test('the thank-you page is noindex', async ({ page }) => {
  await page.goto('/thank-you/');
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  expect(robots).toContain('noindex');
});

test('primary copy is in the server-rendered HTML', async ({ request }) => {
  // Fetched without JavaScript: what Googlebot sees on first pass.
  const response = await request.get('/');
  const html = await response.text();

  expect(html).toContain('We run ads');
  expect(html).toMatch(/<h1[^>]*>/);
  expect(html).toContain('Most ad accounts leak money');
});

test('a missing page returns a real 404 status', async ({ request }) => {
  const response = await request.get('/this-page-does-not-exist/');
  expect(response.status()).toBe(404);
});

test('sitemap contains only indexable routes', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  const xml = await response.text();

  expect(response.status()).toBe(200);
  expect(xml).toContain('/free-ad-audit/');
  expect(xml).not.toContain('/thank-you/');
});

test('phone and booking links are never rendered dead', async ({ page }) => {
  await page.goto('/');

  for (const link of await page.locator('a[href^="tel:"]').all()) {
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^tel:\+?\d{7,}$/);
  }
});

test('sticky mobile CTA appears after the hero and not on the audit page', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto('/');
  await page.mouse.wheel(0, 1600);
  await expect(page.getByRole('link', { name: 'Get My Free Ad Audit' }).last()).toBeVisible();

  await page.goto('/free-ad-audit/');
  await page.mouse.wheel(0, 1600);
  // The form is already on this page; a sticky bar pointing at it is noise.
  await expect(page.getByRole('button', { name: 'Dismiss' })).toHaveCount(0);
});
