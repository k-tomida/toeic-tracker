package com.toeictracker.backend.study_session;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
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

    @CacheEvict(value = "getStudySessions", allEntries = true)
    public StudySession postStudySession(StudySession studySession){
        return studySessionRepository.save(studySession);
    }

    @CacheEvict(value="getStudySessions", allEntries = true)
    public StudySession updateStudySession(Long id, StudySession studySession){
         StudySession existingStudySession = studySessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("学習記録が見つかりません: id=" + id));

        existingStudySession.setDate(studySession.getDate());
        existingStudySession.setDuration(studySession.getDuration());
        existingStudySession.setCategory(studySession.getCategory());
        existingStudySession.setMemo(studySession.getMemo());

        return studySessionRepository.save(existingStudySession);
    }

    @CacheEvict(value = "getStudySessions",allEntries = true)
    public void deleteStudySession(Long id){
        if (!studySessionRepository.existsById(id)) {
            throw new RuntimeException("学習記録が見つかりません: id=" + id);
        }
        studySessionRepository.deleteById(id);
    }
}
