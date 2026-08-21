package com.toeictracker.backend.user;

import com.toeictracker.backend.auth.AuthService;
import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdatePasswordRequest;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private UserService userService;

    @Test
    void getUser_正常にユーザー情報を取得できる() {
        // given
        String email="test@example.com";

        User user= new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        //when
        User result=userService.getUser(email);

        //then
        assertThat(result.getEmail()).isEqualTo(email);
        verify(userRepository).findByEmail(email);
    }

    @Test
    void getUser_ユーザーが存在しないときは例外をスローする() {
        // given
        String email = "test@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.getUser(email))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(userRepository).findByEmail(email);
    }

    @Test
    void updateTargetScoreAndNextExam_正常に更新できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setTargetScore(700);
        user.setNextExamDate(LocalDate.of(2026, 9, 1));

        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        900,
                        LocalDate.of(2026, 12, 1)
                );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(userRepository.save(user))
                .thenReturn(user);

        // when
        User result = userService.updateTargetScoreAndNextExam(email, request);

        // then
        assertThat(result.getTargetScore()).isEqualTo(900);
        assertThat(result.getNextExamDate())
                .isEqualTo(LocalDate.of(2026, 12, 1));

        verify(userRepository).findByEmail(email);
        verify(userRepository).save(user);
    }

    @Test
    void updateTargetScoreAndNextExam_ユーザーが存在しないときは例外をスローする() {
        // given
        String email = "test@example.com";

        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        900,
                        LocalDate.of(2026, 12, 1)
                );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.updateTargetScoreAndNextExam(email, request))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(userRepository).findByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updatePassword_正常に更新できる() {
        //given
        String email ="kenta@example.com";

        User user=new User();
        user.setPassword("encodedOldPassword");

        UpdatePasswordRequest request=new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                "newPassword"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("oldPassword", "encodedOldPassword"))
                .thenReturn(true);

        when(passwordEncoder.matches("newPassword", "encodedOldPassword"))
                .thenReturn(false);

        when(passwordEncoder.encode("newPassword"))
                .thenReturn("encodedNewPassword");

        when(jwtProvider.generateToken(user))
                .thenReturn("new-token");

        // when
        AuthResponse response = userService.updatePassword(email, request);

        // then
        assertThat(response.token()).isEqualTo("new-token");
        assertThat(user.getPassword()) .isEqualTo("encodedNewPassword");

        verify(userRepository).save(user);
        verify(jwtProvider).generateToken(user);
    }

    @Test
    void updatePassword_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "kenta@example.com";

        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                "newPassword"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.updatePassword(email, request))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(userRepository).findByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updatePassword_現在のパスワードが間違っている場合は例外をスローする() {
        // given
        String email = "kenta@example.com";

        User user = new User();
        user.setPassword("encodedOldPassword");

        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "wrongPassword",
                "newPassword",
                "newPassword"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("wrongPassword", "encodedOldPassword"))
                .thenReturn(false);

        // when & then
        assertThatThrownBy(() -> userService.updatePassword(email, request))
                .isInstanceOf(InvalidCurrentPasswordException.class);

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updatePassword_新しいパスワードと確認用パスワードが一致しない場合は例外をスローする() {
        // given
        String email = "kenta@example.com";

        User user = new User();
        user.setPassword("encodedOldPassword");

        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                "differentPassword"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("oldPassword", "encodedOldPassword"))
                .thenReturn(true);

        // when & then
        assertThatThrownBy(() -> userService.updatePassword(email, request))
                .isInstanceOf(PasswordMismatchException.class);

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updatePassword_新しいパスワードが現在のパスワードと同じ場合は例外をスローする() {
        // given
        String email = "kenta@example.com";

        User user = new User();
        user.setPassword("encodedOldPassword");

        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "oldPassword",
                "oldPassword"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("oldPassword", "encodedOldPassword"))
                .thenReturn(true);

        // when & then
        assertThatThrownBy(() -> userService.updatePassword(email, request))
                .isInstanceOf(SamePasswordException.class);

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateName_正常に更新できる() {
        // given
        String email = "kenta@example.com";

        User user = new User();
        user.setName("oldUsername");

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(userRepository.save(user))
                .thenReturn(user);

        //when
        User result=userService.updateName(email, "newUsername");

        //then
        assertThat(result.getName()).isEqualTo("newUsername");

        verify(userRepository).save(user);
    }

    @Test
    void updateName_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "kenta@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.updateName(email, "newUsername"))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateName_デモユーザーの場合は例外をスローする() {
        // given
        String email = "test@example.com";

        // when & then
        assertThatThrownBy(() ->
                userService.updateName(email, "newUsername")
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updatePassword_デモユーザーの場合は例外をスローする() {
        // given
        String email = "test@example.com";

        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "password",
                "newPassword",
                "newPassword"
        );

        // when & then
        assertThatThrownBy(() ->
                userService.updatePassword(email, request)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
        verifyNoInteractions(passwordEncoder, jwtProvider);
    }
}