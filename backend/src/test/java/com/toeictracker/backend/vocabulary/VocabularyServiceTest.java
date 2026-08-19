package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import com.toeictracker.backend.vocabulary.dto.VocabularyRequest;
import com.toeictracker.backend.vocabulary.dto.VocabularyTestRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.access.AccessDeniedException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VocabularyServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private VocabularyRepository vocabularyRepository;

    @InjectMocks
    private VocabularyService vocabularyService;

    @Test
    void getVocabulary_正常に取得できる() {
        //given
        String email="test@example.com";

        User user=new User();
        user.setId(1L);

        Vocabulary vocabulary1=new Vocabulary();
        Vocabulary vocabulary2=new Vocabulary();

        List<Vocabulary> vocabularies=List.of(
                vocabulary1,
                vocabulary2
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findByUserId(1L))
                .thenReturn(vocabularies);

        //when
        List<Vocabulary> result=vocabularyService.getVocabulary(email);

        //then
        assertThat(result).containsExactly(
                vocabulary1,vocabulary2
        );

        verify(userRepository).findByEmail(email);
        verify(vocabularyRepository).findByUserId(1L);
    }

    @Test
    void getVocabulary_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> vocabularyService.getVocabulary(email))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .findByUserId(anyLong());
    }


    @Test
    void addVocabulary_正常に単語を登録できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        VocabularyRequest request = new VocabularyRequest(
                "abandon",
                WordClass.VERB,
                "捨てる",
                Status.UNACQUIRED,
                "重要単語"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.save(any(Vocabulary.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        Vocabulary result = vocabularyService.addVocabulary(email, request);

        // then
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getWord()).isEqualTo("abandon");
        assertThat(result.getWordClass()).isEqualTo(WordClass.VERB);
        assertThat(result.getMeaning()).isEqualTo("捨てる");
        assertThat(result.getStatus()).isEqualTo(Status.UNACQUIRED);
        assertThat(result.getMemo()).isEqualTo("重要単語");

        verify(vocabularyRepository).save(any(Vocabulary.class));
    }

    @Test
    void updateVocabulary_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        VocabularyRequest request = new VocabularyRequest(
                "abandon",
                WordClass.VERB,
                "捨てる",
                Status.UNACQUIRED,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.updateVocabulary(
                        email,
                        10L,
                        request
                )
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .findById(anyLong());

        verify(vocabularyRepository, never())
                .save(any(Vocabulary.class));
    }


    @Test
    void updateVocabulary_指定したIDの単語が存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        VocabularyRequest request = new VocabularyRequest(
                "abandon",
                WordClass.VERB,
                "捨てる",
                Status.UNACQUIRED,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.updateVocabulary(
                        email,
                        10L,
                        request
                )
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .save(any(Vocabulary.class));
    }


    @Test
    void updateVocabulary_他ユーザーの単語の場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Vocabulary existingVocabulary = new Vocabulary();
        existingVocabulary.setId(10L);
        existingVocabulary.setUserId(2L);

        VocabularyRequest request = new VocabularyRequest(
                "abandon",
                WordClass.VERB,
                "捨てる",
                Status.UNACQUIRED,
                "更新"
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.of(existingVocabulary));

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.updateVocabulary(
                        email,
                        10L,
                        request
                )
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(vocabularyRepository, never())
                .save(any(Vocabulary.class));
    }


    @Test
    void deleteVocabulary_正常に単語を削除できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Vocabulary existingVocabulary = new Vocabulary();
        existingVocabulary.setId(10L);
        existingVocabulary.setUserId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.of(existingVocabulary));

        // when
        vocabularyService.deleteVocabulary(email, 10L);

        // then
        verify(vocabularyRepository).deleteById(10L);
    }


    @Test
    void deleteVocabulary_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.deleteVocabulary(email, 10L)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .findById(anyLong());

        verify(vocabularyRepository, never())
                .deleteById(anyLong());
    }


    @Test
    void deleteVocabulary_指定したIDの単語が存在しない() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.deleteVocabulary(email, 10L)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .deleteById(10L);
    }


    @Test
    void deleteVocabulary_他ユーザーの単語の場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Vocabulary existingVocabulary = new Vocabulary();
        existingVocabulary.setId(10L);
        existingVocabulary.setUserId(2L);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.of(existingVocabulary));

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.deleteVocabulary(email, 10L)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(vocabularyRepository, never())
                .deleteById(10L);
    }

    @Test
    void testVocabulary_正常に単語テストを実行できる() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Vocabulary vocabulary1 = new Vocabulary();
        vocabulary1.setId(10L);
        vocabulary1.setUserId(1L);
        vocabulary1.setStatus(Status.UNACQUIRED);

        Vocabulary vocabulary2 = new Vocabulary();
        vocabulary2.setId(20L);
        vocabulary2.setUserId(1L);
        vocabulary2.setStatus(Status.UNACQUIRED);

        List<VocabularyTestRequest> requests = List.of(
                new VocabularyTestRequest(10L, Status.ACQUIRED),
                new VocabularyTestRequest(20L, Status.UNACQUIRED)
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.of(vocabulary1));

        when(vocabularyRepository.findById(20L))
                .thenReturn(Optional.of(vocabulary2));

        when(vocabularyRepository.saveAll(anyList()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        List<Vocabulary> result =
                vocabularyService.testVocabulary(email, requests);

        // then
        assertThat(result).hasSize(2);

        assertThat(result.get(0).getId()).isEqualTo(10L);
        assertThat(result.get(0).getStatus()).isEqualTo(Status.ACQUIRED);

        assertThat(result.get(1).getId()).isEqualTo(20L);
        assertThat(result.get(1).getStatus()).isEqualTo(Status.UNACQUIRED);

        verify(vocabularyRepository).findById(10L);
        verify(vocabularyRepository).findById(20L);
        verify(vocabularyRepository).saveAll(anyList());
    }

    @Test
    void testVocabulary_ユーザーが存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        List<VocabularyTestRequest> requests = List.of(
                new VocabularyTestRequest(10L, Status.ACQUIRED)
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.testVocabulary(email, requests)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .findById(anyLong());

        verify(vocabularyRepository, never())
                .saveAll(anyList());
    }

    @Test
    void testVocabulary_指定したIDの単語が存在しない場合は例外をスローする() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        List<VocabularyTestRequest> requests = List.of(
                new VocabularyTestRequest(10L, Status.ACQUIRED)
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.testVocabulary(email, requests)
        )
                .isInstanceOf(ResourceNotFoundException.class);

        verify(vocabularyRepository, never())
                .saveAll(anyList());
    }

    @Test
    void testVocabulary_他ユーザーの単語の場合は権限エラー() {
        // given
        String email = "test@example.com";

        User user = new User();
        user.setId(1L);

        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setId(10L);
        vocabulary.setUserId(2L);

        List<VocabularyTestRequest> requests = List.of(
                new VocabularyTestRequest(10L, Status.ACQUIRED)
        );

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(vocabularyRepository.findById(10L))
                .thenReturn(Optional.of(vocabulary));

        // when & then
        assertThatThrownBy(() ->
                vocabularyService.testVocabulary(email, requests)
        )
                .isInstanceOf(AccessDeniedException.class);

        verify(vocabularyRepository, never())
                .saveAll(anyList());
    }
}