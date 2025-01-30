package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.NotesEntity;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.NoteService;
import Tranquilify.demo.Service.UserService;
import Tranquilify.demo.Util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/notes")
public class NotesController {

    private final NoteService noteService;

    private final JwtUtil jwtService;

    private final UserService userService;

    public NotesController(NoteService noteService, JwtUtil jwtService, UserService userService) {
        this.noteService = noteService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<NotesEntity>> getNotes(@RequestBody Map<String, String> body){

        String token = body.get("token");

        if(token != null && !token.isEmpty()){

            Long UserId = jwtService.extractUserID(token);

            List<NotesEntity> notes = noteService.findNotesById(UserId);

            if (notes.isEmpty()) {

                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(notes);
        }

        return ResponseEntity.badRequest().build() ;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNote(@RequestBody Map<String, String> body){

        String content = body.get("content");

        String token = body.get("token");

        if(token != null && !token.isEmpty() && content != null && !content.isEmpty()){

            Long UserId = jwtService.extractUserID(token);

            Optional<UserEntity> user = userService.findUserById(UserId);

            NotesEntity note = new NotesEntity();

            note.setContent(content);  note.setUser(user.get());

            noteService.saveNote(note);

            return ResponseEntity.ok("Note added successfully");
        }

        return ResponseEntity.badRequest().build() ;
    }
}


