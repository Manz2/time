import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle("time");
});

test('github link', async ({ page }) => {
  await page.goto('');

  const [githubPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'GitHub' }).click(),
  ]);

  await githubPage.waitForLoadState();
  await expect(githubPage).toHaveTitle("GitHub - Manz2/time");
});

// TODO: add testid's for all components and use them here
