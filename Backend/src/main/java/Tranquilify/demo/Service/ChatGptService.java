package com.tranquilify.service;

import com.tranquilify.dto.ChatGptRequestDTO;
import com.tranquilify.dto.ChatGptResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Collections;

@Service
public class ChatGptService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public ChatGptService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public Mono<String> askChatGpt(String userMessage) {
        ChatGptRequestDTO request = new ChatGptRequestDTO(
                "gpt-3.5-turbo",
                Collections.singletonList(new ChatGptRequestDTO.Message("user", userMessage)),
                100
        );

        return webClient.post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatGptResponseDTO.class)
                .map(response -> response.getChoices().get(0).getMessage().getContent());
    }
}
