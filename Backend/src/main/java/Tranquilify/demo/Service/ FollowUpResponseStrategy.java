package com.tranquilify.service;

import org.springframework.stereotype.Component;

@Component
public class FollowUpResponseStrategy implements ResponseStrategy {

    private final ChatGptService chatGptService;

    public FollowUpResponseStrategy(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @Override
    public String getResponse(String prompt) {
        return chatGptService.callChatGpt("Can you elaborate on that?"); // Follow-up question handling
    }
}
