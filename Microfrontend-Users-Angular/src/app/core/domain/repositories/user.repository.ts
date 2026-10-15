import { Observable } from 'rxjs';
import { User, UserEngineering } from '../models/user.model';

/**
 * Contrato del repositorio de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de dominio** (Clean Architecture). Define qué datos
 * necesita el negocio sin conocer cómo se obtienen: las implementaciones
 * concretas viven en la capa de infraestructura.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class UserRepository {
  /**
   * Obtiene un listado de usuarios.
   * @param count Cantidad de usuarios a solicitar
   */
  abstract getAll(count: number): Observable<User[]>;

  /**
   * Obtiene un usuario por su identificador.
   * @param id Identificador del usuario
   */
  abstract getById(id: number): Observable<User>;

  /**
   * Obtiene los usuarios que pertenecen a una ingeniería.
   * @param engineering Valor de la ingeniería a filtrar
   */
  abstract getByEngineering(engineering: UserEngineering): Observable<User[]>;
}
