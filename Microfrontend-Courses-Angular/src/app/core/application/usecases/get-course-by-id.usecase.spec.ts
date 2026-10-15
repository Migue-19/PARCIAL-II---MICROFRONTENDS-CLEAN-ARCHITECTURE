import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { GetCourseByIdUseCase } from './get-course-by-id.usecase';

describe('GetCourseByIdUseCase', () => {
  let useCase: GetCourseByIdUseCase;
  const repositoryMock = { getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCourseByIdUseCase, { provide: CourseRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetCourseByIdUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetCourseByIdUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getById.mockReturnValue(of(COURSES_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(1));
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(COURSES_MOCK[0]);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getById.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute(1))).rejects.toThrow('fallo');
  });
});
