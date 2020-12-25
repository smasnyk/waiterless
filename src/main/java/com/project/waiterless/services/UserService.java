package com.project.waiterless.services;

import com.project.waiterless.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    User findAuthenticatedUser();
}
