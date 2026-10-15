import { Course, CourseModality } from '../../domain/entities/course.entity';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseDatasource } from '../datasource/course.datasource';

/**
 * Implementación del repositorio de cursos sobre `CourseDatasource`.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
export class CourseRepositoryImpl extends CourseRepository {
  constructor(private readonly datasource: CourseDatasource) {
    super();
  }

  getAll(count: number): Promise<Course[]> {
    return this.datasource.findAll(count);
  }

  getById(id: number): Promise<Course | null> {
    return this.datasource.findById(id);
  }

  getByModality(modality: CourseModality): Promise<Course[]> {
    return this.datasource.findByModality(modality);
  }
}
