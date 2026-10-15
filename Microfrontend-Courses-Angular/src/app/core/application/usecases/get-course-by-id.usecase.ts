import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 2: obtener un curso por su identificador.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetCourseByIdUseCase {
  private courseRepository = inject(CourseRepository);

  /**
   * Ejecuta el caso de uso.
   * @param id Identificador del curso
   * @returns Observable con el curso encontrado
   */
  execute(id: number): Observable<Course> {
    return this.courseRepository.getById(id);
  }
}
