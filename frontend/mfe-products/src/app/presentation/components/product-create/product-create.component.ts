import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateProductDto } from '../../../domain/models/product.model';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-card">
      <div class="create-header">
        <div>
          <span class="create-badge">Caso de Uso 3: Registrar Producto</span>
          <h3 class="create-title">Nuevo Producto de Catálogo</h3>
        </div>
        <button class="btn-cancel" (click)="cancel()">✕</button>
      </div>

      <form (ngSubmit)="submit()" class="create-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nombre del Producto *</label>
            <input 
              id="name" 
              type="text" 
              [(ngModel)]="dto.name" 
              name="name" 
              placeholder="Ej: Teclado Mecánico RGB" 
              required>
          </div>
          <div class="form-group">
            <label for="category">Categoría *</label>
            <input 
              id="category" 
              type="text" 
              [(ngModel)]="dto.category" 
              name="category" 
              placeholder="Ej: Periféricos" 
              required>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea 
            id="description" 
            [(ngModel)]="dto.description" 
            name="description" 
            rows="2" 
            placeholder="Especificaciones o detalles principales...">
          </textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Precio (USD) *</label>
            <input 
              id="price" 
              type="number" 
              step="0.01" 
              [(ngModel)]="dto.price" 
              name="price" 
              min="0" 
              required>
          </div>
          <div class="form-group">
            <label for="stock">Stock Inicial *</label>
            <input 
              id="stock" 
              type="number" 
              [(ngModel)]="dto.stock" 
              name="stock" 
              min="0" 
              required>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="cancel()">Cancelar</button>
          <button type="submit" class="btn-submit" [disabled]="!dto.name || dto.price < 0 || dto.stock < 0">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-card {
      background: #ffffff;
      border: 1px solid #bbf7d0;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
    }
    .create-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .create-badge {
      background: #f0fdf4;
      color: #16a34a;
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
    .create-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
    .form-group input, .form-group textarea {
      padding: 0.6rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #0f172a;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
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
      background: #16a34a;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-submit:hover:not(:disabled) {
      background: #15803d;
    }
    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ProductCreateComponent {
  @Output() onCreate = new EventEmitter<CreateProductDto>();
  @Output() onCancel = new EventEmitter<void>();

  dto: CreateProductDto = {
    name: '',
    description: '',
    price: 0,
    stock: 1,
    category: 'Electrónica'
  };

  submit(): void {
    if (this.dto.name.trim()) {
      this.onCreate.emit({ ...this.dto });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
