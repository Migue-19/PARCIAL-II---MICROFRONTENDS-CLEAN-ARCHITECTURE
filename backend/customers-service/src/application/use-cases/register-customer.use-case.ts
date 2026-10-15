import { Customer, RegisterCustomerDto } from '../../domain/models/customer.entity';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';

export class RegisterCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(dto: RegisterCustomerDto): Promise<Customer> {
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('El nombre del cliente es obligatorio');
    }
    if (!dto.email || !dto.email.includes('@')) {
      throw new Error('El correo electrónico es inválido');
    }
    return await this.customerRepository.create(dto);
  }
}
