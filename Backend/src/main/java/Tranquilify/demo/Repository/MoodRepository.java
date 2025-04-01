package Tranquilify.demo.Repository;

import Tranquilify.demo.Entities.MoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoodRepository extends JpaRepository<MoodEntity, Long> {

    List<MoodEntity> findByUser_UserId(Long UserId);
}
