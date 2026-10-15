import { faker } from '@faker-js/faker';
import { USER_ENGINEERINGS, User, UserEngineering } from '../../domain/entities/user.entity';

/** Cantidad de registros generados al iniciar el servicio. */
export const DATASET_SIZE = 100;
/** Semilla de Faker: garantiza que los datos sean siempre los mismos. */
export const DATASET_SEED = 2026;

/**
 * Fuente de datos en memoria de usuarios (generada con Faker.js).
 *
 * @remarks
 * Pertenece a la **capa de infraestructura**. Genera un conjunto fijo de
 * registros al iniciar para que la búsqueda por id y los filtros sean
 * consistentes entre peticiones.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
export class UserDatasource {
  private readonly users: User[];

  constructor() {
    faker.seed(DATASET_SEED);
    this.users = Array.from({ length: DATASET_SIZE }, (_, index) => this.generate(index + 1));
  }

  /** Devuelve los primeros `count` registros. */
  async findAll(count: number): Promise<User[]> {
    return this.users.slice(0, count);
  }

  /** Busca un registro por id. */
  async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  /** Devuelve los registros de una ingeniería. */
  async findByEngineering(engineering: UserEngineering): Promise<User[]> {
    return this.users.filter((user) => user.engineering === engineering);
  }

  private generate(id: number): User {
    return {
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      engineering: faker.helpers.arrayElement(USER_ENGINEERINGS),
    };
  }
}
