package com.project.waiterless.controllers;

import com.project.waiterless.models.Dish;
import com.project.waiterless.services.DishService;
import com.project.waiterless.services.FoodPlaceService;
import com.project.waiterless.services.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
public class DishController {
    FoodPlaceService placeService;
    DishService dishService;
    ImageService imageService;

    @PostMapping("/place/{placeId}/addDish")
    public Dish saveDish(@PathVariable int placeId, @RequestBody Dish dish) {
        dish.setPlace(placeService.findById(placeId));
        dishService.saveDish(dish);
        return dish;
    }

    @GetMapping("/dish/{id}")
    public Dish getDish(@PathVariable int id) {
        return dishService.findById(id);
    }

    @PutMapping("/dish/{id}/editDish")
    public Dish editDish(@PathVariable int id, @RequestBody Dish dish) {
        Dish d = dishService.findById(id);
        d.setDishTitle(dish.getDishTitle());
        d.setPrice(dish.getPrice());
        d.setMenuSection(dish.getMenuSection());
        dishService.saveDish(d);
        return d;
    }

    @GetMapping("/place/{id}/dishes")
    public List<Dish> getDishes(@PathVariable int id) {
        return dishService.findAllByPlace(placeService.findById(id));
    }

    @PutMapping("/dish/{id}/addPhoto")
    public void setPicture(@PathVariable int id, @RequestParam("file") MultipartFile file) throws IOException {
        Dish dish = dishService.findById(id);
        dish.setPicture(file.getOriginalFilename());
        imageService.storeFile(file);
        dishService.saveDish(dish);
    }
}
