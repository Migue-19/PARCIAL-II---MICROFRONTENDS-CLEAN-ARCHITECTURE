import { CustomError } from '../../domain/errors/custom.error';
import { Course } from '../../domain/entities/course.entity';
import { CourseRepository } from '../../domain/repositories/course.repository';

/**
 * Caso de uso 1: obtener el listado de cursos.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetAllCoursesUseCase {
  constructor(private readonly repository: CourseRepository) {}

  /**
   * @param count Cantidad de cursos solicitada (entero mayor a 0)
   * @throws CustomError 400 si la cantidad no es válida
   */
  async execute(count: number): Promise<Course[]> {
    if (!Number.isInteger(count) || count < 1) {
      throw CustomError.badRequest('La cantidad debe ser un número entero mayor a 0');
    }
    return this.repository.getAll(count);
  }
}
