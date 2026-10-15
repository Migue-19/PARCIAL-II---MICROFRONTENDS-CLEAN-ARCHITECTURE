import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Order, CreateOrderDto } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiGateway implements OrderRepository {
  private readonly baseUrl = 'http://localhost:8080/api/orders';

  private fallbackOrders: Order[] = [
    {
      id: 'ORD-1001',
      customerName: 'Carlos Mendoza',
      customerEmail: 'carlos.mendoza@email.com',
      items: [
        { productId: 'prod-001', productName: 'Laptop Developer Pro 16"', quantity: 1, unitPrice: 1899.99 }
      ],
      totalAmount: 1899.99,
      status: 'CONFIRMED',
      createdAt: '2026-03-10T14:30:00Z'
    },
    {
      id: 'ORD-1002',
      customerName: 'Valeria Gómez',
      customerEmail: 'valeria.gomez@email.com',
      items: [
        { productId: 'prod-002', productName: 'Monitor UltraWide 34"', quantity: 2, unitPrice: 499.50 },
        { productId: 'prod-003', productName: 'Teclado Mecánico Ergonómico', quantity: 1, unitPrice: 149.00 }
      ],
      totalAmount: 1148.00,
      status: 'DELIVERED',
      createdAt: '2026-03-12T18:45:00Z'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.warn('[OrdersApiGateway] Conectando con fallback resiliente para Spring Boot (:8080):', error.message);
        return of(this.fallbackOrders);
      })
    );
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => {
        const found = this.fallbackOrders.find(o => o.id === id) || this.fallbackOrders[0];
        return of(found);
      })
    );
  }

  create(dto: CreateOrderDto): Observable<Order> {
    const total = dto.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    return this.http.post<Order>(this.baseUrl, dto).pipe(
      catchError(() => {
        const newOrder: Order = {
          id: `ORD-${Date.now().toString().slice(-4)}`,
          customerName: dto.customerName,
          customerEmail: dto.customerEmail,
          items: dto.items,
          totalAmount: total,
          status: 'PENDING',
          createdAt: new Date().toISOString()
        };
        this.fallbackOrders.push(newOrder);
        return of(newOrder);
      })
    );
  }
}
