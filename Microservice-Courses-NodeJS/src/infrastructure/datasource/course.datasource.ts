import { faker } from '@faker-js/faker';
import { COURSE_MODALITIES, Course, CourseModality } from '../../domain/entities/course.entity';

/** Cantidad de registros generados al iniciar el servicio. */
export const DATASET_SIZE = 100;
/** Semilla de Faker: garantiza que los datos sean siempre los mismos. */
export const DATASET_SEED = 2026;

/**
 * Fuente de datos en memoria de cursos (generada con Faker.js).
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera un conjunto fijo de
 * registros al iniciar para que la búsqueda por id y los filtros sean
 * consistentes entre peticiones.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
export class CourseDatasource {
  private readonly courses: Course[];

  constructor() {
    faker.seed(DATASET_SEED);
    this.courses = Array.from({ length: DATASET_SIZE }, (_, index) => this.generate(index + 1));
  }

  /** Devuelve los primeros `count` registros. */
  async findAll(count: number): Promise<Course[]> {
    return this.courses.slice(0, count);
  }

  /** Busca un registro por id. */
  async findById(id: number): Promise<Course | null> {
    return this.courses.find((course) => course.id === id) ?? null;
  }

  /** Devuelve los registros de una modalidad. */
  async findByModality(modality: CourseModality): Promise<Course[]> {
    return this.courses.filter((course) => course.modality === modality);
  }

  private generate(id: number): Course {
    return {
      id,
      name: faker.lorem.words({ min: 2, max: 3 }),
      teacher: faker.person.fullName(),
      credits: faker.number.int({ min: 1, max: 5 }),
      modality: faker.helpers.arrayElement(COURSE_MODALITIES),
    };
  }
}
