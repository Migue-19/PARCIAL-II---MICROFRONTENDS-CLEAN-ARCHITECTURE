import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserEngineering } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 3: obtener los usuarios de una ingeniería.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetUsersByEngineeringUseCase {
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   * @param engineering Valor de la ingeniería a filtrar
   * @returns Observable con los usuarios de esa ingeniería
   */
  execute(engineering: UserEngineering): Observable<User[]> {
    return this.userRepository.getByEngineering(engineering);
  }
}
