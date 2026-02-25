import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Máxima velocidad
  reporter: [['html'], ['list']], // Reporte web y lista en consola
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',    // Graba el paso a paso si falla
    video: 'on-first-retry',       // Graba video si hay reintento
    screenshot: 'only-on-failure', // Foto automática del error
    headless: true,                // Rápido, sin abrir ventana
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});