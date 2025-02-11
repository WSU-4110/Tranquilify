package com.tranquilify.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatGptService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private final String API_KEY = "YOUR_OPENAI_API_KEY";

    public List<String> getResponse(String userMessage) {

        List<String> responses = new ArrayList<>();

        responses.add(callChatGpt(userMessage));
        responses.add(callChatGpt("Can you elaborate on that?"));
        responses.add(callChatGpt("How does that make you feel?"));

        return responses;
    }

    private String callChatGpt(String prompt) {

        String requestJson = "{ \"model\": \"gpt-4\", \"messages\": [{\"role\": \"system\", \"content\": \"You are a therapist.\"}, {\"role\": \"user\", \"content\": \"" + prompt + "\"}], \"temperature\": 0.7 }";


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);


        HttpEntity<String> request = new HttpEntity<>(requestJson, headers);
        ResponseEntity<String> response = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, request, String.class);

        JsonNode root = new ObjectMapper().readTree(response.getBody());
        return root.path("choices").get(0).path("message").path("content").asText();
    }
}
