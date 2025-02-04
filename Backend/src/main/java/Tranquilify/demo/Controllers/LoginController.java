package Tranquilify.demo.Controllers;

import Tranquilify.demo.DTO.LoginRequest;
import Tranquilify.demo.DTO.SignUpRequest;
import Tranquilify.demo.Entities.LoginEntity;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.LoginService;
import Tranquilify.demo.Service.PasswordHashService;
import Tranquilify.demo.Service.UserService;
import Tranquilify.demo.Util.JwtUtil;
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

    private final PasswordHashService passwordService;

    private final JwtUtil jwtService;

    public LoginController(UserService userService, LoginService loginService, PasswordHashService passwordService, JwtUtil jwtService) {
        this.userService = userService;
        this.loginService = loginService;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
    }

    @GetMapping("/sign_in")
    public ResponseEntity<String> getLogin(@RequestBody LoginRequest temp){

        Optional<LoginEntity> loginInfo = loginService.findByEmail(temp.getEmail());

        if (loginInfo.isEmpty()) return new ResponseEntity<>("Sorry, no user found", HttpStatus.NOT_FOUND);

        else{

            String p1 = passwordService.getHashedPass(temp.getPassword());

            String p2 = loginInfo.get().getPassword();

            if (p1.equals(p2)) {

                UserEntity user = loginInfo.get().getUser();

                Long userId = user.getUserId();

                String token = jwtService.generateAccessToken(user.getUserId());

                return new ResponseEntity<>(token, HttpStatus.OK);
            }

            else return new ResponseEntity<>("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }
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

        String hashPassword = passwordService.getHashedPass(temp.getPassword());

        newLogin.setEmail(temp.getEmail()); newLogin.setPassword(hashPassword);

        newLogin.setUser(newUser);

        loginService.saveLogin(newLogin);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully. Please go back to sign in page and try again");
    }
}
