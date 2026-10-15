import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

/**
 * Rutas del host.
 *
 * @remarks
 * Cada ruta carga un microfrontend remoto mediante Module Federation:
 * - `/users`    → `mf-users`    (http://localhost:4201)
 * - `/products` → `mf-products` (http://localhost:4202)
 * - `/courses`  → `mf-courses`  (http://localhost:4203)
 *
 * Cualquier ruta desconocida redirige a `/users`.
 */
export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './UsersPage',
      }).then((m) => m.UsersPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './ProductsPage',
      }).then((m) => m.ProductsPage),
  },
  {
    path: 'courses',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './CoursesPage',
      }).then((m) => m.CoursesPage),
  },
  { path: '**', redirectTo: 'users' },
];
