import { test, expect } from '@playwright/test';

test('ページの表示テスト', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Color Atlas/);
  await expect(page.getByRole('button', { name: /決定/ })).toBeVisible();
});
/*
test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('button', { name: 'Installation' })).toBeVisible();
});
*/
