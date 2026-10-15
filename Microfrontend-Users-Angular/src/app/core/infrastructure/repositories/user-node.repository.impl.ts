import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserEngineering } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DataService } from '../services/data.service';

/**
 * Implementación concreta del repositorio de usuarios (adaptador).
 *
 * @remarks
 * Consume el microservicio de usuarios desarrollado en Node.js a través
 * de `DataService`. Implementa el contrato `UserRepository` de la capa
 * de dominio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable()
export class UserNodeRepositoryImpl extends UserRepository {
  private dataService = inject(DataService);

  /** @inheritDoc */
  getAll(count: number): Observable<User[]> {
    return this.dataService.getAllUsers(count);
  }

  /** @inheritDoc */
  getById(id: number): Observable<User> {
    return this.dataService.getUserById(id);
  }

  /** @inheritDoc */
  getByEngineering(engineering: UserEngineering): Observable<User[]> {
    return this.dataService.getUsersByEngineering(engineering);
  }
}
