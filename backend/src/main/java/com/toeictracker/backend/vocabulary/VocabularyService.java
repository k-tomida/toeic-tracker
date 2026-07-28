package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.vocabulary.DTO.VocabularyTestRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;

    @Cacheable("getVocabulary")
    public List<Vocabulary> getVocabulary(Long userId){
        return vocabularyRepository.findByUserId(userId);
    }

    @CacheEvict(value = "getVocabulary", allEntries = true)
    public Vocabulary addVocabulary(Vocabulary vocabulary){
        return vocabularyRepository.save(vocabulary);
    }

    @CacheEvict(value = "getVocabulary", allEntries = true)
    public Vocabulary updateVocabulary(Long id, Vocabulary vocabulary){
        Vocabulary existingVocabulary=vocabularyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("単語が見つかりません: id=" + id));

        existingVocabulary.setWord(vocabulary.getWord());
        existingVocabulary.setWordClass(vocabulary.getWordClass());
        existingVocabulary.setMeaning(vocabulary.getMeaning());
        existingVocabulary.setStatus(vocabulary.getStatus());
        existingVocabulary.setMemo(vocabulary.getMemo());

        return vocabularyRepository.save(existingVocabulary);
    }

    @CacheEvict(value = "getVocabulary", allEntries = true)
    public void deleteVocabulary(Long id){
        if (!vocabularyRepository.existsById(id)) {
            throw new RuntimeException("単語が見つかりません: id=" + id);
        }
        vocabularyRepository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "getVocabulary", allEntries = true)
    public List<Vocabulary> testVocabulary(List<VocabularyTestRequest> requests) {

        List<Vocabulary> result = new ArrayList<>();
        for (VocabularyTestRequest request : requests) {
            Vocabulary vocabulary = vocabularyRepository.findById(request.id())
                    .orElseThrow();

            vocabulary.setStatus(request.status());
            result.add(vocabulary);
        }

        return vocabularyRepository.saveAll(result);
    }
}
