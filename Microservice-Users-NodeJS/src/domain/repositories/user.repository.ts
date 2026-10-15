import { User, UserEngineering } from '../entities/user.entity';

/**
 * Contrato del repositorio de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de dominio**: define qué operaciones necesita el
 * negocio sin saber de dónde provienen los datos.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class UserRepository {
  /** Obtiene los primeros `count` usuarios. */
  abstract getAll(count: number): Promise<User[]>;

  /** Obtiene un usuario por id o `null` si no existe. */
  abstract getById(id: number): Promise<User | null>;

  /** Obtiene los usuarios de una ingeniería. */
  abstract getByEngineering(engineering: UserEngineering): Promise<User[]>;
}
