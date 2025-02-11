package com.example.chatbot.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatGptController {

    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping("/ask")
    public ResponseEntity<List<String>> askChatGPT(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");


        List<String> responses = new ArrayList<>();
        responses.add(chatGptService.getResponse(userMessage)); // Main response
        responses.add(chatGptService.getResponse("Can you elaborate on that?")); // Follow-up prompt
        responses.add(chatGptService.getResponse("How does that make you feel?")); // Emotional prompt

        return ResponseEntity.ok(responses);
    }
}
