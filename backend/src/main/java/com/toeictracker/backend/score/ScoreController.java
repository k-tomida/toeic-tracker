package com.toeictracker.backend.score;

import com.toeictracker.backend.score.dto.ScoreRequest;
import com.toeictracker.backend.score.dto.ScoreResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores")
@RequiredArgsConstructor
public class ScoreController {

    private final ScoreService scoreService;

    @GetMapping
    public ResponseEntity<List<ScoreResponse>> getScore(Authentication authentication){
        List<Score> scores=scoreService.getScore(authentication.getName());
        List<ScoreResponse> responses=scores.stream()
                .map(score -> new ScoreResponse(
                        score.getId(),
                        score.getExamDate(),
                        score.getTotalScore(),
                        score.getListeningScore(),
                        score.getReadingScore(),
                        score.getMemo()
                )).toList();
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<ScoreResponse> addScore(
            Authentication authentication,
            @RequestBody ScoreRequest request){
        Score data=scoreService.addScore(authentication.getName(), request);
        ScoreResponse response=new ScoreResponse(
                data.getId(),
                data.getExamDate(),
                data.getTotalScore(),
                data.getListeningScore(),
                data.getReadingScore(),
                data.getMemo()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScoreResponse> updateScore(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody ScoreRequest request){
        Score data=scoreService.updateScore(authentication.getName(), id,request);

        ScoreResponse response=new ScoreResponse(
                data.getId(),
                data.getExamDate(),
                data.getTotalScore(),
                data.getListeningScore(),
                data.getReadingScore(),
                data.getMemo()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(
            Authentication authentication,
            @PathVariable Long id){
        scoreService.deleteScore(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
