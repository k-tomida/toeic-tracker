package com.toeictracker.backend.score.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ScoreValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidScore {
    int min();
    int max();
    String message() default "スコアが不正です";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
