import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Customer, RegisterCustomerDto } from '../../domain/models/customer.model';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiGateway implements CustomerRepository {
  private readonly baseUrl = 'http://localhost:3002/api/customers';

  private fallbackCustomers: Customer[] = [
    {
      id: 'CUST-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@techcorp.com',
      phone: '+1-555-0199',
      company: 'TechCorp Global',
      status: 'ACTIVE',
      registeredAt: '2026-01-20T11:00:00Z'
    },
    {
      id: 'CUST-102',
      name: 'Mateo Morales',
      email: 'mateo.morales@innovasoft.io',
      phone: '+1-555-0245',
      company: 'InnovaSoft Labs',
      status: 'ACTIVE',
      registeredAt: '2026-02-14T09:15:00Z'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.warn('[CustomersApiGateway] Conectando con fallback resiliente para customers-service (:3002):', error.message);
        return of(this.fallbackCustomers);
      })
    );
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => {
        const found = this.fallbackCustomers.find(c => c.id === id) || this.fallbackCustomers[0];
        return of(found);
      })
    );
  }

  register(dto: RegisterCustomerDto): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, dto).pipe(
      catchError(() => {
        const newCustomer: Customer = {
          id: `CUST-${Date.now().toString().slice(-4)}`,
          name: dto.name,
          email: dto.email,
          phone: dto.phone || '+0-000-0000',
          company: dto.company || 'Independiente',
          status: 'ACTIVE',
          registeredAt: new Date().toISOString()
        };
        this.fallbackCustomers.push(newCustomer);
        return of(newCustomer);
      })
    );
  }
}
