import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../domain/models/course.model';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 1: obtener el listado de cursos.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del contrato
 * `CourseRepository`, nunca de una implementación concreta.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetAllCoursesUseCase {
  private courseRepository = inject(CourseRepository);

  /**
   * Ejecuta el caso de uso.
   * @param count Cantidad de cursos a solicitar
   * @returns Observable con el listado de cursos
   */
  execute(count: number): Observable<Course[]> {
    return this.courseRepository.getAll(count);
  }
}
