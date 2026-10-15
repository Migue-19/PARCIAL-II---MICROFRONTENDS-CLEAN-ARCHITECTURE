import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

export class ListOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute(): Observable<Order[]> {
    return this.orderRepository.getAll();
  }
}
