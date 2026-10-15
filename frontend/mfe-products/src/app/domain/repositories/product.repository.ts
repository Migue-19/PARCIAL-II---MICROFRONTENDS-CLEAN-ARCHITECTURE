import { Observable } from 'rxjs';
import { Product, CreateProductDto } from '../models/product.model';

export abstract class ProductRepository {
  abstract getAll(): Observable<Product[]>;
  abstract getById(id: string): Observable<Product>;
  abstract create(product: CreateProductDto): Observable<Product>;
}
