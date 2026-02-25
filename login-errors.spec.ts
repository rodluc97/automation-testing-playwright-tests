import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Agrupamos los tests por módulo para mejorar la visibilidad en los reportes
test.describe('Módulo de Autenticación - SauceDemo', () => {

  // Definimos la variable fuera para que esté disponible en todos los tests del grupo
  let login: LoginPage;

  // beforeEach se ejecuta antes de cada test, ahorrando líneas de código
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('Debe realizar login exitosamente con usuario estándar', async ({ page }) => {
    // 1. Acción: Loguearse
    await login.login('standard_user', 'secret_sauce');

    // 2. Validación: Verificar que la URL cambió a la del inventario
    await login.estaEnInventario();
    
    // 3. Validación extra: El título de la página debe ser el correcto
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('Escenario Negativo: No debe permitir el acceso a un usuario bloqueado', async () => {
    // 1. Acción: Intentar login con usuario bloqueado
    await login.login('locked_out_user', 'secret_sauce');

    // 2. Validación: Obtener y verificar el mensaje de error
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('Escenario Negativo: Debe mostrar error con credenciales inválidas', async () => {
    // 1. Acción: Datos incorrectos
    await login.login('usuario_no_existente', 'clave_erronea');

    // 2. Validación: El mensaje de error debe ser específico
    const error = await login.obtenerMensajeError();
    expect(error).toContain('Username and password do not match any user in this service');
  });

});