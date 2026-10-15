import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { DataService } from '../services/data.service';

/**
 * Implementación concreta del repositorio de productos (adaptador).
 *
 * @remarks
 * Consume el microservicio de productos desarrollado en Spring Boot a través
 * de `DataService`. Implementa el contrato `ProductRepository` de la capa
 * de dominio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable()
export class ProductSpringBootRepositoryImpl extends ProductRepository {
  private dataService = inject(DataService);

  /** @inheritDoc */
  getAll(count: number): Observable<Product[]> {
    return this.dataService.getAllProducts(count);
  }

  /** @inheritDoc */
  getById(id: number): Observable<Product> {
    return this.dataService.getProductById(id);
  }

  /** @inheritDoc */
  getByCategory(category: ProductCategory): Observable<Product[]> {
    return this.dataService.getProductsByCategory(category);
  }
}
