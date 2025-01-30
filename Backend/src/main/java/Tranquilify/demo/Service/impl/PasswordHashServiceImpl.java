package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Service.PasswordHashService;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;

@Service
public class PasswordHashServiceImpl implements PasswordHashService {

    @Override
    public String getHashedPass(String password) {

        try{

            final MessageDigest digest = MessageDigest.getInstance("SHA-256");

            final byte[] hash = digest.digest(password.getBytes());

            final StringBuilder hexString = new StringBuilder();

            for (byte b : hash) {

                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();

        }
        catch(Exception ex){

            throw new RuntimeException(ex);
        }
    }
}
