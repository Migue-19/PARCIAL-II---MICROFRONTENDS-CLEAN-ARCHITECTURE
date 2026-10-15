import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { GetAllCoursesUseCase } from './get-all-courses.usecase';

describe('GetAllCoursesUseCase', () => {
  let useCase: GetAllCoursesUseCase;
  const repositoryMock = { getAll: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllCoursesUseCase, { provide: CourseRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllCoursesUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllCoursesUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(of(COURSES_MOCK));
    const result = await firstValueFrom(useCase.execute(5));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(5);
    expect(result).toEqual(COURSES_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getAll.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(5))).rejects.toThrow('fallo');
  });
});
