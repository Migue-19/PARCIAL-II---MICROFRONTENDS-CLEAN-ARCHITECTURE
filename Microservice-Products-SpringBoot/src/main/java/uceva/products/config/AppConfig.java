package uceva.products.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uceva.products.application.usecase.GetAllProductsUseCase;
import uceva.products.application.usecase.GetProductByIdUseCase;
import uceva.products.application.usecase.GetProductsByCategoryUseCase;
import uceva.products.domain.repository.ProductRepository;
import uceva.products.infrastructure.datasource.ProductDatasource;
import uceva.products.infrastructure.repository.ProductRepositoryImpl;

/**
 * Raíz de composición: ensambla datasource → repositorio → casos de uso.
 */
@Configuration
public class AppConfig {

    @Bean
    ProductDatasource productDatasource() {
        return new ProductDatasource();
    }

    @Bean
    ProductRepository productRepository(ProductDatasource productDatasource) {
        return new ProductRepositoryImpl(productDatasource);
    }

    @Bean
    GetAllProductsUseCase getAllProductsUseCase(ProductRepository productRepository) {
        return new GetAllProductsUseCase(productRepository);
    }

    @Bean
    GetProductByIdUseCase getProductByIdUseCase(ProductRepository productRepository) {
        return new GetProductByIdUseCase(productRepository);
    }

    @Bean
    GetProductsByCategoryUseCase getProductsByCategoryUseCase(ProductRepository productRepository) {
        return new GetProductsByCategoryUseCase(productRepository);
    }
}
