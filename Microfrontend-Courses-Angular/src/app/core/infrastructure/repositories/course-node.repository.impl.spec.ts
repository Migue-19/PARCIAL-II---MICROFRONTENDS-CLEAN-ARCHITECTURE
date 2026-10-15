import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { DataService } from '../services/data.service';
import { CourseNodeRepositoryImpl } from './course-node.repository.impl';

describe('CourseNodeRepositoryImpl (Infrastructure)', () => {
  let repository: CourseNodeRepositoryImpl;
  const dataServiceMock = {
    getAllCourses: jest.fn(),
    getCourseById: jest.fn(),
    getCoursesByModality: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseNodeRepositoryImpl, { provide: DataService, useValue: dataServiceMock }],
    });
    repository = TestBed.inject(CourseNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('getAll delega en DataService.getAllCourses()', (done) => {
    dataServiceMock.getAllCourses.mockReturnValue(of(COURSES_MOCK));
    repository.getAll(5).subscribe((result) => {
      expect(dataServiceMock.getAllCourses).toHaveBeenCalledWith(5);
      expect(result).toEqual(COURSES_MOCK);
      done();
    });
  });

  it('getById delega en DataService.getCourseById()', (done) => {
    dataServiceMock.getCourseById.mockReturnValue(of(COURSES_MOCK[0]));
    repository.getById(1).subscribe((result) => {
      expect(dataServiceMock.getCourseById).toHaveBeenCalledWith(1);
      expect(result).toEqual(COURSES_MOCK[0]);
      done();
    });
  });

  it('getByModality delega en DataService.getCoursesByModality()', (done) => {
    dataServiceMock.getCoursesByModality.mockReturnValue(of(COURSES_MOCK));
    repository.getByModality('Presencial').subscribe((result) => {
      expect(dataServiceMock.getCoursesByModality).toHaveBeenCalledWith('Presencial');
      expect(result).toEqual(COURSES_MOCK);
      done();
    });
  });
});
