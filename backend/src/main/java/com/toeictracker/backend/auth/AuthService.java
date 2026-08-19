package com.toeictracker.backend.auth;

import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.auth.dto.LoginRequest;
import com.toeictracker.backend.auth.dto.RegisterRequest;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    /**
     * ユーザー登録
     */
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException("メールアドレスは既に登録されています。");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setName(request.name());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setTargetScore(request.targetScore());
        user.setNextExamDate(request.nextExamDate());

        userRepository.save(user);

        String token = jwtProvider.generateToken(user);

        return new AuthResponse(token);
    }

    /**
     * ログイン
     */
    public AuthResponse login(LoginRequest request){

        // AuthenticationManagerに検証を委譲する
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 認証成功後、DBからUserエンティティを取得する
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("ユーザーが見つかりません"));

        String token = jwtProvider.generateToken(user);
        return new AuthResponse(token);
    }
}
