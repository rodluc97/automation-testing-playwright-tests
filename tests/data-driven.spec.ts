import { test, expect } from '@playwright/test';
// 1. Importamos el archivo JSON con los datos de los usuarios
import usuarios from '../data/usuarios.json';

// 2. Creamos un bucle que envuelve al test
usuarios.forEach((usuario: any) => {
  
  test(`Compra completa para el usuario: ${usuario.nombre}`, async ({ page }) => {
    // Arrange (Login)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Act
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    // AQUÍ ESTÁ LA MAGIA: Usamos los datos del JSON
    await page.locator('#first-name').fill(usuario.nombre);
    await page.locator('#last-name').fill(usuario.apellido);
    await page.locator('#postal-code').fill(usuario.cp);
    
    await page.locator('#continue').click();
    await page.locator('#finish').click();

    // Assert
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});