package com.project.waiterless.controllers;

import com.project.waiterless.enums.Role;
import com.project.waiterless.models.Client;
import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.models.Order;
import com.project.waiterless.services.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class ClientController {
    ClientService clientService;
    PasswordEncoder passwordEncoder;
    EmailService emailService;
    OrderService orderService;
    ConverterService converterService;
    FilterService filterService;
    FoodPlaceService placeService;

    @PostMapping("/signUp")
    public Client saveClient(@RequestBody Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        client.setToken(UUID.randomUUID().toString());
        client.setRole(Role.ROLE_USER);
        clientService.saveClient(client);
        emailService.sendMail(client);
        return client;
    }

    @GetMapping("/{id}/activation/{confirmation}")
    public Client activateClient(@PathVariable int id, @PathVariable String confirmation) {
        Client client = clientService.findById(id);
        if (client != null && client.getToken().equals(confirmation)) {
            client.setToken(null);
            clientService.saveClient(client);
        } else System.out.println("Something went wrong, Please try again.");
        return client;
    }

    @PutMapping("/{id}/editUser")
    public Client editClient(@PathVariable int id, @RequestBody Client client) {
        Client byId = clientService.findById(id);
        byId.setName(client.getName());
        byId.setSex(client.getSex());
        clientService.saveClient(byId);
        return byId;
    }

    @GetMapping("/{id}/orders")
    public List<Order> getClientOrders(@PathVariable int id) {
        List<Order> allByClient = orderService.findAllByClient(clientService.findById(id));
        converterService.convertDishKeys(allByClient);
        return allByClient;
    }

    @GetMapping("/{id}/stats")
    public Map<String, Integer> getClientStats(@PathVariable int id, @RequestParam(required = false) String place) {
        List<Order> clientOrders = getClientOrders(id);
        Client client = clientService.findById(id);
        FoodPlace foodPlace = null;
        if (place != null) foodPlace = placeService.findById(Integer.parseInt(place));
        return filterService.getFilteredClientStats(client, foodPlace, clientOrders);
    }
}
