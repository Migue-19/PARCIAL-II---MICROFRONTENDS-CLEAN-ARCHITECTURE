import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer, RegisterCustomerDto } from '../../domain/models/customer.model';
import { GetCustomersUseCase } from '../../application/use-cases/get-customers.use-case';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from '../../application/use-cases/register-customer.use-case';
import { CustomerListComponent } from '../components/customer-list/customer-list.component';
import { CustomerDetailComponent } from '../components/customer-detail/customer-detail.component';
import { CustomerRegisterComponent } from '../components/customer-register/customer-register.component';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerRegisterComponent
  ],
  template: `
    <div class="customers-container">
      <div class="page-header">
        <div>
          <div class="mfe-tag">Microfrontend 3 | Angular + Module Federation</div>
          <h1 class="page-title">Directorio de Clientes & Cuentas</h1>
          <p class="page-subtitle">
            Implementación Clean Architecture conectada al microservicio 
            <code>customers-service</code> (:3002)
          </p>
        </div>
        <div class="header-actions">
          <button class="btn-refresh" (click)="loadCustomers()">↻ Refrescar</button>
          <button class="btn-primary" (click)="isRegistering = !isRegistering">
            {{ isRegistering ? '✕ Cerrar' : '+ Registrar Cliente' }}
          </button>
        </div>
      </div>

      <!-- Notificación -->
      <div *ngIf="notification" class="notification-banner success">
        {{ notification }}
      </div>

      <!-- Caso de Uso 3: Registrar Cliente -->
      <app-customer-register
        *ngIf="isRegistering"
        (onRegister)="handleRegisterCustomer($event)"
        (onCancel)="isRegistering = false">
      </app-customer-register>

      <!-- Caso de Uso 2: Detalle de Cliente por ID -->
      <app-customer-detail
        *ngIf="selectedCustomer"
        [customer]="selectedCustomer"
        (onClose)="selectedCustomer = null">
      </app-customer-detail>

      <!-- Caso de Uso 1: Listado de Clientes -->
      <section class="customers-list-card">
        <div class="card-toolbar">
          <h2 class="section-title">Clientes Registrados ({{ customers.length }})</h2>
        </div>

        <app-customer-list
          [customers]="customers"
          [selectedCustomerId]="selectedCustomer?.id || null"
          (onSelect)="handleSelectCustomer($event)">
        </app-customer-list>
      </section>
    </div>
  `,
  styles: [`
    .customers-container {
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
      color: #0d9488;
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
      background: #f0fdfa;
      color: #0d9488;
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
      background: #0d9488;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #0f766e;
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
    .customers-list-card {
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
export class CustomersPageComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  isRegistering = false;
  notification: string | null = null;

  constructor(
    private readonly getCustomersUseCase: GetCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly registerCustomerUseCase: RegisterCustomerUseCase
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Caso de Uso 1: Listar Clientes
  loadCustomers(): void {
    this.getCustomersUseCase.execute().subscribe((data) => {
      this.customers = data;
    });
  }

  // Caso de Uso 2: Detalle por ID
  handleSelectCustomer(customer: Customer): void {
    this.getCustomerByIdUseCase.execute(customer.id).subscribe((detail) => {
      this.selectedCustomer = detail;
    });
  }

  // Caso de Uso 3: Registrar Cliente
  handleRegisterCustomer(dto: RegisterCustomerDto): void {
    this.registerCustomerUseCase.execute(dto).subscribe((registered) => {
      this.isRegistering = false;
      this.notification = `¡Cliente '${registered.name}' registrado con éxito!`;
      this.loadCustomers();
      this.selectedCustomer = registered;
      setTimeout(() => this.notification = null, 4000);
    });
  }
}
