import { CustomError } from '../../domain/errors/custom.error';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 1: obtener el listado de usuarios.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetAllUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  /**
   * @param count Cantidad de usuarios solicitada (entero mayor a 0)
   * @throws CustomError 400 si la cantidad no es válida
   */
  async execute(count: number): Promise<User[]> {
    if (!Number.isInteger(count) || count < 1) {
      throw CustomError.badRequest('La cantidad debe ser un número entero mayor a 0');
    }
    return this.repository.getAll(count);
  }
}
