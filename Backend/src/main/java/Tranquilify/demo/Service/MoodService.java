package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.MoodEntity;
import java.util.List;
import java.util.Optional;

public interface MoodService {

    List<MoodEntity> findMoodsByUserId(Long UserId);

    Optional<MoodEntity> findMoodsById(Long MoodId);
    MoodEntity saveMood(MoodEntity Note);

    void deleteMood(MoodEntity Note);
}
