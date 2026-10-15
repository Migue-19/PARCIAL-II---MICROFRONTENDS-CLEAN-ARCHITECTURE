package com.architecture.orders.application.usecase;

import com.architecture.orders.domain.model.Order;
import com.architecture.orders.domain.repository.OrderRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListOrdersUseCase {
    private final OrderRepositoryPort orderRepositoryPort;

    public ListOrdersUseCase(OrderRepositoryPort orderRepositoryPort) {
        this.orderRepositoryPort = orderRepositoryPort;
    }

    public List<Order> execute() {
        return orderRepositoryPort.findAll();
    }
}
