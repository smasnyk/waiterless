package com.project.waiterless.services;

import com.project.waiterless.models.Dish;
import com.project.waiterless.models.FoodPlace;

import java.util.List;

public interface DishService {
    void saveDish(Dish dish);

    Dish findById(int id);

    List<Dish> findAllByPlace(FoodPlace place);

    Dish findByDishTitleAndPlace(String title, FoodPlace place);
}
