package com.project.waiterless.repository;

import com.project.waiterless.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByUsername(String username);

    Client findById(int id);
}
