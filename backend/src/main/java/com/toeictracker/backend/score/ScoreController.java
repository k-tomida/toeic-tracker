package com.toeictracker.backend.score;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
