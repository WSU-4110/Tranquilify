package Tranquilify.demo.Controllers;

import Tranquilify.demo.DTO.LoginRequest;
import Tranquilify.demo.DTO.SignUpRequest;
import Tranquilify.demo.Entities.LoginEntity;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.LoginService;
import Tranquilify.demo.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    private final LoginService loginService;

    public LoginController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @GetMapping("/sign_in")
    public ResponseEntity<LoginEntity> getLogin(@RequestBody LoginRequest temp){

        Optional<LoginEntity> loginInfo = loginService.findByEmail(temp.getEmail());

        return loginInfo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/sign_up")
    public ResponseEntity<String> userSignup(@RequestBody SignUpRequest temp) {

        Optional<LoginEntity> existingLogin = loginService.findByEmail(temp.getEmail());

        if (existingLogin.isPresent()) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists.");
        }

        UserEntity newUser = new UserEntity();

        newUser.setFirstName(temp.getFirstName()); newUser.setLastName(temp.getLastName());

        userService.saveUser(newUser);

        LoginEntity newLogin = new LoginEntity();

        newLogin.setEmail(temp.getEmail()); newLogin.setPassword(temp.getPassword());

        newLogin.setUser(newUser);

        loginService.saveLogin(newLogin);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully. Please go back to sign in page and try again");
    }
}
