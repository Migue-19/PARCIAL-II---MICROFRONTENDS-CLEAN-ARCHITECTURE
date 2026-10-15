import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetAllProductsUseCase } from '../../../core/application/usecases/get-all-products.usecase';
import { GetProductByIdUseCase } from '../../../core/application/usecases/get-product-by-id.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/application/usecases/get-products-by-category.usecase';
import { Product, ProductCategory } from '../../../core/domain/models/product.model';
import { ProductRepository } from '../../../core/domain/repositories/product.repository';
import { ProductSpringBootRepositoryImpl } from '../../../core/infrastructure/repositories/product-springboot.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { State } from '../../interfaces/state.interface';

/** Cantidad de productos que se listan al iniciar la página. */
export const DEFAULT_COUNT = 10;
/** Mensaje mostrado ante un error genérico. */
export const DEFAULT_ERROR_MESSAGE = 'Error al cargar los productos';
/** Mensaje mostrado cuando el microservicio responde 404. */
export const NOT_FOUND_MESSAGE = 'No se encontró el producto solicitado';

/**
 * Página contenedora de productos (microfrontend expuesto al host).
 *
 * @remarks
 * Forma parte de la **capa de presentación**. Orquesta tres casos de uso:
 * listar, buscar por id y filtrar por categoría. Registra en sus
 * `providers` los casos de uso y la implementación del repositorio, de modo
 * que funciona igual cuando el host la carga mediante Module Federation.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  imports: [ProductsTableComponent, AlertComponent],
  providers: [
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    GetProductsByCategoryUseCase,
    { provide: ProductRepository, useClass: ProductSpringBootRepositoryImpl },
  ],
})
export class ProductsPage implements OnInit {
  /** Listado de productos mostrado en la tabla. */
  products: Product[] = [];

  /** Estado actual de la carga. */
  state: State = 'init';

  /** Mensaje de error a mostrar cuando `state` es `error`. */
  errorMessage = DEFAULT_ERROR_MESSAGE;

  /** Opciones disponibles para el filtro de categoría. */
  readonly categoryOptions: ProductCategory[] = ['Lacteos', 'Carnes', 'Frutas', 'Verduras'];

  private getAllProductsUseCase = inject(GetAllProductsUseCase);
  private getProductByIdUseCase = inject(GetProductByIdUseCase);
  private getProductsByCategoryUseCase = inject(GetProductsByCategoryUseCase);

  /** Carga el listado inicial de productos. */
  ngOnInit(): void {
    this.loadAll(DEFAULT_COUNT);
  }

  /**
   * Lista productos (caso de uso 1).
   * @param count Cantidad de productos a solicitar
   */
  loadAll(count: number): void {
    if (!Number.isInteger(count) || count < 1) {
      this.fail('Ingrese una cantidad entera mayor a 0');
      return;
    }
    this.load(this.getAllProductsUseCase.execute(count));
  }

  /**
   * Busca un producto por id (caso de uso 2).
   * @param id Identificador del producto
   */
  loadById(id: number): void {
    if (!Number.isInteger(id) || id < 1) {
      this.fail('Ingrese un id entero mayor a 0');
      return;
    }
    this.load(this.getProductByIdUseCase.execute(id).pipe(map((product) => [product])));
  }

  /**
   * Filtra productos por categoría (caso de uso 3).
   * @param category Valor de la categoría seleccionada
   */
  loadByCategory(category: string): void {
    this.load(this.getProductsByCategoryUseCase.execute(category as ProductCategory));
  }

  private load(source$: Observable<Product[]>): void {
    this.state = 'loading';
    source$.subscribe({
      next: (products) => {
        this.products = products;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.products = [];
        this.errorMessage =
          error instanceof HttpErrorResponse && error.status === 404
            ? NOT_FOUND_MESSAGE
            : DEFAULT_ERROR_MESSAGE;
        this.state = 'error';
      },
    });
  }

  private fail(message: string): void {
    this.products = [];
    this.errorMessage = message;
    this.state = 'error';
  }
}
