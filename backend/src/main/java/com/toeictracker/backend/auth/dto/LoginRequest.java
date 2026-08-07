package com.toeictracker.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(

        @NotBlank(message = "emailを入力してください")
        @Email(message = "email形式で入力してください")
        @Size(max = 254, message = "emailは254文字で入力してください")
        String email,

        @NotBlank(message = "パスワードを入力してください")
        @Size(min = 8, max = 100, message = "パスワードは8～100文字で入力してください")
        String password
) {}
