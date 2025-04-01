package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.NotesEntity;
import Tranquilify.demo.Repository.NoteRepository;
import Tranquilify.demo.Service.NoteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository NoteRepo;

    public NoteServiceImpl(NoteRepository noteRepo) {
        NoteRepo = noteRepo;
    }

    @Override
    public List<NotesEntity> findNotesByUserId(Long UserId) {

        return NoteRepo.findByUser_UserId(UserId);
    }

    @Override
    public Optional<NotesEntity> findNotesById(Long noteId) {

        return NoteRepo.findById(noteId);
    }

    @Override
    public NotesEntity saveNote(NotesEntity Note) {
        return NoteRepo.save(Note);
    }

    @Override
    public void deleteNote(NotesEntity Note) {

        NoteRepo.delete(Note);
    }
}
