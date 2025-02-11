package com.tranquilify.controller;

import com.tranquilify.service.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
public class ChatGptController {

    @Autowired
    private ChatGptService chatGptService;

    @PostMapping("/ask")
    public Mono<String> askChatGpt(@RequestBody String userMessage) {
        return chatGptService.askChatGpt(userMessage);
    }
}
