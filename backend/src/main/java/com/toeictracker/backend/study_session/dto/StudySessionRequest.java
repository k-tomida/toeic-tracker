package com.toeictracker.backend.study_session.dto;

import com.toeictracker.backend.study_session.Category;

import java.time.LocalDate;

public record StudySessionRequest(
        LocalDate date,
        Integer duration,
        Category category,
        String memo
) {}
