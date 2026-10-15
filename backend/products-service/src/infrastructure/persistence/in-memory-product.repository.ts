import { Product, CreateProductDto } from '../../domain/models/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [
    {
      id: 'prod-001',
      name: 'Laptop Developer Pro 16"',
      description: 'Portátil de alto rendimiento con 32GB RAM y 1TB SSD',
      price: 1899.99,
      stock: 15,
      category: 'Laptops',
      createdAt: new Date('2026-01-10T10:00:00Z')
    },
    {
      id: 'prod-002',
      name: 'Monitor UltraWide 34" 144Hz',
      description: 'Monitor curvo IPS para productividad y desarrollo',
      price: 499.50,
      stock: 25,
      category: 'Monitores',
      createdAt: new Date('2026-02-15T12:00:00Z')
    },
    {
      id: 'prod-003',
      name: 'Teclado Mecánico Ergonómico QMK',
      description: 'Teclado inalámbrico con switches táctiles silenciosos',
      price: 149.00,
      stock: 40,
      category: 'Periféricos',
      createdAt: new Date('2026-03-01T09:30:00Z')
    }
  ];

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product ? { ...product } : null;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const newProduct: Product = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      name: dto.name,
      description: dto.description || '',
      price: Number(dto.price),
      stock: Number(dto.stock),
      category: dto.category || 'General',
      createdAt: new Date()
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }
}
