import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { InMemoryProductRepository } from '../../infrastructure/persistence/in-memory-product.repository';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';

export function createProductRouter(): Router {
  const router = Router();

  // Inyección de dependencias siguiendo Clean Architecture
  const repository = new InMemoryProductRepository();
  const getAllUseCase = new GetAllProductsUseCase(repository);
  const getByIdUseCase = new GetProductByIdUseCase(repository);
  const createUseCase = new CreateProductUseCase(repository);

  const controller = new ProductController(getAllUseCase, getByIdUseCase, createUseCase);

  /**
   * @openapi
   * /api/products:
   *   get:
   *     summary: Caso de Uso 1 - Listar todos los productos
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: Lista de productos disponibles
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  router.get('/', controller.getAll);

  /**
   * @openapi
   * /api/products/{id}:
   *   get:
   *     summary: Caso de Uso 2 - Obtener producto por ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID único del producto
   *     responses:
   *       200:
   *         description: Detalles del producto
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Producto no encontrado
   */
  router.get('/:id', controller.getById);

  /**
   * @openapi
   * /api/products:
   *   post:
   *     summary: Caso de Uso 3 - Registrar nuevo producto
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductDto'
   *     responses:
   *       201:
   *         description: Producto creado con éxito
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Datos inválidos
   */
  router.post('/', controller.create);

  return router;
}
