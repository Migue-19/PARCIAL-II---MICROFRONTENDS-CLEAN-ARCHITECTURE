import { Product, CreateProductDto } from '../models/product.entity';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(productDto: CreateProductDto): Promise<Product>;
}
