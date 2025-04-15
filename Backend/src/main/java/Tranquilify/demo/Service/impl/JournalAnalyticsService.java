package com.tranquilify.demo.Service;

import com.tranquilify.demo.Entities.JournalEntryEntity;
import com.tranquilify.demo.Repository.JournalEntryRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
/*

This fle is voided, please do not use as it doesn't work
 */
@Service
public class JournalAnalyticsService {

    private final JournalEntryRepository journalEntryRepository;

    public JournalAnalyticsService(JournalEntryRepository journalEntryRepository) {
        this.journalEntryRepository = journalEntryRepository;
    }

    public Map<String, Integer> analyzeUserMood(String userId) {
        List<JournalEntryEntity> entries = journalEntryRepository.findByUserId(userId);
        Map<String, Integer> moodCount = new HashMap<>();

        List<String> positiveWords = Arrays.asList("happy", "joy", "excited", "grateful");
        List<String> negativeWords = Arrays.asList("sad", "angry", "depressed", "stressed");

        for (JournalEntryEntity entry : entries) {
            String content = entry.getContent().toLowerCase();
            for (String word : positiveWords) {
                if (content.contains(word)) {
                    moodCount.put("positive", moodCount.getOrDefault("positive", 0) + 1);
                }
            }
            for (String word : negativeWords) {
                if (content.contains(word)) {
                    moodCount.put("negative", moodCount.getOrDefault("negative", 0) + 1);
                }
            }
        }
        return moodCount;
    }

    public List<String> getSuggestedResources(String userId) {
        Map<String, Integer> moodAnalysis = analyzeUserMood(userId);
        List<String> recommendations = new ArrayList<>();

        if (moodAnalysis.getOrDefault("negative", 0) > moodAnalysis.getOrDefault("positive", 0)) {
            recommendations.add("Guided Meditation");
            recommendations.add("Talk to a Therapist");
        } else {
            recommendations.add("Gratitude Journaling");
            recommendations.add("Exercise Routines");
        }

        return recommendations;
    }
}
