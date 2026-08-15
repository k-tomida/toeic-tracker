package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.auth.JwtProvider;
import com.toeictracker.backend.user.CustomUserDetailsService;
import com.toeictracker.backend.vocabulary.dto.VocabularyRequest;
import com.toeictracker.backend.vocabulary.dto.VocabularyTestRequest;
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

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VocabularyController.class)
class VocabularyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private VocabularyService vocabularyService;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    @MockitoBean
    private CacheManager cacheManager;

    @Test
    void getVocabulary_正常に取得できる() throws Exception {
        // given
        Vocabulary vocabulary1 = new Vocabulary();
        vocabulary1.setId(1L);
        vocabulary1.setWord("apple");
        vocabulary1.setWordClass(WordClass.NOUN);
        vocabulary1.setMeaning("りんご");
        vocabulary1.setStatus(Status.ACQUIRED);
        vocabulary1.setMemo("基本単語");
        vocabulary1.setCreatedAt(LocalDateTime.of(2026, 8, 16, 10, 0));

        Vocabulary vocabulary2 = new Vocabulary();
        vocabulary2.setId(2L);
        vocabulary2.setWord("run");
        vocabulary2.setWordClass(WordClass.VERB);
        vocabulary2.setMeaning("走る");
        vocabulary2.setStatus(Status.UNACQUIRED);
        vocabulary2.setMemo("動詞");
        vocabulary2.setCreatedAt(LocalDateTime.of(2026, 8, 16, 11, 0));

        when(vocabularyService.getVocabulary("test@example.com"))
                .thenReturn(List.of(vocabulary1, vocabulary2));

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        get("/vocabularies")
                                .principal(authentication)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].word").value("apple"))
                .andExpect(jsonPath("$[0].wordClass").value("NOUN"))
                .andExpect(jsonPath("$[0].meaning").value("りんご"))
                .andExpect(jsonPath("$[0].status").value("ACQUIRED"))
                .andExpect(jsonPath("$[0].memo").value("基本単語"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].word").value("run"))
                .andExpect(jsonPath("$[1].wordClass").value("VERB"))
                .andExpect(jsonPath("$[1].meaning").value("走る"))
                .andExpect(jsonPath("$[1].status").value("UNACQUIRED"))
                .andExpect(jsonPath("$[1].memo").value("動詞"));

        verify(vocabularyService).getVocabulary("test@example.com");
    }

    @Test
    void addVocabulary_正常に追加できる() throws Exception {
        // given
        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setId(1L);
        vocabulary.setWord("apple");
        vocabulary.setWordClass(WordClass.NOUN);
        vocabulary.setMeaning("りんご");
        vocabulary.setStatus(Status.UNACQUIRED);
        vocabulary.setMemo("基本単語");
        vocabulary.setCreatedAt(LocalDateTime.of(2026, 8, 16, 10, 0));

        when(vocabularyService.addVocabulary(
                "test@example.com",
                request
        )).thenReturn(vocabulary);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.word").value("apple"))
                .andExpect(jsonPath("$.wordClass").value("NOUN"))
                .andExpect(jsonPath("$.meaning").value("りんご"))
                .andExpect(jsonPath("$.status").value("UNACQUIRED"))
                .andExpect(jsonPath("$.memo").value("基本単語"));

        verify(vocabularyService).addVocabulary(
                "test@example.com",
                request
        );
    }

    @Test
    void addVocabulary_wordが空の場合は400を返す() throws Exception {
        // given
        VocabularyRequest request = new VocabularyRequest(
                "",
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_wordが50文字を超える場合は400を返す() throws Exception {
        // given
        String word="a".repeat(51);

        VocabularyRequest request = new VocabularyRequest(
                word,
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_wordClassがnullの場合は400を返す() throws Exception {
        // given
        VocabularyRequest request = new VocabularyRequest(
                "apple",
                null,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_meaningが空の場合は400を返す() throws Exception {
        // given
        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_meaningが100文字を超える場合は400を返す() throws Exception {
        // given
        String meaning="a".repeat(101);

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                meaning,
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_statusがnullの場合は400を返す() throws Exception {
        // given
        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                null,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void addVocabulary_memoが200文字を超える場合は400を返す() throws Exception {
        // given
        String memo="a".repeat(201);

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                memo
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        post("/vocabularies")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).addVocabulary(
                anyString(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_正常に更新できる() throws Exception {
        // given
        Long id = 1L;

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                Status.ACQUIRED,
                "習得済み"
        );

        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setId(id);
        vocabulary.setWord("apple");
        vocabulary.setWordClass(WordClass.NOUN);
        vocabulary.setMeaning("りんご");
        vocabulary.setStatus(Status.ACQUIRED);
        vocabulary.setMemo("習得済み");
        vocabulary.setCreatedAt(LocalDateTime.of(2026, 8, 16, 10, 0));

        when(vocabularyService.updateVocabulary(
                "test@example.com",
                id,
                request
        )).thenReturn(vocabulary);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.word").value("apple"))
                .andExpect(jsonPath("$.wordClass").value("NOUN"))
                .andExpect(jsonPath("$.meaning").value("りんご"))
                .andExpect(jsonPath("$.status").value("ACQUIRED"))
                .andExpect(jsonPath("$.memo").value("習得済み"));

        verify(vocabularyService).updateVocabulary(
                "test@example.com",
                id,
                request
        );
    }

    @Test
    void updateVocabulary_wordが空の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        VocabularyRequest request = new VocabularyRequest(
                "",
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_wordが51文字の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        String word="a".repeat(51);

        VocabularyRequest request = new VocabularyRequest(
                word,
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_wordClassがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                null,
                "りんご",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_meaningが空の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "",
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_meaningが101文字の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        String meaning="a".repeat(101);

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                meaning,
                Status.UNACQUIRED,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_statusがnullの場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                null,
                "基本単語"
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void updateVocabulary_memoが201文字の場合は400を返す() throws Exception {
        // given
        Long id = 1L;

        String memo="a".repeat(201);

        VocabularyRequest request = new VocabularyRequest(
                "apple",
                WordClass.NOUN,
                "りんご",
                Status.UNACQUIRED,
                memo
        );

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/{id}", id)
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).updateVocabulary(
                anyString(),
                anyLong(),
                any(VocabularyRequest.class)
        );
    }

    @Test
    void deleteVocabulary_正常に削除できる() throws Exception {
        // given
        Long id = 1L;

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        delete("/vocabularies/{id}", id)
                                .principal(authentication)
                )
                .andExpect(status().isNoContent());

        verify(vocabularyService).deleteVocabulary(
                "test@example.com",
                1L
        );
    }

    @Test
    void testVocabulary_正常に更新できる() throws Exception {
        // given
        VocabularyTestRequest request1 =
                new VocabularyTestRequest(1L, Status.ACQUIRED);

        VocabularyTestRequest request2 =
                new VocabularyTestRequest(2L, Status.UNACQUIRED);

        List<VocabularyTestRequest> request =
                List.of(request1, request2);

        Vocabulary vocabulary1 = new Vocabulary();
        vocabulary1.setId(1L);
        vocabulary1.setWord("apple");
        vocabulary1.setWordClass(WordClass.NOUN);
        vocabulary1.setMeaning("りんご");
        vocabulary1.setStatus(Status.ACQUIRED);
        vocabulary1.setMemo("覚えた");
        vocabulary1.setCreatedAt(LocalDateTime.of(2026, 8, 16, 10, 0));

        Vocabulary vocabulary2 = new Vocabulary();
        vocabulary2.setId(2L);
        vocabulary2.setWord("listen");
        vocabulary2.setWordClass(WordClass.VERB);
        vocabulary2.setMeaning("聞く");
        vocabulary2.setStatus(Status.UNACQUIRED);
        vocabulary2.setMemo("まだ覚えていない");
        vocabulary2.setCreatedAt(LocalDateTime.of(2026, 8, 16, 11, 0));

        when(vocabularyService.testVocabulary(
                "test@example.com",
                request
        )).thenReturn(List.of(vocabulary1, vocabulary2));

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/test")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].word").value("apple"))
                .andExpect(jsonPath("$[0].wordClass").value("NOUN"))
                .andExpect(jsonPath("$[0].meaning").value("りんご"))
                .andExpect(jsonPath("$[0].status").value("ACQUIRED"))
                .andExpect(jsonPath("$[0].memo").value("覚えた"))
                .andExpect(jsonPath("$[0].createdAt").value("2026-08-16T10:00:00"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].word").value("listen"))
                .andExpect(jsonPath("$[1].wordClass").value("VERB"))
                .andExpect(jsonPath("$[1].meaning").value("聞く"))
                .andExpect(jsonPath("$[1].status").value("UNACQUIRED"))
                .andExpect(jsonPath("$[1].memo").value("まだ覚えていない"))
                .andExpect(jsonPath("$[1].createdAt").value("2026-08-16T11:00:00"));

        verify(vocabularyService).testVocabulary(
                "test@example.com",
                request
        );
    }

    @Test
    void testVocabulary_idがnullの場合は400を返す() throws Exception {
        // given
        VocabularyTestRequest request =
                new VocabularyTestRequest(null, Status.ACQUIRED);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/test")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(List.of(request)))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).testVocabulary(
                anyString(),
                anyList()
        );
    }

    @Test
    void testVocabulary_idが0の場合は400を返す() throws Exception {
        // given
        VocabularyTestRequest request =
                new VocabularyTestRequest(0L, Status.ACQUIRED);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/test")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(List.of(request)))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).testVocabulary(
                anyString(),
                anyList()
        );
    }

    @Test
    void testVocabulary_idが負数の場合は400を返す() throws Exception {
        // given
        VocabularyTestRequest request =
                new VocabularyTestRequest(-1L, Status.ACQUIRED);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/test")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(List.of(request)))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).testVocabulary(
                anyString(),
                anyList()
        );
    }

    @Test
    void testVocabulary_statusがnullの場合は400を返す() throws Exception {
        // given
        VocabularyTestRequest request =
                new VocabularyTestRequest(1L, null);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken("test@example.com", null);

        // when & then
        mockMvc.perform(
                        put("/vocabularies/test")
                                .principal(authentication)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(List.of(request)))
                )
                .andExpect(status().isBadRequest());

        verify(vocabularyService, never()).testVocabulary(
                anyString(),
                anyList()
        );
    }
}