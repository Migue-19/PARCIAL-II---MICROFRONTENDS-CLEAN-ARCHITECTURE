package com.architecture.orders.presentation.controller;

import com.architecture.orders.application.dto.CreateOrderRequest;
import com.architecture.orders.application.usecase.CreateOrderUseCase;
import com.architecture.orders.application.usecase.GetOrderByIdUseCase;
import com.architecture.orders.application.usecase.ListOrdersUseCase;
import com.architecture.orders.domain.model.Order;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Orders", description = "Endpoints del Microservicio de Órdenes (Clean Architecture)")
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
    @Operation(summary = "Caso de Uso 1: Listar todas las órdenes de compra")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(listOrdersUseCase.execute());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Caso de Uso 2: Obtener orden por identificador único")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return getOrderByIdUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Caso de Uso 3: Registrar nueva orden de compra")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order created = createOrderUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
