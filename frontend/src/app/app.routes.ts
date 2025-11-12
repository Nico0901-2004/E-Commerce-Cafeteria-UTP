import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosAdminComponent } from './pages/admin/productos-admin/productos-admin.component';
import { PedidosAdminComponent } from './pages/admin/pedidos-admin/pedidos-admin.component';
import { UsuariosAdminComponent } from './pages/admin/usuarios-admin/usuarios-admin.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas usuario normal
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [UserGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [UserGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [UserGuard] },
  { path: 'historial', component: HistorialPedidosComponent, canActivate: [UserGuard] },

  // Rutas admin
  { path: 'admin/dashboardAdmin', component: DashboardAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/productosAdmin', component: ProductosAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/pedidosAdmin', component: PedidosAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/usuariosAdmin', component: UsuariosAdminComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: '/login' }
];
