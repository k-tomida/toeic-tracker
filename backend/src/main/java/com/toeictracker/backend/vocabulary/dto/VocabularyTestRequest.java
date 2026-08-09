package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.Status;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record VocabularyTestRequest(

        @NotNull(message = "IDは必須です")
        @Positive(message = "IDは1以上である必要があります")
        Long id,

        @NotNull(message = "習得状況を選択してください")
        Status status

) {}