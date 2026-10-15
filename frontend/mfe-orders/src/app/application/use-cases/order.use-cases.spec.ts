import { of } from 'rxjs';
import { Order, CreateOrderDto } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { ListOrdersUseCase } from './list-orders.use-case';
import { GetOrderByIdUseCase } from './get-order-by-id.use-case';
import { CreateOrderUseCase } from './create-order.use-case';

class MockOrderRepository extends OrderRepository {
  private orders: Order[] = [
    {
      id: 'ORD-1001',
      customerName: 'Carlos Mendoza',
      customerEmail: 'carlos@email.com',
      items: [
        { productId: 'prod-001', productName: 'Laptop Developer Pro', quantity: 1, unitPrice: 1899.99 }
      ],
      totalAmount: 1899.99,
      status: 'CONFIRMED',
      createdAt: '2026-03-10'
    }
  ];

  getAll() {
    return of(this.orders);
  }

  getById(id: string) {
    const found = this.orders.find(o => o.id === id) || this.orders[0];
    return of(found);
  }

  create(dto: CreateOrderDto) {
    const total = dto.items.reduce((s, it) => s + (it.quantity * it.unitPrice), 0);
    const newOrder: Order = {
      id: 'ORD-9999',
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      items: dto.items,
      totalAmount: total,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    return of(newOrder);
  }
}

describe('MFE Orders - Application Use Cases (Clean Architecture)', () => {
  let mockRepo: MockOrderRepository;
  let listOrdersUseCase: ListOrdersUseCase;
  let getOrderByIdUseCase: GetOrderByIdUseCase;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(() => {
    mockRepo = new MockOrderRepository();
    listOrdersUseCase = new ListOrdersUseCase(mockRepo);
    getOrderByIdUseCase = new GetOrderByIdUseCase(mockRepo);
    createOrderUseCase = new CreateOrderUseCase(mockRepo);
  });

  describe('ListOrdersUseCase (Caso de Uso 1)', () => {
    it('debe emitir la lista de órdenes', (done) => {
      listOrdersUseCase.execute().subscribe((orders) => {
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBe(1);
        expect(orders[0].id).toBe('ORD-1001');
        done();
      });
    });
  });

  describe('GetOrderByIdUseCase (Caso de Uso 2)', () => {
    it('debe retornar la orden correspondiente al ID', (done) => {
      getOrderByIdUseCase.execute('ORD-1001').subscribe((order) => {
        expect(order).toBeDefined();
        expect(order.id).toBe('ORD-1001');
        done();
      });
    });

    it('debe emitir error si el ID está vacío', (done) => {
      getOrderByIdUseCase.execute('').subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El ID de la orden es requerido');
          done();
        }
      });
    });
  });

  describe('CreateOrderUseCase (Caso de Uso 3)', () => {
    it('debe crear una orden válida correctamente', (done) => {
      const dto: CreateOrderDto = {
        customerName: 'Valeria Gómez',
        customerEmail: 'valeria@email.com',
        items: [
          { productId: 'prod-002', productName: 'Monitor UltraWide', quantity: 2, unitPrice: 499.50 }
        ]
      };

      createOrderUseCase.execute(dto).subscribe((order) => {
        expect(order).toBeDefined();
        expect(order.id).toBe('ORD-9999');
        expect(order.customerName).toBe('Valeria Gómez');
        expect(order.totalAmount).toBe(999);
        done();
      });
    });

    it('debe emitir error si falta el nombre del cliente', (done) => {
      const dto: CreateOrderDto = {
        customerName: '',
        customerEmail: 'test@email.com',
        items: [{ productId: 'p1', productName: 'Item 1', quantity: 1, unitPrice: 10 }]
      };

      createOrderUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El nombre del cliente es obligatorio');
          done();
        }
      });
    });

    it('debe emitir error si la orden no contiene ítems', (done) => {
      const dto: CreateOrderDto = {
        customerName: 'Cliente Sin Items',
        customerEmail: 'test@email.com',
        items: []
      };

      createOrderUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('La orden debe contener al menos un producto');
          done();
        }
      });
    });
  });
});
