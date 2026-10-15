package uceva.products.infrastructure.repository;

import uceva.products.domain.entity.Product;
import uceva.products.domain.repository.ProductRepository;
import uceva.products.infrastructure.datasource.ProductDatasource;

import java.util.List;
import java.util.Optional;

/**
 * Implementación del repositorio de productos sobre {@link ProductDatasource}.
 * Capa: Infrastructure.
 */
public class ProductRepositoryImpl implements ProductRepository {

    private final ProductDatasource datasource;

    public ProductRepositoryImpl(ProductDatasource datasource) {
        this.datasource = datasource;
    }

    @Override
    public List<Product> getAll(int count) {
        return datasource.findAll(count);
    }

    @Override
    public Optional<Product> getById(int id) {
        return datasource.findById(id);
    }

    @Override
    public List<Product> getByCategory(String category) {
        return datasource.findByCategory(category);
    }
}
