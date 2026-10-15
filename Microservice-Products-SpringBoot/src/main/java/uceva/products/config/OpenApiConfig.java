package uceva.products.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración de la documentación Swagger (OpenAPI) del microservicio.
 * Swagger UI: http://localhost:3002/api/swagger-ui/index.html
 */
@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI openAPI() {
        return new OpenAPI().info(new Info()
                .title("API Microservicio de Products (Spring Boot)")
                .version("1.0.0")
                .description("Microservicio de productos con Clean Architecture - 3 casos de uso"));
    }
}
