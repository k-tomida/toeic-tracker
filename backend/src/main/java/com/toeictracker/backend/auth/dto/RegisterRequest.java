package com.toeictracker.backend.auth.dto;

import java.time.LocalDate;

public record RegisterRequest(
        String email,
        String name,
        String password,
        Integer targetScore,
        LocalDate nextExamDate
) {}
