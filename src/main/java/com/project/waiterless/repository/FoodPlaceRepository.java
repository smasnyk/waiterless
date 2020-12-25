package com.project.waiterless.repository;

import com.project.waiterless.models.FoodPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface FoodPlaceRepository extends JpaRepository<FoodPlace, Integer> {
    FoodPlace findById(int id);

    List<FoodPlace> findAll();

    UserDetails findByUsername(String mail);
}
