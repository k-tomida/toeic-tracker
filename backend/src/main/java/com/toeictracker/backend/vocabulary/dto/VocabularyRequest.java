package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.Status;
import com.toeictracker.backend.vocabulary.WordClass;

public record VocabularyRequest(
        String word,
        WordClass wordClass,
        String meaning,
        Status status,
        String memo
) {}
