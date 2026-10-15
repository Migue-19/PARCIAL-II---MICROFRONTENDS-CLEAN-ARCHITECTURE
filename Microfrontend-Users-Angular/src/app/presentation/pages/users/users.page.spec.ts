import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllUsersUseCase } from '../../../core/application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../core/application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../../core/application/usecases/get-users-by-engineering.usecase';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { DEFAULT_COUNT, DEFAULT_ERROR_MESSAGE, NOT_FOUND_MESSAGE, UsersPage } from './users.page';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  const getAllMock = { execute: jest.fn() };
  const getByIdMock = { execute: jest.fn() };
  const getByFilterMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage, UsersTableComponent],
    })
      .overrideComponent(UsersPage, {
        set: {
          providers: [
            { provide: GetAllUsersUseCase, useValue: getAllMock },
            { provide: GetUserByIdUseCase, useValue: getByIdMock },
            { provide: GetUsersByEngineeringUseCase, useValue: getByFilterMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('debería crear el componente con el estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.users).toEqual([]);
  });

  it('debería listar usuarios al iniciar (caso de uso 1)', () => {
    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    expect(getAllMock.execute).toHaveBeenCalledWith(DEFAULT_COUNT);
    expect(component.users).toEqual(USERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería pasar los usuarios a la tabla', () => {
    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.directive(UsersTableComponent)).componentInstance;
    expect(table.users).toEqual(USERS_MOCK);
  });

  it('debería mostrar error genérico si falla el listado inicial', () => {
    getAllMock.execute.mockReturnValue(throwError(() => new Error('fallo')));
    fixture.detectChanges();
    expect(component.users).toEqual([]);
    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('debería listar la cantidad indicada con loadAll', () => {
    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
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
    getByIdMock.execute.mockReturnValue(of(USERS_MOCK[0]));
    component.loadById(1);
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);
    expect(component.users).toEqual([USERS_MOCK[0]]);
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

  it('debería filtrar por ingeniería (caso de uso 3)', () => {
    getByFilterMock.execute.mockReturnValue(of(USERS_MOCK));
    component.loadByEngineering('Sistemas');
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Sistemas');
    expect(component.users).toEqual(USERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería mostrar una alerta de carga mientras espera la respuesta', () => {
    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();
    getByFilterMock.execute.mockReturnValue(new (jest.requireActual('rxjs').Subject)());
    component.loadByEngineering('Sistemas');
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    expect(fixture.nativeElement.textContent).toContain('Cargando usuarios...');
  });

  it('debería ejecutar cada caso de uso desde los botones de la vista', () => {
    getAllMock.execute.mockReturnValue(of(USERS_MOCK));
    getByIdMock.execute.mockReturnValue(of(USERS_MOCK[0]));
    getByFilterMock.execute.mockReturnValue(of(USERS_MOCK));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#btn-all')).nativeElement.click();
    expect(getAllMock.execute).toHaveBeenLastCalledWith(10);

    fixture.debugElement.query(By.css('#btn-id')).nativeElement.click();
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);

    fixture.debugElement.query(By.css('#btn-filter')).nativeElement.click();
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Sistemas');
  });
});
