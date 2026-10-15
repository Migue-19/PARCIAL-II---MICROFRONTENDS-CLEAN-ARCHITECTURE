import { CustomError } from '../../domain/errors/custom.error';
import { Course } from '../../domain/entities/course.entity';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 2: obtener un curso por su identificador.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetCourseByIdUseCase {
  constructor(private readonly repository: CourseRepository) {}

  /**
   * @param id Identificador del curso (entero mayor a 0)
   * @throws CustomError 400 si el id no es válido
   * @throws CustomError 404 si el curso no existe
   */
  async execute(id: number): Promise<Course> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('El id debe ser un número entero mayor a 0');
    }
    const course = await this.repository.getById(id);
    if (!course) {
      throw CustomError.notFound(`No existe un curso con id ${id}`);
    }
    return course;
  }
}
