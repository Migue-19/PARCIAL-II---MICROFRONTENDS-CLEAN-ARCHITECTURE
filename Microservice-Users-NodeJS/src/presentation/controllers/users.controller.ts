import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../application/usecases/get-users-by-engineering.usecase';
import { HandleError } from '../../domain/errors/handle.error';

/** Latencia simulada (ms) para poder observar el estado de carga en el frontend. */
const SIMULATED_LATENCY_MS = 1000;

/**
 * Controlador HTTP de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de presentación**: traduce las peticiones HTTP a
 * llamadas a los casos de uso y los resultados/errores a respuestas HTTP.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUsersByEngineeringUseCase: GetUsersByEngineeringUseCase,
  ) {}

  /** GET /api/users/:countUsers */
  getAllUsers = (req: Request, res: Response): void => {
    const { countUsers } = req.params;
    setTimeout(() => {
      this.getAllUsersUseCase
        .execute(Number(countUsers))
        .then((users) => res.status(200).json(users))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };

  /** GET /api/users/id/:id */
  getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;
    setTimeout(() => {
      this.getUserByIdUseCase
        .execute(Number(id))
        .then((user) => res.status(200).json(user))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };

  /** GET /api/users/engineering/:engineering */
  getUsersByEngineering = (req: Request, res: Response): void => {
    const { engineering } = req.params;
    setTimeout(() => {
      this.getUsersByEngineeringUseCase
        .execute(String(engineering))
        .then((users) => res.status(200).json(users))
        .catch((error) => HandleError.error(error, res));
    }, SIMULATED_LATENCY_MS);
  };
}
