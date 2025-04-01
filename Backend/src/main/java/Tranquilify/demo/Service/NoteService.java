package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.NotesEntity;

import java.util.List;
import java.util.Optional;

public interface NoteService {

    List<NotesEntity> findNotesByUserId(Long UserId);

    Optional<NotesEntity> findNotesById(Long noteId);
    NotesEntity saveNote(NotesEntity Note);

    void deleteNote(NotesEntity Note);
}
