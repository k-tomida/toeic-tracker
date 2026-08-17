package com.toeictracker.backend.auth;

import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.auth.dto.LoginRequest;
import com.toeictracker.backend.auth.dto.RegisterRequest;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import java.time.LocalDate;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_正常にユーザーを登録できる() {
        // given
        RegisterRequest request = new RegisterRequest(
                "test@example.com",
                "kenta",
                "password123",
                800,
                LocalDate.of(2026, 12, 1)
        );

        when(userRepository.existsByEmail(request.email()))
                .thenReturn(false);

        when(passwordEncoder.encode(request.password()))
                .thenReturn("encodedPassword");

        when(jwtProvider.generateToken(any(User.class)))
                .thenReturn("test-token");

        // when
        AuthResponse response = authService.register(request);

        // then
        verify(userRepository).save(argThat(user ->
                user.getEmail().equals("test@example.com") &&
                        user.getName().equals("kenta") &&
                        user.getPassword().equals("encodedPassword") &&
                        user.getTargetScore() == 800 &&
                        user.getNextExamDate().equals(LocalDate.of(2026, 12, 1))
        ));

        assertEquals("test-token", response.token());
    }

    @Test
    void register_既に登録済みのメールアドレスの場合は例外をスローする() {
        // given
        RegisterRequest request = new RegisterRequest(
                "test@example.com",
                "kenta",
                "password123",
                800,
                LocalDate.of(2026, 12, 1)
        );
        when(userRepository.existsByEmail(request.email())).thenReturn(true);

        // when & then
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(EmailAlreadyExistsException.class);
    }

    @Test
    void login_正常にログインできる() {
        // given
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "password123"
        );

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        null
                );

        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenReturn(authentication);

        when(userRepository.findByEmail(request.email()))
                .thenReturn(Optional.of(user));

        when(jwtProvider.generateToken(user))
                .thenReturn("test-token");

        // when
        AuthResponse response = authService.login(request);

        // then
        assertEquals("test-token", response.token());
    }

    @Test
    void login_認証に失敗した場合は例外をスローする() {
        // given
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "wrongPassword"
        );

        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenThrow(new BadCredentialsException("認証に失敗しました"));

        // when & then
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void login_認証成功後にユーザーが存在しない場合は例外をスローする() {
        // given
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "password123"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        null
                );

        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenReturn(authentication);

        when(userRepository.findByEmail(request.email()))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(UserNotFoundException.class);
    }

}