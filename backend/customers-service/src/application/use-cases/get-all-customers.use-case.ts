import { Customer } from '../../domain/models/customer.entity';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';

export class GetAllCustomersUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return await this.customerRepository.findAll();
  }
}
