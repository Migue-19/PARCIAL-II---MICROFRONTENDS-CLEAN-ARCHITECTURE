import { Request, Response } from 'express';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';

export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.getAllProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.getProductByIdUseCase.execute(id);
      if (!product) {
        res.status(404).json({ message: `Producto con ID '${id}' no encontrado` });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: 'Error de solicitud', error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price, stock, category } = req.body;
      const newProduct = await this.createProductUseCase.execute({
        name,
        description,
        price,
        stock,
        category
      });
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ message: 'Error al crear producto', error: error.message });
    }
  };
}
