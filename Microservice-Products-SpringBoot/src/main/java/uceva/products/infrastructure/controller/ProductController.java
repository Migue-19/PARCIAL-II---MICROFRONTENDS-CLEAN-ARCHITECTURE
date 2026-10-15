package uceva.products.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uceva.products.application.usecase.GetAllProductsUseCase;
import uceva.products.application.usecase.GetProductByIdUseCase;
import uceva.products.application.usecase.GetProductsByCategoryUseCase;
import uceva.products.domain.entity.Product;

import java.util.List;

/**
 * Controlador REST de productos.
 * Capa: Infrastructure/Presentation. Traduce HTTP a llamadas a los casos de uso.
 */
@RestController
@RequestMapping("/products")
@Tag(name = "Products", description = "Microservicio de productos con Clean Architecture (3 casos de uso)")
public class ProductController {

    /** Latencia simulada (ms) para poder observar el estado de carga en el frontend. */
    private static final long SIMULATED_LATENCY_MS = 1000;

    private final GetAllProductsUseCase getAllProductsUseCase;
    private final GetProductByIdUseCase getProductByIdUseCase;
    private final GetProductsByCategoryUseCase getProductsByCategoryUseCase;

    public ProductController(GetAllProductsUseCase getAllProductsUseCase,
                             GetProductByIdUseCase getProductByIdUseCase,
                             GetProductsByCategoryUseCase getProductsByCategoryUseCase) {
        this.getAllProductsUseCase = getAllProductsUseCase;
        this.getProductByIdUseCase = getProductByIdUseCase;
        this.getProductsByCategoryUseCase = getProductsByCategoryUseCase;
    }

    @Operation(summary = "Caso de uso 1 - Listar productos",
            description = "Retorna los primeros N productos del conjunto de datos.")
    @GetMapping("/{countProducts}")
    public List<Product> getAll(@PathVariable int countProducts) {
        simulateLatency();
        return getAllProductsUseCase.execute(countProducts);
    }

    @Operation(summary = "Caso de uso 2 - Obtener un producto por id",
            description = "Retorna el producto con el id indicado o 404 si no existe.")
    @GetMapping("/id/{id}")
    public Product getById(@PathVariable int id) {
        simulateLatency();
        return getProductByIdUseCase.execute(id);
    }

    @Operation(summary = "Caso de uso 3 - Listar productos por categoría",
            description = "Categorías válidas: Lacteos, Carnes, Frutas, Verduras.")
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        simulateLatency();
        return getProductsByCategoryUseCase.execute(category);
    }

    private void simulateLatency() {
        try {
            Thread.sleep(SIMULATED_LATENCY_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
