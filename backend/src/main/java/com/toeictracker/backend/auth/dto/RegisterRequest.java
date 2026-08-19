package com.toeictracker.backend.auth.dto;

import com.toeictracker.backend.score.validation.ValidScore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record RegisterRequest(

        @NotBlank(message = "emailを入力してください")
        @Email(message = "email形式で入力してください")
        String email,

        @NotBlank(message = "名前を入力してください")
        @Size(max = 50, message = "名前は50文字以内で入力してください")
        String name,

        @NotBlank(message = "パスワードを入力してください")
        @Size(min = 8, max = 100, message = "パスワードは8～100文字で入力してください")
        String password,

        @ValidScore(min = 10, max = 990)
        Integer targetScore,

        @Future(message = "次回受験日は未来の日付を入力してください")
        LocalDate nextExamDate
) {}
