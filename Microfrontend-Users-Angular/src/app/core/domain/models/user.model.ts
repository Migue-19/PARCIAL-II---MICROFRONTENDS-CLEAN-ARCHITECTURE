/**
 * Entidad de dominio que representa un usuario del sistema.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface User {
  /** Identificador único del usuario */
  id: number;
  /** Nombre del usuario */
  name: string;
  /** Apellido del usuario */
  lastName: string;
  /** Edad del usuario */
  age: number;
  /** Correo electrónico del usuario */
  email: string;
  /** Carrera o ingeniería del usuario */
  engineering: UserEngineering;
}

/** Ingenierías disponibles para un usuario. */
export type UserEngineering = 'Sistemas' | 'Electronica' | 'Biomedica' | 'Industrial' | 'Ambiental';
