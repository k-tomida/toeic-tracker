package com.toeictracker.backend.auth;

public record RegisterRequest(
        String email,
        String password
) {}
