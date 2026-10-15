import { Observable } from 'rxjs';
import { Customer, RegisterCustomerDto } from '../models/customer.model';

export abstract class CustomerRepository {
  abstract getAll(): Observable<Customer[]>;
  abstract getById(id: string): Observable<Customer>;
  abstract register(dto: RegisterCustomerDto): Observable<Customer>;
}
