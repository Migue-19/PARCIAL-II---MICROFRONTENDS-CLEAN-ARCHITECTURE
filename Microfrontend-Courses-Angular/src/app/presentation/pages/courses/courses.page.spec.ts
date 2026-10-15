import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { GetCourseByIdUseCase } from '../../../core/application/usecases/get-course-by-id.usecase';
import { GetCoursesByModalityUseCase } from '../../../core/application/usecases/get-courses-by-modality.usecase';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { DEFAULT_COUNT, DEFAULT_ERROR_MESSAGE, NOT_FOUND_MESSAGE, CoursesPage } from './courses.page';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  const getAllMock = { execute: jest.fn() };
  const getByIdMock = { execute: jest.fn() };
  const getByFilterMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage, CoursesTableComponent],
    })
      .overrideComponent(CoursesPage, {
        set: {
          providers: [
            { provide: GetAllCoursesUseCase, useValue: getAllMock },
            { provide: GetCourseByIdUseCase, useValue: getByIdMock },
            { provide: GetCoursesByModalityUseCase, useValue: getByFilterMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('debería crear el componente con el estado inicial', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.courses).toEqual([]);
  });

  it('debería listar cursos al iniciar (caso de uso 1)', () => {
    getAllMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(getAllMock.execute).toHaveBeenCalledWith(DEFAULT_COUNT);
    expect(component.courses).toEqual(COURSES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería pasar los cursos a la tabla', () => {
    getAllMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.directive(CoursesTableComponent)).componentInstance;
    expect(table.courses).toEqual(COURSES_MOCK);
  });

  it('debería mostrar error genérico si falla el listado inicial', () => {
    getAllMock.execute.mockReturnValue(throwError(() => new Error('fallo')));
    fixture.detectChanges();
    expect(component.courses).toEqual([]);
    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('debería listar la cantidad indicada con loadAll', () => {
    getAllMock.execute.mockReturnValue(of(COURSES_MOCK));
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
    getByIdMock.execute.mockReturnValue(of(COURSES_MOCK[0]));
    component.loadById(1);
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);
    expect(component.courses).toEqual([COURSES_MOCK[0]]);
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

  it('debería filtrar por modalidad (caso de uso 3)', () => {
    getByFilterMock.execute.mockReturnValue(of(COURSES_MOCK));
    component.loadByModality('Presencial');
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Presencial');
    expect(component.courses).toEqual(COURSES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería mostrar una alerta de carga mientras espera la respuesta', () => {
    getAllMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    getByFilterMock.execute.mockReturnValue(new (jest.requireActual('rxjs').Subject)());
    component.loadByModality('Presencial');
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    expect(fixture.nativeElement.textContent).toContain('Cargando cursos...');
  });

  it('debería ejecutar cada caso de uso desde los botones de la vista', () => {
    getAllMock.execute.mockReturnValue(of(COURSES_MOCK));
    getByIdMock.execute.mockReturnValue(of(COURSES_MOCK[0]));
    getByFilterMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#btn-all')).nativeElement.click();
    expect(getAllMock.execute).toHaveBeenLastCalledWith(10);

    fixture.debugElement.query(By.css('#btn-id')).nativeElement.click();
    expect(getByIdMock.execute).toHaveBeenCalledWith(1);

    fixture.debugElement.query(By.css('#btn-filter')).nativeElement.click();
    expect(getByFilterMock.execute).toHaveBeenCalledWith('Presencial');
  });
});
