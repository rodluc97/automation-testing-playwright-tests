
import { test, expect } from '@playwright/test';

test('Debe mostrar mensaje de error con usuario bloqueado', async ({ page }) => {
    // Arrange: Ir a la web
    await page.goto('https://www.saucedemo.com/');

    // Act: Intentar login con usuario bloqueado
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Assert: Validar el mensaje de error
    // Buscamos el elemento que contiene el texto de error
    const errorContainer = page.locator('[data-test="error"]');
    
    // Verificamos que sea visible y que tenga el texto específico
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});