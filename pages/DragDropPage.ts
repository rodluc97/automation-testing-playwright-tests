import { Page, Locator } from '@playwright/test';

export class DragDropPage {
  readonly page: Page;
  readonly columnaA: Locator;
  readonly columnaB: Locator;

  constructor(page: Page) {
    this.page = page;
    this.columnaA = page.locator('#column-a');
    this.columnaB = page.locator('#column-b');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  }

  async arrastrarAhaciaB() {
    // Playwright tiene un comando simplificado para esto
    await this.columnaA.dragTo(this.columnaB);
  }
}