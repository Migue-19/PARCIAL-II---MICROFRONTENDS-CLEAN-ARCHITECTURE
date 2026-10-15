import { Observable } from 'rxjs';
import { Course, CourseModality } from '../models/course.model';

/**
 * Contrato del repositorio de cursos.
 *
 * @remarks
 * Pertenece a la **capa de dominio** (Clean Architecture). Define qué datos
 * necesita el negocio sin conocer cómo se obtienen: las implementaciones
 * concretas viven en la capa de infraestructura.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class CourseRepository {
  /**
   * Obtiene un listado de cursos.
   * @param count Cantidad de cursos a solicitar
   */
  abstract getAll(count: number): Observable<Course[]>;

  /**
   * Obtiene un curso por su identificador.
   * @param id Identificador del curso
   */
  abstract getById(id: number): Observable<Course>;

  /**
   * Obtiene los cursos que pertenecen a una modalidad.
   * @param modality Valor de la modalidad a filtrar
   */
  abstract getByModality(modality: CourseModality): Observable<Course[]>;
}
