package com.toeictracker.backend.user;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.auth.dto.AuthResponse;
import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.dto.UpdateNameRequest;
import com.toeictracker.backend.user.dto.UpdatePasswordRequest;
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
                new UsernamePasswordAuthenticationToken("test@example.com", null);

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

    @Test
    void updateTargetScoreAndNextExamDate_targetScoreがnullの場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        null,
                        LocalDate.of(2026, 12, 1)
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updateTargetScoreAndNextExamDate_targetScoreが10点未満の場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        5,
                        LocalDate.of(2026, 12, 1)
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updateTargetScoreAndNextExamDate_targetScoreが990点を超える場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        995,
                        LocalDate.of(2026, 12, 1)
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updateTargetScoreAndNextExamDate_targetScoreが5点刻みでない場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        496,
                        LocalDate.of(2026, 12, 1)
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updateTargetScoreAndNextExamDate_nextExamDateがnullの場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        800,
                        null
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updateTargetScoreAndNextExamDate_nextExamDateが過去の場合は400を返す() throws Exception {
        //given
        UpdateTargetScoreAndNextExamRequest request =
                new UpdateTargetScoreAndNextExamRequest(
                        800,
                        LocalDate.of(2025,1,1)
                );


        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/me")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateTargetScoreAndNextExam(
                anyString(),
                any(UpdateTargetScoreAndNextExamRequest.class)
        );
    }

    @Test
    void updatePassword_正常に更新できる() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                "newPassword"
        );

        AuthResponse response = new AuthResponse("test-token");

        when(userService.updatePassword(
                "test@example.com",
                request
        )).thenReturn(response);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("test-token"));

        verify(userService).updatePassword(
                "test@example.com",
                request
        );
    }

    @Test
    void updatePassword_currentPasswordが空の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "",
                "newPassword",
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_currentPasswordが8文字未満の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "1234567",
                "newPassword",
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_currentPasswordが100文字を超える場合は400を返す() throws Exception {
        // given
        String oldPassword="a".repeat(101);
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                oldPassword,
                "newPassword",
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_newPasswordが空の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "",
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_newPasswordが8文字未満の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "1234567",
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_newPasswordが100文字を超える場合は400を返す() throws Exception {
        // given
        String newPassword="a".repeat(101);
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                newPassword,
                "newPassword"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_confirmPasswordが空の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                ""
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_confirmPasswordが8文字未満の場合は400を返す() throws Exception {
        // given
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                "1234567"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updatePassword_confirmPasswordが100文字を超える場合は400を返す() throws Exception {
        // given
        String confirmPassword="a".repeat(101);
        UpdatePasswordRequest request = new UpdatePasswordRequest(
                "oldPassword",
                "newPassword",
                confirmPassword
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/password")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService, never()).updatePassword(
                anyString(),
                any(UpdatePasswordRequest.class)
        );
    }

    @Test
    void updateName_正常に更新できる() throws Exception{
        // given
        User user = new User();
        user.setId(1L);
        user.setName("テストユーザー");
        user.setEmail("test@example.com");
        user.setTargetScore(800);
        user.setNextExamDate(LocalDate.of(2026, 12, 1));

        UpdateNameRequest request=new UpdateNameRequest("テストユーザー");

        when(userService.updateName("test@example.com","テストユーザー"))
                .thenReturn(user);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/name")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("テストユーザー"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.targetScore").value(800))
                .andExpect(jsonPath("$.nextExamDate").value("2026-12-01"));


        verify(userService).updateName(
                "test@example.com",
                "テストユーザー"
        );
    }

    @Test
    void updateName_nameが空の場合は400を返す() throws Exception{
        //given
        UpdateNameRequest request=new UpdateNameRequest("");

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/name")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService,never()).updateName(
                anyString(),
                anyString()
        );
    }

    @Test
    void updateName_nameが50文字を超える場合は400を返す() throws Exception{
        // given
        String name="a".repeat(51);
        UpdateNameRequest request=new UpdateNameRequest(name);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/users/name")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(userService,never()).updateName(
                anyString(),
                anyString()
        );
    }
}