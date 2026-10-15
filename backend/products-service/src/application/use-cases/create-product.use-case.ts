import { Product, CreateProductDto } from '../../domain/models/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('El nombre del producto es obligatorio');
    }
    if (dto.price === undefined || dto.price < 0) {
      throw new Error('El precio debe ser un número positivo');
    }
    if (dto.stock === undefined || dto.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    return await this.productRepository.create(dto);
  }
}
