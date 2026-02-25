import { test, expect } from '@playwright/test';
import { SmallpdfPage } from '../pages/SmallpdfPage';
import path from 'path';


test('No debe permitir login con usuario bloqueado', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
});

test('Debe mostrar error al subir un archivo que no es PDF', async ({ page }) => {
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

test('Debe manejar una página no encontrada', async ({ page }) => {
    const response = await page.goto('https://smallpdf.com/esta-pagina-no-existe');
    expect(response?.status()).toBe(404);
});