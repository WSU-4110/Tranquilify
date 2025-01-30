package Tranquilify.demo.Repository;

import Tranquilify.demo.Entities.NotesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<NotesEntity, Long> {

    List<NotesEntity> findByUser_UserId(Long UserId);
}
