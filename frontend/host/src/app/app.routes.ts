import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('mfeProducts/Routes').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () => import('mfeOrders/Routes').then(m => m.ORDER_ROUTES)
  },
  {
    path: 'customers',
    loadChildren: () => import('mfeCustomers/Routes').then(m => m.CUSTOMER_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
