package uceva.products.application.usecase;

import org.junit.jupiter.api.Test;
import uceva.products.domain.entity.Product;
import uceva.products.domain.exception.InvalidRequestException;
import uceva.products.domain.exception.ResourceNotFoundException;
import uceva.products.domain.repository.ProductRepository;
import uceva.products.infrastructure.datasource.ProductDatasource;
import uceva.products.infrastructure.repository.ProductRepositoryImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProductUseCasesTest {

    private final ProductRepository repository = new ProductRepositoryImpl(new ProductDatasource());

    @Test
    void getAllReturnsRequestedAmount() {
        assertEquals(5, new GetAllProductsUseCase(repository).execute(5).size());
    }

    @Test
    void getAllRejectsInvalidCount() {
        assertThrows(InvalidRequestException.class, () -> new GetAllProductsUseCase(repository).execute(0));
    }

    @Test
    void getByIdReturnsProduct() {
        Product product = new GetProductByIdUseCase(repository).execute(3);
        assertEquals(3, product.id);
    }

    @Test
    void getByIdFailsWhenProductDoesNotExist() {
        assertThrows(ResourceNotFoundException.class, () -> new GetProductByIdUseCase(repository).execute(9999));
    }

    @Test
    void getByCategoryReturnsOnlyThatCategory() {
        var products = new GetProductsByCategoryUseCase(repository).execute("Lacteos");
        assertTrue(products.stream().allMatch(product -> product.category.equals("Lacteos")));
    }

    @Test
    void getByCategoryRejectsUnknownCategory() {
        assertThrows(InvalidRequestException.class, () -> new GetProductsByCategoryUseCase(repository).execute("Otra"));
    }
}
