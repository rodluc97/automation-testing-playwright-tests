import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('US-001: Autenticación de Usuarios', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
  });

  test('TC-01: Login exitoso con credenciales válidas debe redirigir al inventario', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');
    await login.estaEnInventario();
  });

  test('TC-02: Login fallido con usuario bloqueado debe mostrar mensaje de restricción', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('locked_out_user', 'secret_sauce');
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('TC-03: Login fallido con datos inválidos debe mostrar mensaje de error de credenciales', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('invalid_user', 'wrong_pass');
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Username and password do not match');
  });
});