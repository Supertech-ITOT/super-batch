package com.supertech.superbatch.batch.batch.dto;

import java.util.List;

import com.supertech.superbatch.batch.batch.enums.StepChangeDirection;
import com.supertech.superbatch.batch.batch.enums.StepChangeMode;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record StepChangeRequest(

        @NotNull(message = "Step number is required") @Positive(message = "Step number must be greater than 0") Integer stepNo,

        @NotNull(message = "Step change direction is required") StepChangeDirection direction,

        @NotNull(message = "Step change mode is required") StepChangeMode stepChangeMode,

        List<ParameterRequest> parameterRequests,

        List<MaterialRequest> materialRequests

) {
}