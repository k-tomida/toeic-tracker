package com.toeictracker.backend.study_session;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/study-sessions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudySessionController {
}
