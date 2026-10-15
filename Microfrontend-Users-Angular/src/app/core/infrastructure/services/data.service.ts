import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserEngineering } from '../../domain/models/user.model';

/**
 * Servicio de infraestructura (Data Source / API Gateway).
 *
 * @remarks
 * Realiza las peticiones HTTP al microservicio de usuarios (Node.js,
 * puerto 3001). No contiene lógica de negocio y no debe ser consumido
 * directamente por los casos de uso: lo usa el repositorio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private httpClient = inject(HttpClient);

  /** URL base de la API del microservicio de usuarios. */
  private apiUrl = `${environment.baseUrlUsers}/api/users`;

  /**
   * GET `/api/users/{count}`
   * @param count Cantidad de usuarios a solicitar
   */
  getAllUsers(count: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/${count}`);
  }

  /**
   * GET `/api/users/id/{id}`
   * @param id Identificador del usuario
   */
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/id/${id}`);
  }

  /**
   * GET `/api/users/engineering/{engineering}`
   * @param engineering Valor de la ingeniería a filtrar
   */
  getUsersByEngineering(engineering: UserEngineering): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/engineering/${engineering}`);
  }
}
