import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../core/application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../../core/application/usecases/get-users-by-engineering.usecase';
import { User, UserEngineering } from '../../../core/domain/models/user.model';
import { UserRepository } from '../../../core/domain/repositories/user.repository';
import { UserNodeRepositoryImpl } from '../../../core/infrastructure/repositories/user-node.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { State } from '../../interfaces/state.interface';

/** Cantidad de usuarios que se listan al iniciar la página. */
export const DEFAULT_COUNT = 10;
/** Mensaje mostrado ante un error genérico. */
export const DEFAULT_ERROR_MESSAGE = 'Error al cargar los usuarios';
/** Mensaje mostrado cuando el microservicio responde 404. */
export const NOT_FOUND_MESSAGE = 'No se encontró el usuario solicitado';

/**
 * Página contenedora de usuarios (microfrontend expuesto al host).
 *
 * @remarks
 * Forma parte de la **capa de presentación**. Orquesta tres casos de uso:
 * listar, buscar por id y filtrar por ingeniería. Registra en sus
 * `providers` los casos de uso y la implementación del repositorio, de modo
 * que funciona igual cuando el host la carga mediante Module Federation.
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  imports: [UsersTableComponent, AlertComponent],
  providers: [
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    GetUsersByEngineeringUseCase,
    { provide: UserRepository, useClass: UserNodeRepositoryImpl },
  ],
})
export class UsersPage implements OnInit {
  /** Listado de usuarios mostrado en la tabla. */
  users: User[] = [];

  /** Estado actual de la carga. */
  state: State = 'init';

  /** Mensaje de error a mostrar cuando `state` es `error`. */
  errorMessage = DEFAULT_ERROR_MESSAGE;

  /** Opciones disponibles para el filtro de ingeniería. */
  readonly engineeringOptions: UserEngineering[] = ['Sistemas', 'Electronica', 'Biomedica', 'Industrial', 'Ambiental'];

  private getAllUsersUseCase = inject(GetAllUsersUseCase);
  private getUserByIdUseCase = inject(GetUserByIdUseCase);
  private getUsersByEngineeringUseCase = inject(GetUsersByEngineeringUseCase);

  /** Carga el listado inicial de usuarios. */
  ngOnInit(): void {
    this.loadAll(DEFAULT_COUNT);
  }

  /**
   * Lista usuarios (caso de uso 1).
   * @param count Cantidad de usuarios a solicitar
   */
  loadAll(count: number): void {
    if (!Number.isInteger(count) || count < 1) {
      this.fail('Ingrese una cantidad entera mayor a 0');
      return;
    }
    this.load(this.getAllUsersUseCase.execute(count));
  }

  /**
   * Busca un usuario por id (caso de uso 2).
   * @param id Identificador del usuario
   */
  loadById(id: number): void {
    if (!Number.isInteger(id) || id < 1) {
      this.fail('Ingrese un id entero mayor a 0');
      return;
    }
    this.load(this.getUserByIdUseCase.execute(id).pipe(map((user) => [user])));
  }

  /**
   * Filtra usuarios por ingeniería (caso de uso 3).
   * @param engineering Valor de la ingeniería seleccionada
   */
  loadByEngineering(engineering: string): void {
    this.load(this.getUsersByEngineeringUseCase.execute(engineering as UserEngineering));
  }

  private load(source$: Observable<User[]>): void {
    this.state = 'loading';
    source$.subscribe({
      next: (users) => {
        this.users = users;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.users = [];
        this.errorMessage =
          error instanceof HttpErrorResponse && error.status === 404
            ? NOT_FOUND_MESSAGE
            : DEFAULT_ERROR_MESSAGE;
        this.state = 'error';
      },
    });
  }

  private fail(message: string): void {
    this.users = [];
    this.errorMessage = message;
    this.state = 'error';
  }
}
