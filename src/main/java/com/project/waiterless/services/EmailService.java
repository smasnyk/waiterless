package com.project.waiterless.services;

import com.project.waiterless.models.Client;

public interface EmailService {
    void sendMail(Client client);

    String messageBuilder(Client client);
}
