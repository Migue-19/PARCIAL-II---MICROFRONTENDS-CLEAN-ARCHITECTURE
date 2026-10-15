import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetAllProductsUseCase } from './get-all-products.usecase';

describe('GetAllProductsUseCase', () => {
  let useCase: GetAllProductsUseCase;
  const repositoryMock = { getAll: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllProductsUseCase, { provide: ProductRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllProductsUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllProductsUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(of(PRODUCTS_MOCK));
    const result = await firstValueFrom(useCase.execute(5));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(5);
    expect(result).toEqual(PRODUCTS_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(5))).rejects.toThrow('fallo');
  });
});
