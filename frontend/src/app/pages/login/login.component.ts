import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // Ajusta la ruta según la ubicación real de environment.ts

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule // ✅ necesario para usar routerLink en la plantilla
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  showPass = false;

  constructor(private router: Router, private http: HttpClient) {}

  onLogin(f: any) {
    if (f.invalid || this.loading) return;
    this.loading = true;

    this.http.post<any>(`${environment.apiBase}/auth/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.loading = false;
        alert(e?.error?.message ?? 'Credenciales incorrectas');
        // Si estás probando sin API, puedes usar el fallback:
        // this.fallbackLogin();
      }
    });
  }

  // Opcional: para pruebas sin backend
  private fallbackLogin() {
    if (this.email === 'admin@gmail.com' && this.password === '123456') {
      localStorage.setItem('token', 'FAKE_TOKEN');
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
