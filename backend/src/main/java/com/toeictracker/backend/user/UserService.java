package com.toeictracker.backend.user;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdatePasswordRequest;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Cacheable("getUser")
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("ユーザーが見つかりません"));
    }

    @CacheEvict(value = "getUser", key = "#email")
    public User updateTargetScoreAndNextExam(String email, UpdateTargetScoreAndNextExamRequest request) {
        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        user.setTargetScore(request.targetScore());
        user.setNextExamDate(request.nextExamDate());

        return userRepository.save(user);
    }

    @CacheEvict(value = "getUser", key="#email")
    public AuthResponse updatePassword(String email, UpdatePasswordRequest request){
        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new InvalidCurrentPasswordException("現在のパスワードが正しくありません");
        }

        if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
            throw new SamePasswordException("現在のパスワードと異なるパスワードを設定してください");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        String token = jwtProvider.generateToken(user);
        return new AuthResponse(token);
    }

    @CacheEvict(value = "getUser", key="#email")
    public User updateName(String email, String name){
        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        user.setName(name);
        return userRepository.save(user);
    }
}