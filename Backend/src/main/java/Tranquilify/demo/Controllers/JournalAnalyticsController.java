package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.UserService;
import Tranquilify.demo.Service.impl.JournalAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/*

This fle is voided, please do not use as it doesn't work
 */
@RestController
@RequestMapping("/api/analytics")
public class JournalAnalyticsController {

    @Autowired
    private final JournalAnalyticsService journalAnalyticsService;

    @Autowired
    private final UserService userService;

    public JournalAnalyticsController(JournalAnalyticsService journalAnalyticsService, UserService userService) {
        this.journalAnalyticsService = journalAnalyticsService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<String> getUserMoodAnalysis(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        Optional<UserEntity> user = userService.findUserById(userId);

        if(user.isEmpty()) return ResponseEntity.badRequest().body("Error loading request");

        else return ResponseEntity.ok().body(journalAnalyticsService.analyzeUserMood(userId));
    }
}
