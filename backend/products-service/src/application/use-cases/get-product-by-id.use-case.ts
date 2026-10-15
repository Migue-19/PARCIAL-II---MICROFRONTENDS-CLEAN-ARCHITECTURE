import { Product } from '../../domain/models/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es requerido');
    }
    return await this.productRepository.findById(id);
  }
}
