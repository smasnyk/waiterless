package com.project.waiterless.controllers;

import com.project.waiterless.enums.MenuSection;
import com.project.waiterless.enums.OrderStatus;
import com.project.waiterless.enums.Role;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/place")
public class PlaceController {
    FoodPlaceService foodPlaceService;
    PasswordEncoder passwordEncoder;

    @PostMapping("/signUp")
    public FoodPlace savePlace(@RequestBody FoodPlace place) {
        place.setPassword(passwordEncoder.encode(place.getPassword()));
        place.setRole(Role.ROLE_PLACE);
        LinkedList<String> statuses = new LinkedList<>();
        statuses.add(OrderStatus.В_ПРОЦЕСІ.name());
        statuses.add(OrderStatus.ВИКОНАНО.name());
        place.setOrderStatuses(statuses);
        foodPlaceService.savePlace(place);
        return place;
    }

    @GetMapping("/{id}")
    public FoodPlace getPlace(@PathVariable int id) {
        return foodPlaceService.findById(id);
    }

    @PutMapping("/{id}/editPlace")
    public FoodPlace editPlace(@PathVariable int id, @RequestBody FoodPlace place) {
        FoodPlace foodPlace = foodPlaceService.findById(id);
        foodPlace.setName(place.getName());
        foodPlace.setPlaceType(place.getPlaceType());
        foodPlaceService.savePlace(foodPlace);
        return foodPlace;
    }

    @PostMapping("/{id}/addStatus")
    public List<String> addOrderStatus(@PathVariable int id, @RequestBody String status) {
        FoodPlace place = foodPlaceService.findById(id);
        List<String> orderStatuses = place.getOrderStatuses();
        orderStatuses.add(status);
        foodPlaceService.savePlace(place);
        return orderStatuses;
    }

    @PostMapping("/{id}/addSection")
    public Map<MenuSection, String> addMenuSection(@PathVariable int id, @RequestBody Map<MenuSection, String> menuSections) {
        FoodPlace place = foodPlaceService.findById(id);
        Map<MenuSection, String> sections = place.getMenuSections();
        sections.putAll(menuSections);
        foodPlaceService.savePlace(place);
        return sections;
    }
}
