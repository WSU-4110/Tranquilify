package Tranquilify.demo.Repository;

import Tranquilify.demo.Entities.ZoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoomRepository extends JpaRepository<ZoomEntity, Long> {

    List<ZoomEntity> findByUser_UserId(Long UserId);
}
