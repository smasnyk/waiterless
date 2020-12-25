package com.project.waiterless.services;

import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    void saveOrder(Order order);

    Order findById(int id);

    List<Order> findAllByClient(Client client);

    List<Order> findAllByPlace(FoodPlace place);

    List<Order> findAllByPlaceAndDate(FoodPlace place, LocalDate date);

    List<Order> findAllByClientAndPlace(Client client, FoodPlace place);
}
