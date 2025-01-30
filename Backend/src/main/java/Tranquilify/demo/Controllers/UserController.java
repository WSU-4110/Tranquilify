package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.UserService;
import Tranquilify.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService service;

    private final JwtUtil jwtService;

    public UserController(UserService service, JwtUtil jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }

    @GetMapping("/")
    public ResponseEntity<UserEntity> getUser(@RequestBody Map<String, String> body) {

        String token = body.get("token");

        if( token != null && !token.isEmpty() ){

            Long UserId = jwtService.extractUserID(token);

            Optional<UserEntity> user = service.findUserById(UserId);

            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
        }

        return ResponseEntity.status(401).build();
    }
}
