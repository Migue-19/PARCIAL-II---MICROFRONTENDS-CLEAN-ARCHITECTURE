import { routes } from './app.routes';
import { CoursesPage } from './presentation/pages/courses/courses.page';

describe('routes', () => {
  it('debería definir la ruta raíz del microfrontend', () => {
    expect(routes.length).toBe(1);
    expect(routes[0].path).toBe('');
  });

  it('debería cargar CoursesPage de forma perezosa', async () => {
    const component = await (routes[0].loadComponent as () => Promise<unknown>)();
    expect(component).toBe(CoursesPage);
  });
});
