import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator; // Elemento para escenarios negativos

  constructor(page: Page) {
    this.page = page;
    // Usamos selectores data-test que son los más estables en SauceDemo
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  // Método clave para tus Negative Scenarios
  async obtenerMensajeError() {
    // Esperamos un segundo a que sea visible por si la red es lenta
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.innerText();
  }

  // Helper para verificar si estamos logueados (viendo el inventario)
  async estaEnInventario() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }
}