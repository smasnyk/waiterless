package com.project.waiterless.repository;

import com.project.waiterless.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    List<User> findAll();

    User findById(int id);
}
