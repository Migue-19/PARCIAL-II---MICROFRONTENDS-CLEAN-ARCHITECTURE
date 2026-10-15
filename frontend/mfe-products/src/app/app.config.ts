import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { PRODUCT_ROUTES } from './app.routes';
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductsApiGateway } from './infrastructure/gateways/products-api.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(PRODUCT_ROUTES),
    provideHttpClient(),
    {
      provide: ProductRepository,
      useClass: ProductsApiGateway
    }
  ]
};
