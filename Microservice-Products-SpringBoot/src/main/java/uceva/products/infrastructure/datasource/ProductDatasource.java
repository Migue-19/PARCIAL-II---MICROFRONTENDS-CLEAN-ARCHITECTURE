package uceva.products.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.products.domain.entity.Product;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * Fuente de datos en memoria de productos (generada con JavaFaker).
 * Capa: Infrastructure. Genera un conjunto fijo al iniciar para que la
 * búsqueda por id y el filtro por categoría sean consistentes entre peticiones.
 */
public class ProductDatasource {

    /** Cantidad de productos generados al iniciar el servicio. */
    public static final int DATASET_SIZE = 100;

    private final List<Product> products;

    public ProductDatasource() {
        Faker faker = new Faker();
        Random random = new Random();
        List<Product> data = new ArrayList<>();
        for (int id = 1; id <= DATASET_SIZE; id++) {
            data.add(new Product(
                    id,
                    faker.commerce().productName(),
                    Product.CATEGORIES.get(random.nextInt(Product.CATEGORIES.size())),
                    (float) faker.number().numberBetween(1, 1000)
            ));
        }
        this.products = Collections.unmodifiableList(data);
    }

    public List<Product> findAll(int count) {
        return products.stream().limit(count).toList();
    }

    public Optional<Product> findById(int id) {
        return products.stream().filter(product -> product.id == id).findFirst();
    }

    public List<Product> findByCategory(String category) {
        return products.stream().filter(product -> product.category.equals(category)).toList();
    }
}
