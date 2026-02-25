import { Page, Locator, expect } from '@playwright/test';

export class SmallpdfPage {
  // 1. Definimos los elementos (Locators)
  readonly page: Page;
  readonly cookieButton: Locator;
  readonly fileInput: Locator;
  readonly chatInput: Locator;
  readonly summaryContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieButton = page.getByRole('button', { name: /Aceptar|Accept/i });
    this.fileInput = page.locator('input[type="file"]');
    this.chatInput = page.getByPlaceholder(/Ask me anything/i);
    this.summaryContent = page.locator('text=/Skills|History|Summary|Resumen/i');
  }

  // 2. Definimos las acciones
  async goto() {
    await this.page.goto('https://smallpdf.com/pdf-summarizer');
  }

  async aceptarCookies() {
    if (await this.cookieButton.isVisible()) {
      await this.cookieButton.click();
    }
  }

  async subirArchivo(ruta: string) {
    await this.fileInput.setInputFiles(ruta);
  }

  async esperarResumen() {
    await expect(this.chatInput).toBeVisible({ timeout: 60000 });
  }

  async obtenerTextoResumen() {
    const elemento = this.summaryContent.first();
    await expect(elemento).toBeVisible({ timeout: 15000 });
    return await elemento.innerText();
  }

  async hacerPregunta(pregunta: string) {
  await this.chatInput.fill(pregunta);
  await this.page.keyboard.press('Enter');
 }
}