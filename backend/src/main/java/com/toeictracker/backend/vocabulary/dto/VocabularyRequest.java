package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.WordClass;

public record VocabularyRequest(
        String word,
        WordClass wordClass,
        String meaning,
        String status,
        String memo
) {}
