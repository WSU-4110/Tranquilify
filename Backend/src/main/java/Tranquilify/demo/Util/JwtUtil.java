package Tranquilify.demo.Util;

import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Service.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtUtil {

    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Autowired
    private UserService userService;

    public JwtUtil(UserService userService) {
        this.userService = userService;
    }

    public String generateAccessToken(Long userID) {
        return Jwts.builder()

                .setSubject(String.valueOf(userID))

                .setIssuedAt(new Date())

                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))

                .signWith(secretKey)

                .compact();
    }

    public String generateRefreshToken(Long userID) {

        return Jwts.builder()

                .setSubject(String.valueOf(userID))

                .setIssuedAt(new Date())

                .setExpiration(new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000))

                .signWith(secretKey)

                .compact();
    }


    public Long extractUserID(String token) {

        return Long.valueOf(Jwts.parser()

                .setSigningKey(secretKey)

                .build()

                .parseClaimsJws(token)

                .getBody()

                .getSubject());
    }

    public boolean validateToken(String token) {

        Optional<UserEntity> user = userService.findUserById(extractUserID(token));

        return user.isEmpty() ? false : true;
    }
}
