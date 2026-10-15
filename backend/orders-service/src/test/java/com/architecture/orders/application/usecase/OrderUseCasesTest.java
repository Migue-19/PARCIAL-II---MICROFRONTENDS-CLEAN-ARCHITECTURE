package com.architecture.orders.application.usecase;

import com.architecture.orders.application.dto.CreateOrderRequest;
import com.architecture.orders.application.dto.OrderItemRequest;
import com.architecture.orders.domain.model.Order;
import com.architecture.orders.infrastructure.persistence.InMemoryOrderRepositoryAdapter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class OrderUseCasesTest {

    private InMemoryOrderRepositoryAdapter repository;
    private ListOrdersUseCase listOrdersUseCase;
    private GetOrderByIdUseCase getOrderByIdUseCase;
    private CreateOrderUseCase createOrderUseCase;

    @BeforeEach
    void setUp() {
        repository = new InMemoryOrderRepositoryAdapter();
        listOrdersUseCase = new ListOrdersUseCase(repository);
        getOrderByIdUseCase = new GetOrderByIdUseCase(repository);
        createOrderUseCase = new CreateOrderUseCase(repository);
    }

    @Test
    void testListOrdersUseCase() {
        List<Order> orders = listOrdersUseCase.execute();
        assertNotNull(orders);
        assertFalse(orders.isEmpty());
        assertTrue(orders.size() >= 2);
    }

    @Test
    void testGetOrderByIdUseCase() {
        Optional<Order> order = getOrderByIdUseCase.execute("ORD-1001");
        assertTrue(order.isPresent());
        assertEquals("ORD-1001", order.get().getId());
        assertEquals("Carlos Mendoza", order.get().getCustomerName());
    }

    @Test
    void testCreateOrderUseCase() {
        OrderItemRequest item = new OrderItemRequest("prod-003", "Teclado Ergonómico", 2, 149.00);
        CreateOrderRequest request = new CreateOrderRequest("Lucía Ramos", "lucia@empresa.com", Collections.singletonList(item));

        Order created = createOrderUseCase.execute(request);
        assertNotNull(created);
        assertNotNull(created.getId());
        assertEquals("Lucía Ramos", created.getCustomerName());
        assertEquals(298.00, created.getTotalAmount(), 0.001);
    }
}
