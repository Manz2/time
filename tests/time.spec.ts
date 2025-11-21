import { test, expect } from '@playwright/test';

test.describe('page basics', () => {
  test('has title', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle('time');
  });

  test('all components are visible', async ({ page }) => {
    await page.goto('');
    await expect(page.getByTestId('start-input')).toBeVisible();
    await expect(page.getByTestId('break-input')).toBeVisible();
    await expect(page.getByTestId('end-input')).toBeVisible();
    await expect(page.getByTestId('total-time')).toBeVisible();
    await expect(page.getByTestId('github-image')).toBeVisible();
    await expect(page.getByTestId('start-plus')).toBeVisible();
    await expect(page.getByTestId('start-minus')).toBeVisible();
    await expect(page.getByTestId('break-plus')).toBeVisible();
    await expect(page.getByTestId('break-minus')).toBeVisible();
    await expect(page.getByTestId('end-plus')).toBeVisible();
    await expect(page.getByTestId('end-minus')).toBeVisible();
  });
});

test.describe('links', () => {
  test('github link', async ({ page }) => {
    await page.goto('');

    const [githubPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByTestId('github-image').click(),
    ]);

    await githubPage.waitForLoadState();
    await expect(githubPage).toHaveURL(/github\.com\/Manz2\/time/);
  });
});

test.describe('@desktopOnly time calculations', () => {
  test('calculate total time', async ({ page }) => {
    await page.goto('');
    await page.getByTestId('end-input').fill('18:30');
    await page.getByTestId('start-input').fill('09:00');
    await page.getByTestId('break-input').fill('00:30');
    await expect(page.getByTestId('total-time')).toHaveText('09:00');
    await page.getByTestId('total-time').click();
    await expect(page.getByTestId('copy-snackbar-message')).toHaveText(
      'Copied to clipboard'
    );
  });

  test('change start time with buttons', async ({ page }) => {
    await page.goto('');
    await page.getByTestId('start-input').fill('09:05');
    await page.getByTestId('start-plus').click();
    await expect(page.getByTestId('start-input')).toHaveValue('09:15');
    await page.getByTestId('start-minus').click();
    await expect(page.getByTestId('start-input')).toHaveValue('09:00');
  });

  test('change break time with buttons', async ({ page }) => {
    await page.goto('');
    await page.getByTestId('break-input').fill('00:30');
    await page.getByTestId('break-plus').click();
    await expect(page.getByTestId('break-input')).toHaveValue('00:45');
    await page.getByTestId('break-minus').click();
    await expect(page.getByTestId('break-input')).toHaveValue('00:30');
  });

  test('change end time with buttons', async ({ page }) => {
    await page.goto('');
    await page.getByTestId('end-input').fill('18:30');
    await page.getByTestId('end-plus').click();
    await expect(page.getByTestId('end-input')).toHaveValue('18:45');
    await page.getByTestId('end-minus').click();
    await expect(page.getByTestId('end-input')).toHaveValue('18:30');
  });

  test('current time sets end-time', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2024-02-02T18:30:00'));
    await page.goto('');
    await expect(page.getByTestId('end-input')).toHaveValue('18:30');
  });
});

// TODO: add Accessability tests
