import { Product } from '../../domain/models/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
