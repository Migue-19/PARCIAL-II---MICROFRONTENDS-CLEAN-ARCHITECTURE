import { User, UserEngineering } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDatasource } from '../datasource/user.datasource';

/**
 * Implementación del repositorio de usuarios sobre `UserDatasource`.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly datasource: UserDatasource) {
    super();
  }

  getAll(count: number): Promise<User[]> {
    return this.datasource.findAll(count);
  }

  getById(id: number): Promise<User | null> {
    return this.datasource.findById(id);
  }

  getByEngineering(engineering: UserEngineering): Promise<User[]> {
    return this.datasource.findByEngineering(engineering);
  }
}
