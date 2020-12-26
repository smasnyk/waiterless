package com.project.waiterless.controllers;

import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import com.project.waiterless.services.ClientService;
import com.project.waiterless.services.DishService;
import com.project.waiterless.services.FoodPlaceService;
import com.project.waiterless.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@AllArgsConstructor
public class OrderController {
    FoodPlaceService placeService;
    ClientService clientService;
    DishService dishService;
    OrderService orderService;

    @PostMapping("user/{id}/place/{placeId}/order")
    public Order makeOrder(@PathVariable int id, @PathVariable int placeId, @RequestBody Order order) {
        FoodPlace place = placeService.findById(placeId);
        order.setClient(clientService.findById(id));
        order.setPlace(place);
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus(place.getOrderStatuses().get(1));
        Map<String, Integer> dishes = order.getDishes();
        dishes.keySet().forEach(dish -> order.setTotalPrice(order.getTotalPrice() +
                dishService.findById(Integer.parseInt(dish)).getPrice() * dishes.get(dish)));
        orderService.saveOrder(order);
        return order;
    }

    @PutMapping("place/{orderId}/editOrder")
    public Order editOrderStatus(@PathVariable int orderId, @RequestBody Order order) {
        Order o = orderService.findById(orderId);
        o.setOrderStatus(order.getOrderStatus());
        orderService.saveOrder(o);
        return o;
    }
}
