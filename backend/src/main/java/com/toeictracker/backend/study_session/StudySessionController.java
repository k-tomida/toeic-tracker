package com.toeictracker.backend.study_session;

import com.toeictracker.backend.study_session.dto.StudySessionRequest;
import com.toeictracker.backend.study_session.dto.StudySessionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/study-sessions")
@RequiredArgsConstructor
public class StudySessionController {

    private final StudySessionService studySessionService;

    @GetMapping
    public ResponseEntity<List<StudySessionResponse>> getAllStudySession(Authentication authentication) {
        String email = authentication.getName();
        List<StudySession> studySessions = studySessionService.getAllStudySession(email);

        List<StudySessionResponse> responses = studySessions.stream()
                .map(s -> new StudySessionResponse(
                        s.getId(),
                        s.getDate(),
                        s.getDuration(),
                        s.getCategory(),
                        s.getMemo()
                ))
                .toList();

        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<StudySessionResponse> addStudySession(
            Authentication authentication,
            @Valid @RequestBody StudySessionRequest request){
        StudySession postStudySession=studySessionService.addStudySession(authentication.getName(), request);
        StudySessionResponse response=new StudySessionResponse(
                postStudySession.getId(),
                postStudySession.getDate(),
                postStudySession.getDuration(),
                postStudySession.getCategory(),
                postStudySession.getMemo()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudySessionResponse> updateStudySession(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody StudySessionRequest request){
        StudySession updateStudySession=studySessionService.updateStudySession(authentication.getName(), id,request);

        StudySessionResponse response=new StudySessionResponse(
                updateStudySession.getId(),
                updateStudySession.getDate(),
                updateStudySession.getDuration(),
                updateStudySession.getCategory(),
                updateStudySession.getMemo()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudySession(
            Authentication authentication,
            @PathVariable Long id){
        studySessionService.deleteStudySession(authentication.getName(),id);
        return ResponseEntity.noContent().build();
    }


}
