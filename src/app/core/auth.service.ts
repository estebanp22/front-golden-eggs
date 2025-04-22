import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8080'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/api/auth/login`, credentials);
  }

  // Guardar el token JWT en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token JWT de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar el token del localStorage (logout)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Comprobar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Obtener los datos del usuario del token JWT
  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
      return JSON.parse(atob(payload)); // Decodifica el payload del token
    } catch {
      return null;
    }
  }

  // Obtener el rol del usuario desde el token JWT
  getUserRole(): string | null {
    const user = this.getUserFromToken();
    return user?.role || null;
  }

  // Configurar el encabezado de autorización con el token para solicitudes autenticadas
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Ejemplo de una solicitud autenticada
  getProtectedData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.api}/protected-resource`, { headers });
  }
}
