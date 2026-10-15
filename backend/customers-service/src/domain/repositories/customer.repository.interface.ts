import { Customer, RegisterCustomerDto } from '../models/customer.entity';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  create(dto: RegisterCustomerDto): Promise<Customer>;
}
