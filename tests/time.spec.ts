import { test, expect } from '@playwright/test';

const url = "https://time-97992.web.app"

test('has title', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle("time");
});

test('github link', async ({ page }) => {
  await page.goto(url);

  const [githubPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'GitHub' }).click(),
  ]);

  await githubPage.waitForLoadState();
  await expect(githubPage).toHaveTitle("GitHub - Manz2/time");
});

// TODO: add testid's for all components and use them here
