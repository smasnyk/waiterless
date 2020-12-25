package com.project.waiterless.controllers;

import com.project.waiterless.enums.OrderStatus;
import com.project.waiterless.enums.Role;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

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
}
