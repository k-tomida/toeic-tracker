package com.toeictracker.backend.user;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdatePasswordRequest;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private static final String DEMO_USER_EMAIL = "test@example.com";

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
        if (DEMO_USER_EMAIL.equals(email)) {
            throw new AccessDeniedException("デモアカウントではアカウント情報を変更できません");
        }

        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new InvalidCurrentPasswordException("現在のパスワードが正しくありません");
        }

        if (!request.newPassword().equals(request.confirmPassword())) {
            throw new PasswordMismatchException("新しいパスワードと確認用パスワードが一致しません");
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
        if (DEMO_USER_EMAIL.equals(email)) {
            throw new AccessDeniedException("デモアカウントではアカウント情報を変更できません");
        }

        User user =userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        user.setName(name);
        return userRepository.save(user);
    }
}