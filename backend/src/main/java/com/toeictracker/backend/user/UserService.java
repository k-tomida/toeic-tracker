package com.toeictracker.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Cacheable("getUser")
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません: id=" + id));
    }

    @CacheEvict(value = "getUser", allEntries = true)
    public User updateUser(Long id, User updatedData) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません: id=" + id));

        // 受け取った User オブジェクトから必要な項目だけを取り出して更新
        existingUser.setTargetScore(updatedData.getTargetScore());
        existingUser.setNextExamDate(updatedData.getNextExamDate());

        return userRepository.save(existingUser);
    }
}