import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, CreateOrderDto } from '../../domain/models/order.model';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      <section *ngIf="isCreating" class="create-section">
        <h3 class="section-heading">Caso de Uso 3: Registrar Nueva Orden de Compra</h3>
        <form (ngSubmit)="submitOrder()" class="order-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre del Cliente *</label>
              <input type="text" [(ngModel)]="newOrder.customerName" name="customerName" required placeholder="Ej: Diana Prince">
            </div>
            <div class="form-group">
              <label>Email de Contacto *</label>
              <input type="email" [(ngModel)]="newOrder.customerEmail" name="customerEmail" required placeholder="diana@example.com">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Producto a Ordenar *</label>
              <input type="text" [(ngModel)]="tempItem.productName" name="productName" placeholder="Ej: Monitor UltraWide 34">
            </div>
            <div class="form-group">
              <label>Cantidad</label>
              <input type="number" [(ngModel)]="tempItem.quantity" name="quantity" min="1">
            </div>
            <div class="form-group">
              <label>Precio Unitario ($)</label>
              <input type="number" step="0.01" [(ngModel)]="tempItem.unitPrice" name="unitPrice" min="1">
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="isCreating = false">Cancelar</button>
            <button type="submit" class="btn-submit" [disabled]="!newOrder.customerName || !tempItem.productName">
              Crear Orden
            </button>
          </div>
        </form>
      </section>

      <!-- Caso de Uso 2: Detalle de Orden -->
      <section *ngIf="selectedOrder" class="detail-section">
        <div class="detail-header">
          <div>
            <span class="detail-badge">Caso de Uso 2: Detalle de Orden</span>
            <h3>Orden #{{ selectedOrder.id }}</h3>
          </div>
          <button class="btn-close" (click)="selectedOrder = null">✕</button>
        </div>
        <p><strong>Cliente:</strong> {{ selectedOrder.customerName }} ({{ selectedOrder.customerEmail }})</p>
        <p><strong>Estado:</strong> <span class="status-chip">{{ selectedOrder.status }}</span></p>
        <p><strong>Total:</strong> \${{ selectedOrder.totalAmount | number:'1.2-2' }}</p>
        
        <h4>Ítems de la Orden:</h4>
        <ul class="items-list">
          <li *ngFor="let item of selectedOrder.items">
            {{ item.productName }} — Cantidad: {{ item.quantity }} | Unitario: \${{ item.unitPrice }}
          </li>
        </ul>
      </section>

      <!-- Caso de Uso 1: Listado de Órdenes -->
      <section class="orders-list-card">
        <h2 class="section-title">Órdenes Registradas ({{ orders.length }})</h2>

        <div class="table-container">
          <table class="orders-table">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of orders">
                <td><code>{{ order.id }}</code></td>
                <td>{{ order.customerName }}</td>
                <td>{{ order.items.length }} ítem(s)</td>
                <td><strong>\${{ order.totalAmount | number:'1.2-2' }}</strong></td>
                <td>
                  <span class="status-badge" [ngClass]="order.status.toLowerCase()">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="btn-inspect" (click)="selectOrder(order)">Ver Detalle 🔍</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    }
    .btn-primary {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
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
    .create-section, .detail-section {
      background: #ffffff;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .create-section {
      border: 1px solid #ddd6fe;
    }
    .detail-section {
      border: 1px solid #fed7aa;
    }
    .section-heading {
      margin: 0 0 1rem 0;
      font-size: 1.15rem;
      color: #0f172a;
    }
    .order-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .form-group label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #334155;
    }
    .form-group input {
      padding: 0.6rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-submit {
      background: #16a34a;
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .orders-list-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.75rem;
    }
    .section-title {
      font-size: 1.25rem;
      margin: 0 0 1.25rem 0;
    }
    .table-container {
      overflow-x: auto;
    }
    .orders-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .orders-table th {
      background: #f8fafc;
      color: #475569;
      padding: 0.75rem 1rem;
      border-bottom: 2px solid #e2e8f0;
    }
    .orders-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .status-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
    }
    .status-badge.confirmed {
      background: #dbeafe;
      color: #1e40af;
    }
    .status-badge.delivered {
      background: #dcfce7;
      color: #166534;
    }
    .status-badge.pending {
      background: #fef3c7;
      color: #92400e;
    }
    .btn-inspect {
      background: #f1f5f9;
      color: #334155;
      border: none;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
    }
    .detail-badge {
      background: #ffedd5;
      color: #c2410c;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .items-list {
      margin: 0.5rem 0 0 1rem;
      color: #475569;
    }
  `]
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  isCreating = false;
  notification: string | null = null;

  newOrder: { customerName: string; customerEmail: string } = {
    customerName: '',
    customerEmail: ''
  };

  tempItem = {
    productId: 'prod-001',
    productName: 'Monitor UltraWide 34"',
    quantity: 1,
    unitPrice: 499.50
  };

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
  selectOrder(order: Order): void {
    this.getOrderByIdUseCase.execute(order.id).subscribe((detail) => {
      this.selectedOrder = detail;
    });
  }

  // Caso de Uso 3: Crear Orden
  submitOrder(): void {
    const dto: CreateOrderDto = {
      customerName: this.newOrder.customerName,
      customerEmail: this.newOrder.customerEmail,
      items: [{ ...this.tempItem }]
    };

    this.createOrderUseCase.execute(dto).subscribe((created) => {
      this.isCreating = false;
      this.notification = `Orden #${created.id} registrada con éxito.`;
      this.loadOrders();
      this.selectedOrder = created;
      setTimeout(() => this.notification = null, 4000);
    });
  }
}
