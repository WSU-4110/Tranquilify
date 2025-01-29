package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Repository.UserRepository;
import Tranquilify.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository UserRepo;

    public UserServiceImpl(UserRepository UserRepo) {
        this.UserRepo = UserRepo;
    }

    @Override
    public Optional<UserEntity> findUserById(Long UserId) {
        return UserRepo.findById(UserId);
    }

    @Override
    public UserEntity saveUser(UserEntity User) {
        return UserRepo.save(User);
    }

    @Override
    public void deleteUser(UserEntity User) {
        UserRepo.delete(User);
    }
}
