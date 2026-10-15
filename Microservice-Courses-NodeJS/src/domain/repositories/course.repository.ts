import { Course, CourseModality } from '../entities/course.entity';

/**
 * Contrato del repositorio de cursos.
 *
 * @remarks
 * Pertenece a la **capa de dominio**: define qué operaciones necesita el
 * negocio sin saber de dónde provienen los datos.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class CourseRepository {
  /** Obtiene los primeros `count` cursos. */
  abstract getAll(count: number): Promise<Course[]>;

  /** Obtiene un curso por id o `null` si no existe. */
  abstract getById(id: number): Promise<Course | null>;

  /** Obtiene los cursos de una modalidad. */
  abstract getByModality(modality: CourseModality): Promise<Course[]>;
}
