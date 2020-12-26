package com.project.waiterless.controllers;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class WebSocketController {

    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/notification/{id}")
    public void notify(@DestinationVariable int id, String message) {
        messagingTemplate.convertAndSend("/topic/" + id, message);
    }
}
