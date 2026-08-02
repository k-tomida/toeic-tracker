package com.toeictracker.backend.user.dto;

import java.time.LocalDate;

public record UserResponse(
        Long id,
        String name,
        String email,
        Integer targetScore,
        LocalDate nextExamDate
) {}
