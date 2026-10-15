import { Routes } from '@angular/router';

/**
 * Rutas del microfrontend de usuarios.
 *
 * @remarks
 * La ruta raíz carga de forma perezosa `UsersPage`.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/users/users.page').then((m) => m.UsersPage) },
];
