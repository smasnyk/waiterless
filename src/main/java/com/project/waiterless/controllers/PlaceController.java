package com.project.waiterless.controllers;

import com.project.waiterless.enums.MenuSection;
import com.project.waiterless.enums.OrderStatus;
import com.project.waiterless.enums.Role;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import com.project.waiterless.services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/place")
public class PlaceController {
    FoodPlaceService foodPlaceService;
    PasswordEncoder passwordEncoder;
    OrderService orderService;
    ConverterService converterService;
    FilterService filterService;
    ImageService imageService;

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

    @GetMapping("/{id}/orders")
    public List<Order> getPlaceOrders(@PathVariable int id) {
        List<Order> allByPlace = orderService.findAllByPlace(foodPlaceService.findById(id));
        converterService.convertDishKeys(allByPlace);
        return allByPlace;
    }

    @GetMapping("/{id}/stats")
    public Map<String, Integer> getPlaceStats(@PathVariable int id, @RequestParam(required = false) String section,
                                              @RequestParam(required = false) String date) {
        List<Order> placeOrders = getPlaceOrders(id);
        FoodPlace foodPlace = foodPlaceService.findById(id);
        return filterService.getFilteredPlaceStats(foodPlace, section, date, placeOrders);
    }

    @PutMapping("/{id}/addPhoto")
    public void setPicture(@PathVariable int id, @RequestParam("file") MultipartFile file) throws IOException {
        FoodPlace place = foodPlaceService.findById(id);
        place.setPicture(file.getOriginalFilename());
        imageService.storeFile(file);
        foodPlaceService.savePlace(place);
    }
}
