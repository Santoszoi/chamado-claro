import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
async function fillValid(page: Page) {
  await page.getByLabel('Nome', { exact: true }).fill('Alex Silva');
  await page.getByLabel('E-mail', { exact: true }).fill('alex@example.com');
  await page.getByLabel('Resumo do problema').fill('Não consigo acessar o painel');
  await page.getByLabel('Categoria', { exact: true }).selectOption('Acesso e conta');
  await page.getByLabel('Descrição', { exact: true }).fill('Ao entrar com a conta de demonstração, o painel informa acesso negado. Esperava visualizar os chamados.');
}
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('empty submission focuses error summary; error link focuses field', async ({ page }) => {
  await page.getByLabel('Nome', { exact: true }).fill('Alex Silva');
  await page.getByRole('button', { name: 'Simular abertura' }).click();
  await expect(page.locator('.error-summary')).toBeFocused();
  await expect(page.locator('.error-summary li')).toHaveCount(4);
  await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('Alex Silva');
  await page.getByRole('link', { name: /^E-mail: Informe/ }).click();
  await expect(page.getByLabel('E-mail', { exact: true })).toBeFocused();
  await expect(page.getByLabel('E-mail', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('E-mail', { exact: true })).toHaveAttribute('aria-describedby', 'email-hint email-error');
});
test('keyboard-only completion and restart', async ({ page }) => {
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.getByLabel('Nome', { exact: true })).toBeFocused();
  await page.keyboard.type('Alex Silva'); await page.keyboard.press('Tab'); await page.keyboard.type('alex@example.com');
  await page.keyboard.press('Tab'); await page.keyboard.type('Falha de acesso ao painel');
  await page.keyboard.press('Tab'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Tab');
  await expect(page.getByLabel('Prioridade', { exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab'); await expect(page.getByLabel('Categoria', { exact: true })).toBeFocused();
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.type('O painel mostra acesso negado ao entrar com a conta ficticia.');
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Seu relato está organizado.' })).toBeFocused();
  await expect(page.locator('.protocol strong')).toHaveText(/^DEMO-[0-9A-F]{8}$/);
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await expect(page.getByLabel('Nome', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('');
});
test('corrected submission preserves data and safely renders text', async ({ page }) => {
  await page.getByRole('button', { name: 'Simular abertura' }).click();
  await fillValid(page);
  await page.getByLabel('Resumo do problema').fill('<img src=x onerror=alert(1)>');
  await page.getByRole('button', { name: 'Simular abertura' }).click();
  await expect(page.locator('.receipt')).toContainText('<img src=x onerror=alert(1)>');
  await expect(page.locator('.receipt img')).toHaveCount(0);
  await expect(page.locator('.receipt')).toContainText('alex@example.com');
  await page.reload(); await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('');
});
test('automated accessibility checks: initial, errors, confirmation', async ({ page }) => {
  const check = async () => expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await check(); await page.getByRole('button', { name: 'Simular abertura' }).click(); await check();
  await fillValid(page); await page.getByRole('button', { name: 'Simular abertura' }).click(); await check();
});
test('mobile and narrow reflow have no horizontal overflow', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(page.locator('body')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await fillValid(page); await page.getByRole('button', { name: 'Simular abertura' }).click();
  await expect(page.getByRole('heading', { name: 'Seu relato está organizado.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
