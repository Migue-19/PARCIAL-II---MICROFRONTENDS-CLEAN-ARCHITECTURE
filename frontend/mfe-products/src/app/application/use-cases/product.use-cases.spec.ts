import { of } from 'rxjs';
import { Product, CreateProductDto } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductsUseCase } from './get-products.use-case';
import { GetProductByIdUseCase } from './get-product-by-id.use-case';
import { CreateProductUseCase } from './create-product.use-case';

class MockProductRepository extends ProductRepository {
  private products: Product[] = [
    {
      id: 'prod-001',
      name: 'Laptop Gamer',
      description: 'Test description',
      price: 1500,
      stock: 5,
      category: 'Laptops',
      createdAt: '2026-01-01'
    }
  ];

  getAll() {
    return of(this.products);
  }

  getById(id: string) {
    const found = this.products.find(p => p.id === id) || this.products[0];
    return of(found);
  }

  create(dto: CreateProductDto) {
    const item: Product = {
      id: 'prod-999',
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
      category: dto.category,
      createdAt: new Date().toISOString()
    };
    return of(item);
  }
}

describe('MFE Products - Application Use Cases (Clean Architecture)', () => {
  let mockRepo: MockProductRepository;
  let getProductsUseCase: GetProductsUseCase;
  let getProductByIdUseCase: GetProductByIdUseCase;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    mockRepo = new MockProductRepository();
    getProductsUseCase = new GetProductsUseCase(mockRepo);
    getProductByIdUseCase = new GetProductByIdUseCase(mockRepo);
    createProductUseCase = new CreateProductUseCase(mockRepo);
  });

  describe('GetProductsUseCase (Caso de Uso 1)', () => {
    it('debe emitir la lista de productos disponibles', (done) => {
      getProductsUseCase.execute().subscribe((products) => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBe(1);
        expect(products[0].id).toBe('prod-001');
        done();
      });
    });
  });

  describe('GetProductByIdUseCase (Caso de Uso 2)', () => {
    it('debe emitir el detalle del producto cuando se proporciona el ID', (done) => {
      getProductByIdUseCase.execute('prod-001').subscribe((product) => {
        expect(product).toBeDefined();
        expect(product.id).toBe('prod-001');
        done();
      });
    });

    it('debe emitir error cuando el ID está vacío', (done) => {
      getProductByIdUseCase.execute('').subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El ID de producto es requerido');
          done();
        }
      });
    });
  });

  describe('CreateProductUseCase (Caso de Uso 3)', () => {
    it('debe emitir el producto creado con datos válidos', (done) => {
      const dto: CreateProductDto = {
        name: 'Nuevo Mouse',
        description: 'Mouse ergonómico',
        price: 35.5,
        stock: 20,
        category: 'Periféricos'
      };

      createProductUseCase.execute(dto).subscribe((product) => {
        expect(product).toBeDefined();
        expect(product.id).toBe('prod-999');
        expect(product.name).toBe(dto.name);
        done();
      });
    });

    it('debe emitir error si el nombre del producto está vacío', (done) => {
      const dto: CreateProductDto = {
        name: '',
        description: 'Test',
        price: 10,
        stock: 5,
        category: 'Test'
      };

      createProductUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El nombre del producto no puede estar vacío');
          done();
        }
      });
    });

    it('debe emitir error si el precio es negativo', (done) => {
      const dto: CreateProductDto = {
        name: 'Invalido',
        description: 'Test',
        price: -5,
        stock: 5,
        category: 'Test'
      };

      createProductUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El precio debe ser un número positivo');
          done();
        }
      });
    });

    it('debe emitir error si el stock es negativo', (done) => {
      const dto: CreateProductDto = {
        name: 'Invalido',
        description: 'Test',
        price: 50,
        stock: -2,
        category: 'Test'
      };

      createProductUseCase.execute(dto).subscribe({
        next: () => fail('No debió resolverse'),
        error: (err) => {
          expect(err.message).toBe('El stock no puede ser negativo');
          done();
        }
      });
    });
  });
});
