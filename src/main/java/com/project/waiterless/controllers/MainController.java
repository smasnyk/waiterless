package com.project.waiterless.controllers;

import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.User;
import com.project.waiterless.services.FoodPlaceService;
import com.project.waiterless.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class MainController {
    UserService userService;
    FoodPlaceService foodPlaceService;

    @GetMapping("/")
    public List<FoodPlace> homePage() {
        return foodPlaceService.findAll();
    }

    @GetMapping("/authUser")
    public User authUser() {
        return userService.findAuthenticatedUser();
    }
}
