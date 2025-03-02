package Tranquilify.demo.Service;

import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.CompletionChoice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SuggestionService {

    private final OpenAiService openAiService;

    public SuggestionService(@Value("${openai.api.key}") String apiKey) {
        this.openAiService = new OpenAiService(apiKey);
    }

    public String getSuggestion(String prompt) {
        CompletionRequest request = CompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .prompt(prompt)
                .maxTokens(100)
                .temperature(0.7)
                .build();

        List<CompletionChoice> choices = openAiService.createCompletion(request).getChoices();
        return choices.isEmpty() ? "No suggestions available" : choices.get(0).getText();
    }
}
