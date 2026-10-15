import { GetAllCustomersUseCase } from '../src/application/use-cases/get-all-customers.use-case';
import { GetCustomerByIdUseCase } from '../src/application/use-cases/get-customer-by-id.use-case';
import { RegisterCustomerUseCase } from '../src/application/use-cases/register-customer.use-case';
import { InMemoryCustomerRepository } from '../src/infrastructure/persistence/in-memory-customer.repository';

describe('Customers Microservice - Application Use Cases', () => {
  let repository: InMemoryCustomerRepository;
  let getAllUseCase: GetAllCustomersUseCase;
  let getByIdUseCase: GetCustomerByIdUseCase;
  let registerUseCase: RegisterCustomerUseCase;

  beforeEach(() => {
    repository = new InMemoryCustomerRepository();
    getAllUseCase = new GetAllCustomersUseCase(repository);
    getByIdUseCase = new GetCustomerByIdUseCase(repository);
    registerUseCase = new RegisterCustomerUseCase(repository);
  });

  describe('GetAllCustomersUseCase', () => {
    it('debe listar todos los clientes registrados', async () => {
      const customers = await getAllUseCase.execute();
      expect(Array.isArray(customers)).toBe(true);
      expect(customers.length).toBeGreaterThanOrEqual(3);
      expect(customers[0]).toHaveProperty('id');
      expect(customers[0]).toHaveProperty('email');
    });
  });

  describe('GetCustomerByIdUseCase', () => {
    it('debe obtener un cliente por su ID', async () => {
      const customer = await getByIdUseCase.execute('CUST-101');
      expect(customer).not.toBeNull();
      expect(customer?.id).toBe('CUST-101');
      expect(customer?.name).toBe('Elena Rostova');
    });

    it('debe retornar null si no existe', async () => {
      const customer = await getByIdUseCase.execute('CUST-999');
      expect(customer).toBeNull();
    });

    it('debe lanzar error si el ID está vacío', async () => {
      await expect(getByIdUseCase.execute('')).rejects.toThrow('El ID de cliente es obligatorio');
    });
  });

  describe('RegisterCustomerUseCase', () => {
    it('debe registrar un nuevo cliente correctamente', async () => {
      const created = await registerUseCase.execute({
        name: 'Roberto Gómez',
        email: 'roberto@empresa.com',
        phone: '+57-300-1234567',
        company: 'Soluciones Andinas'
      });

      expect(created.id).toBeDefined();
      expect(created.name).toBe('Roberto Gómez');
      expect(created.status).toBe('ACTIVE');

      const all = await getAllUseCase.execute();
      expect(all.some(c => c.id === created.id)).toBe(true);
    });

    it('debe fallar si el nombre está vacío', async () => {
      await expect(
        registerUseCase.execute({
          name: '',
          email: 'test@empresa.com'
        })
      ).rejects.toThrow('El nombre del cliente es obligatorio');
    });

    it('debe fallar si el email no es válido', async () => {
      await expect(
        registerUseCase.execute({
          name: 'Cliente Test',
          email: 'email-invalido-sin-arroba'
        })
      ).rejects.toThrow('El correo electrónico es inválido');
    });
  });
});
