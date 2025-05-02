import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import {ProductsComponent} from './pages/products/products.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'products', component: ProductsComponent},
  { path: '**', redirectTo: 'home' }
];
