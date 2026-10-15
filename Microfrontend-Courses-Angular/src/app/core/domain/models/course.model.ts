/**
 * Entidad de dominio que representa un curso académico.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface Course {
  /** Identificador único del curso */
  id: number;
  /** Nombre del curso */
  name: string;
  /** Nombre completo del docente que dicta el curso */
  teacher: string;
  /** Número de créditos académicos del curso */
  credits: number;
  /** Modalidad en la que se dicta el curso */
  modality: CourseModality;
}

/** Modalidades disponibles para un curso. */
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';
