import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(id: string): Observable<Product> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('El ID de producto es requerido'));
    }
    return this.productRepository.getById(id);
  }
}
