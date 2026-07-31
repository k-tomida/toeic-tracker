package com.toeictracker.backend.score.dto;

import java.time.LocalDate;

public record ScoreResponse(
        Long id,
        LocalDate examDate,
        Integer totalScore,
        Integer listeningScore,
        Integer readingScore,
        String memo
) {}
