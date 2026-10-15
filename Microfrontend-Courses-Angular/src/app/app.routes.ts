import { Routes } from '@angular/router';

/**
 * Rutas del microfrontend de cursos.
 *
 * @remarks
 * La ruta raíz carga de forma perezosa `CoursesPage`.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/courses/courses.page').then((m) => m.CoursesPage) },
];
