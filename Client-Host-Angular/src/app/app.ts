import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarConfig, NavbarOrganism } from '@brejcha13320/design-system-bootstrap';

/**
 * Componente raíz del host.
 *
 * @remarks
 * Define el layout general y el navbar funcional que permite navegar entre
 * los tres microfrontends (Usuarios, Productos y Cursos). Las vistas se
 * renderizan en el `router-outlet`.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, NavbarOrganism],
})
export class App {

  /**
   * Configuración del navbar principal.
   *
   * @remarks
   * Cada enlace corresponde a una ruta del host que carga un microfrontend.
   */
  navbarConfig: NavbarConfig = {
    title: 'Parcial II - Microfrontends',
    iconConfig: {
      icon: 'bootstrap',
      size: 2
    },
    navLinks: [
      { text: 'Usuarios', url: '/users' },
      { text: 'Productos', url: '/products' },
      { text: 'Cursos', url: '/courses' },
    ]
  };
}
