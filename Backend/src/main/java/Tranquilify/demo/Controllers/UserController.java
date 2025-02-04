package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<UserEntity> getUser(@RequestBody Map<String, String> body) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getPrincipal();

        Optional<UserEntity> user = service.findUserById(userId);

        return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
