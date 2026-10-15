import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product, ProductCategory } from '../../domain/models/product.model';

/**
 * Servicio de infraestructura (Data Source / API Gateway).
 *
 * @remarks
 * Realiza las peticiones HTTP al microservicio de productos (Spring Boot,
 * puerto 3002). No contiene lógica de negocio y no debe ser consumido
 * directamente por los casos de uso: lo usa el repositorio.
 *
 * @architecture Clean Architecture
 * @layer Infrastructure
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private httpClient = inject(HttpClient);

  /** URL base de la API del microservicio de productos. */
  private apiUrl = `${environment.baseUrlProducts}/api/products`;

  /**
   * GET `/api/products/{count}`
   * @param count Cantidad de productos a solicitar
   */
  getAllProducts(count: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/${count}`);
  }

  /**
   * GET `/api/products/id/{id}`
   * @param id Identificador del producto
   */
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/id/${id}`);
  }

  /**
   * GET `/api/products/category/{category}`
   * @param category Valor de la categoría a filtrar
   */
  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
