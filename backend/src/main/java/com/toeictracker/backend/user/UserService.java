package com.toeictracker.backend.user;

import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Cacheable("getUser")
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
    }

    @CacheEvict(value = "getUser", allEntries = true)
    public User updateTargetScoreAndNextExam(String email, UpdateTargetScoreAndNextExamRequest request) {
        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));

        user.setTargetScore(request.targetScore());
        user.setNextExamDate(request.nextExamDate());

        return userRepository.save(user);
    }

    @CacheEvict(value = "getUser", allEntries = true)
    public void updatePassword(String email, String password){
        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}