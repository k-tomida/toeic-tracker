package com.toeictracker.backend.score;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "scores")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name="exam_date",nullable = false)
    private LocalDate examDate;

    @Column(name="total_Score", nullable = false)
    private Integer totalScore;

    @Column(name="listening_score", nullable = false)
    private Integer listeningScore;

    @Column(name="reading_score", nullable = false)
    private Integer readingScore;

    @Column(length = 200)
    private String memo;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
