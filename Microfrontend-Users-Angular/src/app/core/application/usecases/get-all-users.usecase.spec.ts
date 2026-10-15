import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetAllUsersUseCase } from './get-all-users.usecase';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  const repositoryMock = { getAll: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllUsersUseCase, { provide: UserRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllUsersUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllUsersUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(of(USERS_MOCK));
    const result = await firstValueFrom(useCase.execute(5));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(5);
    expect(result).toEqual(USERS_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(5))).rejects.toThrow('fallo');
  });
});
