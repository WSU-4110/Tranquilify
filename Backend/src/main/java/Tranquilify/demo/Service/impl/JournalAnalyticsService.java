package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.MoodEntity;
import Tranquilify.demo.Repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/*

This fle is voided, please do not use as it doesn't work
 */
@Service
public class JournalAnalyticsService {
    @Autowired
    private final MoodRepository moodRepository;

    public JournalAnalyticsService(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    public String analyzeUserMood(Long userId) {

        List<MoodEntity> values = moodRepository.findByUser_UserId(userId);

        int size = values.size();

        float average = 0;

        //computing rolling average of mood over a week basis

        for (int i = size - 1; i >= Math.max(0, size - 7); i--) {

            average += values.get(i).getValue();

        }

        average = average / 10.f;

        if (average >= 0.8)

            return "You are doing great, do some Gratitude journaling";

        else if (average >= 0.6)

            return "You are doing great, do some Guided Meditation, and Exercise";

        else return "hey, we have a great therapist available if you want to talk";
    }
}
