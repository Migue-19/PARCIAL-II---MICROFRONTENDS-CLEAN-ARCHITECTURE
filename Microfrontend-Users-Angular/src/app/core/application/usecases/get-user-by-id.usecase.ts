import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 2: obtener un usuario por su identificador.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetUserByIdUseCase {
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   * @param id Identificador del usuario
   * @returns Observable con el usuario encontrado
   */
  execute(id: number): Observable<User> {
    return this.userRepository.getById(id);
  }
}
