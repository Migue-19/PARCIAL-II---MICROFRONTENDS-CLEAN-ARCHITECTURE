import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductsByCategoryUseCase } from './get-products-by-category.usecase';

describe('GetProductsByCategoryUseCase', () => {
  let useCase: GetProductsByCategoryUseCase;
  const repositoryMock = { getByCategory: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProductsByCategoryUseCase, { provide: ProductRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetProductsByCategoryUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetProductsByCategoryUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getByCategory.mockReturnValue(of(PRODUCTS_MOCK));
    const result = await firstValueFrom(useCase.execute('Lacteos'));
    expect(repositoryMock.getByCategory).toHaveBeenCalledWith('Lacteos');
    expect(result).toEqual(PRODUCTS_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getByCategory.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute('Lacteos'))).rejects.toThrow('fallo');
  });
});
