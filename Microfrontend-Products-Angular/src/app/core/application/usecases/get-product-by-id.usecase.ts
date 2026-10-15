import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso 2: obtener un producto por su identificador.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetProductByIdUseCase {
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   * @param id Identificador del producto
   * @returns Observable con el producto encontrado
   */
  execute(id: number): Observable<Product> {
    return this.productRepository.getById(id);
  }
}
