package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import com.toeictracker.backend.vocabulary.dto.VocabularyRequest;
import com.toeictracker.backend.vocabulary.dto.VocabularyTestRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final UserRepository userRepository;

    @Cacheable("getVocabulary")
    public List<Vocabulary> getVocabulary(String email){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));
        return vocabularyRepository.findByUserId(user.getId());
    }

    @CacheEvict(value = "getVocabulary", key = "#email")
    public Vocabulary addVocabulary(String email, VocabularyRequest request){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        Vocabulary vocabulary=new Vocabulary();
        vocabulary.setUserId(user.getId());
        vocabulary.setWord(request.word());
        vocabulary.setWordClass(request.wordClass());
        vocabulary.setMeaning(request.meaning());
        vocabulary.setStatus(request.status());
        vocabulary.setMemo(request.memo());

        return vocabularyRepository.save(vocabulary);
    }

    @CacheEvict(value = "getVocabulary", key = "#email")
    public Vocabulary updateVocabulary(String email,Long id, VocabularyRequest request){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        Vocabulary existingVocabulary=vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("単語が見つかりません"));

        if(!existingVocabulary.getUserId().equals(user.getId())){
            throw new AccessDeniedException("この単語を編集する権限がありません");
        }

        existingVocabulary.setWord(request.word());
        existingVocabulary.setWordClass(request.wordClass());
        existingVocabulary.setMeaning(request.meaning());
        existingVocabulary.setStatus(request.status());
        existingVocabulary.setMemo(request.memo());

        return vocabularyRepository.save(existingVocabulary);
    }

    @CacheEvict(value = "getVocabulary", key="#email")
    public void deleteVocabulary(String email, Long id){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        Vocabulary existingVocabulary=vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("単語が見つかりません"));

        if(!existingVocabulary.getUserId().equals(user.getId())){
            throw new AccessDeniedException("この単語を編集する権限がありません");
        }

        vocabularyRepository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "getVocabulary", key = "#email")
    public List<Vocabulary> testVocabulary(String email,List<VocabularyTestRequest> requests) {

        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("ユーザーが見つかりません"));

        List<Vocabulary> result = new ArrayList<>();

        for (VocabularyTestRequest request : requests) {
            Vocabulary existingVocabulary=vocabularyRepository.findById(request.id())
                    .orElseThrow(() -> new ResourceNotFoundException("単語が見つかりません"));

            if(!existingVocabulary.getUserId().equals(user.getId())){
                throw new AccessDeniedException("この単語を編集する権限がありません");
            }

            existingVocabulary.setStatus(request.status());
            result.add(existingVocabulary);
        }

        return vocabularyRepository.saveAll(result);
    }
}
