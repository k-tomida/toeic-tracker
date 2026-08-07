package com.toeictracker.backend.score.dto;

import com.toeictracker.backend.score.validation.ValidScore;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;

public record ScoreRequest(

        @NotNull(message = "日付を入力してください")
        LocalDate examDate,

        @NotNull(message = "リスニングのスコアを入力してください")
        @ValidScore(min = 5,max = 495)
        Integer listeningScore,

        @NotNull(message = "リスニングのスコアを入力してください")
        @ValidScore(min = 5, max = 495)
        Integer readingScore,

        @Size(max = 200, message = "メモは200文字以内で入力してください")
        String memo
) {}
