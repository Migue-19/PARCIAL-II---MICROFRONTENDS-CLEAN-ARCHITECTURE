import { Observable, throwError } from 'rxjs';
import { Order, CreateOrderDto } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(dto: CreateOrderDto): Observable<Order> {
    if (!dto.customerName || dto.customerName.trim() === '') {
      return throwError(() => new Error('El nombre del cliente es obligatorio'));
    }
    if (!dto.items || dto.items.length === 0) {
      return throwError(() => new Error('La orden debe contener al menos un producto'));
    }
    return this.orderRepository.create(dto);
  }
}
