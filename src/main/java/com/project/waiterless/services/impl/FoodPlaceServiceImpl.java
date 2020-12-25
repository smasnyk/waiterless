package com.project.waiterless.services.impl;

import com.project.waiterless.models.FoodPlace;
import com.project.waiterless.repository.FoodPlaceRepository;
import com.project.waiterless.services.FoodPlaceService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FoodPlaceServiceImpl implements FoodPlaceService {
    FoodPlaceRepository foodPlaceRepository;

    @Override
    public void savePlace(FoodPlace place) {
        if (place != null)
            foodPlaceRepository.saveAndFlush(place);
    }

    @Override
    public List<FoodPlace> findAll() {
        return foodPlaceRepository.findAll();
    }

    @Override
    public FoodPlace findById(int id) {
        return foodPlaceRepository.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        return foodPlaceRepository.findByUsername(mail);
    }
}
