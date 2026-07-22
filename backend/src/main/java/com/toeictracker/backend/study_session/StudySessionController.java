package com.toeictracker.backend.study_session;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<StudySession> postStudySession(@RequestBody StudySession studySession){
        StudySession postStudySession=studySessionService.postStudySession(studySession);
        return ResponseEntity.ok(postStudySession);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudySession> updateStudySession(@PathVariable Long id,@RequestBody StudySession studySession){
        StudySession updateStudySession=studySessionService.updateStudySession(id,studySession);
        return ResponseEntity.ok(updateStudySession);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudySession(@PathVariable Long id){
        studySessionService.deleteStudySession(id);
        return ResponseEntity.noContent().build();
    }
}
