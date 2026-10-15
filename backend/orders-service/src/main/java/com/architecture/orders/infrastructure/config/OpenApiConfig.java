package com.architecture.orders.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI ordersOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Orders Microservice API (Spring Boot)")
                        .version("1.0.0")
                        .description("Documentación OpenAPI / Swagger del Microservicio de Órdenes desarrollado con Clean Architecture en Spring Boot")
                        .contact(new Contact()
                                .name("Equipo de Arquitectura de Software")));
    }
}
