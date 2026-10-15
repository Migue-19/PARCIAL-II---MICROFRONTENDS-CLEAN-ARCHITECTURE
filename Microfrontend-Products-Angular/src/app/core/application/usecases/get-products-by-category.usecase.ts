import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso 3: obtener los productos de una categoría.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetProductsByCategoryUseCase {
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   * @param category Valor de la categoría a filtrar
   * @returns Observable con los productos de esa categoría
   */
  execute(category: ProductCategory): Observable<Product[]> {
    return this.productRepository.getByCategory(category);
  }
}
