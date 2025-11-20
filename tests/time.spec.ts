import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle("time");
});

test('github link', async ({ page }) => {
  await page.goto('');

  const [githubPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('github-image').click(),
  ]);

  await githubPage.waitForLoadState();
  await expect(githubPage).toHaveTitle("GitHub - Manz2/time");
});

// TODO: add Accessability tests
