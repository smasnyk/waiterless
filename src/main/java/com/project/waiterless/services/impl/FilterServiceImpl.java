package com.project.waiterless.services.impl;

import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import com.project.waiterless.services.DishService;
import com.project.waiterless.services.FilterService;
import com.project.waiterless.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class FilterServiceImpl implements FilterService {
    OrderService orderService;
    DishService dishService;

    @Override
    public Map<String, Integer> getFilteredClientStats(Client client, FoodPlace place, List<Order> orders) {
        Map<String, Integer> dishes = new HashMap<>();
        if (place != null) orders = orderService.findAllByClientAndPlace(client, place);
        orders.forEach(order -> order.getDishes().forEach((s, integer) -> {
            if (dishes.containsKey(s))
                dishes.computeIfPresent(s, (k, i) -> i + integer);
            else dishes.put(s, integer);
        }));
        return dishes;
    }

    @Override
    public Map<String, Integer> getFilteredPlaceStats(FoodPlace place, String section, String date, List<Order> orders) {
        Map<String, Integer> dishes = new HashMap<>();
        if (date != null) {
            LocalDate localDate = LocalDate.parse(date);
            orders = orderService.findAllByPlaceAndDate(place, localDate);
        }
        orders.forEach(order -> order.getDishes().forEach((s, integer) -> {
            if (dishes.containsKey(s))
                dishes.computeIfPresent(s, (k, i) -> i + integer);
            else dishes.put(s, integer);
        }));
        dishes.entrySet().removeIf(entry -> section != null && !dishService.findByDishTitleAndPlace(entry.getKey(),
                place).getMenuSection().equals(section));
        return dishes;
    }
}
