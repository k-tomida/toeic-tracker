package com.toeictracker.backend.user;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DialectOverride;

@Data
@Entity(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String  email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "target_score")
    private Integer targetScore;

    @Column(name="next_exam_date")
    private String nextExamDate;
}
