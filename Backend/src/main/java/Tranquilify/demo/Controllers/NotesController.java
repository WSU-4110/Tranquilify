package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.NotesEntity;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.NoteService;
import Tranquilify.demo.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("api/notes")
public class NotesController {

    private final NoteService noteService;
    private final UserService userService;

    public NotesController(NoteService noteService, UserService userService) {
        this.noteService = noteService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<NotesEntity>> getNotes(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        List<NotesEntity> notes = noteService.findNotesByUserId(userId);

        return ResponseEntity.ok(notes);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNote(@RequestBody Map<String, String> body, Authentication authentication) {

        String content = body.get("content");

        if (content != null && !content.isEmpty()) {

            Long userId = (Long) authentication.getPrincipal();

            Optional<UserEntity> user = userService.findUserById(userId);

            if (user.isPresent()) {
                NotesEntity note = new NotesEntity();
                note.setContent(content);
                note.setUser(user.get());
                note.setDate(new Date());
                noteService.saveNote(note);

                return ResponseEntity.ok("Note added successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteNote(@RequestBody Map<String, String> body, Authentication authentication){

        String noteId = body.get("id");

        if( noteId == null || noteId.isEmpty()  ) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Notes id doesn't exist");

        Optional<NotesEntity> note = noteService.findNotesById(Long.parseLong(noteId));

        if( note.isEmpty() ) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Notes with id: " + noteId + " doesn't exist");

        noteService.deleteNote(note.get());

        return ResponseEntity.status(HttpStatus.OK).body("Note deleted");
    }
}
