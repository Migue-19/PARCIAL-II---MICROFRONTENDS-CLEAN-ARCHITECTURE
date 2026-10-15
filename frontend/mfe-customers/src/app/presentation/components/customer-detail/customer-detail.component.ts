import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../domain/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="customer" class="detail-card">
      <div class="detail-header">
        <div>
          <span class="detail-badge">Caso de Uso 2: Perfil de Cliente</span>
          <h3 class="detail-title">{{ customer.name }}</h3>
        </div>
        <button class="btn-close" (click)="close()">✕</button>
      </div>

      <div class="profile-grid">
        <div class="profile-field">
          <span class="field-label">ID de Cuenta</span>
          <span class="field-value"><code>{{ customer.id }}</code></span>
        </div>
        <div class="profile-field">
          <span class="field-label">Correo Electrónico</span>
          <span class="field-value">{{ customer.email }}</span>
        </div>
        <div class="profile-field">
          <span class="field-label">Teléfono</span>
          <span class="field-value">{{ customer.phone }}</span>
        </div>
        <div class="profile-field">
          <span class="field-label">Organización / Empresa</span>
          <span class="field-value">{{ customer.company }}</span>
        </div>
        <div class="profile-field">
          <span class="field-label">Estado de Cuenta</span>
          <span class="status-active">{{ customer.status }}</span>
        </div>
        <div class="profile-field">
          <span class="field-label">Fecha de Registro</span>
          <span class="field-value">{{ customer.registeredAt | date:'medium' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-card {
      background: #ffffff;
      border: 1px solid #99f6e4;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 24px -4px rgba(13, 148, 136, 0.1);
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .detail-badge {
      background: #f0fdfa;
      color: #0d9488;
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
    .profile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      background: #f0fdfa;
      padding: 1.25rem;
      border-radius: 10px;
    }
    .profile-field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .field-label {
      font-size: 0.75rem;
      color: #0f766e;
      font-weight: 600;
      text-transform: uppercase;
    }
    .field-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #0f172a;
    }
    .status-active {
      display: inline-block;
      align-self: flex-start;
      background: #ccfbf1;
      color: #0f766e;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
    }
  `]
})
export class CustomerDetailComponent {
  @Input() customer: Customer | null = null;
  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }
}
