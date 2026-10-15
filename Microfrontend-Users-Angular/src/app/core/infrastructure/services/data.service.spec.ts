import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { DataService } from './data.service';

describe('DataService (Users)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrlUsers}/api/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getAllUsers hace GET a /api/users/{count}', () => {
    service.getAllUsers(5).subscribe((result) => expect(result).toEqual(USERS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/5`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  it('getUserById hace GET a /api/users/id/{id}', () => {
    service.getUserById(1).subscribe((result) => expect(result).toEqual(USERS_MOCK[0]));
    const req = httpMock.expectOne(`${baseUrl}/id/1`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK[0]);
  });

  it('getUsersByEngineering hace GET a /api/users/engineering/{engineering}', () => {
    service.getUsersByEngineering('Sistemas').subscribe((result) => expect(result).toEqual(USERS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/engineering/Sistemas`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS_MOCK);
  });

  it('la URL base apunta al puerto 3001', () => {
    expect(environment.baseUrlUsers).toBe('http://localhost:3001');
  });
});
