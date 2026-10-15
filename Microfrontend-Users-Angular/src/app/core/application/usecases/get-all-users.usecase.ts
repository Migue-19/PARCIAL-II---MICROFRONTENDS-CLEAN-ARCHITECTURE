import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso 1: obtener el listado de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del contrato
 * `UserRepository`, nunca de una implementación concreta.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetAllUsersUseCase {
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   * @param count Cantidad de usuarios a solicitar
   * @returns Observable con el listado de usuarios
   */
  execute(count: number): Observable<User[]> {
    return this.userRepository.getAll(count);
  }
}
