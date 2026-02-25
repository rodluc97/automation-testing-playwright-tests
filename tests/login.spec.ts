import { test, expect } from '@playwright/test';

test('Login exitoso en SauceDemo', async ({ page }) => {
    // Arrange
    await page.goto('https://www.saucedemo.com/');

    // Act
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Assert
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


test('Login fallido con usuario bloqueado en SauceDemo', async ({ page }) => {
    // Arrange
    await page.goto('https://www.saucedemo.com/');

    // Act
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Assert
    await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});