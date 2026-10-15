import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  const repositoryMock = { getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserByIdUseCase, { provide: UserRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetUserByIdUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetUserByIdUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getById.mockReturnValue(of(USERS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(1));
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(USERS_MOCK[0]);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getById.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(1))).rejects.toThrow('fallo');
  });
});
