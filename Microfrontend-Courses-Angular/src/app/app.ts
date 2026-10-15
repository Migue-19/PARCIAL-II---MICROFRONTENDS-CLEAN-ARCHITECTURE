import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del microfrontend de cursos.
 *
 * @remarks
 * Solo ofrece el `router-outlet` para ejecutar el microfrontend de forma
 * independiente. Cuando lo carga el host, se usa directamente `CoursesPage`.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App { }
