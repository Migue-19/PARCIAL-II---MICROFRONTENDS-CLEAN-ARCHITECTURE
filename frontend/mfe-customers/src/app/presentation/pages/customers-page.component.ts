import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer, RegisterCustomerDto } from '../../domain/models/customer.model';
import { GetCustomersUseCase } from '../../application/use-cases/get-customers.use-case';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from '../../application/use-cases/register-customer.use-case';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      <section *ngIf="isRegistering" class="register-section">
        <h3 class="section-heading">Caso de Uso 3: Registrar Nuevo Cliente</h3>
        <form (ngSubmit)="submitCustomer()" class="customer-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre Completo *</label>
              <input type="text" [(ngModel)]="newCustomer.name" name="name" required placeholder="Ej: Patricia Benítez">
            </div>
            <div class="form-group">
              <label>Correo Electrónico *</label>
              <input type="email" [(ngModel)]="newCustomer.email" name="email" required placeholder="patricia@empresa.com">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" [(ngModel)]="newCustomer.phone" name="phone" placeholder="+1-555-0321">
            </div>
            <div class="form-group">
              <label>Compañía / Organización</label>
              <input type="text" [(ngModel)]="newCustomer.company" name="company" placeholder="Ej: Soluciones Cloud S.A.">
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="isRegistering = false">Cancelar</button>
            <button type="submit" class="btn-submit" [disabled]="!newCustomer.name || !newCustomer.email">
              Guardar Cliente
            </button>
          </div>
        </form>
      </section>

      <!-- Caso de Uso 2: Detalle de Cliente por ID -->
      <section *ngIf="selectedCustomer" class="detail-section">
        <div class="detail-header">
          <div>
            <span class="detail-badge">Caso de Uso 2: Detalle por ID</span>
            <h3>{{ selectedCustomer.name }}</h3>
          </div>
          <button class="btn-close" (click)="selectedCustomer = null">✕</button>
        </div>
        <p><strong>ID Cliente:</strong> <code>{{ selectedCustomer.id }}</code></p>
        <p><strong>Email:</strong> {{ selectedCustomer.email }}</p>
        <p><strong>Teléfono:</strong> {{ selectedCustomer.phone }}</p>
        <p><strong>Empresa:</strong> {{ selectedCustomer.company }}</p>
        <p><strong>Estado:</strong> <span class="status-active">{{ selectedCustomer.status }}</span></p>
        <p><strong>Fecha Registro:</strong> {{ selectedCustomer.registeredAt | date:'medium' }}</p>
      </section>

      <!-- Caso de Uso 1: Listado de Clientes -->
      <section class="customers-list-card">
        <h2 class="section-title">Clientes Registrados ({{ customers.length }})</h2>

        <div class="table-container">
          <table class="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let cust of customers">
                <td><code>{{ cust.id }}</code></td>
                <td><strong>{{ cust.name }}</strong></td>
                <td>{{ cust.email }}</td>
                <td>{{ cust.company }}</td>
                <td><span class="status-active">{{ cust.status }}</span></td>
                <td>
                  <button class="btn-inspect" (click)="selectCustomer(cust)">Ver Perfil 🔍</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
    }
    .btn-primary {
      background: #0d9488;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
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
    .register-section, .detail-section {
      background: #ffffff;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .register-section {
      border: 1px solid #99f6e4;
    }
    .detail-section {
      border: 1px solid #bae6fd;
    }
    .section-heading {
      margin: 0 0 1rem 0;
      font-size: 1.15rem;
      color: #0f172a;
    }
    .customer-form {
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
      background: #0d9488;
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .customers-list-card {
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
    .customers-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .customers-table th {
      background: #f8fafc;
      color: #475569;
      padding: 0.75rem 1rem;
      border-bottom: 2px solid #e2e8f0;
    }
    .customers-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .status-active {
      background: #ccfbf1;
      color: #0f766e;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
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
      background: #e0f2fe;
      color: #0369a1;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
  `]
})
export class CustomersPageComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  isRegistering = false;
  notification: string | null = null;

  newCustomer: RegisterCustomerDto = {
    name: '',
    email: '',
    phone: '',
    company: ''
  };

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
  selectCustomer(customer: Customer): void {
    this.getCustomerByIdUseCase.execute(customer.id).subscribe((detail) => {
      this.selectedCustomer = detail;
    });
  }

  // Caso de Uso 3: Registrar Cliente
  submitCustomer(): void {
    this.registerCustomerUseCase.execute(this.newCustomer).subscribe((registered) => {
      this.isRegistering = false;
      this.notification = `Cliente '${registered.name}' registrado con éxito.`;
      this.loadCustomers();
      this.selectedCustomer = registered;
      this.newCustomer = { name: '', email: '', phone: '', company: '' };
      setTimeout(() => this.notification = null, 4000);
    });
  }
}
