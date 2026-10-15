import { Observable } from 'rxjs';
import { Order, CreateOrderDto } from '../models/order.model';

export abstract class OrderRepository {
  abstract getAll(): Observable<Order[]>;
  abstract getById(id: string): Observable<Order>;
  abstract create(dto: CreateOrderDto): Observable<Order>;
}
