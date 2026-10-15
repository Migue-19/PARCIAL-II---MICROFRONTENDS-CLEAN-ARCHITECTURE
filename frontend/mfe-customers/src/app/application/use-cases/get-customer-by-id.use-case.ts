import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../../domain/models/customer.model';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

@Injectable({
  providedIn: 'root'
})
export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  execute(id: string): Observable<Customer> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('El ID de cliente es obligatorio'));
    }
    return this.customerRepository.getById(id);
  }
}
