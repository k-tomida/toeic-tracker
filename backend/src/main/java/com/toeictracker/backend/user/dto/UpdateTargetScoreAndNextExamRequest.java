package com.toeictracker.backend.user.dto;

import java.time.LocalDate;

public record UpdateTargetScoreAndNextExamRequest(
        Integer targetScore,
        LocalDate nextExamDate
) {}
