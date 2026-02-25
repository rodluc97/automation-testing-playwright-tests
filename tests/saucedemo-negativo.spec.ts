import { test, expect } from '@playwright/test';
import { SmallpdfPage } from '../pages/SmallpdfPage';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

test.describe('US-001: Verify Login Functionality', () => {

test('TC-04: Verify that login is not allowed for a locked out user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
});

test('TC-05: Verify error message is shown when uploading a non-PDF file', async ({ page }) => {
    const smallpdf = new SmallpdfPage(page);
    await smallpdf.goto();
    await smallpdf.aceptarCookies();

    // Creamos un archivo de texto falso para la prueba
    const rutaInvalida = path.resolve(__dirname, '../data/imagen.jpg');
    
    await smallpdf.subirArchivo(rutaInvalida);

    // Verificamos que aparezca un mensaje de error o modal
    const mensajeError = page.locator('text=/formato no compatible|invalid file|not a PDF/i');
    await expect(mensajeError).toBeVisible({ timeout: 10000 });
});

test('TC-06: Verify that a non-existent page returns a 404 error', async ({ page }) => {
    const response = await page.goto('https://smallpdf.com/esta-pagina-no-existe');
    expect(response?.status()).toBe(404);
});
});