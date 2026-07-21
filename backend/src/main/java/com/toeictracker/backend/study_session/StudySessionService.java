package com.toeictracker.backend.study_session;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudySessionService {

    private final StudySessionRepository studySessionRepository;

    @Cacheable("getStudySessions")
    public List<StudySession> getAllStudySession(Long userId){
        return studySessionRepository.findByUserId(userId);
    }
}
