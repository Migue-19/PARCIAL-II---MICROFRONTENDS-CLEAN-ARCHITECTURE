import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product, CreateProductDto } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(dto: CreateProductDto): Observable<Product> {
    if (!dto.name || dto.name.trim() === '') {
      return throwError(() => new Error('El nombre del producto no puede estar vacío'));
    }
    if (dto.price === undefined || dto.price < 0) {
      return throwError(() => new Error('El precio debe ser un número positivo'));
    }
    if (dto.stock === undefined || dto.stock < 0) {
      return throwError(() => new Error('El stock no puede ser negativo'));
    }
    return this.productRepository.create(dto);
  }
}
