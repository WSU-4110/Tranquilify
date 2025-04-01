package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.MoodEntity;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.MoodService;
import Tranquilify.demo.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
@RequestMapping("api/mood")
public class MoodController {

    private final MoodService moodService;
    private final UserService userService;

    public MoodController(MoodService moodService, UserService userService) {

        this.moodService = moodService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<MoodEntity>> getNotes(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        List<MoodEntity> moods = moodService.findMoodsByUserId(userId);

        return ResponseEntity.ok(moods);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNote(@RequestBody Map<String, String> body, Authentication authentication) {

        String value = body.get("value");

        if (value != null && !value.isEmpty()) {

            Long val = Long.parseLong(value);

            if(val == 0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't add mood");

            Long userId = (Long) authentication.getPrincipal();

            Optional<UserEntity> user = userService.findUserById(userId);

            if (user.isPresent()) {

                MoodEntity mood = new MoodEntity();
                mood.setValue(val);
                mood.setUser(user.get());
                mood.setDate(new Date());
                moodService.saveMood(mood);

                return ResponseEntity.ok("Mood added successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }
}
