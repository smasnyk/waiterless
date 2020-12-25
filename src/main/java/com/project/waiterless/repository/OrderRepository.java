package com.project.waiterless.repository;

import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderId(int orderId);

    List<Order> findAllByClient(Client client);

    List<Order> findAllByPlace(FoodPlace place);

    List<Order> findAllByPlaceAndOrderDate(FoodPlace place, LocalDate orderDate);

    List<Order> findAllByClientAndPlace(Client client, FoodPlace place);
}
