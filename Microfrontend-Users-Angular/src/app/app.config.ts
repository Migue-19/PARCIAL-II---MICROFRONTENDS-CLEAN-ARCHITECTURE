import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración principal del microfrontend (modo independiente).
 *
 * @remarks
 * Registra listeners globales de errores, detección de cambios con Zone.js,
 * el enrutador y `HttpClient`. Las dependencias de Clean Architecture
 * (casos de uso y repositorio) se registran en `UsersPage`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
