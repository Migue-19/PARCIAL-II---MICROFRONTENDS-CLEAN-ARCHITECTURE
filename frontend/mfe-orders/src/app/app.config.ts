import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ORDER_ROUTES } from './app.routes';
import { OrderRepository } from './domain/repositories/order.repository';
import { OrdersApiGateway } from './infrastructure/gateways/orders-api.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ORDER_ROUTES),
    provideHttpClient(),
    {
      provide: OrderRepository,
      useClass: OrdersApiGateway
    }
  ]
};
