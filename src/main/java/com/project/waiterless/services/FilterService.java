package com.project.waiterless.services;

import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;

import java.util.List;
import java.util.Map;

public interface FilterService {
    Map<String, Integer> getFilteredClientStats(Client client, FoodPlace place, List<Order> orders);

    Map<String, Integer> getFilteredPlaceStats(FoodPlace place, String section, String date, List<Order> orders);
}
