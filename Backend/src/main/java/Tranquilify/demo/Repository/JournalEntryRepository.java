package com.tranquilify.demo.Repository;

import com.tranquilify.demo.Entities.JournalEntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntryEntity, Long> {
    List<JournalEntryEntity> findByUserId(String userId);
}
