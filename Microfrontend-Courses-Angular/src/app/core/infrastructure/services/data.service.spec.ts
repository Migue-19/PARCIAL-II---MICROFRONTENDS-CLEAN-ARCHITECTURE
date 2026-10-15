import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { DataService } from './data.service';

describe('DataService (Courses)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrlCourses}/api/courses`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getAllCourses hace GET a /api/courses/{count}', () => {
    service.getAllCourses(5).subscribe((result) => expect(result).toEqual(COURSES_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/5`);
    expect(req.request.method).toBe('GET');
    req.flush(COURSES_MOCK);
  });

  it('getCourseById hace GET a /api/courses/id/{id}', () => {
    service.getCourseById(1).subscribe((result) => expect(result).toEqual(COURSES_MOCK[0]));
    const req = httpMock.expectOne(`${baseUrl}/id/1`);
    expect(req.request.method).toBe('GET');
    req.flush(COURSES_MOCK[0]);
  });

  it('getCoursesByModality hace GET a /api/courses/modality/{modality}', () => {
    service.getCoursesByModality('Presencial').subscribe((result) => expect(result).toEqual(COURSES_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/modality/Presencial`);
    expect(req.request.method).toBe('GET');
    req.flush(COURSES_MOCK);
  });

  it('la URL base apunta al puerto 3003', () => {
    expect(environment.baseUrlCourses).toBe('http://localhost:3003');
  });
});
