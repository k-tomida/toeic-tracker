package com.toeictracker.backend.study_session;

import com.toeictracker.backend.exception.ResourceNotFoundException;
import com.toeictracker.backend.study_session.dto.StudySessionRequest;
import com.toeictracker.backend.user.User;
import com.toeictracker.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudySessionService {

    private final StudySessionRepository studySessionRepository;
    private final UserRepository userRepository;

    @Cacheable(value = "getStudySessions", key = "#email")
    public List<StudySession> getAllStudySession(String email){
        User user=userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("ユーザーが見つかりません"));
        return studySessionRepository.findByUserId(user.getId());
    }

    @CacheEvict(value = "getStudySessions", key = "#email")
    public StudySession addStudySession(String email, StudySessionRequest request){
        User user=userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("ユーザーが見つかりません"));

        StudySession studySession=new StudySession();
        studySession.setUserId(user.getId());
        studySession.setDate(request.date());
        studySession.setDuration(request.duration());
        studySession.setCategory(request.category());
        studySession.setMemo(request.memo());

        return studySessionRepository.save(studySession);
    }

    @CacheEvict(value="getStudySessions", key = "#email")
    public StudySession updateStudySession(String email, Long id, StudySessionRequest request) {

        User user=userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("ユーザーが見つかりません"));

        StudySession existingStudySession = studySessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("学習記録が見つかりません"));

        if (!existingStudySession.getUserId().equals(user.getId())) {
            throw new AccessDeniedException("この学習記録を編集する権限がありません");
        }

        existingStudySession.setDate(request.date());
        existingStudySession.setDuration(request.duration());
        existingStudySession.setCategory(request.category());
        existingStudySession.setMemo(request.memo());

        return studySessionRepository.save(existingStudySession);
    }

    @CacheEvict(value = "getStudySessions", key = "#email")
    public void deleteStudySession(String email,Long id){

        User user=userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("ユーザーが見つかりません"));

        StudySession existingStudySession = studySessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("学習記録が見つかりません"));

        // 所有者チェック: このレコードが本当にログイン中のユーザーのものか確認
        if (!existingStudySession.getUserId().equals(user.getId())) {
            throw new AccessDeniedException("この学習記録を削除する権限がありません");
        }
        studySessionRepository.deleteById(id);
    }
}
