import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { GetCourseByIdUseCase } from '../../../core/application/usecases/get-course-by-id.usecase';
import { GetCoursesByModalityUseCase } from '../../../core/application/usecases/get-courses-by-modality.usecase';
import { Course, CourseModality } from '../../../core/domain/models/course.model';
import { CourseRepository } from '../../../core/domain/repositories/course.repository';
import { CourseNodeRepositoryImpl } from '../../../core/infrastructure/repositories/course-node.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { State } from '../../interfaces/state.interface';

/** Cantidad de cursos que se listan al iniciar la página. */
export const DEFAULT_COUNT = 10;
/** Mensaje mostrado ante un error genérico. */
export const DEFAULT_ERROR_MESSAGE = 'Error al cargar los cursos';
/** Mensaje mostrado cuando el microservicio responde 404. */
export const NOT_FOUND_MESSAGE = 'No se encontró el curso solicitado';

/**
 * Página contenedora de cursos (microfrontend expuesto al host).
 *
 * @remarks
 * Forma parte de la **capa de presentación**. Orquesta tres casos de uso:
 * listar, buscar por id y filtrar por modalidad. Registra en sus
 * `providers` los casos de uso y la implementación del repositorio, de modo
 * que funciona igual cuando el host la carga mediante Module Federation.
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  imports: [CoursesTableComponent, AlertComponent],
  providers: [
    GetAllCoursesUseCase,
    GetCourseByIdUseCase,
    GetCoursesByModalityUseCase,
    { provide: CourseRepository, useClass: CourseNodeRepositoryImpl },
  ],
})
export class CoursesPage implements OnInit {
  /** Listado de cursos mostrado en la tabla. */
  courses: Course[] = [];

  /** Estado actual de la carga. */
  state: State = 'init';

  /** Mensaje de error a mostrar cuando `state` es `error`. */
  errorMessage = DEFAULT_ERROR_MESSAGE;

  /** Opciones disponibles para el filtro de modalidad. */
  readonly modalityOptions: CourseModality[] = ['Presencial', 'Virtual', 'Hibrido'];

  private getAllCoursesUseCase = inject(GetAllCoursesUseCase);
  private getCourseByIdUseCase = inject(GetCourseByIdUseCase);
  private getCoursesByModalityUseCase = inject(GetCoursesByModalityUseCase);

  /** Carga el listado inicial de cursos. */
  ngOnInit(): void {
    this.loadAll(DEFAULT_COUNT);
  }

  /**
   * Lista cursos (caso de uso 1).
   * @param count Cantidad de cursos a solicitar
   */
  loadAll(count: number): void {
    if (!Number.isInteger(count) || count < 1) {
      this.fail('Ingrese una cantidad entera mayor a 0');
      return;
    }
    this.load(this.getAllCoursesUseCase.execute(count));
  }

  /**
   * Busca un curso por id (caso de uso 2).
   * @param id Identificador del curso
   */
  loadById(id: number): void {
    if (!Number.isInteger(id) || id < 1) {
      this.fail('Ingrese un id entero mayor a 0');
      return;
    }
    this.load(this.getCourseByIdUseCase.execute(id).pipe(map((course) => [course])));
  }

  /**
   * Filtra cursos por modalidad (caso de uso 3).
   * @param modality Valor de la modalidad seleccionada
   */
  loadByModality(modality: string): void {
    this.load(this.getCoursesByModalityUseCase.execute(modality as CourseModality));
  }

  private load(source$: Observable<Course[]>): void {
    this.state = 'loading';
    source$.subscribe({
      next: (courses) => {
        this.courses = courses;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.courses = [];
        this.errorMessage =
          error instanceof HttpErrorResponse && error.status === 404
            ? NOT_FOUND_MESSAGE
            : DEFAULT_ERROR_MESSAGE;
        this.state = 'error';
      },
    });
  }

  private fail(message: string): void {
    this.courses = [];
    this.errorMessage = message;
    this.state = 'error';
  }
}
