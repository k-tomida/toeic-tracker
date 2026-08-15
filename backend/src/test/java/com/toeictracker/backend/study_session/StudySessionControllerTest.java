package com.toeictracker.backend.study_session;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.study_session.dto.StudySessionRequest;
import com.toeictracker.backend.user.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.cache.CacheManager;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudySessionController.class)
class StudySessionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StudySessionService studySessionService;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    @MockitoBean
    private CacheManager cacheManager;

    @Test
    void getAllStudySession_正常に取得できる() throws Exception {
        // given
        StudySession studySession1 = new StudySession();
        studySession1.setId(1L);
        studySession1.setDate(LocalDate.of(2026, 8, 14));
        studySession1.setDuration(60);
        studySession1.setCategory(Category.VOCABULARY);
        studySession1.setMemo("英単語を勉強");

        StudySession studySession2 = new StudySession();
        studySession2.setId(2L);
        studySession2.setDate(LocalDate.of(2026, 8, 15));
        studySession2.setDuration(30);
        studySession2.setCategory(Category.LISTENING);
        studySession2.setMemo("Part 2を練習");

        when(studySessionService.getAllStudySession("test@example.com"))
                .thenReturn(List.of(studySession1, studySession2));

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        get("/study-sessions")
                                .principal(authentication)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].date").value("2026-08-14"))
                .andExpect(jsonPath("$[0].duration").value(60))
                .andExpect(jsonPath("$[0].category").value("VOCABULARY"))
                .andExpect(jsonPath("$[0].memo").value("英単語を勉強"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].date").value("2026-08-15"))
                .andExpect(jsonPath("$[1].duration").value(30))
                .andExpect(jsonPath("$[1].category").value("LISTENING"))
                .andExpect(jsonPath("$[1].memo").value("Part 2を練習"));

        verify(studySessionService).getAllStudySession("test@example.com");
    }

    @Test
    void addStudySession_正常に追加できる() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                60,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        StudySession studySession = new StudySession();
        studySession.setId(1L);
        studySession.setDate(LocalDate.of(2026, 8, 16));
        studySession.setDuration(60);
        studySession.setCategory(Category.VOCABULARY);
        studySession.setMemo("英単語を勉強");

        when(studySessionService.addStudySession(
                "test@example.com",
                request
        )).thenReturn(studySession);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.date").value("2026-08-16"))
                .andExpect(jsonPath("$.duration").value(60))
                .andExpect(jsonPath("$.category").value("VOCABULARY"))
                .andExpect(jsonPath("$.memo").value("英単語を勉強"));

        verify(studySessionService).addStudySession(
                "test@example.com",
                request
        );
    }

    @Test
    void addStudySession_dateがnullの場合は400を返す() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                null,
                60,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void addStudySession_durationがnullの場合は400を返す() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                null,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void addStudySession_durationが1分未満の場合は400を返す() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                0,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void addStudySession_durationが1440分を超える場合は400を返す() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                1441,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void addStudySession_categoryがnullの場合は400を返す() throws Exception {
        // given
        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                60,
                null,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void addStudySession_memoが200文字を超える場合は400を返す() throws Exception {
        // given
        String memo="a".repeat(201);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                60,
                Category.VOCABULARY,
                memo
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/study-sessions")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).addStudySession(
                anyString(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_正常に更新できる() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                90,
                Category.LISTENING,
                "Part 2を練習"
        );

        StudySession studySession = new StudySession();
        studySession.setId(id);
        studySession.setDate(LocalDate.of(2026, 8, 16));
        studySession.setDuration(90);
        studySession.setCategory(Category.LISTENING);
        studySession.setMemo("Part 2を練習");

        when(studySessionService.updateStudySession(
                "test@example.com",
                id,
                request
        )).thenReturn(studySession);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.date").value("2026-08-16"))
                .andExpect(jsonPath("$.duration").value(90))
                .andExpect(jsonPath("$.category").value("LISTENING"))
                .andExpect(jsonPath("$.memo").value("Part 2を練習"));

        verify(studySessionService).updateStudySession(
                "test@example.com",
                id,
                request
        );
    }

    @Test
    void updateStudySession_dateがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                null,
                60,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_durationがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                null,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_durationが1分未満の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                0,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_durationが1440分を超える場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                1441,
                Category.VOCABULARY,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_categoryがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                60,
                null,
                "英単語を勉強"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void updateStudySession_memoが200文字を超える場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        String memo="a".repeat(201);

        StudySessionRequest request = new StudySessionRequest(
                LocalDate.of(2026, 8, 16),
                60,
                Category.VOCABULARY,
                memo
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/study-sessions/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(studySessionService, never()).updateStudySession(
                anyString(),
                anyLong(),
                any(StudySessionRequest.class)
        );
    }

    @Test
    void deleteStudySession_正常に削除できる() throws Exception {
        // given
        Long id = 1L;

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        delete("/study-sessions/{id}", id)
                                .principal(authentication)
                )
                .andExpect(status().isNoContent());

        verify(studySessionService).deleteStudySession(
                "test@example.com",
                id
        );
    }

}