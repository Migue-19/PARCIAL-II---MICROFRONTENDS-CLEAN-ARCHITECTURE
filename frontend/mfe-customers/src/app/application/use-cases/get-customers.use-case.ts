import { Observable } from 'rxjs';
import { Customer } from '../../domain/models/customer.model';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

export class GetCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  execute(): Observable<Customer[]> {
    return this.customerRepository.getAll();
  }
}
