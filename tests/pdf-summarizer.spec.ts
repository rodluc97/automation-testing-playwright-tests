import { test, expect } from '@playwright/test';
import { SmallpdfPage } from '../pages/SmallpdfPage';
import path from 'path';


test.describe('US-005: Verify Documents Processing with AI', () => {
    
test('TC-06: Verify PDF summarization using POM', async ({ page }) => {
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
});