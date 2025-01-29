package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.LoginEntity;
import Tranquilify.demo.Repository.LoginRepository;
import Tranquilify.demo.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository LoginRepo;
    @Override
    public Optional<LoginEntity> findByEmail(String Email) {

        return LoginRepo.findByEmail(Email);

    }

    @Override
    public LoginEntity saveLogin(LoginEntity Login) {

        return LoginRepo.save(Login);
    }

    @Override
    public void deleteLogin(LoginEntity Login) {

        LoginRepo.delete(Login);
    }
}
