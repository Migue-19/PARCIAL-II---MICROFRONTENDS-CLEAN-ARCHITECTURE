import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product" class="detail-card">
      <div class="detail-header">
        <span class="detail-badge">Caso de Uso 2: Detalle por ID</span>
        <button class="btn-close" (click)="close()">✕</button>
      </div>

      <h3 class="detail-title">{{ product.name }}</h3>
      <p class="detail-id">ID: <code>{{ product.id }}</code></p>
      
      <p class="detail-description">{{ product.description }}</p>

      <div class="detail-grid">
        <div class="metric-box">
          <span class="metric-label">Precio Unitario</span>
          <span class="metric-value">\${{ product.price | number:'1.2-2' }}</span>
        </div>
        <div class="metric-box">
          <span class="metric-label">Disponibilidad</span>
          <span class="metric-value">{{ product.stock }} unidades</span>
        </div>
        <div class="metric-box">
          <span class="metric-label">Categoría</span>
          <span class="metric-value">{{ product.category }}</span>
        </div>
        <div class="metric-box">
          <span class="metric-label">Fecha Creación</span>
          <span class="metric-value">{{ product.createdAt | date:'short' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-card {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .detail-badge {
      background: #eff6ff;
      color: #2563eb;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.1rem;
      color: #64748b;
      cursor: pointer;
    }
    .btn-close:hover {
      color: #0f172a;
    }
    .detail-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }
    .detail-id {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 0 0 1rem 0;
    }
    .detail-id code {
      background: #f1f5f9;
      color: #334155;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
    }
    .detail-description {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
    }
    .metric-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 0.85rem;
      display: flex;
      flex-direction: column;
    }
    .metric-label {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }
    .metric-value {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
    }
  `]
})
export class ProductDetailComponent {
  @Input() product: Product | null = null;
  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }
}
