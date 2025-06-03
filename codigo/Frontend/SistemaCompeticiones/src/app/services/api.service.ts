import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9090';
  private authStatusSubject = new BehaviorSubject<boolean>(false);  // Estado de autenticación
  authStatus = this.authStatusSubject.asObservable();  // Observable público

  constructor(private httpClient: HttpClient) {
    this.checkAuthStatus();  // Verificar si el token existe al iniciar el servicio
  }

  // Verifica si hay un token en localStorage y actualiza el estado de autenticación
  private checkAuthStatus() {
    const token = this.obtenerToken();
    this.authStatusSubject.next(!!token);  // Cambia el estado de autenticación dependiendo del token
  }

  // Registrar usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/register`, usuario, {
      headers: this.obtenerHeaders()
    });
  }

  // Iniciar sesión
  iniciarSesion(usuario: string, password: string): Observable<{ token: string }> {
    const datos = { nombreUsuario: usuario, password: password };
    localStorage.setItem("username", usuario);  // Guardamos el nombre de usuario en el localStorage
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/auth/login`, datos);
  }

  // Guardar el token en el localStorage
  guardarToken(token: string) {
    localStorage.setItem('token', token);
    this.authStatusSubject.next(true);  // Actualiza el estado de autenticación a 'true'
  }

  // Obtener el token desde el localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el nombre de usuario desde el localStorage
  obtenerUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');  // Elimina el nombre de usuario al cerrar sesión
    this.authStatusSubject.next(false);  // Actualiza el estado de autenticación a 'false'
  }

  // Obtener los headers para las solicitudes
  private obtenerHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Métodos para obtener datos de la API (equipos, torneos, etc.)
  getEquipos(): Observable<any> {
    const headers = this.obtenerHeaders();
    return this.httpClient.get(`${this.apiUrl}/api/equipo`, { headers });
  }

  getTorneos(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/torneo`, { headers: this.obtenerHeaders() });
  }

  getTorneo(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/torneo/${id}`);
  }

  getJugadores(): Observable<any> {
    const headers = this.obtenerHeaders();
    console.log("Headers enviados: ", headers); // Verifica que el token esté presente
    return this.httpClient.get(`${this.apiUrl}/api/jugador`, { headers });
  }

  getBalonesOro(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/balon_oro`, { headers: this.obtenerHeaders() });
  }
}
