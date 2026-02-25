import { test, expect } from '@playwright/test';
import { SmallpdfPage } from '../pages/SmallpdfPage';
import path from 'path';

test('Debe resumir un PDF usando POM', async ({ page }) => {
  const smallpdf = new SmallpdfPage(page); // Instanciamos la página
  const rutaArchivo = path.resolve(__dirname, '../data/test.pdf');

  await smallpdf.goto();
  await smallpdf.aceptarCookies();
  await smallpdf.subirArchivo(rutaArchivo);
  
  await smallpdf.esperarResumen();
  
  const texto = await smallpdf.obtenerTextoResumen();
  console.log('✅ Resumen obtenido:', texto.substring(0, 50));
  
  expect(texto.length).toBeGreaterThan(0);
});