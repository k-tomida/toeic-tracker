package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.Status;

public record VocabularyTestRequest(
        Long id,
        Status status
) { }
