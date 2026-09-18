import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Accessibility - Volume 1 s.12, Volume 2 s.33.
 *
 * Passing condition: zero serious or critical axe violations, plus a keyboard
 * traversal test of the header, form, accordion and mobile menu. WCAG 2.2 AA.
 */

const PAGES = [
  '/',
  '/free-ad-audit/',
  '/google-ads-management/',
  '/industries/home-services/',
  '/austin-ppc-agency/',
];

for (const path of PAGES) {
  test(`${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');

    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join('\n'),
    ).toEqual([]);
  });
}

test('skip link is the first focusable element and works', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeVisible();
});

test('mobile menu is keyboard operable and reports its state', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const toggle = page.getByRole('button', { name: /Open menu/ });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Primary mobile' })).toBeVisible();

  // Escape closes and returns focus, per WCAG 2.2 keyboard expectations.
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('FAQ answers are in the HTML whether or not the accordion is open', async ({ page }) => {
  await page.goto('/');

  // Crawlability: the answer text must exist in the DOM even when collapsed.
  const answer = page.getByText('You do. We work inside accounts you own', { exact: false });
  await expect(answer).toBeAttached();
});

test('form controls have visible labels and linked errors', async ({ page }) => {
  await page.goto('/free-ad-audit/');

  await expect(page.getByLabel('Full name')).toBeVisible();
  await expect(page.getByLabel('Business email')).toBeVisible();

  await page.getByRole('button', { name: 'Get My Free Ad Audit' }).click();

  const nameField = page.getByLabel('Full name');
  await expect(nameField).toHaveAttribute('aria-invalid', 'true');
  const describedBy = await nameField.getAttribute('aria-describedby');
  expect(describedBy).toBeTruthy();
  await expect(page.locator(`#${describedBy}`)).toBeVisible();
});
