import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-grid">
      <div 
        *ngFor="let product of products" 
        class="product-card"
        [class.selected]="selectedProductId === product.id"
        (click)="selectProduct(product)">
        <div class="card-badge">{{ product.category }}</div>
        <h4 class="product-title">{{ product.name }}</h4>
        <p class="product-desc">{{ product.description }}</p>
        <div class="product-meta">
          <span class="price">\${{ product.price | number:'1.2-2' }}</span>
          <span class="stock" [class.low-stock]="product.stock < 10">
            Stock: {{ product.stock }} u.
          </span>
        </div>
        <button class="btn-inspect" (click)="selectProduct(product); $event.stopPropagation()">
          Ver Detalles 🔍
        </button>
      </div>
    </div>
  `,
  styles: [`
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .product-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .product-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.08);
      border-color: #3b82f6;
    }
    .product-card.selected {
      border: 2px solid #2563eb;
      background: #f8faff;
    }
    .card-badge {
      align-self: flex-start;
      background: #eff6ff;
      color: #2563eb;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
    }
    .product-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .product-desc {
      font-size: 0.85rem;
      color: #64748b;
      margin: 0 0 1rem 0;
      line-height: 1.4;
      flex-grow: 1;
    }
    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid #f1f5f9;
    }
    .price {
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
    }
    .stock {
      font-size: 0.8rem;
      font-weight: 600;
      color: #10b981;
    }
    .stock.low-stock {
      color: #f59e0b;
    }
    .btn-inspect {
      width: 100%;
      background: #f1f5f9;
      color: #334155;
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-inspect:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  `]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() selectedProductId: string | null = null;
  @Output() onSelect = new EventEmitter<Product>();

  selectProduct(product: Product): void {
    this.onSelect.emit(product);
  }
}
