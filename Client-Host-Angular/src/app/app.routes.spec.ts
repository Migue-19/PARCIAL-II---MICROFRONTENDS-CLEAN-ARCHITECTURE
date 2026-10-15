import { loadRemoteModule } from '@angular-architects/module-federation';
import { routes } from './app.routes';

jest.mock('@angular-architects/module-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

describe('routes del host', () => {
  const loadRemoteModuleMock = loadRemoteModule as jest.Mock;

  const casos = [
    { path: 'users', port: 4201, exposed: './UsersPage', page: 'UsersPage' },
    { path: 'products', port: 4202, exposed: './ProductsPage', page: 'ProductsPage' },
    { path: 'courses', port: 4203, exposed: './CoursesPage', page: 'CoursesPage' },
  ];

  casos.forEach(({ path, port, exposed, page }) => {
    it(`debería cargar el microfrontend de ${path} desde el puerto ${port}`, async () => {
      const component = class {};
      loadRemoteModuleMock.mockResolvedValue({ [page]: component });

      const route = routes.find((r) => r.path === path);
      const result = await (route?.loadComponent as () => Promise<unknown>)();

      expect(loadRemoteModuleMock).toHaveBeenCalledWith({
        type: 'module',
        remoteEntry: `http://localhost:${port}/remoteEntry.js`,
        exposedModule: exposed,
      });
      expect(result).toBe(component);
    });
  });

  it('debería redirigir cualquier ruta desconocida a usuarios', () => {
    expect(routes.find((r) => r.path === '**')?.redirectTo).toBe('users');
  });
});
