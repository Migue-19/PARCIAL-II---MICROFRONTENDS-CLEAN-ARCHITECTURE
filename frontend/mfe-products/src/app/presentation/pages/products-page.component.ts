import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, CreateProductDto } from '../../domain/models/product.model';
import { GetProductsUseCase } from '../../application/use-cases/get-products.use-case';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.use-case';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ProductCreateComponent } from '../components/product-create/product-create.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent
  ],
  template: `
    <div class="products-container">
      <div class="page-header">
        <div>
          <div class="mfe-tag">Microfrontend 1 | Angular + Module Federation</div>
          <h1 class="page-title">Gestión de Catálogo de Productos</h1>
          <p class="page-subtitle">
            Implementación con Clean Architecture conectada al microservicio 
            <code>products-service</code> (:3001)
          </p>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadProducts()">↻ Refrescar</button>
          <button class="btn-primary" (click)="isCreating = !isCreating">
            {{ isCreating ? '✕ Cerrar Formulario' : '+ Nuevo Producto' }}
          </button>
        </div>
      </div>

      <!-- Notificación de estado -->
      <div *ngIf="notification" class="notification-banner" [ngClass]="notification.type">
        {{ notification.message }}
      </div>

      <!-- Caso de Uso 3: Formulario de Creación -->
      <app-product-create 
        *ngIf="isCreating" 
        (onCreate)="handleCreateProduct($event)" 
        (onCancel)="isCreating = false">
      </app-product-create>

      <!-- Caso de Uso 2: Detalle de Producto Seleccionado -->
      <app-product-detail 
        *ngIf="selectedProduct" 
        [product]="selectedProduct" 
        (onClose)="selectedProduct = null">
      </app-product-detail>

      <!-- Caso de Uso 1: Listado de Productos -->
      <section class="list-section">
        <div class="section-toolbar">
          <h2 class="section-title">Productos en Inventario ({{ products.length }})</h2>
        </div>

        <div *ngIf="loading" class="loading-state">
          Cargando productos desde el microservicio...
        </div>

        <app-product-list 
          *ngIf="!loading"
          [products]="products" 
          [selectedProductId]="selectedProduct?.id || null"
          (onSelect)="handleSelectProduct($event)">
        </app-product-list>
      </section>
    </div>
  `,
  styles: [`
    .products-container {
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
      color: #2563eb;
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
      background: #eff6ff;
      color: #2563eb;
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
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .notification-banner {
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .notification-banner.success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    .notification-banner.info {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
    .list-section {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
    }
    .section-toolbar {
      margin-bottom: 1.5rem;
    }
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .loading-state {
      text-align: center;
      padding: 3rem;
      color: #64748b;
      font-style: italic;
    }
  `]
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  isCreating = false;
  loading = false;
  notification: { message: string; type: 'success' | 'info' } | null = null;

  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Caso de Uso 1: Obtener todos los productos
  loadProducts(): void {
    this.loading = true;
    this.getProductsUseCase.execute().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
      }
    });
  }

  // Caso de Uso 2: Obtener producto por ID
  handleSelectProduct(product: Product): void {
    this.getProductByIdUseCase.execute(product.id).subscribe({
      next: (detail) => {
        this.selectedProduct = detail;
        this.showNotification(`Producto '${detail.name}' cargado por ID`, 'info');
      },
      error: (err) => {
        console.error('Error al obtener detalle:', err);
      }
    });
  }

  // Caso de Uso 3: Registrar nuevo producto
  handleCreateProduct(dto: CreateProductDto): void {
    this.createProductUseCase.execute(dto).subscribe({
      next: (created) => {
        this.isCreating = false;
        this.showNotification(`¡Producto '${created.name}' registrado exitosamente!`, 'success');
        this.loadProducts();
        this.selectedProduct = created;
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'info'): void {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 4000);
  }
}
