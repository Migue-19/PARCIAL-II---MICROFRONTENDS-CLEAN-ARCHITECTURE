import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterCustomerDto } from '../../../domain/models/customer.model';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-card">
      <div class="register-header">
        <div>
          <span class="register-badge">Caso de Uso 3: Registro de Cliente</span>
          <h3 class="register-title">Nuevo Registro de Cuenta</h3>
        </div>
        <button class="btn-cancel" (click)="cancel()">✕</button>
      </div>

      <form (ngSubmit)="submit()" class="customer-form">
        <div class="form-row">
          <div class="form-group">
            <label>Nombre y Apellidos *</label>
            <input 
              type="text" 
              [(ngModel)]="dto.name" 
              name="name" 
              placeholder="Ej: Sofia Vergara" 
              required>
          </div>
          <div class="form-group">
            <label>Correo Electrónico *</label>
            <input 
              type="email" 
              [(ngModel)]="dto.email" 
              name="email" 
              placeholder="sofia@empresa.com" 
              required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Teléfono de Contacto</label>
            <input 
              type="text" 
              [(ngModel)]="dto.phone" 
              name="phone" 
              placeholder="+57-310-9876543">
          </div>
          <div class="form-group">
            <label>Empresa / Organización</label>
            <input 
              type="text" 
              [(ngModel)]="dto.company" 
              name="company" 
              placeholder="Ej: InnovaCorp Colombia">
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="cancel()">Cancelar</button>
          <button 
            type="submit" 
            class="btn-submit" 
            [disabled]="!dto.name || !dto.email || !dto.email.includes('@')">
            Guardar Cliente 👥
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .register-card {
      background: #ffffff;
      border: 1px solid #99f6e4;
      border-radius: 14px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 24px -4px rgba(13, 148, 136, 0.1);
    }
    .register-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .register-badge {
      background: #f0fdfa;
      color: #0d9488;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 0.25rem;
    }
    .register-title {
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
    .customer-form {
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
    .form-group input:focus {
      outline: none;
      border-color: #0d9488;
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
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
      background: #0d9488;
      color: white;
      border: none;
      padding: 0.55rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class CustomerRegisterComponent {
  @Output() onRegister = new EventEmitter<RegisterCustomerDto>();
  @Output() onCancel = new EventEmitter<void>();

  dto: RegisterCustomerDto = {
    name: '',
    email: '',
    phone: '',
    company: ''
  };

  submit(): void {
    if (this.dto.name.trim() && this.dto.email.includes('@')) {
      this.onRegister.emit({ ...this.dto });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
