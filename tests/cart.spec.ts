import { test, expect } from '@playwright/test';

test.describe('User Story 002: Verify Shopping Cart Functionality', () => {

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
});

test('SD Cart: Complete shopping test', async ({ page }) => {
  // 1. Agregar producto y navegar al carrito
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

  // Act: Llenar el formulario de envío
  // Usamos los IDs específicos de la página de checkout
  await page.locator('#first-name').fill('Gonza');
  await page.locator('#last-name').fill('QA');
  await page.locator('#postal-code').fill('1234');
  
  await page.locator('#continue').click();
  
  // Paso final: Revisar y confirmar
  await page.locator('#finish').click();

  // Assert: Validar el éxito de la compra
  const headerConfirmacion = page.locator('.complete-header');
  await expect(headerConfirmacion).toHaveText('Thank you for your order!');
  
  // Verificamos que el carrito quedó vacío (la burbuja no debe estar)
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

  // ... resto del código anterior
  await expect(headerConfirmacion).toHaveText('Thank you for your order!');
  
  // Foto de victoria: Se guardará en la carpeta raíz
  await page.screenshot({ path: 'compra_exitosa.png', fullPage: true });
});
});