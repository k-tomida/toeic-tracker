package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.Status;
import com.toeictracker.backend.vocabulary.WordClass;

import java.time.LocalDateTime;

public record VocabularyResponse(
        Long id,
        String word,
        WordClass wordClass,
        String meaning,
        Status status,
        String memo,
        LocalDateTime createdAt
) {}
