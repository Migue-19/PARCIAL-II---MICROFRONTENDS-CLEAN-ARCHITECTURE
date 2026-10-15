import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { GetCoursesByModalityUseCase } from './get-courses-by-modality.usecase';

describe('GetCoursesByModalityUseCase', () => {
  let useCase: GetCoursesByModalityUseCase;
  const repositoryMock = { getByModality: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCoursesByModalityUseCase, { provide: CourseRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetCoursesByModalityUseCase);
  });

  it('debería crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetCoursesByModalityUseCase);
  });

  it('debería delegar en el repositorio', async () => {
    repositoryMock.getByModality.mockReturnValue(of(COURSES_MOCK));
    const result = await firstValueFrom(useCase.execute('Presencial'));
    expect(repositoryMock.getByModality).toHaveBeenCalledWith('Presencial');
    expect(result).toEqual(COURSES_MOCK);
  });

  it('debería propagar el error del repositorio', async () => {
    repositoryMock.getByModality.mockReturnValue(throwError(() => new Error('fallo')));
    await expect(firstValueFrom(useCase.execute('Presencial'))).rejects.toThrow('fallo');
  });
});
