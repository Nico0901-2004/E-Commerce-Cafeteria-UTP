import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Importamos el servicio real

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule // ¡Importante para que funcione [formGroup]!
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string | null = null; // Para mostrar errores de la API
  showPass: boolean = false; // Para el botón de "mostrar contraseña"

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // El servicio REAL
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // --- Lógica NO SIMULADA ---
  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Por favor, ingresa un email y contraseña válidos.";
      return;
    }

    this.errorMessage = null; // Limpiamos errores anteriores
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        // ¡ÉXITO! El backend nos dio un token.
        this.router.navigate(['/']); // Redirigimos al inicio
      },
      error: (err) => {
        // ¡ERROR! El backend dijo "Email o contraseña incorrecta"
        this.errorMessage = "Email o contraseña incorrecta.";
        console.error('Error en el login:', err);
      }
    });
  }
}