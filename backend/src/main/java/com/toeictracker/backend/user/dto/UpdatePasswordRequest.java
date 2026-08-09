package com.toeictracker.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdatePasswordRequest(

        @NotBlank(message = "現在のパスワードを入力してください")
        @Size(min = 8, max = 100, message = "現在のパスワードは8～100文字で入力してください")
        String currentPassword,

        @NotBlank(message = "新しいパスワードを入力してください")
        @Size(min = 8, max = 100, message = "新しいパスワードは8～100文字で入力してください")
        String newPassword,

        @NotBlank(message = "確認用パスワードを入力してください")
        @Size(min = 8, max = 100, message = "確認用パスワードは8～100文字で入力してください")
        String confirmPassword

) {}
