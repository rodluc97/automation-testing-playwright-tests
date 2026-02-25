import { test, expect } from '@playwright/test';
import { DragDropPage } from '../pages/DragDropPage';

test.describe('US-004: Verify Drag and Drop Functionality', () => {

test('TC01: PDF: Verify Drag and Drop Functionality', async ({ page }) => {
  const dragDrop = new DragDropPage(page);
  await dragDrop.goto();
  
  // Arrastre directo
  await dragDrop.arrastrarAhaciaB();

  // Validación instantánea
  await expect(dragDrop.columnaA).toHaveText('B');
});
});