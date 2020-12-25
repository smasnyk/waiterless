package com.project.waiterless.services.impl;


import com.project.waiterless.models.Client;
import com.project.waiterless.services.ClientService;
import com.project.waiterless.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
@PropertySource("classpath:application.properties")
public class EmailServiceImpl implements EmailService {
    private final Environment environment;
    private final JavaMailSender mailSender;
    private final ClientService clientService;

    @Override
    public void sendMail(Client client) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
            mimeMessage.setFrom(environment.getProperty("spring.mail.username"));
            helper.setTo(client.getUsername());
            helper.setSubject("Registration");
            helper.setText(messageBuilder(client), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
    }

    @Override
    public String messageBuilder(Client client) {
        Client byUsername = clientService.findByUsername(client.getUsername());
        return String.format("Привіт, ласкаво просимо до waiterless! \n" +
                        "Для того, щоб завершити реєстрацію, перейди за посиланням: http://localhost:8080/user/%s/activation/%s",
                byUsername.getId(), byUsername.getToken());
    }
}
