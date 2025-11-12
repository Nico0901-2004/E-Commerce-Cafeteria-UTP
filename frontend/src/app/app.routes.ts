import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { ProductosAdminComponent } from './pages/admin/productos-admin/productos-admin.component';
import { PedidosAdminComponent } from './pages/admin/pedidos-admin/pedidos-admin.component';
import { UsuariosAdminComponent } from './pages/admin/usuarios-admin/usuarios-admin.component';

// --- ¡CORRECCIÓN DE MAYÚSCULAS AQUÍ! ---
import { UserGuard } from './guards/user.guard'; // Era userGuard
import { AdminGuard } from './guards/admin.guard'; // Era adminGuard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  
  // --- ¡Y CORRECCIÓN AQUÍ! ---
  { path: 'carrito', component: CarritoComponent, canActivate: [UserGuard] }, // Era userGuard
  { path: 'usuario', component: UsuarioComponent, canActivate: [UserGuard] }, // Era userGuard
  
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },

  // --- ¡Y CORRECCIÓN AQUÍ! ---
  { 
    path: 'admin', 
    component: DashboardAdminComponent, 
    canActivate: [AdminGuard], // Era adminGuard
    children: [
      { path: 'productos', component: ProductosAdminComponent },
      { path: 'pedidos', component: PedidosAdminComponent },
      { path: 'usuarios', component: UsuariosAdminComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' }
    ]
  },

  // Redirección por defecto
  { path: '**', redirectTo: '', pathMatch: 'full' }
];