import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../domain/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-table-wrapper">
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Cant. Items</th>
            <th>Total (USD)</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders" [class.selected]="selectedOrderId === order.id">
            <td><code>{{ order.id }}</code></td>
            <td class="font-medium">{{ order.customerName }}</td>
            <td class="text-muted">{{ order.customerEmail }}</td>
            <td>{{ order.items.length }} ítem(s)</td>
            <td class="font-bold">\${{ order.totalAmount | number:'1.2-2' }}</td>
            <td>
              <span class="status-pill" [ngClass]="order.status.toLowerCase()">
                {{ order.status }}
              </span>
            </td>
            <td>
              <button class="btn-detail" (click)="selectOrder(order)">Ver Detalle 🔍</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .orders-table-wrapper {
      overflow-x: auto;
    }
    .orders-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }
    .orders-table th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      padding: 0.85rem 1rem;
      border-bottom: 2px solid #e2e8f0;
    }
    .orders-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    tr.selected {
      background: #f5f3ff;
    }
    .font-medium {
      font-weight: 600;
    }
    .font-bold {
      font-weight: 700;
      color: #0f172a;
    }
    .text-muted {
      color: #64748b;
      font-size: 0.85rem;
    }
    .status-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      display: inline-block;
    }
    .status-pill.confirmed {
      background: #dbeafe;
      color: #1d4ed8;
    }
    .status-pill.delivered {
      background: #dcfce7;
      color: #15803d;
    }
    .status-pill.pending {
      background: #fef3c7;
      color: #b45309;
    }
    .status-pill.cancelled {
      background: #fee2e2;
      color: #b91c1c;
    }
    .btn-detail {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-detail:hover {
      background: #7c3aed;
      color: #ffffff;
      border-color: #7c3aed;
    }
  `]
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
  @Input() selectedOrderId: string | null = null;
  @Output() onSelect = new EventEmitter<Order>();

  selectOrder(order: Order): void {
    this.onSelect.emit(order);
  }
}
