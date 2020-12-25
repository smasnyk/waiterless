package com.project.waiterless.repository;

import com.project.waiterless.models.Dish;
import com.project.waiterless.models.FoodPlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DishRepository extends JpaRepository<Dish, Integer> {
    Dish findByDishId(int dishId);

    Dish findByDishTitleAndPlace(String title, FoodPlace place);

    List<Dish> findAllByPlace(FoodPlace place);
}
