package com.project.waiterless.controllers;

import com.project.waiterless.models.User;
import com.project.waiterless.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }
}
