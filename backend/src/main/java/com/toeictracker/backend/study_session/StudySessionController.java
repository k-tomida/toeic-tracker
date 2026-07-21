package com.toeictracker.backend.study_session;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/study-sessions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudySessionController {

    private final StudySessionService studySessionService;

    @GetMapping
    public ResponseEntity<List<StudySession>> getAllStudySession(){
        List<StudySession> studySessions = studySessionService.getAllStudySession(1L);
        return ResponseEntity.ok(studySessions);
    }
}
