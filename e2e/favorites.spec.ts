import { test, expect } from '@playwright/test';

test('logged-in user sees favorited news on the admin page', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /simular login/i }).click();
  await page
    .getByRole('button', { name: /favoritar/i })
    .first()
    .click();
  await page.goto('/admin');
  await expect(page.getByText(/bem-vindo/i)).toBeVisible();
  await expect(page.locator('[data-testid="news-card"]')).toHaveCount(1);
});

test('Non-logged in user is redirected to the home page', async ({ page }) => {
  await page.goto('/admin');

  await expect(page).toHaveURL('/');
});
