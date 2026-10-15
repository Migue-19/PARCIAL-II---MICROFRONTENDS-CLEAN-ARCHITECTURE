import { GetAllProductsUseCase } from '../src/application/use-cases/get-all-products.use-case';
import { GetProductByIdUseCase } from '../src/application/use-cases/get-product-by-id.use-case';
import { CreateProductUseCase } from '../src/application/use-cases/create-product.use-case';
import { InMemoryProductRepository } from '../src/infrastructure/persistence/in-memory-product.repository';

describe('Products Microservice - Application Use Cases', () => {
  let repository: InMemoryProductRepository;
  let getAllUseCase: GetAllProductsUseCase;
  let getByIdUseCase: GetProductByIdUseCase;
  let createUseCase: CreateProductUseCase;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
    getAllUseCase = new GetAllProductsUseCase(repository);
    getByIdUseCase = new GetProductByIdUseCase(repository);
    createUseCase = new CreateProductUseCase(repository);
  });

  describe('GetAllProductsUseCase', () => {
    it('debe retornar la lista completa de productos', async () => {
      const products = await getAllUseCase.execute();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThanOrEqual(3);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
    });
  });

  describe('GetProductByIdUseCase', () => {
    it('debe retornar un producto cuando el ID existe', async () => {
      const product = await getByIdUseCase.execute('prod-001');
      expect(product).not.toBeNull();
      expect(product?.id).toBe('prod-001');
      expect(product?.name).toContain('Laptop');
    });

    it('debe retornar null cuando el producto no existe', async () => {
      const product = await getByIdUseCase.execute('prod-inexistente');
      expect(product).toBeNull();
    });

    it('debe lanzar un error si el ID está vacío', async () => {
      await expect(getByIdUseCase.execute('')).rejects.toThrow('El ID del producto es requerido');
    });
  });

  describe('CreateProductUseCase', () => {
    it('debe crear un nuevo producto correctamente', async () => {
      const newProductDto = {
        name: 'Webcam 4K Ultra',
        description: 'Cámara web con micrófono estéreo',
        price: 99.99,
        stock: 20,
        category: 'Periféricos'
      };

      const created = await createUseCase.execute(newProductDto);
      expect(created.id).toBeDefined();
      expect(created.name).toBe(newProductDto.name);
      expect(created.price).toBe(99.99);

      const all = await getAllUseCase.execute();
      expect(all.some(p => p.id === created.id)).toBe(true);
    });

    it('debe lanzar un error si falta el nombre', async () => {
      await expect(
        createUseCase.execute({
          name: '',
          description: 'Sin nombre',
          price: 50,
          stock: 10,
          category: 'Varios'
        })
      ).rejects.toThrow('El nombre del producto es obligatorio');
    });

    it('debe lanzar un error si el precio es negativo', async () => {
      await expect(
        createUseCase.execute({
          name: 'Producto Precio Negativo',
          description: 'Error test',
          price: -10,
          stock: 5,
          category: 'Varios'
        })
      ).rejects.toThrow('El precio debe ser un número positivo');
    });

    it('debe lanzar un error si el stock es negativo', async () => {
      await expect(
        createUseCase.execute({
          name: 'Producto Stock Negativo',
          description: 'Error test',
          price: 20,
          stock: -1,
          category: 'Varios'
        })
      ).rejects.toThrow('El stock no puede ser negativo');
    });
  });
});
