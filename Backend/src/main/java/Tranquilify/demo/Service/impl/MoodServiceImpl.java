package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.MoodEntity;
import Tranquilify.demo.Repository.MoodRepository;
import Tranquilify.demo.Service.MoodService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoodServiceImpl implements MoodService {

    private final MoodRepository MoodRepo;

    public MoodServiceImpl(MoodRepository moodRepo) {
        MoodRepo = moodRepo;
    }
    @Override
    public List<MoodEntity> findMoodsByUserId(Long UserId) {

        return MoodRepo.findByUser_UserId(UserId);
    }

    @Override
    public Optional<MoodEntity> findMoodsById(Long MoodId) {

        return MoodRepo.findById(MoodId);
    }

    @Override
    public MoodEntity saveMood(MoodEntity Mood) {

        return MoodRepo.save(Mood);
    }

    @Override
    public void deleteMood(MoodEntity Mood) {
        MoodRepo.delete(Mood);
    }
}
