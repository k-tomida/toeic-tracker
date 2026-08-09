package com.toeictracker.backend.user;

public class SamePasswordException extends RuntimeException{
    SamePasswordException(String message){
        super(message);
    }
}
