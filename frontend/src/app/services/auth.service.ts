import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// DTOs (Interfaces) que tu frontend ya usa
export interface RegisterDto { 
  fullName: string; 
  email: string; 
  phone?: string; 
  password: string; 
  roleId?: number;
}
export interface LoginDto { email: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  // Esta es la URL de tu API. (environment.apiBase + /Auth)
  private base = `${environment.apiBase}/Auth`;
  
  constructor(private http: HttpClient) {}

  // --- REGISTRO (Ya corregido) ---
  register(dto: RegisterDto) { 
    dto.roleId = 1; // Asigna "Cliente" por defecto
    return this.http.post(`${this.base}/register`, dto); 
  }
  
  // --- LOGIN (Ahora guarda el token) ---
  login(dto: LoginDto): Observable<any> { 
    return this.http.post(`${this.base}/login`, dto, { responseType: 'text' }) // 1. Pedimos el token como texto
      .pipe(
        tap(token => {
          // 2. Cuando el backend responde, guardamos el token en el navegador
          localStorage.setItem('token', token);
        })
      );
  }

  // --- NUEVAS FUNCIONES (Para que el resto de la app funcione) ---

  /** Cierra la sesión borrando el token */
  logout() {
    localStorage.removeItem('token');
  }

  /** Devuelve el token guardado */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Revisa si el usuario está logueado (si existe un token) */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}