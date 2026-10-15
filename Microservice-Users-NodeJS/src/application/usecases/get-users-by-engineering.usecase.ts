import { CustomError } from '../../domain/errors/custom.error';
import { USER_ENGINEERINGS, User, UserEngineering } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 3: obtener los usuarios de una ingeniería.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
export class GetUsersByEngineeringUseCase {
  constructor(private readonly repository: UserRepository) {}

  /**
   * @param engineering ingeniería a filtrar
   * @throws CustomError 400 si la ingeniería no es válida
   */
  async execute(engineering: string): Promise<User[]> {
    if (!(USER_ENGINEERINGS as readonly string[]).includes(engineering)) {
      throw CustomError.badRequest(
        `La ingeniería no es válida. Valores permitidos: ${USER_ENGINEERINGS.join(', ')}`
      );
    }
    return this.repository.getByEngineering(engineering as UserEngineering);
  }
}
