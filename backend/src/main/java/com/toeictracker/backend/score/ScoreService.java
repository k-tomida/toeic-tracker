package com.toeictracker.backend.score;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreRepository scoreRepository;

    @Cacheable("getScore")
    public List<Score> getScore(Long id){
        return scoreRepository.findByUserId(id);
    }
}
