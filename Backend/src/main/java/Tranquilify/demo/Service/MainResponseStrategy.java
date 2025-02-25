package com.tranquilify.service;

import org.springframework.stereotype.Component;

@Component
public class MainResponseStrategy implements ResponseStrategy {

    private final ChatGptService chatGptService;

    public MainResponseStrategy(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @Override
    public String getResponse(String prompt) {
        return chatGptService.callChatGpt(prompt); // Main response handling
    }
}
