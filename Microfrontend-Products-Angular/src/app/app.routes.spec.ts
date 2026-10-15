import { routes } from './app.routes';
import { ProductsPage } from './presentation/pages/products/products.page';

describe('routes', () => {
  it('debería definir la ruta raíz del microfrontend', () => {
    expect(routes.length).toBe(1);
    expect(routes[0].path).toBe('');
  });

  it('debería cargar ProductsPage de forma perezosa', async () => {
    const component = await (routes[0].loadComponent as () => Promise<unknown>)();
    expect(component).toBe(ProductsPage);
  });
});
