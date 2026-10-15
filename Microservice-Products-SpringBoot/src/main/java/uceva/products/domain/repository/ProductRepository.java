package uceva.products.domain.repository;

import uceva.products.domain.entity.Product;

import java.util.List;
import java.util.Optional;

/**
 * Contrato del repositorio de productos.
 * Capa: Domain. Define qué necesita el negocio sin saber de dónde vienen los datos.
 */
public interface ProductRepository {

    /** Obtiene los primeros {@code count} productos. */
    List<Product> getAll(int count);

    /** Obtiene un producto por id, si existe. */
    Optional<Product> getById(int id);

    /** Obtiene los productos de una categoría. */
    List<Product> getByCategory(String category);
}
