package Tranquilify.demo.Controller;

import Tranquilify.demo.Service.SuggestionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suggestion")
public class SuggestionController {

    private final SuggestionService suggestionService;

    public SuggestionController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    @GetMapping
    public String getSuggestion(@RequestParam String query) {
        return suggestionService.getSuggestion(query);
    }
}
