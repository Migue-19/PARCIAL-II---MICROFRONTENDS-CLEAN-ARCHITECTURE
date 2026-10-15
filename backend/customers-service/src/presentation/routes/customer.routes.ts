import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { InMemoryCustomerRepository } from '../../infrastructure/persistence/in-memory-customer.repository';
import { GetAllCustomersUseCase } from '../../application/use-cases/get-all-customers.use-case';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from '../../application/use-cases/register-customer.use-case';

export function createCustomerRouter(): Router {
  const router = Router();

  const repository = new InMemoryCustomerRepository();
  const getAllUseCase = new GetAllCustomersUseCase(repository);
  const getByIdUseCase = new GetCustomerByIdUseCase(repository);
  const registerUseCase = new RegisterCustomerUseCase(repository);

  const controller = new CustomerController(getAllUseCase, getByIdUseCase, registerUseCase);

  /**
   * @openapi
   * /api/customers:
   *   get:
   *     summary: Caso de Uso 1 - Listar todos los clientes
   *     tags: [Customers]
   *     responses:
   *       200:
   *         description: Lista de clientes registrados
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Customer'
   */
  router.get('/', controller.getAll);

  /**
   * @openapi
   * /api/customers/{id}:
   *   get:
   *     summary: Caso de Uso 2 - Obtener perfil de cliente por ID
   *     tags: [Customers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID único del cliente
   *     responses:
   *       200:
   *         description: Perfil del cliente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Customer'
   *       404:
   *         description: Cliente no encontrado
   */
  router.get('/:id', controller.getById);

  /**
   * @openapi
   * /api/customers:
   *   post:
   *     summary: Caso de Uso 3 - Registrar nuevo cliente
   *     tags: [Customers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterCustomerDto'
   *     responses:
   *       201:
   *         description: Cliente registrado con éxito
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Customer'
   *       400:
   *         description: Datos inválidos
   */
  router.post('/', controller.register);

  return router;
}
