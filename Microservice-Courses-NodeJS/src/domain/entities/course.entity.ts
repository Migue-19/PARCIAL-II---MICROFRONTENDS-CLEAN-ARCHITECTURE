/** Valores permitidos para la modalidad. */
export const COURSE_MODALITIES = ['Presencial', 'Virtual', 'Hibrido'] as const;

/** modalidad de un curso. */
export type CourseModality = (typeof COURSE_MODALITIES)[number];

/**
 * Entidad de dominio que representa un curso.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface Course {
  /** Identificador único del curso */
  id: number;
  /** Nombre del curso */
  name: string;
  /** Nombre completo del docente */
  teacher: string;
  /** Número de créditos académicos */
  credits: number;
  /** Modalidad en la que se dicta el curso */
  modality: CourseModality;
}
