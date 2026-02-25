import { test, expect } from '@playwright/test';
import { SmallpdfPage } from '../pages/SmallpdfPage';
import path from 'path';

test.describe('US-002: Procesamiento de Documentos con IA', () => {
  
  test.beforeEach(async ({ page }) => {
    const smallpdf = new SmallpdfPage(page);
    await smallpdf.goto();
    await smallpdf.aceptarCookies();
  });

  test('TC-04: Resumen automático de PDF debe generar contenido de texto válido', async () => {
    const smallpdf = new SmallpdfPage(page);
    await smallpdf.subirArchivo(path.resolve(__dirname, '../data/test.pdf'));
    await smallpdf.esperarResumen();
    const resumen = await smallpdf.obtenerTextoResumen();
    expect(resumen.length).toBeGreaterThan(10);
  });

  test('TC-05: Carga de archivo no soportado debe activar el manejo de errores de formato', async ({ page }) => {
    const smallpdf = new SmallpdfPage(page);
    await smallpdf.subirArchivo(path.resolve(__dirname, '../data/imagen.jpg'));
    const errorMsg = page.locator('text=/formato no compatible|invalid file|not a PDF/i');
    await expect(errorMsg).toBeVisible({ timeout: 15000 });
  });
});