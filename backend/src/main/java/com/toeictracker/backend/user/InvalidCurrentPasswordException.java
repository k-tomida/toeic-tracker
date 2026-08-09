package com.toeictracker.backend.user;

public class InvalidCurrentPasswordException extends RuntimeException {
    public InvalidCurrentPasswordException(String message) {
        super(message);
    }
}
