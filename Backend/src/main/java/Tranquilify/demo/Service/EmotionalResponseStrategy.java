package com.tranquilify.service;

import org.springframework.stereotype.Component;

@Component
public class EmotionalResponseStrategy implements ResponseStrategy {

    private final ChatGptService chatGptService;

    public EmotionalResponseStrategy(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @Override
    public String getResponse(String prompt) {
        return chatGptService.callChatGpt("How does that make you feel?"); // Emotional response handling
    }
}
