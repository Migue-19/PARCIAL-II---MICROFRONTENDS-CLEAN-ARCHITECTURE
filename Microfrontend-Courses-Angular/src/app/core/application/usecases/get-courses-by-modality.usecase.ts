import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseModality } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 3: obtener los cursos de una modalidad.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetCoursesByModalityUseCase {
  private courseRepository = inject(CourseRepository);

  /**
   * Ejecuta el caso de uso.
   * @param modality Valor de la modalidad a filtrar
   * @returns Observable con los cursos de esa modalidad
   */
  execute(modality: CourseModality): Observable<Course[]> {
    return this.courseRepository.getByModality(modality);
  }
}
