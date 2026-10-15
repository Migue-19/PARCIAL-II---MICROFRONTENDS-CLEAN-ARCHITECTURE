import { CustomError } from '../../domain/errors/custom.error';
import { COURSE_MODALITIES, Course, CourseModality } from '../../domain/entities/course.entity';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 3: obtener los cursos de una modalidad.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetCoursesByModalityUseCase {
  constructor(private readonly repository: CourseRepository) {}

  /**
   * @param modality modalidad a filtrar
   * @throws CustomError 400 si la modalidad no es válida
   */
  async execute(modality: string): Promise<Course[]> {
    if (!(COURSE_MODALITIES as readonly string[]).includes(modality)) {
      throw CustomError.badRequest(
        `La modalidad no es válida. Valores permitidos: ${COURSE_MODALITIES.join(', ')}`
      );
    }
    return this.repository.getByModality(modality as CourseModality);
  }
}
