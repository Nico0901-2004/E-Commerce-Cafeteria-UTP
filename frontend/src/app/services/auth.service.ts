import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface RegisterDto { fullName: string; email: string; phone?: string; password: string; }
export interface LoginDto { email: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBase}/auth`;
  constructor(private http: HttpClient) {}

  register(dto: RegisterDto) { return this.http.post(`${this.base}/register`, dto); }
  login(dto: LoginDto) { return this.http.post(`${this.base}/login`, dto); } // cuando montemos API
}
