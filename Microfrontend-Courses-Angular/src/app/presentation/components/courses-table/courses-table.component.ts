import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Course, CourseModality } from '../../../core/domain/models/course.model';

/**
 * Componente de presentación que muestra un listado de cursos en una tabla.
 *
 * @description
 * Es un componente "tonto": solo recibe los cursos por `@Input` y los
 * renderiza. No conoce casos de uso, repositorios ni servicios.
 *
 * @example
 * ```html
 * <app-courses-table [courses]="courses"></app-courses-table>
 * ```
 */
@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  imports: [BadgeAtom],
})
export class CoursesTableComponent {

  /** Listado de cursos a renderizar */
  @Input() courses: Course[] = [];

  /** Relación entre la modalidad del curso y el color del badge */
  modalityMap: Record<CourseModality, BadgeType> = {
    'Presencial': 'primary',
    'Virtual': 'success',
    'Hibrido': 'warning',
  }
}
