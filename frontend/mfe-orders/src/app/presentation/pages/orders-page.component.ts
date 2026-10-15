import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, CreateOrderDto } from '../../domain/models/order.model';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { OrderListComponent } from '../components/order-list/order-list.component';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';
import { OrderCreateComponent } from '../components/order-create/order-create.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [
    CommonModule,
    OrderListComponent,
    OrderDetailComponent,
    OrderCreateComponent
  ],
  template: `
    <div class="orders-container">
      <div class="page-header">
        <div>
          <div class="mfe-tag">Microfrontend 2 | Angular + Module Federation</div>
          <h1 class="page-title">Gestión de Órdenes & Pedidos</h1>
          <p class="page-subtitle">
            Implementación Clean Architecture conectada al microservicio Spring Boot 
            <code>orders-service</code> (:8080)
          </p>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadOrders()">↻ Refrescar</button>
          <button class="btn-primary" (click)="isCreating = !isCreating">
            {{ isCreating ? '✕ Cerrar' : '+ Nueva Orden' }}
          </button>
        </div>
      </div>

      <!-- Notificación -->
      <div *ngIf="notification" class="notification-banner success">
        {{ notification }}
      </div>

      <!-- Caso de Uso 3: Crear Orden -->
      <app-order-create 
        *ngIf="isCreating"
        (onCreate)="handleCreateOrder($event)"
        (onCancel)="isCreating = false">
      </app-order-create>

      <!-- Caso de Uso 2: Detalle de Orden -->
      <app-order-detail
        *ngIf="selectedOrder"
        [order]="selectedOrder"
        (onClose)="selectedOrder = null">
      </app-order-detail>

      <!-- Caso de Uso 1: Listado de Órdenes -->
      <section class="orders-list-card">
        <div class="card-toolbar">
          <h2 class="section-title">Órdenes Registradas ({{ orders.length }})</h2>
        </div>

        <app-order-list
          [orders]="orders"
          [selectedOrderId]="selectedOrder?.id || null"
          (onSelect)="handleSelectOrder($event)">
        </app-order-list>
      </section>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }
    .mfe-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: #7c3aed;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }
    .page-title {
      font-size: 1.85rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .page-subtitle {
      font-size: 0.95rem;
      color: #64748b;
      margin: 0;
    }
    .page-subtitle code {
      background: #f5f3ff;
      color: #7c3aed;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-weight: 600;
    }
    .header-actions {
      display: flex;
      gap: 0.75rem;
    }
    .btn-refresh {
      background: #ffffff;
      color: #334155;
      border: 1px solid #cbd5e1;
      padding: 0.55rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-refresh:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }
    .btn-primary {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #6d28d9;
    }
    .notification-banner {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .orders-list-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .card-toolbar {
      margin-bottom: 1.25rem;
    }
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
  `]
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  isCreating = false;
  notification: string | null = null;

  constructor(
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Caso de Uso 1: Listar Órdenes
  loadOrders(): void {
    this.listOrdersUseCase.execute().subscribe((data) => {
      this.orders = data;
    });
  }

  // Caso de Uso 2: Detalle de Orden por ID
  handleSelectOrder(order: Order): void {
    this.getOrderByIdUseCase.execute(order.id).subscribe((detail) => {
      this.selectedOrder = detail;
    });
  }

  // Caso de Uso 3: Crear Orden
  handleCreateOrder(dto: CreateOrderDto): void {
    this.createOrderUseCase.execute(dto).subscribe((created) => {
      this.isCreating = false;
      this.notification = `¡Orden #${created.id} registrada con éxito!`;
      this.loadOrders();
      this.selectedOrder = created;
      setTimeout(() => this.notification = null, 4000);
    });
  }
}
