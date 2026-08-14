package com.toeictracker.backend.user;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    @MockitoBean
    private CacheManager cacheManager;

    @Test
    void getUser_正常に取得できる() throws Exception {
        // given
        User user = new User();
        user.setId(1L);
        user.setName("テストユーザー");
        user.setEmail("test@example.com");
        user.setTargetScore(800);
        user.setNextExamDate(LocalDate.of(2026, 12, 1));
        when(userService.getUser("test@example.com")).thenReturn(user);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(get("/users/me").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("テストユーザー"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.targetScore").value(800))
                .andExpect(jsonPath("$.nextExamDate").value("2026-12-01"));

        verify(userService).getUser("test@example.com");
    }

    @Test
    void getUser_ユーザーが存在しない場合は404を返す() throws Exception {
        // given
        when(userService.getUser("test@example.com"))
                .thenThrow(new ResourceNotFoundException("ユーザーが見つかりません"));

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        get("/users/me")
                                .principal(authentication)
                )
                .andExpect(status().isNotFound());

        verify(userService).getUser("test@example.com");
    }

    @Test
    void updateTargetScoreAndNextExamDate_正常に更新できる() throws Exception {
        // given
        User user = new User();
        user.setId(1L);
        user.setName("テストユーザー");
        user.setEmail("test@example.com");
        user.setTargetScore(900);
        user.setNextExamDate(LocalDate.of(2026, 12, 1));

        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        900,
                        LocalDate.of(2026, 12, 1)
                );

        when(userService.updateTargetScoreAndNextExam(
                "test@example.com",
                request
        )).thenReturn(user);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        "test@example.com",
                        null
                );

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("テストユーザー"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.targetScore").value(900))
                .andExpect(jsonPath("$.nextExamDate").value("2026-12-01"));

        verify(userService).updateTargetScoreAndNextExam(
                "test@example.com",
                request
        );
    }
}