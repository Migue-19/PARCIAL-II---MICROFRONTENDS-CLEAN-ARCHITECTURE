import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseModality } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { DataService } from '../services/data.service';

/**
 * Implementación concreta del repositorio de cursos (adaptador).
 *
 * @remarks
 * Consume el microservicio de cursos desarrollado en Node.js a través
 * de `DataService`. Implementa el contrato `CourseRepository` de la capa
 * de dominio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable()
export class CourseNodeRepositoryImpl extends CourseRepository {
  private dataService = inject(DataService);

  /** @inheritDoc */
  getAll(count: number): Observable<Course[]> {
    return this.dataService.getAllCourses(count);
  }

  /** @inheritDoc */
  getById(id: number): Observable<Course> {
    return this.dataService.getCourseById(id);
  }

  /** @inheritDoc */
  getByModality(modality: CourseModality): Observable<Course[]> {
    return this.dataService.getCoursesByModality(modality);
  }
}
