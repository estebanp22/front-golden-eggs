import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import {ProductsComponent} from './pages/products/products.component';
import {AdminGuard} from './guards/admin.guard';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {SalesComponent} from './pages/admin/components/sales/sales.component';
import {CartComponent} from './pages/cart/cart.component';
import {StatisticsComponent} from './pages/admin/components/statistics/statistics.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/sales', component: SalesComponent, canActivate: [AdminGuard] },
  { path: 'admin/statistics', component: StatisticsComponent, canActivate: [AdminGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'cart', component: CartComponent },
  {path: 'admin/clientes', loadComponent: () => import('./pages/admin/components/customers/customers.component').then(c => c.CustomersComponent)},
  { path: '**', redirectTo: 'home' } // Siempre debe estar de ultimo
];
