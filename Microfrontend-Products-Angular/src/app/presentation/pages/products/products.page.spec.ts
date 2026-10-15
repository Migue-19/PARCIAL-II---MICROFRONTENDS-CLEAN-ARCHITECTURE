import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetProductByIdUseCase } from '../../../core/application/usecases/get-product-by-id.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/application/usecases/get-products-by-category.usecase';
import { PRODUCTS_MOCK } from '../../../mocks/products.mocks';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { DEFAULT_COUNT, DEFAULT_ERROR_MESSAGE, NOT_FOUND_MESSAGE, ProductsPage } from './products.page';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  const getAllMock = { execute: jest.fn() };
  const getByIdMock = { execute: jest.fn() };
  const getByFilterMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage, ProductsTableComponent],
    })
      .overrideComponent(ProductsPage, {
        set: {
          providers: [
            { provide: GetAllProductsUseCase, useValue: getAllMock },
            { provide: GetProductByIdUseCase, useValue: getByIdMock },
            { provide: GetProductsByCategoryUseCase, useValue: getByFilterMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('debería crear el componente con el estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.products).toEqual([]);
  });

  it('debería listar productos al iniciar (caso de uso 1)', () => {
    getAllMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    expect(getAllMock.execute).toHaveBeenCalledWith(DEFAULT_COUNT);
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería pasar los productos a la tabla', () => {
    getAllMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.directive(ProductsTableComponent)).componentInstance;
    expect(table.products).toEqual(PRODUCTS_MOCK);
  });

  it('debería mostrar error genérico si falla el listado inicial', () => {
    getAllMock.execute.mockReturnValue(throwError(() => new Error('fallo')));
    fixture.detectChanges();
    expect(component.products).toEqual([]);
    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('debería listar la cantidad indicada con loadAll', () => {
    getAllMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    component.loadAll(5);
    expect(getAllMock.execute).toHaveBeenCalledWith(5);
    expect(component.state).toBe('success');
  });

  it('debería rechazar una cantidad inválida sin llamar al caso de uso', () => {
    component.loadAll(0);
    expect(getAllMock.execute).not.toHaveBeenCalled();
    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe('Ingrese una cantidad entera mayor a 0');
    component.loadAll(NaN);
    expect(component.state).toBe('error');
  });

  it('debería buscar por id y mostrar el resultado en una lista de un elemento (caso de uso 2)', () => {
    getByIdMock.execute.mockReturnValue(of(PRODUCTS_MOCK[0]));
    component.loadById(1);
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);
    expect(component.products).toEqual([PRODUCTS_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debería rechazar un id inválido sin llamar al caso de uso', () => {
    component.loadById(-3);
    expect(getByIdMock.execute).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Ingrese un id entero mayor a 0');
    component.loadById(NaN);
    expect(component.state).toBe('error');
  });

  it('debería mostrar mensaje de no encontrado cuando el servicio responde 404', () => {
    getByIdMock.execute.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 }))
    );
    component.loadById(999);
    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe(NOT_FOUND_MESSAGE);
  });

  it('debería filtrar por categoría (caso de uso 3)', () => {
    getByFilterMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    component.loadByCategory('Lacteos');
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Lacteos');
    expect(component.products).toEqual(PRODUCTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería mostrar una alerta de carga mientras espera la respuesta', () => {
    getAllMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();
    getByFilterMock.execute.mockReturnValue(new (jest.requireActual('rxjs').Subject)());
    component.loadByCategory('Lacteos');
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    expect(fixture.nativeElement.textContent).toContain('Cargando productos...');
  });

  it('debería ejecutar cada caso de uso desde los botones de la vista', () => {
    getAllMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    getByIdMock.execute.mockReturnValue(of(PRODUCTS_MOCK[0]));
    getByFilterMock.execute.mockReturnValue(of(PRODUCTS_MOCK));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#btn-all')).nativeElement.click();
    expect(getAllMock.execute).toHaveBeenLastCalledWith(10);

    fixture.debugElement.query(By.css('#btn-id')).nativeElement.click();
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);

    fixture.debugElement.query(By.css('#btn-filter')).nativeElement.click();
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Lacteos');
  });
});
