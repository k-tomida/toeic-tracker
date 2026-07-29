package com.toeictracker.backend.auth.dto;

public record RegisterRequest(
        String email,
        String password
) {}
