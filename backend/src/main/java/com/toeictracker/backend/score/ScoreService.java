package com.toeictracker.backend.score;

import com.toeictracker.backend.score.dto.ScoreRequest;
import com.toeictracker.backend.study_session.StudySession;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    @Cacheable("getScore")
    public List<Score> getScore(String email){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));
        return scoreRepository.findByUserId(user.getId());
    }

    @CacheEvict(value = "getScore", key="#email")
    public Score addScore(String email, ScoreRequest request){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));

        Score score=new Score();
        score.setUserId(user.getId());
        score.setExamDate(request.examDate());
        score.setTotalScore(request.listeningScore()+ request.readingScore());
        score.setListeningScore(request.listeningScore());
        score.setReadingScore(request.readingScore());
        score.setMemo(request.memo());

        return scoreRepository.save(score);
    }

    @CacheEvict(value = "getScore", key = "#email")
    public Score updateScore(String email, Long id, ScoreRequest request){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));

        Score existingScore = scoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("スコア記録が見つかりません"));

        if (!existingScore.getUserId().equals(user.getId())) {
            throw new AccessDeniedException("このスコア記録を編集する権限がありません");
        }

        existingScore.setExamDate(request.examDate());
        existingScore.setTotalScore(request.listeningScore()+ request.readingScore());
        existingScore.setListeningScore(request.listeningScore());
        existingScore.setReadingScore(request.readingScore());
        existingScore.setMemo(request.memo());

        return scoreRepository.save(existingScore);
    }

    @CacheEvict(value = "getScore", key = "#email")
    public void deleteScore(String email, Long id){
        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("ユーザーが見つかりません"));

        Score existingScore = scoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("スコア記録が見つかりません"));

        if (!existingScore.getUserId().equals(user.getId())) {
            throw new AccessDeniedException("このスコア記録を削除する権限がありません");
        }
        scoreRepository.deleteById(id);
    }

}
