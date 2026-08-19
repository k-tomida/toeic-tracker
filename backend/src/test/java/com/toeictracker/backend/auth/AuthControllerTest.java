package com.toeictracker.backend.auth;

import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.auth.dto.LoginRequest;
import com.toeictracker.backend.auth.dto.RegisterRequest;
import com.toeictracker.backend.user.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.cache.CacheManager;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    @MockitoBean
    private CacheManager cacheManager;


    @Test
    void register_正常にユーザー登録できる() throws Exception {
        // given
        RegisterRequest request = new RegisterRequest(
                "test@example.com",
                "kenta",
                "password123",
                800,
                LocalDate.of(2026, 12, 1)
        );

        AuthResponse response = new AuthResponse("test-token");

        when(authService.register(any(RegisterRequest.class)))
                .thenReturn(response);

        // when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("test-token"));

        verify(authService).register(any(RegisterRequest.class));
    }

    @Test
    void register_emailが空の場合は400を返す() throws Exception {
        // given
        RegisterRequest request = new RegisterRequest(
                "",
                "kenta",
                "password123",
                800,
                LocalDate.of(2026, 12, 1)
        );

        // when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_email形式が不正の場合は400を返す() throws Exception {
        // given
        RegisterRequest request = new RegisterRequest(
                "invalid-email",
                "kenta",
                "password123",
                800,
                LocalDate.of(2026, 12, 1)
        );

        // when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_nameが空の場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "",
                "password123",
                800,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }


    @Test
    void register_nameが50文字を超える場合は400を返す() throws Exception{
        //given
        String name = "a".repeat(51);

        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                name,
                "password123",
                800,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_passwordが空の場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                "",
                800,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_passwordが8文字未満の場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                "1234567",
                800,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_passwordが100文字を超える場合は400を返す() throws Exception{
        //given
        String password="a".repeat(101);

        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                password,
                800,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_targetScoreが10点未満の場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                "@assword123",
                5,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_targetScoreが990点を超える場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                "@assword123",
                995,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_targetScoreが5点刻みでない場合は400を返す() throws Exception{
        //given
        RegisterRequest request=new RegisterRequest(
                "test@example.com",
                "kenta",
                "@assword123",
                496,
                LocalDate.of(2026,12,1)
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).register(any(RegisterRequest.class));
    }

    @Test
    void register_nextExamTimeが過去の場合は400を返す() throws Exception {
        // given
        RegisterRequest request = new RegisterRequest(
                "test@example.com",
                "kenta",
                "password123",
                800,
                LocalDate.of(2025, 1, 1)
        );

        // when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never())
                .register(any(RegisterRequest.class));
    }


    @Test
    void login_正常にログインできる() throws Exception {
        // given
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "password123"
        );

        AuthResponse response = new AuthResponse("test-token");

        when(authService.login(any(LoginRequest.class)))
                .thenReturn(response);

        // when & then
        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("test-token"));

        verify(authService).login(any(LoginRequest.class));
    }

    @Test
    void login_emailが空の場合は400を返す() throws Exception {
        //given
        LoginRequest request=new LoginRequest(
                "",
                "password123"
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    void login_email形式が不正の場合は400を返す() throws Exception {
        //given
        LoginRequest request=new LoginRequest(
                "invalid-email",
                "password123"
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    void login_passwordが空の場合は400を返す() throws Exception{
        //given
        LoginRequest request=new LoginRequest(
                "test@example.com",
                ""
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    void login_passwordが8文字未満の場合は400を返す() throws Exception{
        //given
        //given
        LoginRequest request=new LoginRequest(
                "test@example.com",
                "1234567"
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }

    @Test
    void login_passwordが100文字を超える場合は400を返す() throws Exception{
        //given
        String password="a".repeat(101);

        //given
        LoginRequest request=new LoginRequest(
                "test@example.com",
                password
        );

        //when & then
        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(authService, never()).login(any(LoginRequest.class));
    }


}