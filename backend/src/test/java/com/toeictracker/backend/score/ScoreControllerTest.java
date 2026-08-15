package com.toeictracker.backend.score;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.score.dto.ScoreRequest;
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

@WebMvcTest(ScoreController.class)
class ScoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ScoreService scoreService;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    @MockitoBean
    private CacheManager cacheManager;

    @Test
    void getScore_正常に取得できる() throws Exception {
        // given
        Score score1 = new Score();
        score1.setId(1L);
        score1.setExamDate(LocalDate.of(2026, 8, 1));
        score1.setTotalScore(800);
        score1.setListeningScore(400);
        score1.setReadingScore(400);
        score1.setMemo("模試1回目");

        Score score2 = new Score();
        score2.setId(2L);
        score2.setExamDate(LocalDate.of(2026, 8, 10));
        score2.setTotalScore(850);
        score2.setListeningScore(425);
        score2.setReadingScore(425);
        score2.setMemo("模試2回目");

        when(scoreService.getScore("test@example.com"))
                .thenReturn(List.of(score1, score2));

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        get("/scores")
                                .principal(authentication)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].examDate").value("2026-08-01"))
                .andExpect(jsonPath("$[0].totalScore").value(800))
                .andExpect(jsonPath("$[0].listeningScore").value(400))
                .andExpect(jsonPath("$[0].readingScore").value(400))
                .andExpect(jsonPath("$[0].memo").value("模試1回目"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].examDate").value("2026-08-10"))
                .andExpect(jsonPath("$[1].totalScore").value(850))
                .andExpect(jsonPath("$[1].listeningScore").value(425))
                .andExpect(jsonPath("$[1].readingScore").value(425))
                .andExpect(jsonPath("$[1].memo").value("模試2回目"));

        verify(scoreService).getScore("test@example.com");
    }

    @Test
    void addScore_正常に追加できる() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                400,
                "模試を受験"
        );

        Score score = new Score();
        score.setId(1L);
        score.setExamDate(LocalDate.of(2026, 8, 16));
        score.setTotalScore(800);
        score.setListeningScore(400);
        score.setReadingScore(400);
        score.setMemo("模試を受験");

        when(scoreService.addScore("test@example.com", request))
                .thenReturn(score);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.examDate").value("2026-08-16"))
                .andExpect(jsonPath("$.totalScore").value(800))
                .andExpect(jsonPath("$.listeningScore").value(400))
                .andExpect(jsonPath("$.readingScore").value(400))
                .andExpect(jsonPath("$.memo").value("模試を受験"));

        verify(scoreService).addScore("test@example.com", request);
    }

    @Test
    void addScore_examDateがnullの場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                null,
                400,
                400,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_listeningScoreがnullの場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                null,
                400,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_listeningScoreが５点未満の場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                0,
                400,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_listeningScoreが495点を超える場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                500,
                400,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_listeningScoreが５点刻みでない場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                401,
                400,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_readingScoreがnullの場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                null,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_readingScoreが５点未満の場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                0,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_readingScoreが495点を超える場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                500,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void addScore_readingScoreが５点刻みでない場合は400を返す() throws Exception {
        // given
        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                401,
                "模試を受験"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/scores")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).addScore(
                anyString(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_正常に更新できる() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                425,
                425,
                "更新後の模試"
        );

        Score score = new Score();
        score.setId(id);
        score.setExamDate(LocalDate.of(2026, 8, 16));
        score.setTotalScore(850);
        score.setListeningScore(425);
        score.setReadingScore(425);
        score.setMemo("更新後の模試");

        when(scoreService.updateScore(
                "test@example.com",
                id,
                request
        )).thenReturn(score);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.examDate").value("2026-08-16"))
                .andExpect(jsonPath("$.totalScore").value(850))
                .andExpect(jsonPath("$.listeningScore").value(425))
                .andExpect(jsonPath("$.readingScore").value(425))
                .andExpect(jsonPath("$.memo").value("更新後の模試"));

        verify(scoreService).updateScore(
                "test@example.com",
                id,
                request
        );
    }

    @Test
    void updateScore_examDateがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                null,
                400,
                400,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_listeningScoreがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                null,
                400,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_listeningScoreが５点未満の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                0,
                400,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_listeningScoreが495点を超える場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                500,
                400,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_listeningScoreが５点刻みでない場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                401,
                400,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_readingScoreがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                null,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_readingScoreが５点未満の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                0,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_readingScoreが495点を超える場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                500,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_readingScoreが５点刻みでない場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                401,
                "更新後の模試"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void updateScore_memoが200文字を超える場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        String memo = "a".repeat(201);

        ScoreRequest request = new ScoreRequest(
                LocalDate.of(2026, 8, 16),
                400,
                400,
                memo
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/scores/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(scoreService, never()).updateScore(
                anyString(),
                anyLong(),
                any(ScoreRequest.class)
        );
    }

    @Test
    void deleteScore_正常に削除できる() throws Exception {
        // given
        Long id = 1L;

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        delete("/scores/{id}", id)
                                .principal(authentication)
                )
                .andExpect(status().isNoContent());

        verify(scoreService).deleteScore("test@example.com", id);
    }
}