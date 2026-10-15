package com.architecture.orders.infrastructure.persistence;

import com.architecture.orders.domain.model.Order;
import com.architecture.orders.domain.model.OrderItem;
import com.architecture.orders.domain.repository.OrderRepositoryPort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Repository
public class InMemoryOrderRepositoryAdapter implements OrderRepositoryPort {
    private final List<Order> orders = new CopyOnWriteArrayList<>();

    public InMemoryOrderRepositoryAdapter() {
        // Datos semilla iniciales
        List<OrderItem> seedItems1 = new ArrayList<>();
        seedItems1.add(new OrderItem("prod-001", "Laptop Developer Pro 16\"", 1, 1899.99));

        Order order1 = new Order(
                "ORD-1001",
                "Carlos Mendoza",
                "carlos.mendoza@email.com",
                seedItems1,
                1899.99,
                "CONFIRMED",
                LocalDateTime.now().minusDays(2)
        );

        List<OrderItem> seedItems2 = new ArrayList<>();
        seedItems2.add(new OrderItem("prod-002", "Monitor UltraWide 34\"", 2, 499.50));
        seedItems2.add(new OrderItem("prod-003", "Teclado Mecánico Ergonómico", 1, 149.00));

        Order order2 = new Order(
                "ORD-1002",
                "Valeria Gómez",
                "valeria.gomez@email.com",
                seedItems2,
                1148.00,
                "DELIVERED",
                LocalDateTime.now().minusHours(12)
        );

        orders.add(order1);
        orders.add(order2);
    }

    @Override
    public List<Order> findAll() {
        return Collections.unmodifiableList(new ArrayList<>(orders));
    }

    @Override
    public Optional<Order> findById(String id) {
        return orders.stream()
                .filter(o -> o.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    @Override
    public Order save(Order order) {
        orders.add(order);
        return order;
    }
}
