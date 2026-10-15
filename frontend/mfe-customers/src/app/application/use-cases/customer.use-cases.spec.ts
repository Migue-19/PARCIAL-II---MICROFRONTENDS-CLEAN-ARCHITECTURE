import { of } from 'rxjs';
import { Customer, RegisterCustomerDto } from '../../domain/models/customer.model';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { GetCustomersUseCase } from './get-customers.use-case';
import { GetCustomerByIdUseCase } from './get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from './register-customer.use-case';

class MockCustomerRepository extends CustomerRepository {
  private customers: Customer[] = [
    {
      id: 'CUST-101',
      name: 'Elena Rostova',
      email: 'elena@techcorp.com',
      phone: '+1-555-0199',
      company: 'TechCorp',
      status: 'ACTIVE',
      registeredAt: '2026-01-20'
    }
  ];

  getAll() {
    return of(this.customers);
  }

  getById(id: string) {
    const found = this.customers.find(c => c.id === id) || this.customers[0];
    return of(found);
  }

  register(dto: RegisterCustomerDto) {
    const newCust: Customer = {
      id: 'CUST-999',
      name: dto.name,
      email: dto.email,
      phone: dto.phone || '',
      company: dto.company || '',
      status: 'ACTIVE',
      registeredAt: new Date().toISOString()
    };
    return of(newCust);
  }
}

describe('MFE Customers - Application Use Cases (Clean Architecture)', () => {
  let mockRepo: MockCustomerRepository;
  let getCustomersUseCase: GetCustomersUseCase;
  let getCustomerByIdUseCase: GetCustomerByIdUseCase;
  let registerCustomerUseCase: RegisterCustomerUseCase;

  beforeEach(() => {
    mockRepo = new MockCustomerRepository();
    getCustomersUseCase = new GetCustomersUseCase(mockRepo);
    getCustomerByIdUseCase = new GetCustomerByIdUseCase(mockRepo);
    registerCustomerUseCase = new RegisterCustomerUseCase(mockRepo);
  });

  describe('GetCustomersUseCase (Caso de Uso 1)', () => {
    it('debe emitir la lista de clientes registrados', (done) => {
      getCustomersUseCase.execute().subscribe((customers) => {
        expect(Array.isArray(customers)).toBe(true);
        expect(customers.length).toBe(1);
        expect(customers[0].id).toBe('CUST-101');
        done();
      });
    });
  });

  describe('GetCustomerByIdUseCase (Caso de Uso 2)', () => {
    it('debe retornar el cliente cuando se suministra un ID válido', (done) => {
      getCustomerByIdUseCase.execute('CUST-101').subscribe((customer) => {
        expect(customer).toBeDefined();
        expect(customer.id).toBe('CUST-101');
        expect(customer.name).toBe('Elena Rostova');
        done();
      });
    });

    it('debe emitir error si el ID está vacío', (done) => {
      getCustomerByIdUseCase.execute('').subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El ID de cliente es obligatorio');
          done();
        }
      });
    });
  });

  describe('RegisterCustomerUseCase (Caso de Uso 3)', () => {
    it('debe registrar un cliente válido con éxito', (done) => {
      const dto: RegisterCustomerDto = {
        name: 'Andrés Cepeda',
        email: 'andres@musica.com',
        phone: '+57-300-9998877',
        company: 'Producciones AC'
      };

      registerCustomerUseCase.execute(dto).subscribe((customer) => {
        expect(customer).toBeDefined();
        expect(customer.id).toBe('CUST-999');
        expect(customer.name).toBe('Andrés Cepeda');
        expect(customer.email).toBe('andres@musica.com');
        done();
      });
    });

    it('debe emitir error si falta el nombre del cliente', (done) => {
      const dto: RegisterCustomerDto = {
        name: '',
        email: 'valido@correo.com'
      };

      registerCustomerUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El nombre del cliente es obligatorio');
          done();
        }
      });
    });

    it('debe emitir error si el correo electrónico no contiene @', (done) => {
      const dto: RegisterCustomerDto = {
        name: 'Cliente Invalido',
        email: 'correo-sin-arroba'
      };

      registerCustomerUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El correo electrónico no es válido');
          done();
        }
      });
    });
  });
});
