package com.project.waiterless.services.impl;

import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import com.project.waiterless.repository.OrderRepository;
import com.project.waiterless.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Override
    public void saveOrder(Order order) {
        if (order != null)
            orderRepository.saveAndFlush(order);
    }

    @Override
    public Order findById(int id) {
        return orderRepository.findByOrderId(id);
    }

    @Override
    public List<Order> findAllByClient(Client client) {
        return orderRepository.findAllByClient(client);
    }

    @Override
    public List<Order> findAllByPlace(FoodPlace place) {
        return orderRepository.findAllByPlace(place);
    }

    @Override
    public List<Order> findAllByPlaceAndDate(FoodPlace place, LocalDate date) {
        return orderRepository.findAllByPlaceAndOrderDate(place, date);
    }

    @Override
    public List<Order> findAllByClientAndPlace(Client client, FoodPlace place) {
        return orderRepository.findAllByClientAndPlace(client, place);
    }
}
