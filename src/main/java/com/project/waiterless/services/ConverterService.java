package com.project.waiterless.services;

import com.project.waiterless.models.Order;

import java.util.List;

public interface ConverterService {
    List<Order> convertDishKeys(List<Order> orders);
}
