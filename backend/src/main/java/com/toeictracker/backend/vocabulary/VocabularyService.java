package com.toeictracker.backend.vocabulary;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

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
}
