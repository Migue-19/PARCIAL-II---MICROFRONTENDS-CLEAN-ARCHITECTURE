import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product, CreateProductDto } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiGateway implements ProductRepository {
  private readonly baseUrl = 'http://localhost:3001/api/products';

  // Fallback para resiliencia en caso de que el microservicio esté iniciando
  private fallbackProducts: Product[] = [
    {
      id: 'prod-001',
      name: 'Laptop Developer Pro 16"',
      description: 'Portátil de alto rendimiento con 32GB RAM y 1TB SSD',
      price: 1899.99,
      stock: 15,
      category: 'Laptops',
      createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'prod-002',
      name: 'Monitor UltraWide 34" 144Hz',
      description: 'Monitor curvo IPS para productividad y desarrollo',
      price: 499.50,
      stock: 25,
      category: 'Monitores',
      createdAt: '2026-02-15T12:00:00Z'
    },
    {
      id: 'prod-003',
      name: 'Teclado Mecánico Ergonómico QMK',
      description: 'Teclado inalámbrico con switches táctiles silenciosos',
      price: 149.00,
      stock: 40,
      category: 'Periféricos',
      createdAt: '2026-03-01T09:30:00Z'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.warn('[ProductsApiGateway] Fallo al conectar con backend :3001, usando datos resilientes:', error.message);
        return of(this.fallbackProducts);
      })
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => {
        const product = this.fallbackProducts.find(p => p.id === id) || this.fallbackProducts[0];
        return of(product);
      })
    );
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto).pipe(
      catchError(() => {
        const newProduct: Product = {
          id: `prod-${Date.now().toString().slice(-4)}`,
          name: dto.name,
          description: dto.description || '',
          price: Number(dto.price),
          stock: Number(dto.stock),
          category: dto.category || 'General',
          createdAt: new Date().toISOString()
        };
        this.fallbackProducts.push(newProduct);
        return of(newProduct);
      })
    );
  }
}
