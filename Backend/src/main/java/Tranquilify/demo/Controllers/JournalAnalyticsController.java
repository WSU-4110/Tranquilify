package com.tranquilify.demo.Controllers;

import com.tranquilify.demo.Service.JournalAnalyticsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class JournalAnalyticsController {

    private final JournalAnalyticsService journalAnalyticsService;

    public JournalAnalyticsController(JournalAnalyticsService journalAnalyticsService) {
        this.journalAnalyticsService = journalAnalyticsService;
    }

    @GetMapping("/mood/{userId}")
    public Map<String, Integer> getUserMoodAnalysis(@PathVariable String userId) {
        return journalAnalyticsService.analyzeUserMood(userId);
    }

    @GetMapping("/recommendations/{userId}")
    public List<String> getRecommendations(@PathVariable String userId) {
        return journalAnalyticsService.getSuggestedResources(userId);
    }
}
