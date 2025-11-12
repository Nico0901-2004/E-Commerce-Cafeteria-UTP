import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showPass = false;
  loading = false;

  constructor(private router: Router) {}

  onLogin(f: any) {
    if (f.invalid) return;

    this.loading = true;

    // 🔹 Simulación de autenticación sin backend
    setTimeout(() => {
      this.loading = false;

      // ADMIN
      if (this.email === 'admin@gmail.com' && this.password === '123456') {
        localStorage.setItem('token', 'FAKE_TOKEN_ADMIN');
        localStorage.setItem('rol', 'admin');
        this.router.navigate(['/admin/dashboardAdmin']);
      } 
      // USUARIO NORMAL
      else if (this.email === 'user@gmail.com' && this.password === '123456') {
        localStorage.setItem('token', 'FAKE_TOKEN_USER');
        localStorage.setItem('rol', 'usuario');
        this.router.navigate(['/home']);
      } 
      // CREDENCIALES INCORRECTAS
      else {
        alert('Credenciales incorrectas. Usa admin@gmail.com o user@gmail.com con contraseña 123456.');
      }
    }, 1000);
  }
}
