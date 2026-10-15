package uceva.products.application.usecase;

import uceva.products.domain.entity.Product;
import uceva.products.domain.exception.InvalidRequestException;
import uceva.products.domain.exception.ResourceNotFoundException;
import uceva.products.domain.repository.ProductRepository;

/**
 * Caso de uso 2: obtener un producto por su identificador.
 * Capa: Application.
 */
public class GetProductByIdUseCase {

    private final ProductRepository repository;

    public GetProductByIdUseCase(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * @param id identificador del producto (entero mayor a 0)
     * @throws InvalidRequestException si el id no es válido
     * @throws ResourceNotFoundException si el producto no existe
     */
    public Product execute(int id) {
        if (id < 1) {
            throw new InvalidRequestException("El id debe ser un número entero mayor a 0");
        }
        return repository.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un producto con id " + id));
    }
}
