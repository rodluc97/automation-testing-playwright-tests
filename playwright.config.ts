import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en paralelo para ganar velocidad */
  fullyParallel: true,
  /* Fallar si te olvidas un .only en local */
  forbidOnly: !!process.env.CI,
  /* Reintentos en caso de fallo (útil para Smallpdf que a veces fluctúa) */
  retries: 1,
  /* Workers: Cuántos navegadores abrir a la vez. 
     undefined usa el 50% de tus núcleos de CPU, lo cual es muy rápido. */
  workers: undefined,
  reporter: 'html',
  use: {
    /* MODO HEADLESS: El secreto de la velocidad (no abre ventana) */
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    /* Solo grabar video si falla, para no perder tiempo procesando video en tests exitosos */
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});