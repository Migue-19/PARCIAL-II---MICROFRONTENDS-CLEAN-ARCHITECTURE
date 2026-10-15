import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../domain/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="order" class="detail-card">
      <div class="detail-header">
        <div>
          <span class="detail-badge">Caso de Uso 2: Detalle de Orden</span>
          <h3 class="detail-title">Orden #{{ order.id }}</h3>
        </div>
        <button class="btn-close" (click)="close()">✕</button>
      </div>

      <div class="detail-summary">
        <div class="summary-item">
          <span class="label">Cliente:</span>
          <span class="value">{{ order.customerName }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Email:</span>
          <span class="value">{{ order.customerEmail }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Fecha:</span>
          <span class="value">{{ order.createdAt | date:'medium' }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Estado:</span>
          <span class="status-badge" [ngClass]="order.status.toLowerCase()">{{ order.status }}</span>
        </div>
      </div>

      <div class="items-table-container">
        <h4 class="items-heading">Productos Comprendidos</h4>
        <table class="items-table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of order.items">
              <td><code>{{ item.productId }}</code></td>
              <td><strong>{{ item.productName }}</strong></td>
              <td>{{ item.quantity }} u.</td>
              <td>\${{ item.unitPrice | number:'1.2-2' }}</td>
              <td class="font-bold">\${{ (item.quantity * item.unitPrice) | number:'1.2-2' }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Importe Total:</strong></td>
              <td class="total-cell">\${{ order.totalAmount | number:'1.2-2' }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .detail-card {
      background: #ffffff;
      border: 1px solid #ddd6fe;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.1);
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .detail-badge {
      background: #f5f3ff;
      color: #7c3aed;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 0.25rem;
    }
    .detail-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: #64748b;
      cursor: pointer;
    }
    .btn-close:hover {
      color: #0f172a;
    }
    .detail-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      background: #faf5ff;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .summary-item .label {
      font-size: 0.75rem;
      color: #6b21a8;
      font-weight: 600;
      text-transform: uppercase;
    }
    .summary-item .value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #0f172a;
    }
    .status-badge {
      display: inline-block;
      align-self: flex-start;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
    }
    .status-badge.confirmed { background: #dbeafe; color: #1e40af; }
    .status-badge.delivered { background: #dcfce7; color: #166534; }
    .status-badge.pending { background: #fef3c7; color: #92400e; }
    .items-heading {
      font-size: 1rem;
      margin: 0 0 0.75rem 0;
      color: #1e293b;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    .items-table th {
      background: #f1f5f9;
      color: #475569;
      padding: 0.65rem 0.85rem;
      text-align: left;
    }
    .items-table td {
      padding: 0.65rem 0.85rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .text-right { text-align: right; }
    .total-cell {
      font-size: 1.15rem;
      font-weight: 800;
      color: #7c3aed;
    }
    .font-bold { font-weight: 700; }
  `]
})
export class OrderDetailComponent {
  @Input() order: Order | null = null;
  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }
}
