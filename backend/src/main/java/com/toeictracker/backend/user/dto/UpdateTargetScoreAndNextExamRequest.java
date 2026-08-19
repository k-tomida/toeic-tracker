package com.toeictracker.backend.user.dto;

import com.toeictracker.backend.score.validation.ValidScore;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UpdateTargetScoreAndNextExamRequest(

        @NotNull(message = "目標スコアを入力してください")
        @ValidScore(min = 10, max = 990)
        Integer targetScore,

        @NotNull(message = "次回受験日を入力してください")
        @Future(message = "次回受験日は未来の日付を入力してください")
        LocalDate nextExamDate
) {}
