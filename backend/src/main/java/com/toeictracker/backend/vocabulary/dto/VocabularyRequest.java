package com.toeictracker.backend.vocabulary.dto;

import com.toeictracker.backend.vocabulary.Status;
import com.toeictracker.backend.vocabulary.WordClass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record VocabularyRequest(

        @NotBlank(message = "単語を入力してください")
        @Size(max = 50, message = "単語は50文字以内で入力してください")
        String word,

        @NotNull(message = "品詞を選択してください")
        WordClass wordClass,

        @NotBlank(message = "単語の意味を入力してください")
        @Size(max = 100, message = "意味は100文字以内で入力してください")
        String meaning,

        @NotNull(message = "習得状況を選択してください")
        Status status,

        @Size(max = 200, message="メモは200文字以内で入力してください")
        String memo
) {}
