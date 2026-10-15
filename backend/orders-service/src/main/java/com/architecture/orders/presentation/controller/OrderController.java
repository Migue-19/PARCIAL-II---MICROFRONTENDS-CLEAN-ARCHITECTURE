package com.architecture.orders.presentation.controller;

import com.architecture.orders.application.dto.CreateOrderRequest;
import com.architecture.orders.application.usecase.CreateOrderUseCase;
import com.architecture.orders.application.usecase.GetOrderByIdUseCase;
import com.architecture.orders.application.usecase.ListOrdersUseCase;
import com.architecture.orders.domain.model.Order;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Orders", description = "Endpoints del Microservicio de Órdenes (Clean Architecture + Spring Boot)")
public class OrderController {

    private final ListOrdersUseCase listOrdersUseCase;
    private final GetOrderByIdUseCase getOrderByIdUseCase;
    private final CreateOrderUseCase createOrderUseCase;

    public OrderController(ListOrdersUseCase listOrdersUseCase,
                           GetOrderByIdUseCase getOrderByIdUseCase,
                           CreateOrderUseCase createOrderUseCase) {
        this.listOrdersUseCase = listOrdersUseCase;
        this.getOrderByIdUseCase = getOrderByIdUseCase;
        this.createOrderUseCase = createOrderUseCase;
    }

    @GetMapping
    @Operation(summary = "Caso de Uso 1: Listar todas las órdenes de compra",
               description = "Retorna el listado completo de órdenes gestionadas en el sistema con sus respectivos ítems y montos totales.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de órdenes obtenida exitosamente",
                     content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Order.class))))
    })
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(listOrdersUseCase.execute());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Caso de Uso 2: Obtener orden por identificador único",
               description = "Busca y devuelve el detalle íntegro de una orden específica a partir de su ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orden encontrada",
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
        @ApiResponse(responseCode = "404", description = "Orden no encontrada",
                     content = @Content)
    })
    public ResponseEntity<Order> getOrderById(
            @Parameter(description = "ID único de la orden (ej: ORD-1001)", required = true)
            @PathVariable String id) {
        return getOrderByIdUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Caso de Uso 3: Registrar nueva orden de compra",
               description = "Crea y persiste una nueva orden de compra en el sistema calculando automáticamente el importe total de sus ítems.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Orden creada exitosamente",
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Order.class))),
        @ApiResponse(responseCode = "400", description = "Datos de orden inválidos o incompletos",
                     content = @Content)
    })
    public ResponseEntity<Order> createOrder(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos para la creación de la orden", required = true)
            @RequestBody CreateOrderRequest request) {
        Order created = createOrderUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
