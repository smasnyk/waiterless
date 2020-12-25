package com.project.waiterless.services;

import com.project.waiterless.models.FoodPlace;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface FoodPlaceService extends UserDetailsService {
    void savePlace(FoodPlace place);

    List<FoodPlace> findAll();

    FoodPlace findById(int id);
}
