package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.NotesEntity;
import Tranquilify.demo.Entities.UserEntity;

import java.util.List;

public interface NoteService {

    List<NotesEntity> findNotesById(Long UserId);
    NotesEntity saveNote(NotesEntity Note);

    void deleteUser(NotesEntity Note);
}
