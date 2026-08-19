package com.toeictracker.backend.score;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.score.dto.ScoreRequest;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ScoreServiceTest {

    @Mock
    private ScoreRepository scoreRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ScoreService scoreService;


    @Test
    void getScore_正常にスコアを取得できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Score score = new Score();
        score.setId(1L);
        score.setUserId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findByUserId(1L))
                .thenReturn(List.of(score));

        // when
        List<Score> result = scoreService.getScore(email);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(1L);

        verify(scoreRepository).findByUserId(1L);
    }


    @Test
    void getScore_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> scoreService.getScore(email))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(scoreRepository, never()).findByUserId(anyLong());
    }


    @Test
    void addScore_正常にスコアを登録できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 1),
                400,
                350,
                "模試"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.save(any(Score.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        Score result = scoreService.addScore(email, request);

        // then
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getExamDate())
                .isEqualTo(LocalDate.of(2026, 8, 1));
        assertThat(result.getListeningScore()).isEqualTo(400);
        assertThat(result.getReadingScore()).isEqualTo(350);
        assertThat(result.getTotalScore()).isEqualTo(750);
        assertThat(result.getMemo()).isEqualTo("模試");

        verify(scoreRepository).save(any(Score.class));
    }


    @Test
    void addScore_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 1),
                400,
                350,
                "模試"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> scoreService.addScore(email, request))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(scoreRepository, never()).save(any(Score.class));
    }


    @Test
    void updateScore_正常にスコアを更新できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Score existingScore = new Score();
        existingScore.setId(10L);
        existingScore.setUserId(1L);

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 9, 1),
                450,
                400,
                "更新後"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(10L))
                .thenReturn(Optional.of(existingScore));

        when(scoreRepository.save(any(Score.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        Score result = scoreService.updateScore(email, 10L, request);

        // then
        assertThat(result.getExamDate())
                .isEqualTo(LocalDate.of(2026, 9, 1));
        assertThat(result.getListeningScore()).isEqualTo(450);
        assertThat(result.getReadingScore()).isEqualTo(400);
        assertThat(result.getTotalScore()).isEqualTo(850);
        assertThat(result.getMemo()).isEqualTo("更新後");

        verify(scoreRepository).save(existingScore);
    }

    @Test
    void updateScore_指定したIDのスコアが存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 9, 1),
                450,
                400,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(11L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                scoreService.updateScore(email, 11L, request)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(scoreRepository, never()).save(any(Score.class));
    }

    @Test
    void updateScore_他ユーザーのスコアの場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Score existingScore = new Score();
        existingScore.setId(10L);
        existingScore.setUserId(2L);

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 9, 1),
                450,
                400,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(10L))
                .thenReturn(Optional.of(existingScore));

        // when & then
        assertThatThrownBy(() ->
                scoreService.updateScore(email, 10L, request)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(scoreRepository, never()).save(any(Score.class));
    }


    @Test
    void deleteScore_正常にスコアを削除できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Score existingScore = new Score();
        existingScore.setId(10L);
        existingScore.setUserId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(10L))
                .thenReturn(Optional.of(existingScore));

        // when
        scoreService.deleteScore(email, 10L);

        // then
        verify(scoreRepository).deleteById(10L);
    }

    @Test
    void deleteScore_指定したIDのスコアが存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(11L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                scoreService.deleteScore(email, 11L)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(scoreRepository, never()).deleteById(11L);
    }


    @Test
    void deleteScore_他ユーザーのスコアの場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Score existingScore = new Score();
        existingScore.setId(10L);
        existingScore.setUserId(2L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(scoreRepository.findById(10L))
                .thenReturn(Optional.of(existingScore));

        // when & then
        assertThatThrownBy(() ->
                scoreService.deleteScore(email, 10L)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(scoreRepository, never()).deleteById(10L);
    }
}