package com.toeictracker.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateNameRequest(

        @NotBlank(message = "名前を入力してください")
        @Size(max = 50, message = "名前は50文字以内で入力してください")
        String name
) {}
