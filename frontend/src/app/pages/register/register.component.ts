import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';    

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  confirm = '';
  loading = false;
  showPass = false;

  constructor(private http: HttpClient, private router: Router) {}

  submit(f: any) {
    if (f.invalid || this.password !== this.confirm) return;
    this.loading = true;
    this.http.post(`${environment.apiBase}/auth/register`, {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        alert('Registro exitoso. Ahora inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.loading = false;
        alert(e?.error?.message ?? 'No se pudo registrar');
      }
    });
  }
}
