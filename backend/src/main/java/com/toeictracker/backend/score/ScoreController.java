package com.toeictracker.backend.score;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScoreController {

    private final ScoreService scoreService;

    @GetMapping
    public ResponseEntity<List<Score>> getScore(){
        List<Score> data=scoreService.getScore(1L);
        return ResponseEntity.ok(data);
    }

    @PostMapping
    public ResponseEntity<Score> addScore(@RequestBody Score score){
        Score data=scoreService.addScore(score);
        return ResponseEntity.ok(data);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Score> updateScore(@PathVariable Long id, @RequestBody Score score){
        Score data=scoreService.updateScore(id, score);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable Long id){
        scoreService.deleteScore(id);
        return ResponseEntity.noContent().build();
    }
}
