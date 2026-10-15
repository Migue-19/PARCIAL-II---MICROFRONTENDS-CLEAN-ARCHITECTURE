import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOMER_ROUTES } from './app.routes';
import { CustomerRepository } from './domain/repositories/customer.repository';
import { CustomersApiGateway } from './infrastructure/gateways/customers-api.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(CUSTOMER_ROUTES),
    provideHttpClient(),
    {
      provide: CustomerRepository,
      useClass: CustomersApiGateway
    }
  ]
};
