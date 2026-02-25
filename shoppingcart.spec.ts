import { test, expect } from '@playwright/test';

test('Agregar mochila al carrito en SauceDemo', async ({ page }) => {
    // Arrange
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();

    // Assert
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
}); 