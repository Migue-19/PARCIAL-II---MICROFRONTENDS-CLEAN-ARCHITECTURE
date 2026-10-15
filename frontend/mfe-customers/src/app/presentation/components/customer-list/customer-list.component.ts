import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../domain/models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="customers-table-wrapper">
      <table class="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre y Apellido</th>
            <th>Correo Electrónico</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers" [class.selected]="selectedCustomerId === customer.id">
            <td><code>{{ customer.id }}</code></td>
            <td class="font-medium">{{ customer.name }}</td>
            <td class="text-muted">{{ customer.email }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <span class="status-pill" [ngClass]="customer.status.toLowerCase()">
                {{ customer.status }}
              </span>
            </td>
            <td>
              <button class="btn-profile" (click)="selectCustomer(customer)">Ver Perfil 👤</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .customers-table-wrapper {
      overflow-x: auto;
    }
    .customers-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }
    .customers-table th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      padding: 0.85rem 1rem;
      border-bottom: 2px solid #e2e8f0;
    }
    .customers-table td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    tr.selected {
      background: #f0fdfa;
    }
    .font-medium {
      font-weight: 600;
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
    .status-pill.active {
      background: #ccfbf1;
      color: #0f766e;
    }
    .status-pill.inactive {
      background: #fee2e2;
      color: #b91c1c;
    }
    .btn-profile {
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
    .btn-profile:hover {
      background: #0d9488;
      color: #ffffff;
      border-color: #0d9488;
    }
  `]
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Input() selectedCustomerId: string | null = null;
  @Output() onSelect = new EventEmitter<Customer>();

  selectCustomer(customer: Customer): void {
    this.onSelect.emit(customer);
  }
}
