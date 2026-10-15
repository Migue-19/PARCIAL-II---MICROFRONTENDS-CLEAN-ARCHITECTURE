package uceva.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada del microservicio de productos (Spring Boot).
 * Se ejecuta en el puerto 3002 con el prefijo de contexto <code>/api</code>.
 */
@SpringBootApplication
public class ProductsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductsApplication.class, args);
    }

}
