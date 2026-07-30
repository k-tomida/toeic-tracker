package com.toeictracker.backend.study_session.dto;

import com.toeictracker.backend.study_session.Category;

import java.time.LocalDate;

public record StudySessionResponse(
        Long id,
        LocalDate date,
        Integer duration,
        Category category,
        String memo
) {}
