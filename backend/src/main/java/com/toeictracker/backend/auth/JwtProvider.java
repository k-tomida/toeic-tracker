package com.toeictracker.backend.auth;

import com.toeictracker.backend.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {

    private final SecretKey key;
    private final long expiration;

    public JwtProvider(
            @Value("${jwt.key}") String secret,
            @Value("${jwt.expiration}") long expiration
    ) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.expiration = expiration;
    }
    /**
     * JWT生成
     */
    public String generateToken(User user) {

        Date now = new Date();

        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(key)
                .compact();
    }

    /**
     * JWTからメールアドレス取得
     */
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * JWTが有効か確認
     */
    public boolean isValid(String token) {

        try {
            return !extractClaims(token)
                    .getExpiration()
                    .before(new Date());

        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Claims取得
     */
    private Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}