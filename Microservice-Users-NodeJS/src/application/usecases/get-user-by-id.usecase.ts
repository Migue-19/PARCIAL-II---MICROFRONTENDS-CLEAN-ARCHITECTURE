import { CustomError } from '../../domain/errors/custom.error';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 2: obtener un usuario por su identificador.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  /**
   * @param id Identificador del usuario (entero mayor a 0)
   * @throws CustomError 400 si el id no es válido
   * @throws CustomError 404 si el usuario no existe
   */
  async execute(id: number): Promise<User> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('El id debe ser un número entero mayor a 0');
    }
    const user = await this.repository.getById(id);
    if (!user) {
      throw CustomError.notFound(`No existe un usuario con id ${id}`);
    }
    return user;
  }
}
