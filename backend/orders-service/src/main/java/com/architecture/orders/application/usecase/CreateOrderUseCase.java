package com.architecture.orders.application.usecase;

import com.architecture.orders.application.dto.CreateOrderRequest;
import com.architecture.orders.domain.model.Order;
import com.architecture.orders.domain.model.OrderItem;
import com.architecture.orders.domain.repository.OrderRepositoryPort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CreateOrderUseCase {
    private final OrderRepositoryPort orderRepositoryPort;

    public CreateOrderUseCase(OrderRepositoryPort orderRepositoryPort) {
        this.orderRepositoryPort = orderRepositoryPort;
    }

    public Order execute(CreateOrderRequest request) {
        if (request.getCustomerName() == null || request.getCustomerName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del cliente es obligatorio");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("La orden debe contener al menos un producto");
        }

        List<OrderItem> items = request.getItems().stream()
                .map(i -> new OrderItem(i.getProductId(), i.getProductName(), i.getQuantity(), i.getUnitPrice()))
                .collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();

        String id = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Order order = new Order(
                id,
                request.getCustomerName(),
                request.getCustomerEmail() != null ? request.getCustomerEmail() : "cliente@empresa.com",
                items,
                total,
                "CONFIRMED",
                LocalDateTime.now()
        );

        return orderRepositoryPort.save(order);
    }
}
