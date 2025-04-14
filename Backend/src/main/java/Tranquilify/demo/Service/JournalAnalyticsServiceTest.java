package com.tranquilify.demo.Service;

import com.tranquilify.demo.Entities.JournalEntryEntity;
import com.tranquilify.demo.Repository.JournalEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class JournalAnalyticsServiceTest {

    private JournalAnalyticsService service;

    private static class FakeJournalEntryRepository implements JournalEntryRepository {
        private final List<JournalEntryEntity> data;

        public FakeJournalEntryRepository(List<JournalEntryEntity> data) {
            this.data = data;
        }

        @Override
        public List<JournalEntryEntity> findByUserId(String userId) {
            return data;
        }
    }

    @BeforeEach
    void setup() {
        List<JournalEntryEntity> fakeEntries = new ArrayList<>();
        JournalEntryEntity entry1 = new JournalEntryEntity();
        entry1.setContent("I feel happy and grateful today.");
        JournalEntryEntity entry2 = new JournalEntryEntity();
        entry2.setContent("I am sad and stressed out.");
        fakeEntries.add(entry1);
        fakeEntries.add(entry2);

        service = new JournalAnalyticsService(new FakeJournalEntryRepository(fakeEntries));
    }

    @Test
    void testAnalyzeUserMood() {
        Map<String, Integer> result = service.analyzeUserMood("testUser");
        assertEquals(2, result.get("positive"));
        assertEquals(2, result.get("negative"));
    }

    @Test
    void testGetSuggestedResources_negativeDominant() {
        List<String> result = service.getSuggestedResources("testUser");
        assertTrue(result.contains("Talk to a Therapist"));
        assertTrue(result.contains("Guided Meditation"));
    }

    @Test
    void testAnalyzeUserMood_noMoodsDetected() {
        List<JournalEntryEntity> entries = new ArrayList<>();
        JournalEntryEntity entry = new JournalEntryEntity();
        entry.setContent("This is just a regular day.");
        entries.add(entry);

        service = new JournalAnalyticsService(new FakeJournalEntryRepository(entries));
        Map<String, Integer> result = service.analyzeUserMood("testUser");
        assertTrue(result.isEmpty());
    }

    @Test
    void testAnalyzeUserMood_allPositive() {
        List<JournalEntryEntity> entries = new ArrayList<>();
        JournalEntryEntity entry = new JournalEntryEntity();
        entry.setContent("Feeling happy, grateful, and excited!");
        entries.add(entry);

        service = new JournalAnalyticsService(new FakeJournalEntryRepository(entries));
        Map<String, Integer> result = service.analyzeUserMood("testUser");
        assertEquals(3, result.get("positive"));
        assertNull(result.get("negative"));
    }

    @Test
    void testGetSuggestedResources_positiveDominant() {
        List<JournalEntryEntity> entries = new ArrayList<>();
        JournalEntryEntity entry = new JournalEntryEntity();
        entry.setContent("I feel happy, grateful, and joyful!");
        entries.add(entry);

        service = new JournalAnalyticsService(new FakeJournalEntryRepository(entries));
        List<String> result = service.getSuggestedResources("testUser");
        assertTrue(result.contains("Gratitude Journaling"));
        assertTrue(result.contains("Exercise Routines"));
    }

    @Test
    void testAnalyzeUserMood_emptyList() {
        List<JournalEntryEntity> entries = new ArrayList<>();
        service = new JournalAnalyticsService(new FakeJournalEntryRepository(entries));
        Map<String, Integer> result = service.analyzeUserMood("testUser");
        assertTrue(result.isEmpty());
    }
}
