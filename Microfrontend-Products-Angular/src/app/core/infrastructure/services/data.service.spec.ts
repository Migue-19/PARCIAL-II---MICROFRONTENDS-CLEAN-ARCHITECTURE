import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { DataService } from './data.service';

describe('DataService (Products)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrlProducts}/api/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getAllProducts hace GET a /api/products/{count}', () => {
    service.getAllProducts(5).subscribe((result) => expect(result).toEqual(PRODUCTS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/5`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  it('getProductById hace GET a /api/products/id/{id}', () => {
    service.getProductById(1).subscribe((result) => expect(result).toEqual(PRODUCTS_MOCK[0]));
    const req = httpMock.expectOne(`${baseUrl}/id/1`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK[0]);
  });

  it('getProductsByCategory hace GET a /api/products/category/{category}', () => {
    service.getProductsByCategory('Lacteos').subscribe((result) => expect(result).toEqual(PRODUCTS_MOCK));
    const req = httpMock.expectOne(`${baseUrl}/category/Lacteos`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS_MOCK);
  });

  it('la URL base apunta al puerto 3002', () => {
    expect(environment.baseUrlProducts).toBe('http://localhost:3002');
  });
});
