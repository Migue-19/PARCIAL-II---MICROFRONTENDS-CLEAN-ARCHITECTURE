import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductByIdUseCase } from './get-product-by-id.usecase';

describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;
  const repositoryMock = { getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProductByIdUseCase, { provide: ProductRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetProductByIdUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetProductByIdUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getById.mockReturnValue(of(PRODUCTS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(1));
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(PRODUCTS_MOCK[0]);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getById.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(1))).rejects.toThrow('fallo');
  });
});
