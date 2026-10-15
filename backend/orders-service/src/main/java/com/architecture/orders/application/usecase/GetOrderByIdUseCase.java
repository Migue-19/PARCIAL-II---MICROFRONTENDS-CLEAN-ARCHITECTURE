package com.architecture.orders.application.usecase;

import com.architecture.orders.domain.model.Order;
import com.architecture.orders.domain.repository.OrderRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetOrderByIdUseCase {
    private final OrderRepositoryPort orderRepositoryPort;

    public GetOrderByIdUseCase(OrderRepositoryPort orderRepositoryPort) {
        this.orderRepositoryPort = orderRepositoryPort;
    }

    public Optional<Order> execute(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("El ID de la orden no puede ser nulo o vacío");
        }
        return orderRepositoryPort.findById(id);
    }
}
