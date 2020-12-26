package com.project.waiterless.services.impl;

import com.project.waiterless.models.Order;
import com.project.waiterless.services.ConverterService;
import com.project.waiterless.services.DishService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class ConverterServiceImpl implements ConverterService {
    DishService dishService;

    @Override
    public List<Order> convertDishKeys(List<Order> orders) {
        orders.forEach(order -> {
            HashMap<String, Integer> map = new HashMap<>();
            for (String key : order.getDishes().keySet())
                map.put(dishService.findById(Integer.parseInt(key)).getDishTitle(), order.getDishes().get(key));
            order.setDishes(map);
        });
        return orders;
    }
}
