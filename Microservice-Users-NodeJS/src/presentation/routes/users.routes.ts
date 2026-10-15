import { Router } from 'express';
import { GetAllUsersUseCase } from '../../application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../application/usecases/get-users-by-engineering.usecase';
import { UserDatasource } from '../../infrastructure/datasource/user.datasource';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UsersController } from '../controllers/users.controller';

/**
 * Rutas de usuarios y raíz de composición (inyección de dependencias).
 *
 * @remarks
 * Aquí se ensamblan las capas: datasource → repositorio → casos de uso →
 * controlador.
 */
export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasource();
    const repository = new UserRepositoryImpl(datasource);
    const controller = new UsersController(
      new GetAllUsersUseCase(repository),
      new GetUserByIdUseCase(repository),
      new GetUsersByEngineeringUseCase(repository),
    );

    /**
     * @openapi
     * /api/users/{countUsers}:
     *   get:
     *     summary: Caso de uso 1 - Listar usuarios
     *     description: Retorna los primeros N usuarios del conjunto de datos.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: countUsers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de usuarios a solicitar
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: Cantidad inválida
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/:countUsers', controller.getAllUsers);

    /**
     * @openapi
     * /api/users/id/{id}:
     *   get:
     *     summary: Caso de uso 2 - Obtener un usuario por id
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador del usuario
     *     responses:
     *       200:
     *         description: User encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Id inválido
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: No existe un usuario con ese id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/id/:id', controller.getUserById);

    /**
     * @openapi
     * /api/users/engineering/{engineering}:
     *   get:
     *     summary: Caso de uso 3 - Listar usuarios por ingeniería
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: engineering
     *         required: true
     *         schema:
     *           type: string
     *           enum: [Sistemas, Electronica, Biomedica, Industrial, Ambiental]
     *           example: Sistemas
     *         description: ingeniería a filtrar
     *     responses:
     *       200:
     *         description: Lista de usuarios de esa ingeniería
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: ingeniería inválida
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/engineering/:engineering', controller.getUsersByEngineering);

    return router;
  }
}
