import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('US-001: Verify Login Functionality', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
  });

  test('TC-01: Verify a valid user credentials redirect the user to the inventory dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');
    await login.estaEnInventario();
  });

  test('TC-02: Verify a "Locked Out" error message appears when a blocked user attempts to login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('locked_out_user', 'secret_sauce');
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('TC-03: Verify Failed login with invalid data must show error message for invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('invalid_user', 'wrong_pass');
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Username and password do not match');
  });
});