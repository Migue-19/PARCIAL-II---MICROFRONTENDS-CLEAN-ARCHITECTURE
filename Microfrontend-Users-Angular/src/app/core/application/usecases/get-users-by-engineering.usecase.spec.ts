import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUsersByEngineeringUseCase } from './get-users-by-engineering.usecase';

describe('GetUsersByEngineeringUseCase', () => {
  let useCase: GetUsersByEngineeringUseCase;
  const repositoryMock = { getByEngineering: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUsersByEngineeringUseCase, { provide: UserRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetUsersByEngineeringUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetUsersByEngineeringUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getByEngineering.mockReturnValue(of(USERS_MOCK));
    const result = await firstValueFrom(useCase.execute('Sistemas'));
    expect(repositoryMock.getByEngineering).toHaveBeenCalledWith('Sistemas');
    expect(result).toEqual(USERS_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getByEngineering.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute('Sistemas'))).rejects.toThrow('fallo');
  });
});
