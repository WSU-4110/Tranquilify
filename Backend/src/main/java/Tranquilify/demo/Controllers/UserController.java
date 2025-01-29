package Tranquilify.demo.Controllers;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{UserId}")
    public ResponseEntity<UserEntity> getUser(@PathVariable("UserId") Long UserId) {

        Optional<UserEntity> user = service.findUserById(UserId);

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
