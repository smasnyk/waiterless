package com.project.waiterless.services.impl;

import com.project.waiterless.models.Client;
import com.project.waiterless.repository.ClientRepository;
import com.project.waiterless.services.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String userMail) throws UsernameNotFoundException {
        return clientRepository.findByUsername(userMail);
    }

    @Override
    public void saveClient(Client client) {
        if (client != null)
            clientRepository.saveAndFlush(client);
    }

    @Override
    public Client findById(int id) {
        return clientRepository.findById(id);
    }

    @Override
    public Client findByUsername(String username) {
        return clientRepository.findByUsername(username);
    }
}
