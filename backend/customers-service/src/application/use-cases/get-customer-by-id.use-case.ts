import { Customer } from '../../domain/models/customer.entity';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<Customer | null> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de cliente es obligatorio');
    }
    return await this.customerRepository.findById(id);
  }
}
