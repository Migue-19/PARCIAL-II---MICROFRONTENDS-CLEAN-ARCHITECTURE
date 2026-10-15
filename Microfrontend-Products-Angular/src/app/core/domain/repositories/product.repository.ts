import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';

/**
 * Contrato del repositorio de productos.
 *
 * @remarks
 * Pertenece a la **capa de dominio** (Clean Architecture). Define qué datos
 * necesita el negocio sin conocer cómo se obtienen: las implementaciones
 * concretas viven en la capa de infraestructura.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export abstract class ProductRepository {
  /**
   * Obtiene un listado de productos.
   * @param count Cantidad de productos a solicitar
   */
  abstract getAll(count: number): Observable<Product[]>;

  /**
   * Obtiene un producto por su identificador.
   * @param id Identificador del producto
   */
  abstract getById(id: number): Observable<Product>;

  /**
   * Obtiene los productos que pertenecen a una categoría.
   * @param category Valor de la categoría a filtrar
   */
  abstract getByCategory(category: ProductCategory): Observable<Product[]>;
}
