import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { DataService } from '../services/data.service';
import { ProductSpringBootRepositoryImpl } from './product-springboot.repository.impl';

describe('ProductSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: ProductSpringBootRepositoryImpl;
  const dataServiceMock = {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    getProductsByCategory: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSpringBootRepositoryImpl, { provide: DataService, useValue: dataServiceMock }],
    });
    repository = TestBed.inject(ProductSpringBootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('getAll delega en DataService.getAllProducts()', (done) => {
    dataServiceMock.getAllProducts.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getAll(5).subscribe((result) => {
      expect(dataServiceMock.getAllProducts).toHaveBeenCalledWith(5);
      expect(result).toEqual(PRODUCTS_MOCK);
      done();
    });
  });

  it('getById delega en DataService.getProductById()', (done) => {
    dataServiceMock.getProductById.mockReturnValue(of(PRODUCTS_MOCK[0]));
    repository.getById(1).subscribe((result) => {
      expect(dataServiceMock.getProductById).toHaveBeenCalledWith(1);
      expect(result).toEqual(PRODUCTS_MOCK[0]);
      done();
    });
  });

  it('getByCategory delega en DataService.getProductsByCategory()', (done) => {
    dataServiceMock.getProductsByCategory.mockReturnValue(of(PRODUCTS_MOCK));
    repository.getByCategory('Lacteos').subscribe((result) => {
      expect(dataServiceMock.getProductsByCategory).toHaveBeenCalledWith('Lacteos');
      expect(result).toEqual(PRODUCTS_MOCK);
      done();
    });
  });
});
