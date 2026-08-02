package com.toeictracker.backend.auth.dto;

public record LoginRequest(
        String email,
        String password
) {}
