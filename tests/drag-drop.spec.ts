import { test, expect } from '@playwright/test';
import { DragDropPage } from '../pages/DragDropPage';

test('Interacción rápida: Drag and Drop', async ({ page }) => {
  const dragDrop = new DragDropPage(page);
  await dragDrop.goto();
  
  // Arrastre directo
  await dragDrop.arrastrarAhaciaB();

  // Validación instantánea
  await expect(dragDrop.columnaA).toHaveText('B');
});