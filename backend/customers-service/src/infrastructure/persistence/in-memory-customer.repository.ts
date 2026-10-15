import { Customer, RegisterCustomerDto } from '../../domain/models/customer.entity';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';

export class InMemoryCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [
    {
      id: 'CUST-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@techcorp.com',
      phone: '+1-555-0199',
      company: 'TechCorp Global',
      status: 'ACTIVE',
      registeredAt: new Date('2026-01-20T11:00:00Z')
    },
    {
      id: 'CUST-102',
      name: 'Mateo Morales',
      email: 'mateo.morales@innovasoft.io',
      phone: '+1-555-0245',
      company: 'InnovaSoft Labs',
      status: 'ACTIVE',
      registeredAt: new Date('2026-02-14T09:15:00Z')
    },
    {
      id: 'CUST-103',
      name: 'Beatriz Silva',
      email: 'beatriz.silva@andesdev.com',
      phone: '+1-555-0782',
      company: 'Andes Dev Solutions',
      status: 'ACTIVE',
      registeredAt: new Date('2026-03-01T15:20:00Z')
    }
  ];

  async findAll(): Promise<Customer[]> {
    return [...this.customers];
  }

  async findById(id: string): Promise<Customer | null> {
    const cust = this.customers.find(c => c.id === id);
    return cust ? { ...cust } : null;
  }

  async create(dto: RegisterCustomerDto): Promise<Customer> {
    const newCust: Customer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: dto.name,
      email: dto.email,
      phone: dto.phone || '+1-000-0000',
      company: dto.company || 'Independiente',
      status: 'ACTIVE',
      registeredAt: new Date()
    };
    this.customers.push(newCust);
    return { ...newCust };
  }
}
