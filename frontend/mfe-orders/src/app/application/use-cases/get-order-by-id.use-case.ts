import { Observable, throwError } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

export class GetOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(id: string): Observable<Order> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('El ID de la orden es requerido'));
    }
    return this.orderRepository.getById(id);
  }
}
