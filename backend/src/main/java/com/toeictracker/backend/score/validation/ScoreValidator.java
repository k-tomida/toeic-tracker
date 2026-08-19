package com.toeictracker.backend.score.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ScoreValidator implements ConstraintValidator<ValidScore, Integer> {
    private int min;
    private int max;

    @Override
    public void initialize(ValidScore annotation) {
        this.min= annotation.min();
        this.max= annotation.max();
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean valid = value >= min
                && value <= max
                && value % 5 == 0;

        if (!valid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "スコアは" + min + "～" + max + "点の5点刻みで入力してください"
            ).addConstraintViolation();
        }

        return valid;
    }
}
