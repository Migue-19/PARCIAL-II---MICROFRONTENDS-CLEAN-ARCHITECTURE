import { Routes } from '@angular/router';

/**
 * Rutas del microfrontend de productos.
 *
 * @remarks
 * La ruta raíz carga de forma perezosa `ProductsPage`.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./presentation/pages/products/products.page').then((m) => m.ProductsPage) },
];
