package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.LoginEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
public interface LoginService {

    Optional<LoginEntity> findByEmail(String Email);

    LoginEntity saveLogin(LoginEntity Login);

    void deleteLogin(LoginEntity Login);
}
