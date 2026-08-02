package com.toeictracker.backend.user.dto;

import java.time.LocalDate;

public record UpdatePasswordRequest(
        String currentPassword,
        String newPassword
) { }
