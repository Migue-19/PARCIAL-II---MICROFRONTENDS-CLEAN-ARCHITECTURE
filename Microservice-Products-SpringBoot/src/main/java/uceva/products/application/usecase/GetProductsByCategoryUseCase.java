package uceva.products.application.usecase;

import uceva.products.domain.entity.Product;
import uceva.products.domain.exception.InvalidRequestException;
import uceva.products.domain.repository.ProductRepository;

import java.util.List;

/**
 * Caso de uso 3: obtener los productos de una categoría.
 * Capa: Application.
 */
public class GetProductsByCategoryUseCase {

    private final ProductRepository repository;

    public GetProductsByCategoryUseCase(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * @param category categoría a filtrar
     * @throws InvalidRequestException si la categoría no es válida
     */
    public List<Product> execute(String category) {
        if (!Product.CATEGORIES.contains(category)) {
            throw new InvalidRequestException(
                    "La categoría no es válida. Valores permitidos: " + String.join(", ", Product.CATEGORIES));
        }
        return repository.getByCategory(category);
    }
}
