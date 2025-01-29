package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.UserEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
public interface UserService {

    Optional<UserEntity> findUserById(Long UserId);

    UserEntity saveUser(UserEntity User);

    void deleteUser(UserEntity User);
}
