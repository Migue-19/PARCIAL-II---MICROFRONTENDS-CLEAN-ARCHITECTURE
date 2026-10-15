package uceva.products.application.usecase;

import uceva.products.domain.entity.Product;
import uceva.products.domain.exception.InvalidRequestException;
import uceva.products.domain.repository.ProductRepository;

import java.util.List;

/**
 * Caso de uso 1: obtener el listado de productos.
 * Capa: Application.
 */
public class GetAllProductsUseCase {

    private final ProductRepository repository;

    public GetAllProductsUseCase(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * @param count cantidad de productos solicitada (entero mayor a 0)
     * @throws InvalidRequestException si la cantidad no es válida
     */
    public List<Product> execute(int count) {
        if (count < 1) {
            throw new InvalidRequestException("La cantidad debe ser un número entero mayor a 0");
        }
        return repository.getAll(count);
    }
}
