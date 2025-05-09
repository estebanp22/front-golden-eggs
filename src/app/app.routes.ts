import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import {ProductsComponent} from './pages/products/products.component';
import {AdminGuard} from './guards/admin.guard';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {CartComponent} from './pages/cart/cart.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: 'productos', component: ProductsComponent },
      // agrega aquí más hijos según tus componentes
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]},
  { path: 'products', component: ProductsComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'cart', component: CartComponent},
  { path: '**', redirectTo: 'home' } // Siempre debe estar de ultimo
];
