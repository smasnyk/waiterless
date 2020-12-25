package com.project.waiterless.services;

import com.project.waiterless.models.Client;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface ClientService extends UserDetailsService {
    void saveClient(Client client);

    Client findById(int id);

    Client findByUsername(String username);
}
