package com.project.waiterless.services.impl;

import com.project.waiterless.models.Dish;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.repository.DishRepository;
import com.project.waiterless.services.DishService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DishServiceImpl implements DishService {
    private final DishRepository dishRepository;

    @Override
    public void saveDish(Dish dish) {
        if (dish != null)
            dishRepository.saveAndFlush(dish);
    }

    @Override
    public Dish findById(int id) {
        return dishRepository.findByDishId(id);
    }

    @Override
    public List<Dish> findAllByPlace(FoodPlace place) {
        return dishRepository.findAllByPlace(place);
    }

    @Override
    public Dish findByDishTitleAndPlace(String title, FoodPlace place) {
        return dishRepository.findByDishTitleAndPlace(title, place);
    }
}
