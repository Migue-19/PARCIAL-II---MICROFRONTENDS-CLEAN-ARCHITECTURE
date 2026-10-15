import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateOrderDto, OrderItem } from '../../../domain/models/order.model';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-card">
      <div class="create-header">
        <div>
          <span class="create-badge">Caso de Uso 3: Registrar Orden</span>
          <h3 class="create-title">Nueva Orden de Compra</h3>
        </div>
        <button class="btn-cancel" (click)="cancel()">✕</button>
      </div>

      <form (ngSubmit)="submit()" class="order-form">
        <div class="form-row">
          <div class="form-group">
            <label>Nombre del Cliente *</label>
            <input 
              type="text" 
              [(ngModel)]="dto.customerName" 
              name="customerName" 
              placeholder="Ej: Laura Restrepo" 
              required>
          </div>
          <div class="form-group">
            <label>Correo Electrónico *</label>
            <input 
              type="email" 
              [(ngModel)]="dto.customerEmail" 
              name="customerEmail" 
              placeholder="laura@empresa.com" 
              required>
          </div>
        </div>

        <div class="items-editor">
          <div class="editor-header">
            <h4>Ítems a Ordenar</h4>
            <span class="editor-help">Agrega los productos que integran el pedido</span>
          </div>

          <div class="form-row-items">
            <div class="form-group flex-2">
              <label>Producto *</label>
              <input 
                type="text" 
                [(ngModel)]="tempItem.productName" 
                name="itemName" 
                placeholder="Nombre del producto">
            </div>
            <div class="form-group flex-1">
              <label>Cantidad</label>
              <input 
                type="number" 
                [(ngModel)]="tempItem.quantity" 
                name="itemQty" 
                min="1">
            </div>
            <div class="form-group flex-1">
              <label>Precio Unit. ($)</label>
              <input 
                type="number" 
                step="0.01" 
                [(ngModel)]="tempItem.unitPrice" 
                name="itemPrice" 
                min="0.01">
            </div>
            <div class="form-group align-end">
              <button 
                type="button" 
                class="btn-add-item" 
                (click)="addItem()" 
                [disabled]="!tempItem.productName || tempItem.unitPrice <= 0">
                + Añadir
              </button>
            </div>
          </div>

          <ul *ngIf="dto.items.length > 0" class="added-items-list">
            <li *ngFor="let it of dto.items; let i = index">
              <span><strong>{{ it.productName }}</strong> (x{{ it.quantity }}) — \${{ (it.quantity * it.unitPrice) | number:'1.2-2' }}</span>
              <button type="button" class="btn-remove" (click)="removeItem(i)">Eliminar</button>
            </li>
          </ul>
        </div>

        <div class="form-footer">
          <div class="total-preview">
            <span>Total Estimado:</span>
            <strong>\${{ calculateTotal() | number:'1.2-2' }}</strong>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="cancel()">Cancelar</button>
            <button 
              type="submit" 
              class="btn-submit" 
              [disabled]="!dto.customerName || dto.items.length === 0">
              Registrar Pedido 🛒
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-card {
      background: #ffffff;
      border: 1px solid #ddd6fe;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.1);
    }
    .create-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .create-badge {
      background: #f5f3ff;
      color: #7c3aed;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 0.25rem;
    }
    .create-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .btn-cancel {
      background: none;
      border: none;
      font-size: 1.1rem;
      color: #64748b;
      cursor: pointer;
    }
    .order-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
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
      padding: 0.6rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.9rem;
    }
    .items-editor {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1rem;
    }
    .editor-header h4 {
      margin: 0 0 0.2rem 0;
      font-size: 0.95rem;
      color: #0f172a;
    }
    .editor-help {
      font-size: 0.75rem;
      color: #64748b;
    }
    .form-row-items {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.75rem;
      align-items: flex-end;
    }
    .flex-2 { flex: 2; }
    .flex-1 { flex: 1; }
    .btn-add-item {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-add-item:disabled { opacity: 0.5; }
    .added-items-list {
      margin: 1rem 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .added-items-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      font-size: 0.85rem;
    }
    .btn-remove {
      background: none;
      border: none;
      color: #ef4444;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #f1f5f9;
    }
    .total-preview {
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
      font-size: 1.1rem;
      color: #0f172a;
    }
    .total-preview strong { color: #7c3aed; }
    .form-actions { display: flex; gap: 0.75rem; }
    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
      border: none;
      padding: 0.55rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-submit {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-submit:disabled { opacity: 0.5; }
  `]
})
export class OrderCreateComponent {
  @Output() onCreate = new EventEmitter<CreateOrderDto>();
  @Output() onCancel = new EventEmitter<void>();

  dto: CreateOrderDto = {
    customerName: '',
    customerEmail: '',
    items: [
      {
        productId: 'prod-001',
        productName: 'Laptop Developer Pro 16"',
        quantity: 1,
        unitPrice: 1899.99
      }
    ]
  };

  tempItem: OrderItem = {
    productId: `prod-${Date.now().toString().slice(-3)}`,
    productName: '',
    quantity: 1,
    unitPrice: 100
  };

  addItem(): void {
    if (this.tempItem.productName.trim() && this.tempItem.unitPrice > 0) {
      this.dto.items.push({
        productId: `prod-${Date.now().toString().slice(-3)}`,
        productName: this.tempItem.productName,
        quantity: Number(this.tempItem.quantity),
        unitPrice: Number(this.tempItem.unitPrice)
      });
      this.tempItem = {
        productId: `prod-${Date.now().toString().slice(-3)}`,
        productName: '',
        quantity: 1,
        unitPrice: 100
      };
    }
  }

  removeItem(index: number): void {
    this.dto.items.splice(index, 1);
  }

  calculateTotal(): number {
    return this.dto.items.reduce((sum, it) => sum + (it.quantity * it.unitPrice), 0);
  }

  submit(): void {
    if (this.dto.customerName.trim() && this.dto.items.length > 0) {
      this.onCreate.emit({ ...this.dto });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
