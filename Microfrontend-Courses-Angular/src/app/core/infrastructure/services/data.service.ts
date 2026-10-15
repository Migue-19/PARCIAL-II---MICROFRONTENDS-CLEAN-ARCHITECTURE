import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Course, CourseModality } from '../../domain/models/course.model';

/**
 * Servicio de infraestructura (Data Source / API Gateway).
 *
 * @remarks
 * Realiza las peticiones HTTP al microservicio de cursos (Node.js,
 * puerto 3003). No contiene lógica de negocio y no debe ser consumido
 * directamente por los casos de uso: lo usa el repositorio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private httpClient = inject(HttpClient);

  /** URL base de la API del microservicio de cursos. */
  private apiUrl = `${environment.baseUrlCourses}/api/courses`;

  /**
   * GET `/api/courses/{count}`
   * @param count Cantidad de cursos a solicitar
   */
  getAllCourses(count: number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.apiUrl}/${count}`);
  }

  /**
   * GET `/api/courses/id/{id}`
   * @param id Identificador del curso
   */
  getCourseById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.apiUrl}/id/${id}`);
  }

  /**
   * GET `/api/courses/modality/{modality}`
   * @param modality Valor de la modalidad a filtrar
   */
  getCoursesByModality(modality: CourseModality): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.apiUrl}/modality/${modality}`);
  }
}
