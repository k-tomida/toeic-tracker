package com.toeictracker.backend.score;

import com.toeictracker.backend.study_session.StudySession;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
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

    @CacheEvict(value = "getScore", allEntries = true)
    public Score addScore(Score score){
        score.setTotalScore(score.getListeningScore() + score.getReadingScore());
        return scoreRepository.save(score);
    }

    @CacheEvict(value = "getScore", allEntries = true)
    public Score updateScore(Long id,Score score){
        Score existingScore = scoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("学習記録が見つかりません: id=" + id));

        existingScore.setExamDate(score.getExamDate());
        existingScore.setTotalScore(score.getListeningScore()+score.getReadingScore());
        existingScore.setListeningScore(score.getListeningScore());
        existingScore.setReadingScore(score.getReadingScore());
        existingScore.setMemo(score.getMemo());

        return scoreRepository.save(existingScore);
    }

    @CacheEvict(value = "getScore", allEntries = true)
    public void deleteScore(Long id){
        if(!scoreRepository.existsById(id)){
            throw new RuntimeException("該当スコアが見つかりません: id=" + id);
        }
        scoreRepository.deleteById(id);
    }

}
