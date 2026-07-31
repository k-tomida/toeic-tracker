package com.toeictracker.backend.score.dto;

import java.time.LocalDate;

public record ScoreRequest(
        LocalDate examDate,
        Integer listeningScore,
        Integer readingScore,
        String memo
) {}
