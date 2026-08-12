package com.toeictracker.backend.user;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    void updatePassword() {
    }

    @Test
    void updateName() {
    }
}