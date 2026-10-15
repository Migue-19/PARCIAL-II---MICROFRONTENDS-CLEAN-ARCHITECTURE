import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

/**
 * Caso de uso 1: obtener el listado de productos.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del contrato
 * `ProductRepository`, nunca de una implementación concreta.
 *
 * @architecture Clean Architecture
 * @layer Application
 */
@Injectable()
export class GetAllProductsUseCase {
  private productRepository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   * @param count Cantidad de productos a solicitar
   * @returns Observable con el listado de productos
   */
  execute(count: number): Observable<Product[]> {
    return this.productRepository.getAll(count);
  }
}
