package com.toeictracker.backend.study_session;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.study_session.dto.StudySessionRequest;
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
class StudySessionServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private StudySessionRepository studySessionRepository;

    @InjectMocks
    private StudySessionService studySessionService;

    @Test
    void getAllStudySession_正常に取得できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySession studySession1 = new StudySession();
        StudySession studySession2 = new StudySession();

        List<StudySession> studySessions = List.of(
                studySession1,
                studySession2
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findByUserId(1L))
                .thenReturn(studySessions);

        // when
        List<StudySession> result =
                studySessionService.getAllStudySession(email);

        // then
        assertThat(result)
                .containsExactly(studySession1, studySession2);

        verify(userRepository).findByEmail(email);
        verify(studySessionRepository).findByUserId(1L);
    }

    @Test
    void getAllStudySession_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> studySessionService.getAllStudySession(email))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(studySessionRepository, never()).findByUserId(anyLong());
    }
    @Test
    void addStudySession_正常に学習記録を登録できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 1),
                60,
                Category.VOCABULARY,
                "単語学習"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.save(any(StudySession.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        StudySession result =
                studySessionService.addStudySession(email, request);

        // then
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getDate())
                .isEqualTo(LocalDate.of(2026, 8, 1));
        assertThat(result.getDuration()).isEqualTo(60);
        assertThat(result.getCategory()).isEqualTo(Category.VOCABULARY);
        assertThat(result.getMemo()).isEqualTo("単語学習");

        verify(studySessionRepository).save(any(StudySession.class));
    }


    @Test
    void addStudySession_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 1),
                60,
                Category.VOCABULARY,
                "単語学習"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                studySessionService.addStudySession(email, request)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(studySessionRepository, never())
                .save(any(StudySession.class));
    }


    @Test
    void updateStudySession_正常に学習記録を更新できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySession existingStudySession = new StudySession();
        existingStudySession.setId(10L);
        existingStudySession.setUserId(1L);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 9, 1),
                90,
                Category.VOCABULARY,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(10L))
                .thenReturn(Optional.of(existingStudySession));

        when(studySessionRepository.save(any(StudySession.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        StudySession result =
                studySessionService.updateStudySession(
                        email,
                        10L,
                        request
                );

        // then
        assertThat(result.getDate())
                .isEqualTo(LocalDate.of(2026, 9, 1));
        assertThat(result.getDuration()).isEqualTo(90);
        assertThat(result.getCategory()).isEqualTo(Category.VOCABULARY);
        assertThat(result.getMemo()).isEqualTo("更新");

        verify(studySessionRepository).save(existingStudySession);
    }


    @Test
    void updateStudySession_指定したIDの学習記録が存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 9, 1),
                90,
                Category.VOCABULARY,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(11L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                studySessionService.updateStudySession(
                        email,
                        11L,
                        request
                )
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(studySessionRepository, never())
                .save(any(StudySession.class));
    }


    @Test
    void updateStudySession_他ユーザーの学習記録の場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySession existingStudySession = new StudySession();
        existingStudySession.setId(10L);
        existingStudySession.setUserId(2L);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 9, 1),
                90,
                Category.VOCABULARY,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(10L))
                .thenReturn(Optional.of(existingStudySession));

        // when & then
        assertThatThrownBy(() ->
                studySessionService.updateStudySession(
                        email,
                        10L,
                        request
                )
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(studySessionRepository, never())
                .save(any(StudySession.class));
    }


    @Test
    void deleteStudySession_正常に学習記録を削除できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySession existingStudySession = new StudySession();
        existingStudySession.setId(10L);
        existingStudySession.setUserId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(10L))
                .thenReturn(Optional.of(existingStudySession));

        // when
        studySessionService.deleteStudySession(email, 10L);

        // then
        verify(studySessionRepository).deleteById(10L);
    }


    @Test
    void deleteStudySession_指定したIDの学習記録が存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(11L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                studySessionService.deleteStudySession(email, 11L)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(studySessionRepository, never())
                .deleteById(11L);
    }


    @Test
    void deleteStudySession_他ユーザーの学習記録の場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        StudySession existingStudySession = new StudySession();
        existingStudySession.setId(10L);
        existingStudySession.setUserId(2L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(studySessionRepository.findById(10L))
                .thenReturn(Optional.of(existingStudySession));

        // when & then
        assertThatThrownBy(() ->
                studySessionService.deleteStudySession(email, 10L)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(studySessionRepository, never())
                .deleteById(10L);
    }

}