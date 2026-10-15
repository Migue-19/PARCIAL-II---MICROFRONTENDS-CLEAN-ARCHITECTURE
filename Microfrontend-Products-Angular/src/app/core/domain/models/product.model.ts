/**
 * Entidad de dominio que representa un producto.
 *
 * @architecture Clean Architecture
 * @layer Domain
 */
export interface Product {
  /** Identificador único del producto */
  id: number;
  /** Nombre o descripción del producto */
  name: string;
  /** Categoría del producto */
  category: ProductCategory;
  /** Precio del producto */
  price: number;
}

/** Categorías disponibles para un producto. */
export type ProductCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras';
