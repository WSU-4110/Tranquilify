package Tranquilify.demo.Util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
@Service
public class JwtUtil {

    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

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

    public boolean validateToken(String token, Long userID) {

        return (userID.equals(extractUserID(token)));
    }
}
