import { Observable, throwError } from 'rxjs';
import { Customer, RegisterCustomerDto } from '../../domain/models/customer.model';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class RegisterCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  execute(dto: RegisterCustomerDto): Observable<Customer> {
    if (!dto.name || dto.name.trim() === '') {
      return throwError(() => new Error('El nombre del cliente es obligatorio'));
    }
    if (!dto.email || !dto.email.includes('@')) {
      return throwError(() => new Error('El correo electrónico no es válido'));
    }
    return this.customerRepository.register(dto);
  }
}
