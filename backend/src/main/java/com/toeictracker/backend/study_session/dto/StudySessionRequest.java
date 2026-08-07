package com.toeictracker.backend.study_session.dto;

import com.toeictracker.backend.study_session.Category;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record StudySessionRequest(

        @NotNull(message = "日付を入力してください")
        LocalDate date,

        @NotNull(message = "学習時間を入力してください")
        @Min(value = 1, message = "学習時間は1分以上で入力してください")
        @Max(value = 1440, message = "学習時間は1440分以下で入力してください")
        Integer duration,

        @NotNull(message = "カテゴリを選択してください")
        Category category,

        @Size(max = 200, message = "メモは200文字以内で入力してください")
        String memo

) {}
