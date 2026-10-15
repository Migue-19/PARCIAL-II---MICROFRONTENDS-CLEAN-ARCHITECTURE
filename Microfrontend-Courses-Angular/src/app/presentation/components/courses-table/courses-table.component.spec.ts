import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesTableComponent } from './courses-table.component';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('no debería renderizar filas cuando no hay cursos', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

  it('debería renderizar una fila por cada curso', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(COURSES_MOCK.length);
  });

  it('debería mostrar los datos del curso en cada columna', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const course = component.courses[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(course.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(course.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(course.teacher);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(course.credits));
      expect(columns[4].nativeElement.textContent.trim()).toContain(course.modality);
    });
  });

  it('debería mapear cada modalidad a su BadgeType correcto', () => {
    expect(component.modalityMap['Presencial']).toBe('primary');
    expect(component.modalityMap['Virtual']).toBe('success');
    expect(component.modalityMap['Hibrido']).toBe('warning');
  });

});
