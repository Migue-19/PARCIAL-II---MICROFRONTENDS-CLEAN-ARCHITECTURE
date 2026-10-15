/** Valores permitidos para la ingeniería. */
export const USER_ENGINEERINGS = ['Sistemas', 'Electronica', 'Biomedica', 'Industrial', 'Ambiental'] as const;

/** ingeniería de un usuario. */
export type UserEngineering = (typeof USER_ENGINEERINGS)[number];

/**
 * Entidad de dominio que representa un usuario.
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
  /** Ingeniería que cursa el usuario */
  engineering: UserEngineering;
}
