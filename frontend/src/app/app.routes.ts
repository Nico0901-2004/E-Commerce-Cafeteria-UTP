import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'login', component: LoginComponent}
];
